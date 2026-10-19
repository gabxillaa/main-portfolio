"use client";

import { motion } from "framer-motion";
import { ProjectData } from "@/lib/projects/types";
import Reveal from "./shared/reveal";
import { fadeUp } from "./shared/variants";
import SectionLabel from "./shared/section-labels";

interface ProjectResultsProps {
  results: ProjectData["results"];
  resultDiscussion?: ProjectData["resultDiscussion"];
}

export default function ProjectResults({ results, resultDiscussion }: ProjectResultsProps) {
  return (
    <section id="results" className="relative w-full bg-[var(--background)] py-20 md:py-28 px-6 md:px-12 lg:px-20 selection:bg-[var(--primary)] selection:text-[var(--background)]">
      <div className="max-w-6xl mx-auto flex flex-col gap-20">

        {/* ── PREMIUM EDITORIAL METRICS PLATE ── */}
        {results && results.length > 0 && (
          <Reveal>
            <div
              className="relative rounded-3xl overflow-hidden border border-[var(--dark-green)]/20 p-10 md:p-16 shadow-2xl"
              style={{ backgroundColor: "var(--dark-green)" }}
            >
              {/* Subtle background ambient highlight */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--primary)]/20 blur-[100px] rounded-full pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <span className="font-[family-name:var(--font-body)] text-xs text-[var(--beige)] font-semibold tracking-widest uppercase">
                    Impact Overview
                  </span>
                  <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-normal uppercase tracking-tight text-[var(--background)] leading-tight">
                    What It <span style={{ color: "var(--beige)" }}>Achieved</span>
                  </h2>
                </div>

                {/* FLEXIBLE CONTAINER TO PREVENT SIDE GAPS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-between gap-8">
                  {results.map((r, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className={[
                        "flex flex-col items-start justify-between gap-3 px-6 py-4 flex-1 min-w-[220px]",
                        "lg:border-l lg:border-[var(--background)]/15",
                        i === 0 ? "lg:border-l-0 lg:pl-0" : "",
                      ].join(" ")}
                    >
                      <span
                        className="font-[family-name:var(--font-display)] text-[var(--background)] tracking-tight"
                        style={{ fontSize: "clamp(2.75rem, 4vw, 3.5rem)", lineHeight: 1 }}
                      >
                        {r.value}
                      </span>
                      <div className="flex flex-col gap-1">
                        <p className="font-[family-name:var(--font-body)] text-xs font-bold leading-snug text-[var(--background)]/90 uppercase tracking-wider">
                          {r.label}
                        </p>
                        {r.sublabel && (
                          <span className="font-[family-name:var(--font-body)] text-[11px] font-light normal-case tracking-normal text-[var(--background)]/60">
                            {r.sublabel}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* ── NARRATIVE EVALUATION ROW ── */}
        {resultDiscussion && (
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pt-4">

              {/* LEFT RUNWAY: INDEX & STRUCTURAL HEADING */}
              <div className="col-span-1 lg:col-span-4 flex flex-col items-start lg:border-r lg:border-[var(--dark-green)]/15 lg:pr-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-mono text-xs text-[var(--primary)] font-semibold tracking-wider">
                    04.
                  </span>
                  <SectionLabel>Results</SectionLabel>
                </div>

                <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-normal tracking-tight uppercase text-[var(--dark-green)] leading-[1.05] mt-1">
                  Results Discussion
                </h2>
              </div>

              {/* RIGHT RUNWAY: EDITORIAL NARRATIVE BLOCK */}
              <div className="col-span-1 lg:col-span-8 lg:pt-2">
                <div className="font-[family-name:var(--font-body)] text-base md:text-lg leading-relaxed text-[var(--light-gray)] font-light antialiased text-left m-0">
                  {resultDiscussion.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="mb-6 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

            </div>
          </Reveal>
        )}

      </div>
    </section>
  );
}