"use client";

import React, { useRef, useState } from "react";
import LoadingOverlay from "@/app/components/ui/loading-overlay";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Modal from "@/app/components/ui/modals";

const feedbackSchema = z.object({
  name:         z.string().min(2, "Name is too short").max(50),
  email:        z.string().email("Enter a valid email"),
  feedback:     z.string().min(10, "Tell me a bit more — at least 10 characters").max(1000),
  captchaToken: z.string().optional(),
});
type FeedbackData = z.infer<typeof feedbackSchema>;

const inputClass = "w-full p-3 rounded-xl bg-white/8 border border-white/10 focus:outline-none focus:border-[#60EEE7]/50 text-white placeholder:text-white/30 font-(family-name:--font-urbanist) text-sm transition-colors";
const errorClass = "text-red-300 text-xs mt-1 pl-1 font-(family-name:--font-urbanist)";

type FeedbackModalProps = {
  isOpen:  boolean;
  onClose: () => void;
};

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const captchaRef = useRef<HCaptcha>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackData>({ resolver: zodResolver(feedbackSchema) });

  const onSubmit = async (data: FeedbackData) => {
  setLoading(true);

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: data.name,
        lastName: "",
        email: data.email,
        message: `[Portfolio Improvement Feedback]\n\n${data.feedback}`,
        captchaToken: data.captchaToken ?? "",
      }),
    });

    if (res.status === 429) {
      toast.warning(
        "You already submitted feedback recently. Please wait a bit!"
      );
      return;
    }

    if (!res.ok) {
      toast.error("Something went wrong. Please try again.");
      return;
    }

    toast.success(
      "Thank you for the feedback! I’ll genuinely take it into account :)"
    );

    reset();
    captchaRef.current?.resetCaptcha();
    onClose();
  } catch {
    toast.error("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const handleClose = () => {
    reset();
    captchaRef.current?.resetCaptcha();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      heading="Fair enough!"
      subtext="Since you played along, what could I do better? I genuinely want to know (˶>⩊<˶)"
    >

      <LoadingOverlay
        open={loading}
        message="Sending your feedback..."
      />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="font-(family-name:--font-urbanist) text-xs text-white/60 pl-1">
              Your Name
            </label>
            <input
              {...register("name")}
              placeholder="First name is fine"
              className={inputClass}
            />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-(family-name:--font-urbanist) text-xs text-white/60 pl-1">
              Email (so I can follow up)
            </label>
            <input
              {...register("email")}
              placeholder="you@example.com"
              type="email"
              className={inputClass}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-(family-name:--font-urbanist) text-xs text-white/60 pl-1">
              What could be improved?
            </label>
            <textarea
              {...register("feedback")}
              placeholder="The design, the projects, the copy... be honest!"
              rows={4}
              className={`${inputClass} resize-none`}
            />
            {errors.feedback && <p className={errorClass}>{errors.feedback.message}</p>}
          </div>

          <HCaptcha
            ref={captchaRef}
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
            onVerify={(token) => setValue("captchaToken", token, { shouldValidate: true })}
            onExpire={() => setValue("captchaToken", "", { shouldValidate: true })}
            theme="light"
          />


          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl text-[var(--background)] font-(family-name:--font-super-warming) text-sm tracking-wider transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            style={{  background: "linear-gradient(90deg, #FF9363 0%, #F54C00 100%)" }}
          >
            {isSubmitting ? "Sending..." : "Send Feedback →"}
          </button>
        </form>

    </Modal>
  );
}