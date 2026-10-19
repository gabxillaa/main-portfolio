"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ArrowDown, ZoomIn, ZoomOut, Plus } from "lucide-react";
import { ProjectData } from "@/lib/projects/types";
import Reveal from "./shared/reveal";
import SectionLabel from "./shared/section-labels";

type Step = ProjectData["process"][number];
type StepImage = NonNullable<Step["images"]>[number];
type Insight = NonNullable<Step["insights"]>[number];

interface ProjectProcessProps {
  process: ProjectData["process"];
}

/* ───────────────────────── helpers ───────────────────────── */

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;
const ZOOM_STEP = 0.5;

const ctrlBtn =
  "flex h-9 w-9 items-center justify-center rounded-full border border-[var(--background)]/20 bg-[var(--background)]/10 text-[var(--background)] transition-colors hover:bg-[var(--background)] hover:text-[var(--dark-green)] disabled:opacity-30 disabled:pointer-events-none cursor-pointer";

function groupImages(images: StepImage[]) {
  const groups: { label: string; items: StepImage[] }[] = [];
  images.forEach((img) => {
    const label = img.group ?? "Overview";
    const existing = groups.find((g) => g.label === label);
    if (existing) existing.items.push(img);
    else groups.push({ label, items: [img] });
  });
  return groups;
}

/* ───────────────────────── insights table ───────────────────────── */

