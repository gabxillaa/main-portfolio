import React from "react";
import { ProjectData } from "@/lib/projects/types";
import Reveal from "./shared/reveal";
import SectionLabel from "./shared/section-labels";
import Divider from "../ui/divider";


interface ProjectSectionsProps {
  project: ProjectData;
}

const SECTIONS = [
  { label: "Context",  heading: "The Background",     key: "context"  },
  { label: "Problem",  heading: "What Needs Solving",  key: "problem"  },
  { label: "Solution", heading: "Solution Proposed",   key: "solution" },
] as const;

export default function ProjectSections({ project }: ProjectSectionsProps) {
  return (
    <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-14 space-y-10">
      {SECTIONS.map(({ label, heading, key }, i) => (
        <React.Fragment key={label}>
          <Reveal>
            <div className="grid grid-cols-[220px_1fr] gap-12 items-start">
              <div className="shrink-0">
                <SectionLabel>{label}</SectionLabel>
                <h2
                  className="font-(family-name:--font-super-warming) text-xl md:text-2xl leading-snug whitespace-nowrap"
                  style={{ color: "var(--primary)" }}
                >
                  {heading}
                </h2>
              </div>
              <p className="font-(family-name:--font-urbanist) text-sm md:text-base leading-relaxed pt-1 text-[var(--text)] text-justify">
                {project[key]}
              </p>
            </div>
          </Reveal>
          {i < SECTIONS.length - 1 && <Divider />}
        </React.Fragment>
      ))}
      <Divider />
    </div>
  );
}