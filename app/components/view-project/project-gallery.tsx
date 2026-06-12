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
    <div className="max-w-screen-lg mx-auto px-8 md:px-16 py-12">
      <Reveal className="mb-8">
        <SectionLabel>Gallery</SectionLabel>
        <h2 className="font-(family-name:--font-super-warming) text-2xl md:text-3xl" style={{ color: "var(--primary)" }}>
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

function GalleryCarousel({ images, title }: { images: GalleryImage[]; title: string }) {
  const [active, setActive]       = useState(0);
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
        <div className="relative rounded-2xl overflow-hidden shadow-lg" style={{ aspectRatio: "16/9", zIndex: 1 }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={active}
              src={images[active].src}
              alt={images[active].alt}
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
              <NavButton direction="prev" onClick={prev} />
              <NavButton direction="next" onClick={next} />
            </>
          )}

          {/* Count badge */}
          <div
            className="absolute bottom-3 left-4 z-10 font-(family-name:--font-urbanist) text-xs font-semibold tabular-nums px-2.5 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.8)", color: "var(--primary)", letterSpacing: "0.12em", backdropFilter: "blur(8px)", border: "1px solid rgba(19,27,82,0.08)" }}
          >
            {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Filmstrip */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {images.map((img, i) => (
            <motion.button
              key={i}
              onClick={() => go(i)}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.18 }}
              className="relative shrink-0 rounded-lg overflow-hidden"
              style={{
                width: 88, height: 56,
                border: i === active ? "2px solid var(--accent)" : "2px solid rgba(19,27,82,0.12)",
                boxShadow: i === active ? "0 0 14px rgba(255,147,99,0.35)" : "none",
                opacity: i === active ? 1 : 0.5,
                transition: "all 0.25s ease",
              }}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}

function NavButton({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const isPrev = direction === "prev";
  return (
    <button
      onClick={onClick}
      className={`absolute ${isPrev ? "left-4" : "right-4"} top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110`}
      style={{ background: "rgba(255,255,255,0.85)", border: "1px solid rgba(19,27,82,0.12)", color: "var(--primary)", fontSize: "1rem", backdropFilter: "blur(8px)" }}
    >
      {isPrev ? "←" : "→"}
    </button>
  );
}