function InsightsTable({ insights }: { insights: Insight[] }) {
  return (
    <div className="mt-2 overflow-hidden rounded-2xl border border-[var(--dark-green)]/15 bg-[var(--background)]">
      {/* Header row (desktop only) */}
      <div className="hidden md:grid md:grid-cols-2 border-b border-[var(--dark-green)]/15 bg-[var(--beige)]/20">
        <div className="px-6 py-3 font-[family-name:var(--font-body)] text-xs font-bold uppercase tracking-widest text-[var(--primary)]">
          What we found
        </div>
        <div className="px-6 py-3 font-[family-name:var(--font-body)] text-xs font-bold uppercase tracking-widest text-[var(--dark-green)] md:border-l md:border-[var(--dark-green)]/15">
          What we did
        </div>
      </div>

      {insights.map((insight, j) => (
        <div
          key={j}
          className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--dark-green)]/10 last:border-b-0 transition-colors hover:bg-[var(--beige)]/10"
        >
          <div className="px-5 py-4 md:px-6 md:py-5">
            <span className="mb-1 block md:hidden font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-widest text-[var(--primary)]">
              Found
            </span>
            <p className="m-0 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--light-gray)]">
              {insight.finding}
            </p>
          </div>
          <div className="px-5 pb-4 pt-0 md:px-6 md:py-5 md:border-l md:border-[var(--dark-green)]/10">
            <span className="mb-1 block md:hidden font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-widest text-[var(--dark-green)]">
              Did
            </span>
            <p className="m-0 font-[family-name:var(--font-body)] text-sm font-medium leading-relaxed text-[var(--dark-green)]">
              {insight.decision}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────────── deliverables ───────────────────────── */

function Deliverables({ images, title }: { images: StepImage[]; title: string }) {
  const groups = useMemo(() => groupImages(images), [images]);
  const [open, setOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const areaRef = useRef<HTMLDivElement>(null);
  const natRef = useRef<{ w: number; h: number } | null>(null);
  const [fitW, setFitW] = useState<number | null>(null);

  // width at which the whole image fits inside the viewer area (100% = fit to screen)
  const measure = useCallback(() => {
    const a = areaRef.current;
    const n = natRef.current;
    if (!a || !n) return;
    const scale = Math.min((a.clientWidth - 24) / n.w, (a.clientHeight - 24) / n.h);
    setFitW(n.w * scale);
  }, []);

  // every image opens fit to screen (100%)
  useEffect(() => {
    setZoom(1);
    setFitW(null);
    natRef.current = null;
  }, [lightboxIndex]);

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));

  const group = groups[activeGroup] ?? groups[0];
  const items = group.items;
  const current = lightboxIndex !== null ? items[lightboxIndex] : null;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length]
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP));
      if (e.key === "-") setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP));
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", measure);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", measure);
    };
  }, [lightboxIndex, closeLightbox, prev, next, measure]);

  const switchGroup = (i: number) => {
    setActiveGroup(i);
    stripRef.current?.scrollTo({ left: 0 });
  };

  const scrollStrip = (dir: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const total = images.length;

  return (
    <div className="mt-4 pt-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`group flex w-full items-center justify-between gap-5 rounded-2xl border p-4 text-left transition-all duration-300 cursor-pointer md:gap-6 md:p-5 ${
          open
            ? "border-[var(--primary)]/50 bg-[var(--beige)]/20"
            : "border-[var(--dark-green)]/20 bg-transparent hover:border-[var(--primary)] hover:bg-[var(--beige)]/15 hover:shadow-[0_4px_24px_-8px_rgba(3,40,4,0.12)]"
        }`}
      >
        <span className="flex min-w-0 items-center gap-5">
          {/* overlapping previews of the actual deliverables */}
          <span className="hidden shrink-0 items-center -space-x-5 sm:flex" aria-hidden="true">
            {images.slice(0, 3).map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt=""
                loading="lazy"
                className="h-16 w-16 rounded-xl border-2 border-[var(--background)] bg-[var(--background)] object-cover object-top shadow-sm transition-transform duration-300 group-hover:translate-x-0.5"
                style={{ zIndex: 3 - i }}
              />
            ))}
          </span>
          <span className="flex min-w-0 flex-col gap-1">
            <span className="font-[family-name:var(--font-display)] text-xl font-normal uppercase tracking-tight leading-none text-[var(--dark-green)] md:text-2xl">
              {open ? "Hide" : "View"} related deliverables
            </span>
            <span className="font-[family-name:var(--font-body)] text-sm text-[var(--light-gray)]">
              {total} {total === 1 ? "item" : "items"}
              {groups.length > 1 ? ` across ${groups.length} categories` : ""}
            </span>
          </span>
        </span>
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            open
              ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--background)]"
              : "border-[var(--dark-green)]/25 text-[var(--dark-green)] group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-[var(--background)]"
          }`}
        >
          <Plus className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
        </span>
      </button>

      {open && (
        <div className="mt-6 flex flex-col gap-5">
          {/* CATEGORY TABS */}
          {groups.length > 1 && (
            <div
              role="tablist"
              aria-label={`${title} deliverable categories`}
              className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {groups.map((g, gi) => {
                const selected = gi === activeGroup;
                return (
                  <button
                    key={g.label}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => switchGroup(gi)}
                    className={`shrink-0 inline-flex items-center gap-2.5 rounded-full border px-6 py-3 font-[family-name:var(--font-body)] text-sm font-semibold transition-colors cursor-pointer ${
                      selected
                        ? "border-[var(--dark-green)] bg-[var(--dark-green)] text-[var(--background)]"
                        : "border-[var(--dark-green)]/20 text-[var(--dark-green)]/70 hover:border-[var(--primary)] hover:text-[var(--primary)]"
                    }`}
                  >
                    {g.label}
                    <span
                      className={`font-mono text-xs ${
                        selected ? "text-[var(--background)]/70" : "text-[var(--primary)]"
                      }`}
                    >
                      {g.items.length}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* HORIZONTAL STRIP: fixed height, so it never makes the page longer */}
          <div className="relative">
            <div
              ref={stripRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {items.map((img, ii) => (
                <figure key={`${group.label}-${ii}`} className="m-0 shrink-0 snap-start flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(ii)}
                    aria-label={`Enlarge: ${img.alt}`}
                    className="overflow-hidden rounded-xl border border-[var(--dark-green)]/15 bg-transparent p-0 cursor-zoom-in"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-[220px] md:h-[280px] w-auto max-w-none transition-transform duration-500 hover:scale-[1.01]"
                    />
                  </button>
                  {img.caption && (
                    // w-0 + min-w-full keeps the caption exactly as wide as its image
                    <figcaption className="w-0 min-w-full px-1 font-[family-name:var(--font-body)] text-xs leading-relaxed text-[var(--light-gray)]">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>

            {items.length > 1 && (
              <div className="mt-3 flex items-center justify-between">
                <span className="font-[family-name:var(--font-body)] text-sm text-[var(--light-gray)]">
                  {items.length} in {group.label}, scroll or use the arrows
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => scrollStrip(-1)}
                    aria-label="Scroll left"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--dark-green)]/25 text-[var(--dark-green)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollStrip(1)}
                    aria-label="Scroll right"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--dark-green)]/25 text-[var(--dark-green)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)] cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LIGHTBOX: full screen, fit to screen by default, zoomable */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} deliverable`}
          className="fixed inset-0 z-[60] flex flex-col bg-[var(--dark-green)]/95 backdrop-blur-md"
        >
          {/* top bar */}
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--background)]/60">
              {group.label} · {(lightboxIndex ?? 0) + 1} / {items.length}
            </span>
            <div className="flex items-center gap-2">
              <button type="button" onClick={zoomOut} disabled={zoom <= MIN_ZOOM} aria-label="Zoom out" className={ctrlBtn}>
                <ZoomOut className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoom(1)}
                aria-label="Reset zoom"
                className="w-14 text-center font-mono text-xs text-[var(--background)] cursor-pointer"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button type="button" onClick={zoomIn} disabled={zoom >= MAX_ZOOM} aria-label="Zoom in" className={ctrlBtn}>
                <ZoomIn className="h-4 w-4" />
              </button>
              <button type="button" onClick={closeLightbox} aria-label="Close" className={`${ctrlBtn} ml-2`}>
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* image area: scrolls natively, so zoomed images can be panned */}
          <div key={lightboxIndex} ref={areaRef} className="relative flex min-h-0 flex-1 overflow-auto">
            <img
              src={current.src}
              alt={current.alt}
              onClick={() => setZoom((z) => (z === 1 ? 2 : 1))}
              onLoad={(e) => {
                natRef.current = { w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight };
                measure();
              }}
              style={fitW ? { width: fitW * zoom } : undefined}
              className={`m-auto block h-auto max-w-none shrink-0 rounded-lg border border-[var(--background)]/10 shadow-2xl ${
                fitW ? "" : "opacity-0"
              } ${zoom === 1 ? "cursor-zoom-in" : "cursor-zoom-out"}`}
            />
          </div>

          {current.caption && (
            <p className="m-0 px-4 py-3 text-center font-[family-name:var(--font-body)] text-xs leading-relaxed text-[var(--background)]/80">
              {current.caption}
            </p>
          )}

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous"
                className={`${ctrlBtn} absolute left-3 top-1/2 -translate-y-1/2 md:left-6`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next"
                className={`${ctrlBtn} absolute right-3 top-1/2 -translate-y-1/2 md:right-6`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ───────────────────────── section ───────────────────────── */

export default function ProjectProcess({ process }: ProjectProcessProps) {
  if (!process || process.length === 0) return null;

  return (
    <section id="process" className="relative w-full bg-[var(--background)] py-20 md:py-28 px-6 md:px-12 lg:px-20 selection:bg-[var(--primary)] selection:text-[var(--background)]">
      <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-20">

        {/* ── SECTION HEADER ── */}
        <Reveal>
          <div className="flex flex-col items-start gap-2 border-b border-[var(--dark-green)]/15 pb-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[var(--primary)] font-semibold tracking-wider">
                05.
              </span>
              <SectionLabel>Process</SectionLabel>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-normal uppercase tracking-tight text-[var(--dark-green)] leading-none mt-1">
              How It Came Together
            </h2>
          </div>
        </Reveal>

        {/* ── PROCESS STEPS LIST ── */}
        <div className="flex flex-col gap-12 md:gap-16">
          {process.map((step, i) => (
            <React.Fragment key={i}>
              <Reveal delay={i * 0.05}>
                <div
                  id={step.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start group scroll-mt-24"
                >
                  {/* LEFT COLUMN: PHASE BADGE & ICON */}
                  <div className="col-span-1 lg:col-span-4 flex items-center lg:items-start justify-between lg:justify-start lg:flex-col gap-4 lg:border-r lg:border-[var(--dark-green)]/15 lg:pr-8">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold tracking-widest text-[var(--primary)] uppercase bg-[var(--beige)]/30 px-3 py-1 rounded-full border border-[var(--primary)]/10">
                        Phase 0{i + 1}
                      </span>
                    </div>

                    {step.iconUrl && (
                      <div className="w-10 h-10 rounded-lg bg-transparent border border-[var(--dark-green)]/15 flex items-center justify-center transition-colors duration-300 group-hover:border-[var(--primary)]">
                        <img
                          src={step.iconUrl}
                          alt={step.title}
                          className="w-4 h-4 object-contain transition-opacity duration-300 filter brightness-0 opacity-60 group-hover:opacity-100"
                        />
                      </div>
                    )}
                  </div>

                  {/* RIGHT COLUMN */}
                  <div className="col-span-1 lg:col-span-8 flex flex-col gap-5 lg:pt-1">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal text-[var(--dark-green)] uppercase tracking-tight leading-snug m-0">
                      {step.title}
                    </h3>

                    {step.takeaway && (
                      <div className="border-l-2 border-[var(--primary)] pl-4 py-0.5">
                        <p className="m-0 font-[family-name:var(--font-body)] text-base md:text-lg font-medium leading-relaxed text-[var(--primary)]">
                          {step.takeaway}
                        </p>
                      </div>
                    )}

                    <div className="font-[family-name:var(--font-body)] text-base md:text-lg leading-relaxed text-[var(--light-gray)] antialiased text-left m-0">
                      {step.detail.split("\n\n").map((paragraph, idx) => (
                        <p key={idx} className="mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {step.insights && step.insights.length > 0 && (
                      <InsightsTable insights={step.insights} />
                    )}

                    {step.images && step.images.length > 0 && (
                      <Deliverables images={step.images} title={step.title} />
                    )}
                  </div>
                </div>
              </Reveal>

              {i < process.length - 1 && (
                <div className="w-full border-t border-[var(--dark-green)]/15" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}