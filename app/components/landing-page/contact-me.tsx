"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";
import CaptchaModal from "./modals/captcha-modal";
import LoadingOverlay from "@/app/components/ui/loading-overlay";
import { toast } from "sonner";

// ── Refined Animation Sequences ──────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const cardReveal: Variants = {
  hidden:  { opacity: 0, y: 50, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const staggerChildren: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

// Clean, soft inputs utilizing your design tokens perfectly
const inputClass = "w-full p-4 rounded-2xl bg-[var(--beige)]/30 border border-[var(--beige)]/60 focus:border-[var(--primary)] focus:bg-[var(--beige)]/50 text-[var(--dark-green)] placeholder:text-[var(--dark-green)]/40 focus:outline-none transition-all duration-300 font-[family-name:var(--font-body)] text-base font-light antialiased";
const errorClass = "text-red-700 font-[family-name:var(--font-body)] text-xs mt-1 pl-1 font-medium";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [loading, setLoading] = useState(false);
  const [isCaptchaOpen, setIsCaptchaOpen]   = useState(false);
  const [captchaToken,  setCaptchaToken]     = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const sendMessage = useCallback(async (data: ContactFormData, token: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, captchaToken: token }),
      });

      if (res.status === 429) {
        toast.warning("You’ve already sent a message recently. Please wait a bit!");
        return;
      }

      if (!res.ok) {
        toast.error("Something went wrong. Please try again.");
        return;
      }

      toast.success("Message sent! I’ll get back to you soon :)");
      reset();
      setCaptchaToken(null);
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [reset]);

  const onSubmit = useCallback((data: ContactFormData) => {
    if (captchaToken) {
      sendMessage(data, captchaToken);
      return;
    }
    setIsCaptchaOpen(true);
  }, [captchaToken, sendMessage]);

  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    setIsCaptchaOpen(false);
    handleSubmit((data) => sendMessage(data, token))();
  }, [handleSubmit, sendMessage]);

  return (
    <>
      <CaptchaModal
        isOpen={isCaptchaOpen}
        onVerify={handleCaptchaVerify}
        onClose={() => setIsCaptchaOpen(false)}
      />

      <section
        id="contact-me"
        ref={sectionRef}
        className="flex items-center justify-center min-h-screen w-full p-4 sm:p-6 md:p-8 bg-[var(--background)]"
      >
        <motion.div
          variants={cardReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative w-full max-w-5xl p-8 md:p-14 overflow-hidden rounded-[2.5rem] border border-[var(--primary)]/10 bg-[var(--beige)]/10"
        >
          <LoadingOverlay open={loading} message="Sending your message..." />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full">

            {/* ── Left Heading Column ── */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="flex flex-col"
            >
              <motion.span
                variants={fadeUp}
                className="font-[family-name:var(--font-body)] text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-semibold mb-4 block"
              >
                Inquiries // Connection
              </motion.span>

              <motion.h2
                variants={fadeUp}
                className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl mb-6 text-[var(--primary)] tracking-tight leading-[1.1] lowercase"
              >
                Let&apos;s work <br />
                <span className="text-[var(--dark-green)] opacity-80 italic">together!</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="font-[family-name:var(--font-body)] text-base md:text-lg text-[var(--light-gray)] max-w-sm leading-relaxed"
              >
                Have a question? A project? A fun idea? Please, please, please send it my way :&gt;
              </motion.p>
            </motion.div>

            {/* ── Right Form Column ── */}
            <motion.form
              variants={staggerChildren}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 font-[family-name:var(--font-body)]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div variants={fadeUp} className="flex flex-col gap-2">
                  <label className="text-[var(--primary)] text-xs font-semibold tracking-wider uppercase pl-1">First Name</label>
                  <input {...register("firstName")} placeholder="First name" type="text" className={inputClass} />
                  {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                </motion.div>
                <motion.div variants={fadeUp} className="flex flex-col gap-2">
                  <label className="text-[var(--primary)] text-xs font-semibold tracking-wider uppercase pl-1">Last Name</label>
                  <input {...register("lastName")} placeholder="Last name" type="text" className={inputClass} />
                  {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="flex flex-col gap-2">
                <label className="text-[var(--primary)] text-xs font-semibold tracking-wider uppercase pl-1">Email (Required)</label>
                <input {...register("email")} placeholder="you@example.com" type="email" className={inputClass} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </motion.div>

              <motion.div variants={fadeUp} className="flex flex-col gap-2">
                <label className="text-[var(--primary)] text-xs font-semibold tracking-wider uppercase pl-1">Description (Required)</label>
                <textarea
                  {...register("message")}
                  placeholder="Tell me about your project or question..."
                  rows={5}
                  className={`${inputClass} resize-none overflow-y-auto pr-3`}
                />
                {errors.message && <p className={errorClass}>{errors.message.message}</p>}
              </motion.div>

              <motion.div variants={fadeUp} className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full py-4 bg-[var(--primary)] text-[var(--background)] rounded-full font-[family-name:var(--font-body)] text-sm tracking-widest uppercase font-bold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-[var(--dark-green)]"
                >
                  {loading ? "Sending..." : "Submit Message"}
                </button>
              </motion.div>
            </motion.form>

          </div>
        </motion.div>
      </section>
    </>
  );
}