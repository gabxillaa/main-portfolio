import React from "react";
import { ProjectData } from "@/lib/projects/types";
import Reveal from "./shared/reveal";
import SectionLabel from "./shared/section-labels";

interface ProjectSectionsProps {
  project: ProjectData;
}

const SECTIONS = [
  { label: "Context", heading: "The Background", key: "context" },
  { label: "Solution", heading: "Solution Proposed", key: "solution" },
  { label: "My Role", heading: "What I Owned", key: "myRole" },
] as const;

export default function ProjectSections({ project }: ProjectSectionsProps) {
  return (
    <section id="context" className="relative w-full bg-[var(--background)] py-20 md:py-28 px-6 md:px-12 lg:px-20 selection:bg-[var(--primary)] selection:text-[var(--background)]">
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        {SECTIONS.map(({ label, heading, key }, i) => {
          const content = project[key];
          if (!content) return null;

          return (
            <React.Fragment key={label}>
              <Reveal>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

                  {/* LEFT COLUMN: INDEX, LABEL & EDITORIAL HEADING */}
                  <div className="col-span-1 lg:col-span-4 flex flex-col items-start lg:border-r lg:border-[var(--dark-green)]/15 lg:pr-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-[var(--primary)] font-semibold tracking-wider">
                        0{i + 1}.
                      </span>
                      <SectionLabel>{label}</SectionLabel>
                    </div>

                    <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-normal tracking-tight uppercase text-[var(--dark-green)] leading-[1.05] mt-1">
                      {heading}
                    </h2>
                  </div>

                  {/* RIGHT COLUMN: EDITORIAL NARRATIVE BLOCK */}
                  <div className="col-span-1 lg:col-span-8 lg:pt-2">
                    <p className="font-[family-name:var(--font-body)] text-base md:text-lg leading-relaxed text-[var(--light-gray)]  antialiased text-left m-0">
                      {content}
                    </p>
                  </div>

                </div>
              </Reveal>

              {/* REFINED SECTION DIVIDER */}
              {i < SECTIONS.length - 1 && (
                <div className="w-full border-t border-[var(--dark-green)]/15" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}