"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { ProjectData } from "@/lib/projects/types";
import { DEFAULT_JUMP_LINKS } from "@/lib/projects/jump-links";
import { fadeUp, stagger } from "./shared/variants";
import { ArrowUpRight, ArrowLeft, ChevronDown, Compass, Layers } from "lucide-react";

interface ProjectHeroProps {
  project: ProjectData;
}

// Sections already have generous top padding, so no extra offset is needed
const SCROLL_OFFSET = 0;

export default function ProjectHero({ project }: ProjectHeroProps) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const jumpRowRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });

  const [showStickyNav, setShowStickyNav] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  // Start with every default link so the UI always renders
  const [jumpLinks, setJumpLinks] = useState<typeof DEFAULT_JUMP_LINKS>(DEFAULT_JUMP_LINKS);

  const overview = project.overview;
  const overviewItems = [
    { label: "Role", value: overview?.role },
    { label: "Team", value: overview?.team },
    { label: "Timeline", value: overview?.timeline },
    { label: "Platforms", value: overview?.platforms },
  ].filter((item) => item.value);

  const activeIndex = jumpLinks.findIndex((l) => l.href === activeHref);
  const activeLink = activeIndex >= 0 ? jumpLinks[activeIndex] : null;

  // Drop links whose section isn't on this page, but never end up with an empty list
  useEffect(() => {
    const found = DEFAULT_JUMP_LINKS.filter((l) => document.querySelector(l.href));
    setJumpLinks(found.length > 0 ? found : DEFAULT_JUMP_LINKS);
  }, [project.slug]);

  // Show the floating nav once the inline row has scrolled away, and track the current section
  useEffect(() => {
    if (jumpLinks.length === 0) return;

    const update = () => {
      const row = jumpRowRef.current;
      if (row) setShowStickyNav(row.getBoundingClientRect().bottom < 0);

      let current: string | null = null;
      for (const link of jumpLinks) {
        const el = document.querySelector(link.href);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = link.href;
        }
      }
      setActiveHref(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [jumpLinks]);

  // Close the mobile dropdown on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Close the dropdown when the floating nav hides
  useEffect(() => {
    if (!showStickyNav) setMenuOpen(false);
  }, [showStickyNav]);

  const handleJump = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── FLOATING NAV: FULL BAR ON LARGE SCREENS, DROPDOWN PILL BELOW lg ── */}
      <AnimatePresence>
        {showStickyNav && jumpLinks.length > 0 && (
          <motion.div
            key="sticky-jump-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-3 sm:top-5 z-50 flex justify-center px-3 sm:px-4 pointer-events-none"
          >
            {/* DESKTOP: all links visible */}
            <nav
              aria-label="Sticky Jump Navigation"
              className="pointer-events-auto hidden lg:flex max-w-full items-center gap-1.5 rounded-full border border-[var(--dark-green)]/30 bg-[var(--background)] p-2.5 shadow-[0_20px_50px_rgba(3,40,4,0.2)] backdrop-blur-2xl ring-2 ring-[var(--primary)]/20"
            >
              <div className="flex shrink-0 items-center gap-2 pl-3.5 pr-3 border-r border-[var(--dark-green)]/20 mr-1 select-none">
                <Layers className="w-4 h-4 text-[var(--primary)]" />
                <span className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-[var(--dark-green)] font-bold">
                  Sections
                </span>
              </div>

              {jumpLinks.map((link, idx) => {
                const isActive = activeHref === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleJump(e, link.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative isolate whitespace-nowrap rounded-full px-4 py-2 font-[family-name:var(--font-body)] text-sm tracking-wider transition-colors duration-300 ${
                      isActive
                        ? "text-[var(--background)] font-bold"
                        : "text-[var(--dark-green)]/90 hover:text-[var(--primary)] hover:bg-[var(--beige)]/40"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeJumpTab"
                        className="absolute inset-0 -z-10 rounded-full bg-[var(--primary)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="opacity-60 mr-1.5 font-[family-name:var(--font-display)] text-xs">
                      0{idx + 1}.
                    </span>
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* MOBILE / TABLET: collapsed pill with dropdown */}
            <div ref={menuRef} className="pointer-events-auto relative w-full max-w-sm lg:hidden">
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
                aria-label="Jump to section"
                className="flex w-full items-center justify-between gap-3 rounded-full border border-[var(--dark-green)]/25 bg-[var(--background)] px-5 py-3 shadow-lg cursor-pointer transition-colors duration-300 hover:border-[var(--primary)]/50"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="shrink-0 font-[family-name:var(--font-display)] text-sm text-[var(--primary)]">
                    {activeIndex >= 0 ? `0${activeIndex + 1}` : "—"}
                  </span>
                  <span className="truncate font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-wider text-[var(--dark-green)]">
                    {activeLink ? activeLink.label : "Jump to section"}
                  </span>
                </span>

                <span className="flex shrink-0 items-center gap-2">
                  {activeIndex >= 0 && (
                    <span className="font-[family-name:var(--font-body)] text-xs tabular-nums text-[var(--dark-green)]/50">
                      {activeIndex + 1}/{jumpLinks.length}
                    </span>
                  )}
                  <ChevronDown
                    className={`h-4 w-4 text-[var(--primary)] transition-transform duration-300 ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  />
                </span>
              </button>

              <AnimatePresence>
                {menuOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 right-0 top-full mt-2 m-0 max-h-[70vh] list-none overflow-y-auto rounded-2xl border border-[var(--dark-green)]/15 bg-[var(--background)] p-2 shadow-xl"
                  >
                    {jumpLinks.map((link, idx) => {
                      const isActive = activeHref === link.href;
                      return (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            onClick={(e) => handleJump(e, link.href)}
                            aria-current={isActive ? "true" : undefined}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 font-[family-name:var(--font-body)] text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                              isActive
                                ? "bg-[var(--primary)] text-[var(--background)]"
                                : "text-[var(--dark-green)] hover:bg-[var(--beige)]/40 hover:text-[var(--primary)]"
                            }`}
                          >
                            <span
                              className={`font-[family-name:var(--font-display)] text-sm ${
                                isActive ? "opacity-80" : "opacity-50"
                              }`}
                            >
                              0{idx + 1}
                            </span>
                            {link.label}
                          </a>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO CONTAINER (FITS IN ONE SCREEN) ── */}
      <section
        ref={ref}
        className="relative w-full min-h-screen bg-[var(--background)] py-8 md:py-12 px-6 md:px-12 lg:px-20 selection:bg-[var(--primary)] selection:text-[var(--background)] flex flex-col justify-between  overflow-hidden"
      >
        {/* ── SUBTLE DARK-GREEN WATERMARK BACKGROUND ── */}
        <div className="absolute inset-x-0 top-20 flex justify-center pointer-events-none select-none overflow-hidden h-full z-0">
          <span className="font-[family-name:var(--font-display)] uppercase text-[var(--dark-green)] opacity-[0.035] leading-none tracking-tighter whitespace-nowrap text-[24vw]">
            {project.title}
          </span>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col justify-between h-full flex-1 gap-6">
          {/* ── TOP UTILITY ROW ── */}
          <div className="w-full flex items-center justify-between border-b border-[var(--dark-green)]/15 pb-4">
            <button
              onClick={() => router.back()}
              className="group inline-flex items-center gap-2.5 font-[family-name:var(--font-body)] text-xs text-[var(--dark-green)]/80 hover:text-[var(--primary)] uppercase tracking-widest font-semibold transition-all duration-300 bg-transparent border border-[var(--dark-green)]/20 hover:border-[var(--primary)]/50 px-4 py-1.5 rounded-full cursor-pointer backdrop-blur-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Go Back</span>
            </button>

            <span className="font-[family-name:var(--font-body)] text-xs tracking-widest text-[var(--primary)] uppercase font-bold">
              Case Study
            </span>
          </div>

          {/* ── MAIN CONTENT GRID ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto"
          >
            {/* LEFT COLUMN: TITLE, TAGLINE & PRIMARY CTA */}
            <div className="col-span-1 lg:col-span-7 flex flex-col items-start gap-5">
              <motion.h1
                variants={fadeUp}
                className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight uppercase text-[var(--dark-green)] leading-[0.92]"
              >
                {project.title}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="font-[family-name:var(--font-body)] text-base md:text-xl leading-relaxed text-[var(--light-gray)] font-light max-w-xl"
              >
                {project.impactSummary}
              </motion.p>

              {project.liveUrl && (
                <motion.div variants={fadeUp} className="pt-1">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-xl font-[family-name:var(--font-body)] text-xs font-bold tracking-widest uppercase text-[var(--background)] bg-[var(--primary)] hover:bg-[var(--dark-green)] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    <span>Visit Project</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </motion.div>
              )}
            </div>

            {/* RIGHT COLUMN: PROJECT DETAILS SIDEBAR */}
            {overviewItems.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="col-span-1 lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[var(--dark-green)]/15 pt-6 lg:pt-0 lg:pl-10"
              >
                <div className="flex items-center gap-2 pb-4 border-b border-[var(--dark-green)]/15 mb-4">
                  <Compass className="w-4 h-4 text-[var(--primary)]" />
                  <span className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-[var(--dark-green)] font-extrabold">
                    Project Details
                  </span>
                </div>

                <dl className="grid grid-cols-2 gap-x-6 gap-y-4 m-0">
                  {overviewItems.map((item) => (
                    <div key={item.label} className="flex flex-col gap-1">
                      <dt className="font-[family-name:var(--font-body)] text-xs tracking-widest uppercase text-[var(--primary)] font-bold">
                        {item.label}
                      </dt>
                      <dd className="font-[family-name:var(--font-body)] text-xs md:text-sm text-[var(--dark-green)] font-medium leading-snug m-0">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            )}
          </motion.div>

          {/* ── INLINE JUMP NAVIGATION (WRAPS) ── */}
          {jumpLinks.length > 0 && (
            <motion.nav
              ref={jumpRowRef}
              variants={fadeUp}
              aria-label="Jump to section"
              className="w-full pt-6 border-t border-[var(--dark-green)]/15 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2"
            >
              <h2 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold uppercase tracking-tight text-[var(--dark-green)] m-0 shrink-0">
                Jump To Section
              </h2>

              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 lg:justify-end">
                {jumpLinks.map((link, idx) => {
                  const isActive = activeHref === link.href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleJump(e, link.href)}
                      className={`group inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border transition-all duration-300 font-[family-name:var(--font-body)] text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
                        isActive
                          ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--background)] shadow-md"
                          : "border-[var(--dark-green)]/25 bg-[var(--background)] text-[var(--dark-green)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--beige)]/30 hover:shadow-xs"
                      }`}
                    >
                      <span className="font-[family-name:var(--font-display)] text-xs opacity-60 group-hover:opacity-100 transition-opacity">
                        0{idx + 1}.
                      </span>
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </div>
      </section>
    </>
  );
}