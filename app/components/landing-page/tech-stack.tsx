"use client";

import React from "react";
import {
  SiTypescript, SiNextdotjs, SiFlutter, SiFirebase,
  SiTailwindcss, SiUnity, SiMiro, SiFigma, SiGit,
} from "react-icons/si";
import { motion } from "framer-motion";

const TECHS = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", bg: "#deeaf7", tag: "Language" },
  { name: "Flutter",    icon: SiFlutter,    color: "#54C5F8", bg: "#ddf2fb", tag: "Mobile"      },
  { name: "Next.js",    icon: SiNextdotjs,  color: "#111111", bg: "#e4e4e6", tag: "Web"      },
  { name: "Unity",      icon: SiUnity,       color: "#000000", bg: "#e4e4e6", tag: "Tool"   },
  { name: "Tailwind",   icon: SiTailwindcss,color: "#38BDF8", bg: "#ddf1fc", tag: "Web"      },
  { name: "Git",        icon: SiGit,        color: "#F05032", bg: "#fde8e4", tag: "Tool"     },
  { name: "Firebase",   icon: SiFirebase,   color: "#FFA611", bg: "#fef2dc", tag: "Backend"  },
  { name: "Figma",      icon: SiFigma,      color: "#F24E1E", bg: "#fde8e2", tag: "Design"   },
  { name: "Miro",       icon: SiMiro,       color: "#FFA611", bg: "#fef2dc", tag: "Design"   },
];


const PARTICLES = [
  { id: 1,  x: 2,  y: 22, size: 16, dur: 5.2, delay: 0,   color: "var(--accent)",  symbol: "✦" },
  { id: 2,  x: 94, y: 18, size: 20, dur: 6.8, delay: 1.2, color: "#71B5C2",        symbol: "✦" },
  { id: 3,  x: 5,  y: 65, size: 18, dur: 4.5, delay: 0.7, color: "var(--accent)",  symbol: "✦" },
  { id: 4,  x: 91, y: 70, size: 22, dur: 7.1, delay: 2.1, color: "#83E3B6",        symbol: "✦" },
  { id: 5,  x: 15, y: 38, size: 22, dur: 5.8, delay: 3.0, color: "var(--primary)", symbol: "★" },
  { id: 6,  x: 80, y: 32, size: 14, dur: 6.2, delay: 0.4, color: "#71B5C2",        symbol: "★" },
  { id: 7,  x: 50, y: 8,  size: 20, dur: 4.9, delay: 1.8, color: "var(--accent)",  symbol: "✦" },
  { id: 8,  x: 35, y: 78, size: 18, dur: 6.5, delay: 0.9, color: "#BBE0EF",        symbol: "◆" },
  { id: 9,  x: 68, y: 82, size: 22, dur: 5.3, delay: 2.5, color: "var(--accent)",  symbol: "◆" },
  { id: 10, x: 22, y: 14, size: 14, dur: 4.2, delay: 1.5, color: "#83E3B6",        symbol: "•" },
];

export default function TechStack() {
  return (
    <section
      id="tech-stack"
      className="relative w-full min-h-screen bg-(--background) flex items-center px-8 md:px-16 py-20 overflow-hidden"
    >
      {/* ── Gradient blobs ── */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full opacity-18 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #71B5C2 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-3xl"
        style={{ background: "radial-gradient(ellipse, #83E3B6 0%, transparent 70%)" }}
      />

      {/* ── Floating particles ── */}
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none absolute select-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.size,
            color: p.color,
            opacity: 0.9,         // ← was 0.55
          }}
          animate={{ y: [0, -14, 0], opacity: [0.75, 1, 0.75], rotate: [0, 15, -10, 0] }}
          transition={{           // ↑ was [0.45, 0.85, 0.45]
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {p.symbol}
        </motion.span>
      ))}

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10 lg:gap-16">

        {/* ── Left: text ── */}
        <div className="w-full md:w-64 lg:w-72 shrink-0 flex flex-col gap-4">
          <p
            className="text-[11px] font-(family-name:--font-super-warming) font-bold tracking-[.22em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            Skills &amp; Tools
          </p>

          <h2 className="font-(family-name:--font-super-warming) font-black uppercase text-5xl md:text-6xl tracking-tighter leading-none">
            <span className="block" style={{ color: "var(--primary)" }}>My Tech</span>
            <span className="text-(--accent)" style={{ textShadow: "0 4px 30px color-mix(in srgb, var(--accent) 30%, transparent)" }}>Ecosystem.</span>
          </h2>

          <p
            className="font-(family-name:--font-urbanist) text-sm leading-relaxed"
            style={{ color: "color-mix(in srgb, var(--text) 60%, transparent)" }}
          >
            The tools and frameworks I rely on to craft modern digital experiences — web, mobile, and everything in between.
          </p>

          <span
            className="font-(family-name:--font-urbanist) self-start text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-full border mt-1"
            style={{
              color: "var(--accent)",
              background: "color-mix(in srgb, var(--accent) 10%, transparent)",
              borderColor: "color-mix(in srgb, var(--accent) 22%, transparent)",
            }}
          >
            9 Technologies
          </span>
        </div>

        {/* ── Divider ── */}
        <div
          className="hidden md:block self-stretch w-px flex-none"
          style={{ background: "color-mix(in srgb, var(--primary) 10%, transparent)" }}
        />

        {/* ── Right: grid ── */}
        <div className="flex-1 w-full min-w-0 grid grid-cols-3 gap-3 md:gap-4">
          {TECHS.map((tech, i) => (
            <motion.div
              key={tech.name}
              className="flex flex-col items-center gap-2 rounded-2xl py-8 px-3 cursor-default"
              style={{
                background: tech.bg,
                border: `1px solid ${tech.color}18`,
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -3, boxShadow: "0 8px 24px color-mix(in srgb, var(--primary) 10%, transparent)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <tech.icon size={36} color={tech.color} />
              <span
                className="font-(family-name:--font-super-warming) text-[10px] font-bold tracking-widest uppercase text-center"
                style={{ color: "color-mix(in srgb, var(--primary) 55%, transparent)" }}
              >
                {tech.name}
              </span>


            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}