"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryImage } from "@/lib/projects/types";
import Reveal from "./shared/reveal";
import SectionLabel from "./shared/section-labels";

interface ProjectGalleryProps {
  images: GalleryImage[];
  title: string;
}

// Group images by their `group` field, keeping first-appearance order (= tab order).
function groupImages(images: GalleryImage[]) {
  const groups: { label: string; items: GalleryImage[] }[] = [];
  images.forEach((img) => {
    const label = img.group ?? "Screens";
    const existing = groups.find((g) => g.label === label);
    if (existing) existing.items.push(img);
    else groups.push({ label, items: [img] });
  });
  return groups;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section id="gallery" className="relative w-full bg-[var(--background)] py-16 md:py-20 px-6 md:px-12 lg:px-20 selection:bg-[var(--primary)] selection:text-[var(--background)]">
      <div className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-16">

        {/* ── SECTION HEADER ── */}
        <Reveal>
          <div className="flex flex-col items-start gap-2 border-b border-[var(--dark-green)]/15 pb-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[var(--primary)] font-semibold tracking-wider">
                04.
              </span>
              <SectionLabel>Gallery</SectionLabel>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-normal uppercase tracking-tight text-[var(--dark-green)] leading-none mt-1">
              A Closer <span style={{ color: "var(--primary)" }}>Look</span>
            </h2>
          </div>
        </Reveal>

        {/* ── CAROUSEL SYSTEM ── */}
        <Reveal>
          <GalleryCarousel images={images} title={title} />
        </Reveal>

      </div>
    </section>
  );
}

// ── Carousel Component ────────────────────────────────────────────────────────

function GalleryCarousel({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const groups = useMemo(() => groupImages(images), [images]);
  const [activeGroup, setActiveGroup] = useState(0);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  // keyed by src so sizes survive switching categories
  const [imageDimensions, setImageDimensions] = useState<
    Record<string, { w: number; h: number }>
  >({});

  const group = groups[activeGroup] ?? groups[0];
  const items = group.items;
  const current = items[active] ?? items[0];

  const go = (idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };
  const prev = () => go((active - 1 + items.length) % items.length);
  const next = () => go((active + 1) % items.length);

  const switchGroup = (gi: number) => {
    if (gi === activeGroup) return;
    setDirection(gi > activeGroup ? 1 : -1);
    setActiveGroup(gi);
    setActive(0);
  };

  const handleLoad = (
    src: string,
    e: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    setImageDimensions((dims) => ({ ...dims, [src]: { w, h } }));
  };

  const dims = imageDimensions[current.src];
  const aspectRatio = dims ? `${dims.w} / ${dims.h}` : "16 / 9";

  return (
    <div className="w-full select-none flex flex-col gap-6">

      {/* CATEGORY TABS */}
      {groups.length > 1 && (
        <div
          role="tablist"
          aria-label={`${title} gallery categories`}
          className="flex flex-wrap gap-3"
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
                className={`inline-flex items-center gap-2.5 rounded-full border px-6 py-3 font-[family-name:var(--font-body)] text-sm font-semibold transition-colors cursor-pointer ${
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

      <div className="relative group/carousel w-full">

        {/* GHOST INDEX BACKGROUND */}
        <div
          className="absolute pointer-events-none select-none right-4 top-1/2 -translate-y-1/2 font-[family-name:var(--font-display)] text-[clamp(6rem,18vw,12rem)] leading-none text-[var(--dark-green)]/[0.04] tracking-tighter z-0"
        >
          {String(active + 1).padStart(2, "0")}
        </div>

        {/* MAIN IMAGE CONTAINER */}
        <div
          className="relative rounded-2xl overflow-hidden border border-[var(--dark-green)]/15 bg-[var(--background)] shadow-2xs"
          style={{
            aspectRatio,
            zIndex: 1,
            transition: "aspect-ratio 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt || `${title} ${group.label} ${active + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              onLoad={(e) => handleLoad(current.src, e)}
              custom={direction}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          </AnimatePresence>

          {/* NAV ARROWS */}
          {items.length > 1 && (
            <>
              <NavButton direction="prev" onClick={prev} />
              <NavButton direction="next" onClick={next} />
            </>
          )}

          {/* CATEGORY + COUNT BADGE */}
          <div
            className="absolute bottom-4 left-4 z-10 font-mono text-[11px] font-bold tracking-widest tabular-nums px-3.5 py-1.5 rounded-full uppercase bg-[var(--background)]/90 text-[var(--dark-green)] backdrop-blur-md border border-[var(--dark-green)]/15 shadow-2xs"
          >
            {groups.length > 1 && `${group.label} · `}
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* FILMSTRIP THUMBNAILS (current category only) */}
      {items.length > 1 && (
        <div
          className="flex gap-3 overflow-x-auto pb-2 pt-1"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              onClick={() => go(i)}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`relative shrink-0 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                i === active
                  ? "border-2 border-[var(--primary)] opacity-100 shadow-2xs"
                  : "border border-[var(--dark-green)]/15 opacity-50 hover:opacity-80"
              }`}
              style={{
                width: 84,
                height: 56,
              }}
            >
              <img
                src={img.src}
                alt={img.alt || `Thumbnail ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

function NavButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer absolute ${
        isPrev ? "left-4" : "right-4"
      } top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-[var(--background)]/90 text-[var(--dark-green)] backdrop-blur-md border border-[var(--dark-green)]/15 md:opacity-0 group-hover/carousel:opacity-100 hover:scale-105 active:scale-95 shadow-2xs`}
      aria-label={`${direction} image`}
    >
      {isPrev ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
}