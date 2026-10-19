"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectData } from "@/lib/projects/types";
import Reveal from "./shared/reveal";
import Divider from "../ui/divider";
import SectionLabel from "./shared/section-labels";

const MotionLink = motion(Link);

interface ProjectFooterSectionsProps {
  reflection: ProjectData["reflection"];
  nextProject: ProjectData | null;
}

// Standardized Container System
function Container({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={`w-full px-6 md:px-12 lg:px-20 bg-[var(--background)] ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </div>
  );
}

export default function ProjectFooterSections({
  reflection,
  nextProject,
}: ProjectFooterSectionsProps) {
  return (
    <>
      <Container className="bg-transparent">
        <Divider />
      </Container>

      {/* ── NARRATIVE REFLECTION BLOCK ── */}
      {reflection && (
        <Container id="reflection" className="py-16 md:py-24">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* LEFT RUNWAY */}
              <div className="col-span-1 lg:col-span-4 flex flex-col items-start lg:border-r lg:border-[var(--dark-green)]/15 lg:pr-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-[var(--primary)] font-semibold tracking-wider">
                    08.
                  </span>
                  <SectionLabel>Reflection</SectionLabel>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-normal uppercase tracking-tight text-[var(--dark-green)] leading-none mt-1">
                  Looking Back
                </h2>
              </div>

              {/* RIGHT RUNWAY */}
              <div className="col-span-1 lg:col-span-8 lg:pt-1">
                <div className="font-[family-name:var(--font-body)] text-base md:text-lg leading-relaxed text-[var(--light-gray)] font-light antialiased text-left m-0">
                  {reflection.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      )}

      {/* ── EDITORIAL WORK TOGETHER INSET ── */}
      <Container className="pb-16 md:pb-24">
        <Reveal>
          <div
            className="relative rounded-3xl overflow-hidden border border-[var(--dark-green)]/20 p-8 md:p-14 shadow-2xl w-full"
            style={{ backgroundColor: "var(--dark-green)" }}
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--primary)]/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex flex-col items-start text-left max-w-xl gap-3">
                <div className="flex items-center gap-2">

                  <span className="font-[family-name:var(--font-body)] text-xs text-[var(--beige)] font-semibold tracking-widest uppercase">
                    Let's Work Together
                  </span>
                </div>

                <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-normal uppercase tracking-tight text-[var(--background)] leading-tight m-0">
                  Got a project in <span style={{ color: "var(--beige)" }}>mind?</span>
                </h2>

                <p className="font-[family-name:var(--font-body)] text-sm md:text-base leading-relaxed text-[var(--background)]/70 font-light antialiased max-w-md m-0 mt-1">
                  I'm open to freelance work, software engineering, and design collaborations. Let's build something great together.
                </p>
              </div>

              <div className="flex items-center shrink-0 p-1">
                <motion.a
                  href="/#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[var(--background)] bg-[var(--background)] font-[family-name:var(--font-body)] text-xs font-bold uppercase tracking-widest text-[var(--dark-green)] transition-all duration-300 hover:bg-transparent hover:text-[var(--background)] shadow-xs"
                >
                  Contact Me
                </motion.a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* ── NEXT PROJECT STEPPING LINK ── */}
      {nextProject && (
        <Container className="pb-20 md:pb-32">
          <Reveal>
            <div className="relative border-t border-[var(--dark-green)]/15 pt-12 md:pt-16 w-full">
              {/* LARGE GHOST WATERMARK (sized to fit the section, clipped in its own layer) */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
                <h2 className="absolute bottom-0 right-0 font-[family-name:var(--font-display)] text-[18vw] md:text-[8rem] lg:text-[9rem] leading-none text-[var(--dark-green)]/[0.035] uppercase tracking-tighter m-0 font-bold">
                  Next
                </h2>
              </div>

              {/* CONTENT: stacked on mobile, side by side from md */}
              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
                {/* LEFT: Project Title & Label */}
                <div className="flex min-w-0 flex-col gap-3">
                  <span className="font-[family-name:var(--font-body)] text-xs font-bold tracking-widest text-[var(--primary)] uppercase">
                    Next Project
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl lg:text-6xl font-normal text-[var(--dark-green)] uppercase tracking-tight leading-none m-0 break-words">
                    {nextProject.title}
                  </h3>
                </div>

                {/* RIGHT: Action button */}
                <div className="shrink-0 py-2">
                  <MotionLink
                    href={`/view-project/${nextProject.slug}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="font-[family-name:var(--font-body)] text-xs font-bold uppercase tracking-widest flex w-full items-center justify-center gap-3 whitespace-nowrap text-[var(--dark-green)] border border-[var(--dark-green)]/20 px-7 py-3.5 rounded-full hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--beige)]/30 transition-all duration-300 group shadow-2xs md:w-auto"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[var(--primary)]" />
                  </MotionLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      )}
    </>
  );
}