"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryImage } from "@/lib/projects/types";
import Reveal from "./shared/reveal";
import SectionLabel from "./shared/section-labels";

interface ProjectGalleryProps {
  images: GalleryImage[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  return (
    <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-12 bg-[var(--background)]">
      <Reveal className="mb-8">
        <SectionLabel>Gallery</SectionLabel>
        <h2
          className="font-[family-name:var(--font-display)] text-2xl md:text-3xl uppercase tracking-tight"
          style={{ color: "var(--primary)" }}
        >
          A Closer <span style={{ color: "var(--accent)" }}>Look</span>
        </h2>
      </Reveal>
      <Reveal>
        <GalleryCarousel images={images} title={title} />
      </Reveal>
    </div>
  );
}

// ── Carousel ──────────────────────────────────────────────────────────────────

function GalleryCarousel({
  images,
  title,
}: {
  images: GalleryImage[];
  title: string;
}) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const [imageDimensions, setImageDimensions] = useState<
    Record<number, { w: number; h: number }>
  >({});

  const go = (idx: number) => {
    setDirection(idx > active ? 1 : -1);
    setActive(idx);
  };
  const prev = () => go((active - 1 + images.length) % images.length);
  const next = () => go((active + 1) % images.length);

  const handleLoad = (
    idx: number,
    e: React.SyntheticEvent<HTMLImageElement>
  ) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    setImageDimensions((dims) => ({ ...dims, [idx]: { w, h } }));
  };

  const dims = imageDimensions[active];
  const aspectRatio = dims ? `${dims.w} / ${dims.h}` : "16 / 9";

  return (
    <div className="w-full select-none">
      <div className="relative group/carousel">
        {/* Ghost index using Shanolia display font */}
        <div
          className="absolute pointer-events-none select-none"
          style={{
            top: "50%",
            right: "1rem",
            transform: "translateY(-65%)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(6rem, 18vw, 14rem)",
            lineHeight: 1,
            color: "rgba(19,27,82,0.04)",
            letterSpacing: "-0.04em",
            zIndex: 0,
          }}
        >
          {String(active + 1).padStart(2, "0")}
        </div>

        {/* Main image container */}
        <div
          className="relative rounded-2xl overflow-hidden border border-[var(--primary)]/5"
          style={{ aspectRatio, zIndex: 1, transition: "aspect-ratio 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={active}
              src={images[active].src}
              alt={images[active].alt}
              className="absolute inset-0 w-full h-full object-cover"
              onLoad={(e) => handleLoad(active, e)}
              custom={direction}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          </AnimatePresence>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <NavButton direction="prev" onClick={prev} />
              <NavButton direction="next" onClick={next} />
            </>
          )}

          {/* Count badge using Urbanist body font */}
          <div
            className="absolute bottom-4 left-4 z-10 font-[family-name:var(--font-body)] text-[10px] font-bold tracking-widest tabular-nums px-3 py-1.5 rounded-md uppercase"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              color: "var(--primary)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(19,27,82,0.08)",
            }}
          >
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Filmstrip elements */}
      {images.length > 1 && (
        <div
          className="flex gap-2.5 mt-5 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => go(i)}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative shrink-0 rounded-lg overflow-hidden bg-[var(--primary)]/5"
              style={{
                width: 80,
                height: 52,
                border:
                  i === active
                    ? "1px solid var(--accent)"
                    : "1px solid rgba(19,27,82,0.08)",
                opacity: i === active ? 1 : 0.4,
                transition: "all 0.3s ease",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
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
      onClick={onClick}
      className={`cursor-pointer absolute ${isPrev ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 md:opacity-0 group-hover/carousel:opacity-100 hover:scale-105 active:scale-95`}
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        border: "1px solid rgba(19,27,82,0.08)",
        color: "var(--primary)",
        backdropFilter: "blur(12px)",
      }}
      aria-label={`${direction} image`}
    >
      {isPrev ? (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
}