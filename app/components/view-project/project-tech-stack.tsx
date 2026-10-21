"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProjectData } from "@/lib/projects/types";
import Reveal from "./shared/reveal";
import { fadeUp, stagger } from "./shared/variants";
import SectionLabel from "./shared/section-labels";

interface ProjectTechStackProps {
  techStack: ProjectData["techStack"];
}

export default function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  if (!techStack || techStack.length === 0) return null;

  return (
    <section id="tech-stack" className="relative w-full bg-[var(--background)] py-16 md:py-20 px-6 md:px-12 lg:px-20 selection:bg-[var(--primary)] selection:text-[var(--background)]">
      <div className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-16">

        {/* ── SECTION HEADER ── */}
        <Reveal>
          <div className="flex flex-col items-start gap-2 border-b border-[var(--dark-green)]/15 pb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[var(--primary)] font-semibold tracking-wider">
                7.
              </span>
              <SectionLabel>Tech Stack</SectionLabel>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-normal uppercase tracking-tight text-[var(--dark-green)] leading-none mt-1">
              Built With
            </h2>
          </div>
        </Reveal>

        {/* ── TECH STACK GRID ── */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

            {/* LEFT RUNWAY */}
            <div className="col-span-1 lg:col-span-4 flex flex-col gap-3 lg:border-r lg:border-[var(--dark-green)]/15 lg:pr-8">
              <p className="font-[family-name:var(--font-body)] text-sm md:text-base leading-relaxed text-[var(--light-gray)] font-light antialiased m-0">
                Core technologies, tools, and frameworks leveraged to build and deploy this system.
              </p>
            </div>

            {/* RIGHT RUNWAY: COLORFUL BRAND TILES */}
            <motion.div
              className="col-span-1 lg:col-span-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 lg:pt-1"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-6%" }}
            >
              {techStack.map((t) => (
                <motion.div
                  key={t.name}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center gap-3 group cursor-default"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center p-3.5 border border-[var(--dark-green)]/15 bg-[var(--background)] transition-all duration-300 hover:border-[var(--primary)]/40 hover:shadow-md"
                    style={{
                      // Uses subtle tint matching brand tile dynamic color if provided
                      backgroundColor: t.bg ? `${t.bg}12` : "transparent",
                    }}
                  >
                    <img
                      src={t.icon}
                      alt={t.name}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </motion.div>

                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--dark-green)]/80 transition-colors duration-300 group-hover:text-[var(--primary)]">
                    {t.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}