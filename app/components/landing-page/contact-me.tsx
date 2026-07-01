"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";
import CaptchaModal from "./modals/captcha-modal";
import LoadingOverlay from "@/app/components/ui/loading-overlay";
import { toast } from "sonner";

// ── Motion Sequences ─────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.05 } },
};

// Premium, fully enclosed input blocks with highly accessible tap/click surfaces
const premiumInputClass = "w-full p-4 rounded-xl bg-[var(--beige)]/10 border border-[var(--dark-green)]/20 focus:border-[var(--primary)] focus:bg-[var(--beige)]/20 text-[var(--dark-green)] placeholder:text-[var(--dark-green)]/30 focus:outline-none transition-all duration-300 font-[family-name:var(--font-body)] text-base font-light antialiased";
const labelClass = "text-[var(--dark-green)] text-xs font-semibold tracking-[0.15em] uppercase font-[family-name:var(--font-body)] mb-2 block";
const errorClass = "text-red-700 font-[family-name:var(--font-body)] text-xs mt-1.5 font-medium tracking-wide";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [loading, setLoading] = useState(false);
  const [isCaptchaOpen, setIsCaptchaOpen] = useState(false);
  const [captchaToken, setCaptchaToken]   = useState<string | null>(null);

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
    <LoadingOverlay open={loading} message="Sending your message..." />
      <CaptchaModal
        isOpen={isCaptchaOpen}
        onVerify={handleCaptchaVerify}
        onClose={() => setIsCaptchaOpen(false)}
      />

      {/* Changed target ID back to contact-me to synchronize perfectly with navbar elements */}
      <section
        id="contact"
        ref={sectionRef}
        className="w-full lg:min-h-screen flex flex-col justify-center bg-[var(--background)] text-[var(--dark-green)] py-16 lg:py-20 overflow-hidden relative"
      >


        {/* ── CENTRAL GRIDS SYSTEM ── */}
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 selection:bg-[var(--primary)] selection:text-[var(--background)]">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          >

            {/* ── LEFT LAYOUT PANEL: GRAPHIC HEADLINE ── */}
            <div className="col-span-1 lg:col-span-5 flex flex-col">
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-[var(--primary)]" />
                <span className="font-[family-name:var(--font-body)] text-xs tracking-[0.25em] uppercase text-[var(--primary)] font-bold">
                  COMMUNICATION
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight uppercase leading-[1.0] text-[var(--dark-green)] mb-6 select-none"
              >
                Let&apos;s build <br />
                something <br />
                <span className="font-[family-name:var(--font-display)] text-[var(--primary)] italic lowercase">together.</span>
              </motion.h2>

              <motion.div variants={fadeUp} className="font-[family-name:var(--font-body)] text-sm md:text-base leading-relaxed text-[var(--dark-green)] space-y-5 max-w-xl text-left font-light">
                <p>
                  Have a project in mind or just want to talk about an idea? Send me a message, I check my inbox every day.
                </p>
              </motion.div>
            </div>

            {/* ── RIGHT LAYOUT PANEL: ENCLOSED ACCESSIBLE FORM ── */}
            <motion.form
              variants={staggerContainer}
              onSubmit={handleSubmit(onSubmit)}
              className="col-span-1 lg:col-span-7 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div variants={fadeUp}>
                  <label htmlFor="firstName" className={labelClass}>First Name</label>
                  <input id="firstName" {...register("firstName")} placeholder="e.g., John" type="text" className={premiumInputClass} />
                  {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <label htmlFor="lastName" className={labelClass}>Last Name</label>
                  <input id="lastName" {...register("lastName")} placeholder="e.g., David" type="text" className={premiumInputClass} />
                  {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                </motion.div>
              </div>

              <motion.div variants={fadeUp}>
                <label htmlFor="email" className={labelClass}>Email Address *</label>
                <input id="email" {...register("email")} placeholder="name@domain.com" type="email" className={premiumInputClass} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </motion.div>

              <motion.div variants={fadeUp}>
                <label htmlFor="message" className={labelClass}>Description *</label>
                <textarea
                  id="message"
                  {...register("message")}
                  placeholder="Outline the scope, requirements, or timeline objectives..."
                  rows={5}
                  className={`${premiumInputClass} resize-none overflow-y-auto pr-3`}
                />
                {errors.message && <p className={errorClass}>{errors.message.message}</p>}
              </motion.div>

              {/* Submit Action Container */}
              <motion.div variants={fadeUp} className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="w-full py-4 bg-[var(--dark-green)] text-[var(--background)] rounded-xl font-[family-name:var(--font-body)] text-xs tracking-[0.2em] uppercase font-bold transform transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-[var(--primary)] active:scale-[0.98] active:bg-[var(--primary)] shadow-sm"
                >
                  {loading ? "Sending Message ..." : "Send Message"}
                </button>
              </motion.div>
            </motion.form>

          </motion.div>
        </div>
      </section>
    </>
  );
}