"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ProjectData } from "@/lib/projects/types";
import { fadeUp, stagger } from "./shared/variants";
import { ArrowUpRight } from "lucide-react";

interface ProjectHeroProps {
  project: ProjectData;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  return (
    <div
      ref={ref}
      className="relative w-full bg-[var(--background)] pt-20 pb-28 md:pb-36 px-6 md:px-12 lg:px-16 selection:bg-[var(--primary)] selection:text-[var(--background)] flex flex-col justify-start overflow-hidden"
    >
      {/* ── BACKGROUND TYPOGRAPHY CANVAS (GHOST TEXT) ── */}
      <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none select-none overflow-hidden h-3/4">
        <span
          className="font-[family-name:var(--font-display)] uppercase text-[var(--beige)] tracking-[0.02em] opacity-[0.25] leading-none whitespace-nowrap pt-4"
          style={{ fontSize: "clamp(8rem, 22vw, 20rem)" }}
        >
          {project.title}
        </span>
      </div>

      {/* ── TOP LAYER BOUNDS CONTROL ── */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between border-b border-[var(--dark-green)]/10 pb-5 mb-16 md:mb-24 relative z-20">
        <button
          onClick={() => router.back()}
          className="font-[family-name:var(--font-body)] text-xs text-[var(--dark-green)]/70 hover:text-[var(--primary)] uppercase tracking-[0.2em] font-bold transition-colors duration-300 bg-transparent border-none outline-none p-0 cursor-pointer"
        >
          &larr; Go Back
        </button>
        <span className="font-mono text-[10px] text-[var(--dark-green)]/40 tracking-widest uppercase font-medium">
          Case Portfolio
        </span>
      </div>

      {/* ── MAIN ASYMMETRIC MANIFEST STREAM ── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start"
      >
        {/* LEFT RUNWAY: CRITICAL METADATA DISPLAY */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-start">
          <motion.span
            variants={fadeUp}
            className="text-[10px] font-[family-name:var(--font-body)] tracking-[0.4em] text-[var(--primary)] font-bold block mb-3 uppercase"
          >
            Project Details
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight uppercase text-[var(--dark-green)] leading-[0.95]"
          >
            About {project.title}
          </motion.h1>
        </div>

        {/* RIGHT RUNWAY: EDITORIAL LOGIC SYNOPSIS */}
        <div className="col-span-1 lg:col-span-5 flex flex-col items-start lg:pt-6 gap-8">
          <motion.p
            variants={fadeUp}
            className="font-[family-name:var(--font-body)] text-sm md:text-base leading-relaxed text-[var(--dark-green)] font-light antialiased"
          >
            {project.tagline}
          </motion.p>

          {project.liveUrl && (
            <motion.a
              variants={fadeUp}
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-[family-name:var(--font-body)] text-xs font-bold tracking-[0.2em] uppercase text-[var(--primary)] bg-transparent border border-[var(--primary)]/20 hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] transition-all duration-300 shadow-sm"
            >
              <span>View Published</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-80 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
            </motion.a>
          )}
        </div>
      </motion.div>

      {/* ── IMMUTABLE CURVED TIMED SVG CANVAS BASE ── */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
        style={{ height: "clamp(40px, 6vw, 72px)" }}
      >
        <svg
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,72 C360,0 1080,0 1440,72 L1440,72 L0,72 Z"
            fill="var(--background)"
          />
        </svg>
      </div>
    </div>
  );
}