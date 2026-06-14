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
    <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-12">
      <Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5 lg:gap-12 items-start">
          <div className="shrink-0">
            <SectionLabel>Tech Stack</SectionLabel>
            <h2 className="font-(family-name:--font-super-warming) text-xl md:text-2xl leading-snug whitespace-nowrap" style={{ color: "var(--primary)" }}>
              Built With
            </h2>
          </div>

          <motion.div
            className="grid grid-cols-5 gap-x-6 gap-y-5"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-6%" }}
          >
            {techStack.map((t) => (
              <motion.div key={t.name} whileHover={{ y: -5, scale: 1.05 }} className="flex flex-col items-center gap-2 group">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center p-4 border border-white/10 shadow-lg"
                  style={{
                    backgroundColor: t.bg,
                    boxShadow: `0 8px 24px -8px ${t.bg}`,
                    }}
                >
                  <img src={t.icon} alt={t.name} className="w-full h-full object-contain filter brightness-[1.05]" />
                </div>
                <span className="font-(family-name:--font-urbanist) text-[9px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-primary transition-colors">
                  {t.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Reveal>
    </div>
  );
}