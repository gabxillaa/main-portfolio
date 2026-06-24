import React from "react";
import { ProjectData } from "@/lib/projects/types";
import Reveal from "./shared/reveal";
import SectionLabel from "./shared/section-labels";

interface ProjectSectionsProps {
  project: ProjectData;
}

const SECTIONS = [
  { label: "Context",  heading: "The Background",    key: "context"  },
  { label: "Problem",  heading: "What Needs Solving",  key: "problem"  },
  { label: "Solution", heading: "Solution Proposed",   key: "solution" },
] as const;

export default function ProjectSections({ project }: ProjectSectionsProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-16 space-y-12 bg-[var(--background)]">
      {SECTIONS.map(({ label, heading, key }, i) => (
        <React.Fragment key={label}>
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

              {/* LEFT RUNWAY: IDENTIFIERS & STRUCTURAL HEADINGS */}
              <div className="col-span-1 lg:col-span-4 flex flex-col items-start lg:border-r lg:border-[var(--dark-green)]/10 lg:pr-6">
                <SectionLabel>{label}</SectionLabel>
                <h2
                  className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal tracking-tight uppercase mt-2 lg:mt-3 leading-none"
                  style={{ color: "var(--primary)" }}
                >
                  {heading}
                </h2>
              </div>

              {/* RIGHT RUNWAY: EDITORIAL NARRATIVE BLOCK */}
              <div className="col-span-1 lg:col-span-8 lg:pt-1">
                <p className="font-[family-name:var(--font-body)] text-sm md:text-base leading-relaxed text-[var(--dark-green)]/90 font-light antialiased text-left m-0">
                  {project[key]}
                </p>
              </div>

            </div>
          </Reveal>

          {/* FIXED CONDITIONAL RULE EXPRESSION */}
          {i < SECTIONS.length - 1 && (
            <hr className="border-t border-[var(--dark-green)]/10 my-4" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}