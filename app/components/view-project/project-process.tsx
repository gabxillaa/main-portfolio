import { ProjectData } from "@/lib/projects/types";
import Reveal from "./shared/reveal";
import SectionLabel from "./shared/section-labels";

interface ProjectProcessProps {
  process: ProjectData["process"];
}

export default function ProjectProcess({ process }: ProjectProcessProps) {
  return (
    <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-14">
      <Reveal className="mb-10">
        <SectionLabel>Process</SectionLabel>
        <h2 className="font-(family-name:--font-super-warming) text-2xl md:text-3xl" style={{ color: "var(--primary)" }}>
          How It Came Together
        </h2>
      </Reveal>

      <div className="relative">
        {/* Vertical center line */}
        <div
          className="absolute top-0 bottom-0 hidden md:block"
          style={{ left: "51%", width: 1.5, background: "rgba(22,30,84)" }}
        />

        {process.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div className="relative grid mb-3 last:mb-0" style={{ gridTemplateColumns: "51% 49%", alignItems: "start" }}>
                {/* Center node dot */}
                <div className="absolute hidden md:block" style={{
                  left: "51%", top: 19, transform: "translateX(-50%)",
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#161e54", zIndex: 5,
                }} />

                {isLeft ? (
                  <>
                    <div className="relative" style={{ paddingLeft: 44, paddingRight: 14 }}>
                      <StepIcon src={step.iconUrl} alt={step.title} />
                      <div className="absolute hidden md:block" style={{ top: 20, left: 38, right: 0, height: 0, borderTop: "1.5px dashed rgba(22,30,84)", zIndex: 1 }} />
                      <StepText index={i} step={step} align="right" />
                    </div>
                    <div />
                  </>
                ) : (
                  <>
                    <div />
                    <div className="relative" style={{ paddingLeft: 14, paddingRight: 44 }}>
                      <StepIcon src={step.iconUrl} alt={step.title} position="right" />
                      <div className="absolute hidden md:block" style={{ top: 19, left: 0, right: 38, height: 0, borderTop: "1.5px dashed rgba(22,30,84)", zIndex: 1 }} />
                      <StepText index={i} step={step} align="left" />
                    </div>
                  </>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StepIcon({ src, alt, position = "left" }: { src: string; alt: string; position?: "left" | "right" }) {
  return (
    <div
      className={`absolute ${position}-0 top-0 flex items-center justify-center rounded-full`}
      style={{ width: 38, height: 38, background: "var(--primary)", zIndex: 3 }}
    >
      <img src={src} alt={alt} style={{ width: 19, height: 19, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
    </div>
  );
}

function StepText({ index, step, align }: {
  index: number;
  step: { title: string; detail: string };
  align: "left" | "right";
}) {
  return (
    <div style={{ textAlign: align, paddingTop: 35, paddingBottom: align === "left" ? 14 : 0 }}>
      <p className="font-(family-name:--font-super-warming) text-xs font-bold tracking-[0.18em] uppercase mb-0.5" style={{ color: "var(--accent)" }}>
        Step {index + 1}
      </p>
      <h3 className="font-(family-name:--font-super-warming) text-2xl leading-snug mb-1.5" style={{ color: "var(--primary)" }}>
        {step.title}
      </h3>
      <p className="font-(family-name:--font-urbanist) text-sm leading-relaxed text-[var(--text)]">
        {step.detail}
      </p>
    </div>
  );
}