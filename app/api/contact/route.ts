import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { serverContactSchema } from "@/lib/contact-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body   = await req.json();
  const parsed = serverContactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const { firstName, lastName, email, message } = parsed.data;

  const { error } = await resend.emails.send({
    from:    "Portfolio Contact <onboarding@resend.dev>",
    to:      "faithgabriellegamboa046@gmail.com",
    subject: `New message from ${firstName}${lastName ? ` ${lastName}` : ""}`,
    replyTo: email,
    html: `
      <p><strong>Name:</strong> ${firstName}${lastName ? ` ${lastName}` : ""}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}