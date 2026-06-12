"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ProjectData } from "@/lib/projects/types";
import { fadeUp, stagger } from "./shared/variants";

interface ProjectHeroProps {
  project: ProjectData;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const router  = useRouter();
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: false });

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #161e54 0%, #131b52 38%, #10184f 76%)",
        paddingBottom: "5rem",
        minHeight: "450px",
      }}
    >
      {/* Centre ambient blob */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{
          width: "55%", height: "65%",
          background: "radial-gradient(ellipse at center, rgba(40,153,218,0.30) 0%, transparent 70%)",
          filter: "blur(52px)",
        }} />
      </div>

      {/* Ghost title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-(family-name:--font-super-warming) uppercase text-white"
          style={{ fontSize: "clamp(5rem, 18vw, 16rem)", opacity: 0.02, letterSpacing: "0.02em", whiteSpace: "nowrap", lineHeight: 1 }}
        >
          {project.title}
        </span>
      </div>

      {/* Go Back */}
      <motion.button
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        onClick={() => router.back()}
        className="absolute top-5 left-8 z-20 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
        style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.18)" }}
      >
        ← Go Back
      </motion.button>

      {/* Hero text */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 px-8 md:px-16 pt-20 pb-4 max-w-screen-lg mx-auto"
      >
        <motion.h1
          variants={fadeUp}
          className="font-(family-name:--font-super-warming) title leading-tight"
          style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", color: "white" }}
        >
          About{" "}
          <span style={{
            backgroundImage: "linear-gradient(90deg, #FF9363 0%, #FF9363 30%, #60EEE7 46%, #BBE0EF 83%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            {project.title}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="font-(family-name:--font-urbanist) text-sm md:text-lg leading-relaxed mb-6"
          style={{ color: "rgba(255,255,255)", maxWidth: "650px" }}
        >
          {project.tagline}
        </motion.p>

        {project.liveUrl && (
          <motion.a
            variants={fadeUp}
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-3 rounded-full font-(family-name:--font-super-warming) font-bold text-base text-white transition-opacity hover:opacity-85 tracking-widest"
            style={{ background: "linear-gradient(90deg, #FF9363 0%, #F54C00 100%)" }}
          >
            View Live
          </motion.a>
        )}
      </motion.div>

      {/* Curved SVG bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: "72px" }}>
        <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,72 C360,0 1080,0 1440,72 L1440,72 L0,72 Z" fill="var(--background)" />
        </svg>
      </div>
    </div>
  );
}