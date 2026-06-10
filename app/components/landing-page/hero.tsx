"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const Firefly = ({ id, show }: { id: number; show: boolean }) => {
  const size = Math.random() * 5 + 3;
  const initialLeft = `${Math.random() * 100}%`;
  const initialTop = `${Math.random() * 100}%`;

  const durationY = Math.random() * 6 + 6;
  const delay = Math.random() * -10;
  const entranceDelay = (Math.random() * 1.5) + 0.8; // staggered entrance

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={show ? {
        opacity: [0, 0.15, 0.7, 0.3, 0.8, 0.15],
        scale: [0, 1, 1.2, 0.9, 1.1, 1],
        y: [0, -15, 20, -15],
        x: [0, -20, 15, -20],
      } : { opacity: 0, scale: 0 }}
      transition={{
        duration: durationY,
        repeat: Infinity,
        delay: entranceDelay,
        ease: "easeInOut",
      }}
      className="absolute rounded-full bg-[#E8C86B] pointer-events-none z-15"
      style={{
        width: size,
        height: size,
        left: initialLeft,
        top: initialTop,
        boxShadow: "0 0 10px #E8C86B, 0 0 20px rgba(232, 200, 107, 0.4)",
        filter: "blur(0.5px)",
      }}
    />
  );
};

// Reusable fade+slide up variant
const fadeUp = (delay = 0, duration = 0.9): Variants => ({
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
});

