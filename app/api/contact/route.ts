import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { serverContactSchema } from "@/lib/contact-schema";

const resend    = new Resend(process.env.RESEND_API_KEY);
const ratelimit = new Ratelimit({
  redis:   Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"), // max 3 submissions per IP per hour
});

export async function POST(req: NextRequest) {
  // 1. Rate limit — check IP before doing anything else
  const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return NextResponse.json(
      { error: "Too many messages sent. Please wait before trying again." },
      { status: 429 }
    );
  }

  // 2. Parse and validate the request body with Zod
  const body = await req.json();
  const parsed = serverContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data." },
      { status: 400 }
    );
  }

  const { firstName, lastName, email, message, captchaToken } = parsed.data;

  // 3. Verify the hCaptcha token with their API
  const captchaRes = await fetch("https://hcaptcha.com/siteverify", {
    method:  "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:    `secret=${process.env.HCAPTCHA_SECRET}&response=${captchaToken}`,
  });
  const captchaData = await captchaRes.json();
  if (!captchaData.success) {
    return NextResponse.json(
      { error: "Captcha verification failed. Please try again." },
      { status: 400 }
    );
  }

  // 4. Send the email via Resend
  const { error } = await resend.emails.send({
    from:    "Portfolio Contact <onboarding@resend.dev>", // change after domain verification
    to:      "faithgabriellegamboa046@gmail.com",                            // ← your actual email here
    subject: `New message from ${firstName} ${lastName}`,
    replyTo: email,                                       // so you can hit Reply directly
    html: `
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to send email. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}