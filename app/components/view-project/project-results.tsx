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
    <>
      {/* ── PREMIUM EDITORIAL METRICS PLATE ── */}
      {results && results.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-12 bg-[var(--background)]">
          <Reveal>
            <div
              className="relative rounded-2xl overflow-hidden border border-[var(--dark-green)] p-8 md:p-14"
              style={{ backgroundColor: "var(--dark-green)" }}
            >
              <div className="relative z-10">
                {/* Contrast-adjusted structural label */}
                <span className="font-[family-name:var(--font-body)] text-[var(--beige)]/60 border-[var(--beige)]/20 inline-block text-xs font-bold tracking-[0.2em] uppercase mb-4">
                  Results
                </span>

                <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal uppercase tracking-tight mb-14 text-[var(--background)]">
                  What It <span style={{ color: "var(--beige)" }}>Achieved</span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0">
                  {results.map((r, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className={[
                        "flex flex-col items-center text-center gap-2 px-4",
                        "md:border-l md:border-[var(--background)]/15",
                        i % 4 === 0 ? "md:border-l-0" : ""
                      ].join(" ")}
                    >
                      {/* Crisp inverted typographical contrast */}
                      <span
                        className="font-[family-name:var(--font-display)] text-[var(--background)]"
                        style={{ fontSize: "clamp(2.5rem, 4.5vw, 3.5rem)", lineHeight: 1 }}
                      >
                        {r.value}
                      </span>
                      <p className="font-[family-name:var(--font-body)] text-xs font-bold leading-snug text-[var(--background)]/60 uppercase tracking-wider">
                        {r.label}
                        {r.sublabel && (
                          <span className="block text-[10px] mt-1 opacity-75 font-normal normal-case tracking-normal text-[var(--background)]/40">
                            {r.sublabel}
                          </span>
                        )}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      )}

      {/* ── NARRATIVE EVALUATION ROW ── */}
      {resultDiscussion && (
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-12 bg-[var(--background)]">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

              {/* LEFT RUNWAY */}
              <div className="col-span-1 lg:col-span-4 flex flex-col items-start lg:border-r lg:border-[var(--dark-green)]/10 lg:pr-6">
                <SectionLabel>Results</SectionLabel>
                <h2
                  className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal tracking-tight uppercase mt-2 lg:mt-3 leading-none"
                  style={{ color: "var(--primary)" }}
                >
                  RESULTS DISCUSSION
                </h2>
              </div>

              {/* RIGHT RUNWAY */}
              <div className="col-span-1 lg:col-span-8 lg:pt-1">
                <p className="font-[family-name:var(--font-body)] text-sm md:text-base leading-relaxed text-[var(--dark-green)]/90 font-light antialiased text-left m-0">
                  {resultDiscussion}
                </p>
              </div>

            </div>
          </Reveal>
        </div>
      )}
    </>
  );
}