const fadeIn = (delay = 0, duration = 1.2): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration, delay, ease: "easeOut" as const },
  },
});

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const fireflyCount = 45;

  useEffect(() => {
    setMounted(true);
    // Slight delay so layout is ready before animations fire
    const t = setTimeout(() => setEntered(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full h-screen bg-(--primary) overflow-hidden flex flex-col justify-start items-center scroll-mt-24 md:scroll-mt-28"
    >
      {/* Stylesheet: glowing crawl text + curtain wipe */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes textGlowCrawl {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .glowing-crawl-text {
          background: linear-gradient(
            120deg,
            #ffffff 25%,
            var(--accent, #E8C86B) 40%,
            #ffffff 50%,
            var(--accent, #E8C86B) 65%,
            #ffffff 80%
          );
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textGlowCrawl 7s linear infinite;
        }

        /* Curtain reveal: a pseudo-overlay that slides up to expose content */
        @keyframes curtainLift {
          0%   { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        .curtain-lift {
          animation: curtainLift 1.1s cubic-bezier(0.76, 0, 0.24, 1) 0.1s forwards;
        }
      `}} />

      {/* ── ENTRANCE CURTAIN ───────────────────────────────────────── */}
      {/* A dark layer that lifts away like a theatre curtain */}
      <div
        className="curtain-lift absolute inset-0 z-50 pointer-events-none"
        style={{ background: "var(--primary, #0d0d0d)" }}
      />

      {/* 1. Ambient Structural Grid Lines */}
      <div className="absolute inset-0 flex justify-between pointer-events-none px-8 md:px-16 z-0 opacity-15">
        <div className="w-px h-full bg-white/40" />
        <div className="w-px h-full bg-white/20 hidden md:block" />
        <div className="w-px h-full bg-white/20 hidden md:block" />
        <div className="w-px h-full bg-white/40" />
      </div>

      {/* ── 2. Cat Silhouettes (slide up from bottom) ──────────────── */}
      {mounted && (
        <motion.div
          variants={fadeUp(1.0, 1.0)}
          initial="hidden"
          animate={entered ? "visible" : "hidden"}
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-20 px-8 md:px-16 flex justify-between items-end overflow-visible"
        >
          {/* Cat 1 – Sitting, tail wag */}
          <div className="relative w-0 flex justify-center items-end">
            <div className="absolute bottom-0 w-8 h-10 flex items-end overflow-visible select-none opacity-60" style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.25))" }}>
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white absolute inset-0">
                <path d="M30,85 C30,55 45,40 55,40 C65,40 70,55 70,85 Z" />
                <path d="M42,43 C42,30 68,30 68,43 C68,52 42,52 42,43" />
                <polygon points="45,34 43,18 53,28" />
                <polygon points="65,34 67,18 57,28" />
              </svg>
              <motion.div
                animate={{ rotate: [0, 15, -10, 18, -5, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ originX: "65%", originY: "80%" }}
                className="absolute inset-0 w-full h-full"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-white stroke-6 stroke-linecap-round">
                  <path d="M65,80 Q85,75 80,50" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Cat 2 – Sleeping, breathing */}
          <div className="relative w-0 hidden md:flex justify-center items-end">
            <motion.div
              animate={{ scaleY: [1, 1.08, 1], y: [0, -1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 w-10 h-7 flex items-end overflow-visible select-none opacity-55"
              style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.2))", originX: "left", originY: "bottom" }}
            >
              <svg viewBox="0 0 100 70" className="w-full h-full fill-white">
                <path d="M10,60 Q20,30 50,30 Q80,30 90,50 Q95,60 85,65 Q70,70 50,70 Q20,70 10,60" />
                <path d="M75,45 C80,35 90,35 92,45 C95,50 90,58 82,56" />
                <polygon points="78,38 84,25 86,37" />
              </svg>
            </motion.div>
          </div>

          {/* Cat 3 – Upright, tail sway */}
          <div className="relative w-0 hidden md:flex justify-center items-end">
            <div className="absolute bottom-0 w-8 h-10 flex items-end overflow-visible select-none opacity-55" style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.2))" }}>
              <svg viewBox="0 0 100 100" className="w-full h-full fill-white absolute inset-0">
                <path d="M25,90 C20,60 35,45 42,25 C45,15 60,15 60,25 C60,45 50,60 52,90 Z" />
                <polygon points="44,20 40,4 49,12" />
                <polygon points="56,20 60,4 51,12" />
              </svg>
              <motion.div
                animate={{ rotate: [0, -8, 10, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                style={{ originX: "52%", originY: "85%" }}
                className="absolute inset-0 w-full h-full"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-white stroke-5 stroke-linecap-round">
                  <path d="M52,85 Q75,90 70,70" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Cat 4 – Loaf, head tilt */}
          <div className="relative w-0 flex justify-center items-end">
            <div className="absolute bottom-0 w-10 h-7 flex items-end overflow-visible select-none opacity-60" style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.25))" }}>
              <svg viewBox="0 0 100 70" className="w-full h-full fill-white absolute inset-0">
                <path d="M15,65 Q10,40 35,35 Q65,30 85,45 Q90,55 80,65 Q65,70 35,70 Z" />
              </svg>
              <motion.div
                animate={{ y: [0, 0.6, 0], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ originX: "35%", originY: "42%" }}
                className="absolute inset-0 w-full h-full"
              >
                <svg viewBox="0 0 100 70" className="w-full h-full fill-white">
                  <path d="M25,45 C20,32 38,25 42,38" />
                  <polygon points="22,28 16,14 26,20" />
                  <polygon points="34,28 38,14 30,22" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── SVG Overlay ─────────────────────────────────────────────── */}
      <motion.div
        variants={fadeIn(0.5, 1.6)}
        initial="hidden"
        animate={entered ? "visible" : "hidden"}
        className="absolute inset-0 pointer-events-none mix-blend-normal z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/assets/hero-overlay.svg')` }}
      />

      {/* ── Fireflies (stagger in) ───────────────────────────────────── */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none z-15 overflow-hidden w-full h-full">
          {Array.from({ length: fireflyCount }).map((_, idx) => (
            <Firefly key={idx} id={idx} show={entered} />
          ))}
        </div>
      )}

      {/* ── Central Brand Typography Block ──────────────────────────── */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-center text-center select-none">
        <div className="flex flex-col items-start translate-y-0 sm:-translate-y-4">

          {/* Container to enforce alignment against the 12rem headline */}
          <div className="flex flex-col items-start w-full max-w-[80vw]">

            {/* Eyebrow: Increased weight for visibility against the 12rem H1 */}
            <motion.span
              variants={fadeUp(0.55, 0.8)}
              initial="hidden"
              animate={entered ? "visible" : "hidden"}
              className="font-(family-name:--font-urbanist) text-white/70 text-base tracking-[0.2em] font-semibold uppercase mb-4"
            >
              Where Ideas Come To
            </motion.span>

            {/* Main Headline: Maintaining your scale */}
            <motion.h1
              className="glowing-crawl-text font-(family-name:--font-super-warming) text-5xl sm:text-7xl md:text-8xl lg:text-[12rem] leading-[0.9] tracking-[-0.02em] drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]"
              initial={{ opacity: 0, y: 60, skewY: 2 }}
              animate={entered ? {
                opacity: 1,
                y: 0,
                skewY: 0,
                transition: { duration: 1.1, delay: 0.75, ease: [0.16, 1, 0.3, 1] },
              } : { opacity: 0, y: 60, skewY: 2 }}
            >
              GLOW UP
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
}