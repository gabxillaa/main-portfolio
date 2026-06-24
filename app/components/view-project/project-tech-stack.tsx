"use client";

import { motion } from "framer-motion";
import { ProjectData } from "@/lib/projects/types";
import Reveal from "./shared/reveal";
import { stagger } from "./shared/variants";
import SectionLabel from "./shared/section-labels";

interface ProjectTechStackProps {
  techStack: ProjectData["techStack"];
}

export default function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-16 bg-[var(--background)]">
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT RUNWAY */}
          <div className="col-span-1 lg:col-span-4 flex flex-col items-start lg:border-r lg:border-[var(--dark-green)]/10 lg:pr-6">
            <SectionLabel>Tech Stack</SectionLabel>
            <h2
              className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal tracking-tight uppercase mt-2 lg:mt-3 leading-none"
              style={{ color: "var(--primary)" }}
            >
              Built With
            </h2>
          </div>

          {/* RIGHT RUNWAY WITH CONTROLS FOR COLOR INTEGRATION */}
          <motion.div
            className="col-span-1 lg:col-span-8 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-6 gap-y-8 pt-1"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-6%" }}
          >
            {techStack.map((t) => (
              <div
                key={t.name}
                className="flex flex-col items-center text-center gap-3 group"
              >
                {/*
                  Premium tint tile: Uses the brand color directly for background color with an 8% tint overlay.
                  On hover, the tile softly lifts and increases color density to 15%.
                */}
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="w-14 h-14 rounded-xl flex items-center justify-center p-3.5 border border-transparent transition-colors duration-300"
                  style={{
                    backgroundColor: `${t.bg}14`, // Appends low hex opacity (approx 8%)
                    borderColor: `${t.bg}25`     // Appends soft stroke opacity (approx 14%)
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${t.bg}26`; // Steps up to ~15% fill on hover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${t.bg}14`;
                  }}
                >
                  <img
                    src={t.icon}
                    alt={t.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </motion.div>

                {/* Meta details tag */}
                <span className="font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--dark-green)]/50 transition-colors duration-300 group-hover:text-[var(--dark-green)]">
                  {t.name}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </Reveal>
    </div>
  );
}