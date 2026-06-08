"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

// ── Animation variants ────────────────────────────────────────────────────────
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
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const staggerChildren: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

const fieldFade: Variants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="flex items-center justify-center min-h-screen w-full p-6 bg-(--background)"
    >
      {/* Outer card — rises up on enter */}
      <motion.div
        variants={cardReveal}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative w-full max-w-5xl p-10 md:p-16 overflow-hidden rounded-[2.5rem] shadow-2xl border-4 border-(--accent)"
        style={{ background: "linear-gradient(180deg, #161E54 0%, #00083F 100%)" }}
      >
        {/* ── Gradient blobs ────────────────────────────────────────── */}

        {/* Center blob */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.5 }}
          className="absolute z-0 pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "55%",
            height: "60%",
            background: "radial-gradient(ellipse at center, rgba(96,238,231,0.18) 0%, rgba(255,147,99,0.12) 45%, transparent 75%)",
            filter: "blur(48px)",
            borderRadius: "50%",
          }}
        />

        {/* Bottom-edge blob */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
          className="absolute z-0 pointer-events-none"
          style={{
            bottom: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
            height: "45%",
            background: "radial-gradient(ellipse at center, rgba(255,147,99,0.22) 0%, rgba(96,238,231,0.10) 50%, transparent 75%)",
            filter: "blur(56px)",
            borderRadius: "50%",
          }}
        />


        {/* ── Content grid ── */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full">

          {/* Left column — heading + description */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col"
          >
            <motion.h2
              variants={fadeUp}
              className="font-(family-name:--font-super-warming) text-5xl md:text-7xl mb-6 text-white tracking-wide"
            >
              Let&apos;s work <br />
              <span
                className="text-transparent bg-clip-text inline-block"
                style={{ backgroundImage: "linear-gradient(90deg, #FF9363 0%, #FF9363 30%, #60EEE7 46%, #BBE0EF 83%)" }}
              >
                together!
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-(family-name:--font-urbanist) text-base md:text-lg text-white/90 max-w-sm leading-relaxed"
            >
              Have a question? Feedback? A fun idea? Please, please, please send it my way :&gt;
            </motion.p>
          </motion.div>

          {/* Right column — form fields stagger in */}
          <motion.form
            variants={staggerChildren}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-5 font-(family-name:--font-urbanist)"
          >
            <motion.div variants={fieldFade} className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-white text-xs md:text-sm pl-1 opacity-90">First Name</label>
                <input placeholder="First name" type="text" className="w-full p-3.5 rounded-2xl bg-[#D6E6ED] focus:outline-none text-[#171023]" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white text-xs md:text-sm pl-1 opacity-90">Last Name</label>
                <input placeholder="Last name" type="text" className="w-full p-3.5 rounded-2xl bg-[#D6E6ED] focus:outline-none text-[#171023]" />
              </div>
            </motion.div>

            <motion.div variants={fieldFade} className="flex flex-col gap-2">
              <label className="text-white text-xs md:text-sm pl-1 opacity-90">Email (Required)</label>
              <input placeholder="you@example.com" type="email" className="w-full p-3.5 rounded-2xl bg-[#D6E6ED] focus:outline-none text-[#171023]" />
            </motion.div>

            <motion.div variants={fieldFade} className="flex flex-col gap-2">
              <label className="text-white text-xs md:text-sm pl-1 opacity-90">Description (Required)</label>
              <textarea placeholder="Tell me about your project or question..." rows={5} className="w-full p-3.5 rounded-2xl bg-[#D6E6ED] focus:outline-none text-[#171023] resize-none" />
            </motion.div>

            <motion.button
              variants={fieldFade}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 text-white rounded-full font-bold shadow-md font-(family-name:--font-super-warming) text-lg tracking-wide mt-2"
              style={{ background: "linear-gradient(90deg, #FF9363 0%, #F54C00 100%)" }}
            >
              Submit Message
            </motion.button>
          </motion.form>

        </div>
      </motion.div>
    </section>
  );
}