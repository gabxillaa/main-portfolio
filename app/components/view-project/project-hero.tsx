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
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #161e54 0%, #131b52 38%, #10184f 76%)",
        // Content-driven height — no minHeight hardcode.
        // pb accounts for the curved SVG overlap (72px) + breathing room.
        paddingBottom: "clamp(5rem, 10vw, 7rem)",
      }}
    >
      {/* Centre ambient blob */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          style={{
            width: "55%",
            height: "65%",
            background:
              "radial-gradient(ellipse at center, rgba(40,153,218,0.30) 0%, transparent 70%)",
            filter: "blur(52px)",
          }}
        />
      </div>

      {/* Ghost title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-(family-name:--font-super-warming) uppercase text-white"
          style={{
            fontSize: "clamp(5rem, 18vw, 16rem)",
            opacity: 0.02,
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
            lineHeight: 1,
          }}
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
        style={{
          background: "rgba(255,255,255,0.10)",
          color: "rgba(255,255,255,0.8)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        ← Go Back
      </motion.button>

      {/* Hero text */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="relative z-10 flex flex-col max-w-screen-lg mx-auto w-full px-8 md:px-16"
        style={{
          // Top padding: enough clearance for the Go Back button + visual breathing room.
          // Shrinks on mobile so content isn't pushed far down.
          paddingTop: "clamp(4rem, 8vw, 6rem)",
          // Bottom gap before the SVG curve eats into space.
          paddingBottom: "clamp(1.5rem, 3vw, 2.5rem)",
        }}
      >
        <motion.h1
          variants={fadeUp}
          className="font-(family-name:--font-super-warming) title leading-tight mb-3"
          style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", color: "white" }}
        >
          About{" "}
          <span
            style={{
              backgroundImage:
                "linear-gradient(90deg, #FF9363 0%, #FF9363 30%, #60EEE7 46%, #BBE0EF 83%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
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
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start inline-flex items-center gap-2 px-10 py-3 rounded-full font-(family-name:--font-super-warming) text-base text-white group shadow-lg shadow-[#F54C00]/10 hover:shadow-[#F54C00]/20 transition-shadow duration-300"
            style={{ background: "linear-gradient(90deg, #FF9363 0%, #F54C00 100%)" }}
          >
            <span>View Published</span>
            <ArrowUpRight className="w-5 h-5 shrink-0 opacity-90 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        )}
      </motion.div>

      {/* Curved SVG bottom edge — height scales with viewport width */}
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