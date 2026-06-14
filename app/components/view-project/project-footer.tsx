"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ProjectData } from "@/lib/projects/types";
import Reveal from "./shared/reveal";
import Divider from "../ui/divider";
import SectionLabel from "./shared/section-labels";


interface ProjectFooterSectionsProps {
  reflection: ProjectData["reflection"];
  nextProject: ProjectData | null;
}

export default function ProjectFooterSections({ reflection, nextProject }: ProjectFooterSectionsProps) {
  return (
    <>
      <div className="max-w-screen-lg mx-auto px-8 md:px-16">
        <Divider />
      </div>

      {/* Reflection */}
      <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-14">
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5 lg:gap-12 items-start">
            <div className="shrink-0">
              <SectionLabel>Reflection</SectionLabel>
              <h2 className="font-(family-name:--font-super-warming) text-xl md:text-2xl leading-snug" style={{ color: "var(--primary)" }}>
                Looking Back
              </h2>
            </div>
            <div className="font-(family-name:--font-urbanist) text-sm md:text-base leading-relaxed pt-1 text-[var(--text)] text-justify">
            {reflection.split("\n\n").map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          </div>
        </Reveal>
      </div>

      {/* CTA strip */}
      <Reveal>
        <div className="max-w-screen-lg mx-auto px-8 md:px-16 mb-14">
          <div
            className="relative overflow-hidden rounded-3xl px-10 md:px-16 py-14 flex flex-col md:flex-row items-center justify-center lg:justify-between gap-8"
            style={{ background: "radial-gradient(ellipse at 60% 50%, #161e54 0%, #131b52 45%, #10184f 100%)", border: "3px solid var(--accent)" }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(40,153,218,0.2) 0%, transparent 65%)", filter: "blur(40px)" }} />
            <div className="absolute top-0 right-0 w-64 h-40 pointer-events-none" style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(255,147,99,0.15) 0%, transparent 70%)", filter: "blur(32px)" }} />

            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left max-w-lg">
              <p className="font-(family-name:--font-super-warming) text-xs tracking-[0.22em] uppercase mb-2" style={{ color: "var(--accent)" }}>
                Let's Work Together
              </p>
              <h2 className="font-(family-name:--font-super-warming) text-2xl md:text-3xl leading-snug" style={{ color: "white" }}>
                Got a project in mind?
              </h2>
              <p className="font-(family-name:--font-urbanist) text-sm mt-2 max-w-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                I'm open to freelance work and collaborations. Let's build something great together.
              </p>
            </div>

            <motion.a
              href="/#contact-me"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="relative z-10 shrink-0 inline-flex items-center gap-2 px-10 py-3.5 rounded-full font-(family-name:--font-super-warming) font-bold text-base text-white tracking-widest transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(90deg, #FF9363 0%, #F54C00 100%)" }}
            >
              Hire Me →
            </motion.a>
          </div>
        </div>
      </Reveal>

      {/* Next project teaser */}
      {nextProject && (
        <Reveal>
          <div
            className="max-w-screen-lg mx-auto px-8 md:px-16 py-16 flex items-center justify-between gap-6"
            style={{ borderTop: "1px solid color-mix(in srgb, var(--primary) 12%, transparent)" }}
          >
            <div>
              <p
                className="font-(family-name:--font-urbanist) text-xs font-semibold tracking-[0.2em] uppercase mb-1"
                style={{ color: "color-mix(in srgb, var(--primary) 40%, transparent)" }}
              >
                Next Project
              </p>
              <h3 className="font-(family-name:--font-super-warming) text-2xl md:text-4xl" style={{ color: "var(--primary)" }}>
                {nextProject.title}
              </h3>
            </div>
            <Link href={`/view-project/${nextProject.slug}`}>
              <motion.span
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
                className="font-(family-name:--font-super-warming) text-sm tracking-widest flex items-center gap-2 shrink-0 cursor-pointer"
                style={{ color: "var(--accent)" }}
              >
                View →
              </motion.span>
            </Link>
          </div>
        </Reveal>
      )}
    </>
  );
}