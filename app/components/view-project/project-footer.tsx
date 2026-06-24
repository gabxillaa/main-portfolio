"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ProjectData } from "@/lib/projects/types";
import Reveal from "./shared/reveal";
import Divider from "../ui/divider";
import SectionLabel from "./shared/section-labels";

// Create a motion-enabled Next.js Link component
const MotionLink = motion(Link);

interface ProjectFooterSectionsProps {
  reflection: ProjectData["reflection"];
  nextProject: ProjectData | null;
}

export default function ProjectFooterSections({ reflection, nextProject }: ProjectFooterSectionsProps) {
  return (
    <>
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        <Divider />
      </div>

      {/* ── NARRATIVE REFLECTION BLOCK ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-16 bg-[var(--background)]">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* LEFT RUNWAY */}
            <div className="col-span-1 lg:col-span-4 flex flex-col items-start lg:border-r lg:border-[var(--dark-green)]/10 lg:pr-6">
              <SectionLabel>Reflection</SectionLabel>
              <h2
                className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal tracking-tight uppercase mt-2 lg:mt-3 leading-none"
                style={{ color: "var(--primary)" }}
              >
                Looking Back
              </h2>
            </div>

            {/* RIGHT RUNWAY */}
            <div className="col-span-1 lg:col-span-8 font-[family-name:var(--font-body)] text-sm md:text-base leading-relaxed pt-1 text-[var(--dark-green)]/90 font-light antialiased text-left m-0">
              {reflection.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>

          </div>
        </Reveal>
      </div>

      {/* ── EDITORIAL WORK TOGETHER INSET ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 mb-16 bg-[var(--background)]">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-2xl p-8 md:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-10 border border-[var(--dark-green)]"
            style={{ backgroundColor: "var(--dark-green)" }}
          >
            <div className="relative z-10 flex flex-col items-start text-left max-w-xl">
              <span className="text-[var(--beige)]/60 border-[var(--beige)]/20 inline-block text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
                Let's Work Together
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal uppercase tracking-tight text-[var(--background)] mb-4">
                Got a project in <span style={{ color: "var(--beige)" }}>mind?</span>
              </h2>
              <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--background)]/70 font-light antialiased max-w-md m-0">
                I'm open to freelance work and collaborations. Let's build something great together.
              </p>
            </div>

            <div className="relative z-10 flex items-center shrink-0">
              <motion.a
                href="/#contact-me"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl border border-[var(--background)] bg-[var(--background)] font-[family-name:var(--font-body)] text-xs font-bold uppercase tracking-widest text-[var(--dark-green)] transition-all duration-300 hover:bg-transparent hover:text-[var(--background)]"
              >
                Contact Me
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── PROJECT STEPPING LINK ── */}
      {nextProject && (
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-12 bg-[var(--background)]">
          <Reveal>
            <div
              className="flex items-center justify-between gap-6 pt-12"
              style={{ borderTop: "1px solid var(--dark-green)1A" }}
            >
              <div className="flex flex-col items-start">
                <span className="font-[family-name:var(--font-body)] text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--dark-green)]/40 mb-2">
                  Next Project
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal text-[var(--primary)] uppercase tracking-wide m-0">
                  {nextProject.title}
                </h3>
              </div>

              <MotionLink
                href={`/view-project/${nextProject.slug}`}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="font-[family-name:var(--font-body)] text-xs font-bold uppercase tracking-widest flex items-center gap-2 shrink-0 text-[var(--primary)] group"
              >
                View
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </MotionLink>
            </div>
          </Reveal>
        </div>
      )}
    </>
  );
}