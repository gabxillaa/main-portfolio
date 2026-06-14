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
        <h2
          className="font-(family-name:--font-super-warming) text-2xl md:text-3xl"
          style={{ color: "var(--primary)" }}
        >
          How It Came Together
        </h2>
      </Reveal>

      <div className="relative">
        {/*
          Two rails — one visible per breakpoint.
          Mobile: left-aligned at icon centre (19px = half of 38px icon).
          Desktop: centered at 51% grid split.
        */}
        <div
          className="absolute top-0 bottom-0 md:hidden"
          style={{ left: 19, width: 1.5, background: "rgba(22,30,84)" }}
        />
        <div
          className="absolute top-0 bottom-0 hidden md:block"
          style={{ left: "51%", width: 1.5, background: "rgba(22,30,84)" }}
        />

        {process.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <Reveal key={i} delay={i * 0.05}>
              <div className="relative mb-16 last:mb-0 md:mb-3 md:last:mb-0">

                {/* ── Mobile: left-railed, single-column ── */}
                <div className="flex items-start md:hidden" style={{ paddingLeft: 0, paddingBottom: 25 }}>
                  {/* Icon centred on the rail (38px wide, rail at 19px) */}
                  <div className="relative shrink-0" style={{ width: 38, height: 38 }}>
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 38, height: 38,
                        background: "var(--primary)",
                        position: "relative", zIndex: 3,
                      }}
                    >
                      <img
                        src={step.iconUrl}
                        alt={step.title}
                        style={{ width: 19, height: 19, objectFit: "contain", filter: "brightness(0) invert(1)" }}
                      />
                    </div>
                  </div>

                  {/* Text block — always left-aligned on mobile */}
                  <div style={{ paddingLeft: 16 }}>
                    <p
                      className="font-(family-name:--font-super-warming) text-xs font-bold tracking-[0.18em] uppercase mb-0.5"
                      style={{ color: "var(--accent)" }}
                    >
                      Step {i + 1}
                    </p>
                    <h3
                      className="font-(family-name:--font-super-warming) text-xl leading-snug mb-1.5"
                      style={{ color: "var(--primary)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="font-(family-name:--font-urbanist) text-sm leading-relaxed text-[var(--text)] text-justify">
                      {step.detail}
                    </p>
                  </div>
                </div>

                {/* ── Desktop: zigzag grid, unchanged ── */}
                <div
                  className="hidden md:grid relative"
                  style={{ gridTemplateColumns: "51% 49%", alignItems: "start" }}
                >
                  {/* Centre node */}
                  <div
                    className="absolute"
                    style={{
                      left: "51%", top: 19,
                      transform: "translateX(-50%)",
                      width: 7, height: 7, borderRadius: "50%",
                      background: "#161e54", zIndex: 5,
                    }}
                  />

                  {isLeft ? (
                    <>
                      <div className="relative" style={{ paddingLeft: 44, paddingRight: 14 }}>
                        <StepIcon src={step.iconUrl} alt={step.title} />
                        <div
                          className="absolute"
                          style={{ top: 20, left: 38, right: 0, height: 0, borderTop: "1.5px dashed rgba(22,30,84)", zIndex: 1 }}
                        />
                        <StepText index={i} step={step} align="right" />
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <div className="relative" style={{ paddingLeft: 14, paddingRight: 44 }}>
                        <StepIcon src={step.iconUrl} alt={step.title} position="right" />
                        <div
                          className="absolute"
                          style={{ top: 19, left: 0, right: 38, height: 0, borderTop: "1.5px dashed rgba(22,30,84)", zIndex: 1 }}
                        />
                        <StepText index={i} step={step} align="left" />
                      </div>
                    </>
                  )}
                </div>

              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function StepIcon({
  src,
  alt,
  position = "left",
}: {
  src: string;
  alt: string;
  position?: "left" | "right";
}) {
  return (
    <div
      className={`absolute ${position}-0 top-0 flex items-center justify-center rounded-full`}
      style={{ width: 38, height: 38, background: "var(--primary)", zIndex: 3 }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: 19, height: 19, objectFit: "contain", filter: "brightness(0) invert(1)" }}
      />
    </div>
  );
}

function StepText({
  index,
  step,
  align,
}: {
  index: number;
  step: { title: string; detail: string };
  align: "left" | "right";
}) {
  return (
    <div style={{ textAlign: align, paddingTop: 35, paddingBottom: align === "left" ? 14 : 0 }}>
      <p
        className="font-(family-name:--font-super-warming) text-xs font-bold tracking-[0.18em] uppercase mb-0.5"
        style={{ color: "var(--accent)" }}
      >
        Step {index + 1}
      </p>
      <h3
        className="font-(family-name:--font-super-warming) text-2xl leading-snug mb-1.5"
        style={{ color: "var(--primary)" }}
      >
        {step.title}
      </h3>
      <p className="font-(family-name:--font-urbanist) text-sm leading-relaxed text-[var(--text)]">
        {step.detail}
      </p>
    </div>
  );
}