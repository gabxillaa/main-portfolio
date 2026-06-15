"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactFormData } from "@/lib/contact-schema";
import CaptchaModal from "./modals/captcha-modal";
import LoadingOverlay from "@/app/components/ui/loading-overlay";
import { toast } from "sonner";

// ── Animation variants (unchanged) ───────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};
const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.0, ease: "easeOut" as const } },
};
const cardReveal: Variants = {
  hidden:  { opacity: 0, y: 60, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};
const staggerChildren: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};
const fieldFade: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const inputClass = "w-full p-3.5 rounded-2xl bg-[#D6E6ED] focus:outline-none text-[#171023] placeholder:text-[#171023]/50 overflow-hiddenw-full p-3.5 rounded-2xl bg-[#D6E6ED] focus:outline-none text-[#171023] placeholder:text-[#171023]/50 overflow-hidden";
const errorClass = "text-red-300 text-xs mt-1 pl-1";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const [loading, setLoading] = useState(false);
  const [isCaptchaOpen, setIsCaptchaOpen]   = useState(false);
  const [captchaToken,  setCaptchaToken]     = useState<string | null>(null);
  const [submitStatus,  setSubmitStatus]     = useState<"idle" | "success" | "error" | "ratelimit">("idle");

  // Holds validated form data between the two submit phases
  const pendingData = useRef<ContactFormData | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // ── Phase 2: actual API call, fired after captcha verified ────────────────
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
    pendingData.current = null;
  } catch {
    toast.error("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
}, [reset]);

  // ── Phase 1: Zod validates → open modal ──────────────────────────────────
  const onSubmit = useCallback((data: ContactFormData) => {
    pendingData.current = data;

    // If captcha already solved (e.g. user re-submits), skip modal
    if (captchaToken) {
      sendMessage(data, captchaToken);
      return;
    }

    setIsCaptchaOpen(true);
  }, [captchaToken, sendMessage]);

  // ── Called by modal once user passes captcha ──────────────────────────────
  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    if (pendingData.current) {
      sendMessage(pendingData.current, token);
    }
  }, [sendMessage]);

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
        className="flex items-center justify-center min-h-screen w-full p-6 bg-(--background)"
      >
        <motion.div
          variants={cardReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative w-full max-w-5xl p-11 overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-(--accent)"
          style={{ background: "linear-gradient(180deg, #161E54 0%, #00083F 100%)" }}
        >
          <LoadingOverlay open={loading} message="Sending your message..." />

          <motion.div
            variants={fadeIn} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.5 }}
            className="absolute z-0 pointer-events-none"
            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "55%", height: "60%", background: "radial-gradient(ellipse at center, rgba(96,238,231,0.18) 0%, rgba(255,147,99,0.12) 45%, transparent 75%)", filter: "blur(48px)", borderRadius: "50%" }}
          />
          <motion.div
            variants={fadeIn} initial="hidden" animate={isInView ? "visible" : "hidden"} transition={{ delay: 0.6 }}
            className="absolute z-0 pointer-events-none"
            style={{ bottom: "-10%", left: "50%", transform: "translateX(-50%)", width: "80%", height: "45%", background: "radial-gradient(ellipse at center, rgba(255,147,99,0.22) 0%, rgba(96,238,231,0.10) 50%, transparent 75%)", filter: "blur(56px)", borderRadius: "50%" }}
          />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full">


            <motion.div variants={staggerChildren} initial="hidden" animate={isInView ? "visible" : "hidden"} className="flex flex-col">
              <motion.h2 variants={fadeUp} className="font-(family-name:--font-super-warming) text-5xl md:text-7xl mb-6 text-white tracking-wide">
                Let&apos;s work <br />
                <span className="text-transparent bg-clip-text inline-block" style={{ backgroundImage: "linear-gradient(90deg, #FF9363 0%, #FF9363 30%, #60EEE7 46%, #BBE0EF 83%)" }}>
                  together!
                </span>
              </motion.h2>
              <motion.p variants={fadeUp} className="font-(family-name:--font-urbanist) text-base md:text-lg text-white/90 max-w-sm leading-relaxed">
                Have a question? A project? A fun idea? Please, please, please send it my way :&gt;
              </motion.p>
            </motion.div>

            <motion.form
              variants={staggerChildren}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 font-(family-name:--font-urbanist)"
            >
              <motion.div variants={fieldFade} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-white text-xs md:text-sm pl-1 opacity-90">First Name</label>
                  <input {...register("firstName")} placeholder="First name" type="text" className={inputClass} />
                  {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white text-xs md:text-sm pl-1 opacity-90">Last Name</label>
                  <input {...register("lastName")} placeholder="Last name" type="text" className={inputClass} />
                  {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                </div>
              </motion.div>

              <motion.div variants={fieldFade} className="flex flex-col gap-2">
                <label className="text-white text-xs md:text-sm pl-1 opacity-90">Email (Required)</label>
                <input {...register("email")} placeholder="you@example.com" type="email" className={inputClass} />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </motion.div>

              <motion.div variants={fieldFade} className="flex flex-col gap-2">
                <label className="text-white text-xs md:text-sm pl-1 opacity-90">Description (Required)</label>
                <textarea {...register("message")} placeholder="Tell me about your project or question..." rows={5} className={`${inputClass} resize-none overflow-y-auto pr-3 rounded-2xl`} style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "rgba(23,16,35,0.25) transparent",
                }}/>
                {errors.message && <p className={errorClass}>{errors.message.message}</p>}
              </motion.div>



              <motion.button
                variants={fieldFade}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full py-2 text-white rounded-full shadow-md font-(family-name:--font-super-warming) text-lg tracking-wider mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
                style={{ background: "linear-gradient(90deg, #FF9363 0%, #F54C00 100%)" }}
              >
                {loading ? "Sending..." : "Submit Message"}
              </motion.button>
            </motion.form>

          </div>
        </motion.div>
      </section>
    </>
  );
}