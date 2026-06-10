"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/footer";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
export interface TechItem {
  name: string;
  icon: string;   // URL to icon image
  bg: string;     // background color for the icon circle
}

export interface ProcessStep {
  iconUrl: string; // URL to a real icon/image
  title: string;
  detail: string;
}

export interface ResultStat {
  value: string;
  label: string;
  sublabel?: string;
}

export interface ProjectData {
  title: string;
  tagline: string;
  liveUrl?: string;
  repoUrl?: string;
  context: string;
  problem: string;
  solution: string;
  process: ProcessStep[];
  results: ResultStat[];
  resultDiscussion: string;
  techStack: TechItem[];
  gallery: string[];
  reflection: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
export const MOLDIFY_DATA: ProjectData = {
  title: "Moldify",
  tagline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
  liveUrl: "https://moldify.vercel.app",
  repoUrl: "https://github.com/you/moldify",
  context:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  problem:  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  solution: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  process: [
    { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",      title: "Requirements Analysis", detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",     title: "Design Phase",          detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",   title: "Develop Phase",         detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",          title: "Testing Phase",         detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",   title: "Deployment Phase",      detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",   title: "Review Phase",          detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
  ],
  results: [
    { value: "40%", label: "Non-IT Survey Results",     sublabel: "(Mycologists, Farmers, Students, Etc.)" },
    { value: "40%", label: "IT Experts Survey Results", sublabel: "(Software Developer, Etc.)" },
    { value: "40%", label: "Functionality Results" },
    { value: "40%", label: "Non-Functionality Results" },
  ],
  resultDiscussion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  techStack: [
    { name: "Next.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",           bg: "#000000" },
    { name: "TypeScript",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",   bg: "#3178C6" },
    { name: "Tailwind",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", bg: "#06B6D4" },
    { name: "Supabase",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",       bg: "#3ECF8E" },
    { name: "Figma",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",             bg: "#F24E1E" },
    { name: "React",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",             bg: "#20232A" },
    { name: "Node.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",           bg: "#339933" },
    { name: "PostgreSQL",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",   bg: "#336791" },
    { name: "Git",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",                 bg: "#F05032" },
    { name: "Vercel",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",           bg: "#000000" },
  ],
  gallery: [
    "/assets/moldify.svg",
    "/assets/moldify.svg",
    "/assets/moldify.svg",
  ],
  reflection: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
};

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] as [number,number,number,number] } },
};
const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.85, ease: "easeOut" as const } },
};
const stagger: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

// ─────────────────────────────────────────────────────────────────────────────
// REVEAL WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-6% 0px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} transition={{ delay }} className={className}>
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION LABEL
// ─────────────────────────────────────────────────────────────────────────────
function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="font-(family-name:--font-super-warming) text-[10px] font-bold tracking-[0.22em] uppercase mb-1.5"
       style={{ color: light ? "var(--accent)" : "var(--accent)" }}>
      {children}
    </p>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DIVIDER
// ─────────────────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div
      className="w-full h-[1px]"
      style={{ background: "linear-gradient(90deg, transparent 5%, #e5e7eb 50%, transparent 95%)" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GALLERY CAROUSEL — improved with thumbnail strip
// ─────────────────────────────────────────────────────────────────────────────
function GalleryCarousel({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };
  const prev = () => go((active - 1 + images.length) % images.length);
  const next = () => go((active + 1) % images.length);

  return (
    <div className="w-full select-none">
      <div className="relative">
        {/* Ghost index */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            top: "50%", right: "1rem",
            transform: "translateY(-65%)",
            fontFamily: "var(--font-super-warming)",
            fontSize: "clamp(6rem, 18vw, 14rem)",
            lineHeight: 1,
            color: "rgba(19,27,82,0.05)",
            letterSpacing: "-0.04em",
            zIndex: 0,
          }}
        >
          {String(active + 1).padStart(2, "0")}
        </div>

        {/* Main image */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-lg"
          style={{ aspectRatio: "16/9", zIndex: 1 }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={active}
              src={images[active]}
              alt={`${title} screenshot ${active + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              custom={direction}
              initial={{ opacity: 0, x: direction * 50, scale: 1.02 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: direction * -50, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            />
          </AnimatePresence>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(19,27,82,0.12)",
                  color: "var(--primary)",
                  fontSize: "1rem",
                  backdropFilter: "blur(8px)",
                }}
              >←</button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  border: "1px solid rgba(19,27,82,0.12)",
                  color: "var(--primary)",
                  fontSize: "1rem",
                  backdropFilter: "blur(8px)",
                }}
              >→</button>
            </>
          )}

          {/* Count badge */}
          <div
            className="absolute bottom-3 left-4 z-10 font-(family-name:--font-urbanist) text-xs font-semibold tabular-nums px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(255,255,255,0.8)",
              color: "var(--primary)",
              letterSpacing: "0.12em",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(19,27,82,0.08)",
            }}
          >
            {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Filmstrip thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {images.map((src, i) => (
            <motion.button
              key={i}
              onClick={() => go(i)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.18 }}
              className="relative shrink-0 rounded-lg overflow-hidden"
              style={{
                width: 88, height: 56,
                border: i === active
                  ? "2px solid var(--accent)"
                  : "2px solid rgba(19,27,82,0.12)",
                boxShadow: i === active
                  ? "0 0 14px rgba(255,147,99,0.35)"
                  : "none",
                opacity: i === active ? 1 : 0.5,
                transition: "all 0.25s ease",
              }}
            >
              <img src={src} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function ProjectPage({ project = MOLDIFY_DATA }: { project?: ProjectData }) {
  const router     = useRouter();
  const heroRef    = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: "var(--background)" }}>

      {/* ════════════════════════════════════════════════════
          HERO / HEADER
      ════════════════════════════════════════════════════ */}
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 50% 40%, #161e54 0%, #131b52 38%, #10184f 76%)",
          paddingBottom: "5rem",
          minHeight: "450px",
        }}
      >
        {/* Centre ambient blob #2899DA */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div style={{
            width: "55%", height: "65%",
            background: "radial-gradient(ellipse at center, rgba(40,153,218,0.30) 0%, transparent 70%)",
            filter: "blur(52px)",
          }} />
        </div>

        {/* Ghost title — perfectly centred */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-(family-name:--font-super-warming) uppercase text-white"
            style={{ fontSize: "clamp(5rem, 18vw, 16rem)", opacity: 0.02, letterSpacing: "0.02em", whiteSpace: "nowrap", lineHeight: 1 }}
          >
            {project.title}
          </span>
        </div>

        {/* ← Go Back */}
        <motion.button
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          onClick={() => router.back()}
          className="absolute top-5 left-8 z-20 flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
          style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.18)" }}
        >
          ← Go Back
        </motion.button>

        {/* Hero text — left-aligned with proper padding */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          className="relative z-10 px-8 md:px-16 pt-20 pb-4 max-w-screen-lg mx-auto"
        >
          <motion.h1 variants={fadeUp} className="font-(family-name:--font-super-warming) uppercase leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", color: "white" }}>
            About{" "}
            <span style={{
              backgroundImage: "linear-gradient(90deg, #FF9363 0%, #FF9363 30%, #60EEE7 46%, #BBE0EF 83%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              {project.title}
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="font-(family-name:--font-urbanist) text-sm md:text-lg leading-relaxed mb-6" style={{ color: "rgba(255,255,255)", maxWidth: "480px" }}>
            {project.tagline}
          </motion.p>

          {project.liveUrl && (
            <motion.a variants={fadeUp} href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-3 rounded-full font-(family-name:--font-super-warming) font-bold text-base text-white transition-opacity hover:opacity-85 tracking-widest"
              style={{ background: "linear-gradient(90deg, #FF9363 0%, #F54C00 100%)" }}>
              View Live
            </motion.a>
          )}
        </motion.div>

        {/* Curved SVG bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: "72px" }}>
          <svg viewBox="0 0 1440 72" preserveAspectRatio="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,72 C360,0 1080,0 1440,72 L1440,72 L0,72 Z" fill="var(--background)" />
          </svg>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          CONTEXT / PROBLEM / SOLUTION
      ════════════════════════════════════════════════════ */}
      <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-14 space-y-10">
        {[
          { label: "Context",  heading: "The Background",    body: project.context  },
          { label: "Problem",  heading: "What Needs Solving", body: project.problem  },
          { label: "Solution", heading: "Solution Proposed",  body: project.solution },
        ].map(({ label, heading, body }, i, arr) => (
          <React.Fragment key={label}>
            <Reveal>
              <div className="grid grid-cols-[220px_1fr] gap-12 items-start">
                <div className="shrink-0">
                  <SectionLabel>{label}</SectionLabel>
                  <h2 className="font-(family-name:--font-super-warming) text-xl md:text-2xl leading-snug whitespace-nowrap" style={{ color: "var(--primary)" }}>
                    {heading}
                  </h2>
                </div>
                <p className="font-(family-name:--font-urbanist) text-sm md:text-base leading-relaxed pt-1, text-[var(--text)]">
                  {body}
                </p>
              </div>
            </Reveal>
            {i < arr.length - 1 && <Divider />}
          </React.Fragment>
        ))}
        <Divider />
      </div>

      {/* ════════════════════════════════════════════════════
          PROCESS — zigzag timeline matching screenshot exactly
          Odd steps (0,2,4): icon LEFT, dashed line, Step+title RIGHT, body under LEFT col
          Even steps (1,3,5): icon RIGHT, dashed line, Step+title LEFT, body under RIGHT col
      ════════════════════════════════════════════════════ */}
      <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-14">
        <Reveal className="mb-10">
          <SectionLabel>Process</SectionLabel>
          <h2 className="font-(family-name:--font-super-warming) text-2xl md:text-3xl" style={{ color: "var(--primary)" }}>
            How It Came Together
          </h2>
        </Reveal>

        {/* Process section wrapper */}
        <div className="relative">
          {/* Vertical center line at 51% */}
          <div className="absolute top-0 bottom-0 hidden md:block"
            style={{ left: "51%", width: 1.5, background: "rgba(22,30,84)" }} />

          {project.process.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <div className="relative grid mb-3 last:mb-0" style={{ gridTemplateColumns: "51% 49%", alignItems: "start" }}>

                  {/* Center node dot */}
                  <div className="absolute hidden md:block" style={{
                    left: "51%", top: 19, transform: "translateX(-50%)",
                    width: 7, height: 7, borderRadius: "50%",
                    background: "#161e54",  zIndex: 5,
                  }} />

                  {isLeft ? (
                    <>
                      {/* LEFT ZONE: icon at left=0, connector spans to center, text right-aligned */}
                      <div className="relative" style={{ paddingLeft: 44, paddingRight: 14 }}>
                        {/* Icon */}
                        <div className="absolute left-0 top-0 flex items-center justify-center rounded-full"
                          style={{ width: 38, height: 38, background: "var(--primary)", zIndex: 3 }}>
                          <img src={step.iconUrl} alt={step.title} style={{ width: 19, height: 19, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                        </div>
                        {/* Connector: icon right edge → center line */}
                        <div className="absolute hidden md:block" style={{ top: 20, left: 38, right: 0, height: 0, borderTop: "1.5px dashed rgba(22,30,84)", zIndex: 1 }} />
                        {/* Text: right-aligned */}
                        <div style={{ textAlign: "right",
                          paddingTop: 35,
                        }}>
                          <p className="font-(family-name:--font-super-warming) text-xs font-bold tracking-[0.18em] uppercase mb-0.5" style={{ color: "var(--accent)" }}>Step {i + 1}</p>
                          <h3 className="font-(family-name:--font-super-warming) text-2xl leading-snug mb-1.5" style={{ color: "var(--primary)" }}>{step.title}</h3>
                          <p className="font-(family-name:--font-urbanist) text-sm leading-relaxed text-[var(--text)]">{step.detail}</p>
                        </div>
                      </div>
                      <div /> {/* empty right zone */}
                    </>
                  ) : (
                    <>
                      <div /> {/* empty left zone */}
                      {/* RIGHT ZONE: icon at right=0, connector spans from center, text left-aligned */}
                      <div className="relative" style={{ paddingLeft: 14, paddingRight: 44 }}>
                        {/* Icon */}
                        <div className="absolute right-0 top-0 flex items-center justify-center rounded-full"
                          style={{ width: 38, height: 38, background: "var(--primary)", zIndex: 3 }}>
                          <img src={step.iconUrl} alt={step.title} style={{ width: 19, height: 19, objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                        </div>
                        {/* Connector: center line → icon left edge */}
                        <div className="absolute hidden md:block" style={{ top: 19, left: 0, right: 38, height: 0, borderTop: "1.5px dashed rgba(22,30,84)", zIndex: 1 }} />
                        {/* Text: left-aligned */}
                        <div style={{ textAlign: "left",
                          paddingTop: 35,
                        }}>
                          <p className="font-(family-name:--font-super-warming) text-xs font-bold tracking-[0.18em] uppercase mb-0.5" style={{ color: "var(--accent)" }}>Step {i + 1}</p>
                          <h3 className="font-(family-name:--font-super-warming) text-2xl leading-snug mb-1.5" style={{ color: "var(--primary)" }}>{step.title}</h3>
                          <p className="font-(family-name:--font-urbanist) text-sm leading-relaxed text-[var(--text)]">{step.detail}</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════
          RESULTS CARD
      ════════════════════════════════════════════════════ */}
      <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-16">
        <Reveal>
          <div
            className="relative rounded-3xl overflow-hidden p-8 md:p-16"
            style={{
              background: "radial-gradient(ellipse at 50% 30%, #161e54 0%, #131b52 38%, #10184f 76%)",
              border: "3px solid var(--accent)",
            }}
          >
            {/* Centre ambient blob */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse at 50% 30%, rgba(40,153,218,0.25) 0%, transparent 65%)",
              filter: "blur(44px)",
            }} />
            {/* Bottom-left blob — #2899DA (same as right) */}
            <div className="absolute bottom-0 left-0 w-52 h-36 pointer-events-none" style={{
              background: "radial-gradient(ellipse at 0% 100%, rgba(180,208,111,0.3) 0%, transparent 70%)",
              filter: "blur(30px)",
            }} />
            {/* Bottom-right blob — #B4D06F */}
            <div className="absolute bottom-0 right-0 w-52 h-36 pointer-events-none" style={{
              background: "radial-gradient(ellipse at 100% 100%, rgba(180,208,111,0.3) 0%, transparent 70%)",
              filter: "blur(30px)",
            }} />

            <div className="relative z-10">
              <SectionLabel>Results</SectionLabel>
              <h2 className="font-(family-name:--font-super-warming) text-2xl md:text-3xl mb-8" style={{ color: "white" }}>
                What It <span style={{ color: "var(--accent)" }}>Achieved</span>
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4">
                {project.results.map((r, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex flex-col items-center text-center gap-1 px-6 py-2"
                    style={{
                      borderLeft: i !== 0 ? "1px solid rgba(255,255,255,0.15)" : "none",
                    }}
                  >
                    <span
                      className="font-(family-name:--font-super-warming) text-white"
                      style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1 }}
                    >
                      {r.value}
                    </span>
                    <p
                      className="font-(family-name:--font-urbanist) text-xs font-bold leading-snug"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      {r.label}
                      {r.sublabel && (
                        <span className="block text-[10px] mt-0.5 opacity-75 font-normal">
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

      {/* ════════════════════════════════════════════════════
          RESULT DISCUSSION
      ════════════════════════════════════════════════════ */}
      <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-12">
        <Reveal>
          <div className="grid grid-cols-[220px_1fr] gap-12 items-start">
            <div className="shrink-0">
              <SectionLabel>Results</SectionLabel>
              <h2 className="font-(family-name:--font-super-warming) text-xl md:text-2xl leading-snug whitespace-nowrap" style={{ color: "var(--primary)" }}>
                Result Discussion
              </h2>
            </div>
            <p className="font-(family-name:--font-urbanist) text-sm md:text-base leading-relaxed pt-1 text-[var(--text)]">
              {project.resultDiscussion}
            </p>
          </div>
        </Reveal>
      </div>

      {/* ════════════════════════════════════════════════════
          TECH STACK — label left, icon grid right, colorful bgs
      ════════════════════════════════════════════════════ */}
      <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-12">
        <Reveal>
          <div className="grid grid-cols-[220px_1fr] gap-12 items-start">
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
              {project.techStack.map((t) => (
                <motion.div key={t.name} variants={fadeUp} className="flex flex-col items-center gap-2 group">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center p-3 transition-transform duration-200 group-hover:scale-110 shadow-sm"
                    style={{ background: t.bg }}
                  >
                    <img src={t.icon} alt={t.name} className="w-full h-full object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.3"; }} />
                  </div>
                  <span className="font-(family-name:--font-urbanist) text-[10px] font-semibold text-center leading-tight"
                    style={{ color: "color-mix(in srgb, var(--primary) 60%, transparent)" }}>
                    {t.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>

    {/* ════════════════════════════════════════════════════
          GALLERY — same --background, no color clash
      ════════════════════════════════════════════════════ */}
      <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-12">
        <Reveal className="mb-8">
          <SectionLabel>Gallery</SectionLabel>
          <h2
            className="font-(family-name:--font-super-warming) text-2xl md:text-3xl"
            style={{ color: "var(--primary)" }}
          >
            A Closer <span style={{ color: "var(--accent)" }}>Look</span>
          </h2>
        </Reveal>
        <Reveal>
          <GalleryCarousel images={project.gallery} title={project.title} />
        </Reveal>
      </div>

      <div className="max-w-screen-lg mx-auto px-8 md:px-16">
        <Divider />
      </div>

      {/* ════════════════════════════════════════════════════
          CLOSING REFLECTION
      ════════════════════════════════════════════════════ */}
      <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-14">
        <Reveal>
          <div className="grid grid-cols-[220px_1fr] gap-12 items-start">
            <div className="shrink-0">
              <SectionLabel>Reflection</SectionLabel>
              <h2
                className="font-(family-name:--font-super-warming) text-xl md:text-2xl leading-snug"
                style={{ color: "var(--primary)" }}
              >
                Looking Back
              </h2>
            </div>
            <p
              className="font-(family-name:--font-urbanist) text-sm md:text-base leading-relaxed pt-1 text-[var(--text)]"
            >
              {project.reflection}
            </p>
          </div>
        </Reveal>
      </div>

      {/* ════════════════════════════════════════════════════
          CTA STRIP — hire me / get in touch
      ════════════════════════════════════════════════════ */}
      <Reveal>
         <div className="max-w-screen-lg mx-auto px-8 md:px-16 mb-14">
          <div
            className="relative overflow-hidden rounded-3xl px-10 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{
              background: "radial-gradient(ellipse at 60% 50%, #161e54 0%, #131b52 45%, #10184f 100%)",
              border: "3px solid var(--accent)",
            }}
          >
          {/* Ambient blobs */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at 30% 50%, rgba(40,153,218,0.2) 0%, transparent 65%)",
            filter: "blur(40px)",
          }} />
          <div className="absolute top-0 right-0 w-64 h-40 pointer-events-none" style={{
            background: "radial-gradient(ellipse at 100% 0%, rgba(255,147,99,0.15) 0%, transparent 70%)",
            filter: "blur(32px)",
          }} />

          <div className="relative z-10">
            <p
              className="font-(family-name:--font-super-warming) text-xs tracking-[0.22em] uppercase mb-2"
              style={{ color: "var(--accent)" }}
            >
              Let's Work Together
            </p>
            <h2
              className="font-(family-name:--font-super-warming) text-2xl md:text-3xl leading-snug"
              style={{ color: "white" }}
            >
              Got a project in mind?
            </h2>
            <p
              className="font-(family-name:--font-urbanist) text-sm mt-2 max-w-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              I'm open to freelance work and collaborations. Let's build something great together.
            </p>
          </div>

          <motion.a
            href="/contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 shrink-0 inline-flex items-center gap-2 px-10 py-3.5 rounded-full font-(family-name:--font-super-warming) font-bold text-base text-white tracking-widest transition-opacity hover:opacity-90"
            style={{
              background: "linear-gradient(90deg, #FF9363 0%, #F54C00 100%)",
            }}
          >
            Hire Me →
          </motion.a>
        </div>
        </div>
      </Reveal>

      {/* ════════════════════════════════════════════════════
          NEXT PROJECT TEASER
      ════════════════════════════════════════════════════ */}
      <Reveal>
        <div
          className="max-w-screen-lg mx-auto px-8 md:px-16 py-16 flex items-center justify-between gap-6"
          style={{ borderTop: "1px solid color-mix(in srgb, var(--primary) 12%, transparent)" }}
        >
          <div>
            <p
              className="font-(family-name:--font-urbanist) text-xs font-semibold tracking-[0.2em] uppercase mb-1"
              style={{ color: "color-mix(in srgb, var(--primary) 40%, transparent)" }}
            >
              Next Project
            </p>
            <h3
              className="font-(family-name:--font-super-warming) text-2xl md:text-4xl"
              style={{ color: "var(--primary)" }}
            >
              Spore Scanner
            </h3>
          </div>
          <motion.a
            href="/projects/spore-scanner"
            whileHover={{ x: 6 }}
            transition={{ duration: 0.2 }}
            className="font-(family-name:--font-super-warming) text-sm tracking-widest flex items-center gap-2 shrink-0"
            style={{ color: "var(--accent)" }}
          >
            View →
          </motion.a>
        </div>
      </Reveal>

      {/* ════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
}