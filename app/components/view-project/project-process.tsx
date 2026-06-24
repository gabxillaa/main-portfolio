import { ProjectData } from "@/lib/projects/types";
import Reveal from "./shared/reveal";
import SectionLabel from "./shared/section-labels";

interface ProjectProcessProps {
  process: ProjectData["process"];
}

export default function ProjectProcess({ process }: ProjectProcessProps) {
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 py-20 bg-[var(--background)]">
      {/* SECTION HEADER */}
      <Reveal className="mb-16 md:mb-24">
        <SectionLabel>Process</SectionLabel>
        <h2
          className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-normal uppercase tracking-tight"
          style={{ color: "var(--primary)" }}
        >
          How It Came Together
        </h2>
      </Reveal>

      {/* TIMELINE CONTAINER */}
      <div className="flex flex-col gap-12 md:gap-20">
        {process.map((step, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start group">

              {/* COL 1: SEQUENTIAL NUMBERING */}
              <div className="col-span-1 md:col-span-2 pt-1">
                <span className="font-[family-name:var(--font-body)] text-[11px] font-bold tracking-[0.25em] text-[var(--primary)] uppercase bg-[var(--beige)]/40 px-2.5 py-1 rounded-sm inline-block">
                  Phase 0{i + 1}
                </span>
              </div>

              {/* COL 2: EDITORIAL GLYPH GRAPHIC */}
              <div className="col-span-1 md:col-span-2 hidden md:flex justify-start pt-1">
                <div className="w-11 h-11 rounded-xl bg-[var(--beige)]/20 border border-[var(--beige)] flex items-center justify-center transition-all duration-300 group-hover:bg-[var(--primary)] group-hover:border-[var(--primary)]">
                  <img
                    src={step.iconUrl}
                    alt={step.title}
                    className="w-5 h-5 object-contain transition-all duration-300 filter brightness-0 invert-0 group-hover:brightness-0 group-hover:invert"
                    style={{
                      // Fallback logic colorizes source icon smoothly to forest green before hover invert
                      color: "var(--primary)"
                    }}
                  />
                </div>
              </div>

              {/* COL 3: CORE CONTENT SYSTEM */}
              <div className="col-span-1 md:col-span-8 md:pl-2 border-l md:border-l-0 border-[var(--dark-green)]/10 pl-4 md:pl-0">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-[var(--dark-green)] uppercase tracking-wide mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="font-[family-name:var(--font-body)] text-sm md:text-base leading-relaxed text-[var(--dark-green)]/80 font-light antialiased text-left max-w-3xl">
                  {step.detail}
                </p>
              </div>

            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}