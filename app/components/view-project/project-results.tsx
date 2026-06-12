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
      {/* Results card */}
      {results && results.length > 0 && (
        <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-16">
          <Reveal>
            <div
              className="relative rounded-3xl overflow-hidden p-8 md:p-16"
              style={{
                background: "radial-gradient(ellipse at 50% 30%, #161e54 0%, #131b52 38%, #10184f 76%)",
                border: "3px solid var(--accent)",
              }}
            >
              {/* Blobs */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(40,153,218,0.25) 0%, transparent 65%)", filter: "blur(44px)" }} />
              <div className="absolute bottom-0 left-0 w-52 h-36 pointer-events-none" style={{ background: "radial-gradient(ellipse at 0% 100%, rgba(180,208,111,0.3) 0%, transparent 70%)", filter: "blur(30px)" }} />
              <div className="absolute bottom-0 right-0 w-52 h-36 pointer-events-none" style={{ background: "radial-gradient(ellipse at 100% 100%, rgba(180,208,111,0.3) 0%, transparent 70%)", filter: "blur(30px)" }} />

              <div className="relative z-10">
                <SectionLabel>Results</SectionLabel>
                <h2 className="font-(family-name:--font-super-warming) text-2xl md:text-3xl mb-8" style={{ color: "white" }}>
                  What It <span style={{ color: "var(--accent)" }}>Achieved</span>
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4">
                  {results.map((r, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className={[
                        "flex flex-col items-center text-center gap-1 px-6 py-2",
                        "md:border-l md:border-[rgba(255,255,255,0.15)]",
                        i % 4 === 0 ? "md:border-l-0" : ""
                        ].join(" ")}
                    >
                      <span
                        className="font-(family-name:--font-super-warming) text-white"
                        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1 }}
                      >
                        {r.value}
                      </span>
                      <p className="font-(family-name:--font-urbanist) text-xs font-bold leading-snug" style={{ color: "rgba(255,255,255,0.6)" }}>
                        {r.label}
                        {r.sublabel && (
                          <span className="block text-[10px] mt-0.5 opacity-75 font-normal">{r.sublabel}</span>
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

      {/* Result discussion */}
      {resultDiscussion && (
        <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-12">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5 lg:gap-12 items-start">
              <div className="shrink-0">
                <SectionLabel>Results</SectionLabel>
                <h2 className="font-(family-name:--font-super-warming) text-xl md:text-2xl leading-snug whitespace-nowrap" style={{ color: "var(--primary)" }}>
                  Result Discussion
                </h2>
              </div>
              <p className="font-(family-name:--font-urbanist) text-sm md:text-base leading-relaxed pt-1 text-[var(--text)] text-justify">
                {resultDiscussion}
              </p>
            </div>
          </Reveal>
        </div>
      )}
    </>
  );
}