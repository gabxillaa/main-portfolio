"use client";

import React from "react";
import { motion } from "framer-motion";

const PARTICLES = [
  { id: 1,  x: 5,  y: 15, size: 16, dur: 5.2, delay: 0,   color: "var(--accent)",  symbol: "✦" },
  { id: 2,  x: 92, y: 20, size: 20, dur: 6.8, delay: 1.2, color: "#71B5C2",        symbol: "✦" },
  { id: 3,  x: 8,  y: 70, size: 18, dur: 4.5, delay: 0.7, color: "var(--accent)",  symbol: "★" },
  { id: 4,  x: 88, y: 72, size: 22, dur: 7.1, delay: 2.1, color: "#83E3B6",        symbol: "✦" },
  { id: 5,  x: 45, y: 6,  size: 14, dur: 5.8, delay: 3.0, color: "var(--primary)", symbol: "◆" },
  { id: 6,  x: 78, y: 48, size: 20, dur: 6.2, delay: 0.4, color: "#71B5C2",        symbol: "★" },
  { id: 7,  x: 3,  y: 42, size: 14, dur: 4.9, delay: 1.8, color: "#BBE0EF",        symbol: "◆" },
  { id: 8,  x: 60, y: 88, size: 18, dur: 6.5, delay: 0.9, color: "var(--accent)",  symbol: "✦" },
  { id: 9,  x: 25, y: 82, size: 16, dur: 5.3, delay: 2.5, color: "#83E3B6",        symbol: "★" },
  { id: 10, x: 93, y: 55, size: 12, dur: 4.2, delay: 1.5, color: "var(--accent)",  symbol: "•" },
];

export default function AboutMe() {
  return (
    <section
      id="about-me"
      className="relative w-full min-h-svh py-16 md:py-20 lg:py-24 flex items-center justify-center overflow-hidden bg-(--background)"
    >
      {/* ── Gradient blobs ── */}
      <div
        className="pointer-events-none absolute top-[-80px] right-[-80px] w-[420px] h-[420px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-[-60px] left-[-60px] w-[380px] h-[380px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #71B5C2 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-[30%] -translate-y-1/2 w-[500px] h-[260px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(ellipse, #83E3B6 0%, transparent 70%)" }}
      />

      {/* ── Floating particles ── */}
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none absolute select-none z-0"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            color: p.color,
            opacity: 0.9,
          }}
          animate={{ y: [0, -14, 0], opacity: [0.75, 1, 0.75], rotate: [0, 15, -10, 0] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.symbol}
        </motion.span>
      ))}

      {/* ── Main content ── */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 z-10 flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">

        {/* Left: Profile Image */}
        <div className="relative shrink-0 select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 flex items-end justify-center"
          >
            {/* Soft glow behind image */}
            <div
              className="absolute bottom-0 inset-x-0 h-[78%] rounded-[50px] sm:rounded-[64px] shadow-2xl z-0"
              style={{
                background: "var(--accent)",
                boxShadow: "0 20px 60px color-mix(in srgb, var(--accent) 40%, transparent)",
              }}
            />
            {/* Decorative ring */}
            <div
              className="absolute -inset-3 rounded-[60px] sm:rounded-[72px] border-2 border-dashed opacity-30 z-0"
              style={{ borderColor: "var(--accent)" }}
            />
            <img
              src="/assets/me.png"
              alt="Faith"
              className="relative w-[85%] h-auto object-contain scale-105 origin-bottom z-10 pb-0"
            />
          </motion.div>
        </div>

        {/* Right: Editorial Block */}
        <div className="flex flex-col max-w-xl text-(--primary)">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="font-(family-name:--font-super-warming) text-xs font-black uppercase tracking-[0.3em] text-(--accent) block mb-3">
              Get To Know Me
            </span>
            <h2 className="font-(family-name:--font-super-warming) text-5xl sm:text-6xl md:text-7xl font-black tracking-wide uppercase leading-[0.85] text-(--primary)">
              Creative <br />
              <span
                className="text-(--accent)"
                style={{ textShadow: "0 4px 30px color-mix(in srgb, var(--accent) 30%, transparent)" }}
              >
                Developer
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-(family-name:--font-urbanist) text-base sm:text-lg leading-relaxed"
            style={{ color: "color-mix(in srgb, var(--text) 60%, transparent)" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t-2 border-(--primary) pt-8"
          >
            <div>
              <h4 className="font-(family-name:--font-urbanist) text-lg font-black uppercase tracking-wide text-(--primary)">
                BS in Computer Science
              </h4>
              <p className="font-(family-name:--font-urbanist) text-sm font-bold text-(--accent) tracking-wide mt-1">
                Application Development Elective Track
              </p>
              <p className="font-(family-name:--font-urbanist) text-xs font-semibold text-gray-400 mt-0.5">
                University of Makati
              </p>
            </div>

            <div className="font-(family-name:--font-super-warming) text-right hidden sm:block select-none">
              <span className="text-gray-300 font-normal text-xs block tracking-widest uppercase mb-1">Timeline</span>
              <span className="text-xl font-black tracking-tight bg-(--primary) text-white py-1 px-3 rounded-xl shadow-md">
                2022 – 2026
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}