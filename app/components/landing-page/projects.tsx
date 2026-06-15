"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects";

// ── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS = projects.map((p) => ({
  id:       p.slug,
  title:    p.title,
  desc:     p.desc,
  gradient: p.gradient,
  slug:     p.slug,
  image:    p.thumbnail,
}));

const PARTICLES = [
  { id: 1,  x: 2,  y: 22, size: 12, dur: 5.2, delay: 0,   color: "var(--accent)",  symbol: "✦" },
  { id: 2,  x: 94, y: 18, size: 16, dur: 6.8, delay: 1.2, color: "#71B5C2",        symbol: "✦" },
  { id: 3,  x: 5,  y: 65, size: 14, dur: 4.5, delay: 0.7, color: "var(--accent)",  symbol: "✦" },
  { id: 4,  x: 91, y: 70, size: 18, dur: 7.1, delay: 2.1, color: "#83E3B6",        symbol: "✦" },
  { id: 5,  x: 15, y: 38, size: 18, dur: 5.8, delay: 3.0, color: "var(--primary)", symbol: "★" },
  { id: 6,  x: 80, y: 32, size: 10, dur: 6.2, delay: 0.4, color: "#71B5C2",        symbol: "★" },
  { id: 7,  x: 50, y: 8,  size: 16, dur: 4.9, delay: 1.8, color: "var(--accent)",  symbol: "✦" },
  { id: 8,  x: 35, y: 78, size: 14, dur: 6.5, delay: 0.9, color: "#BBE0EF",        symbol: "◆" },
  { id: 9,  x: 68, y: 82, size: 18, dur: 5.3, delay: 2.5, color: "var(--accent)",  symbol: "◆" },
  { id: 10, x: 22, y: 14, size: 10, dur: 4.2, delay: 1.5, color: "#83E3B6",        symbol: "•" },
];

// ── Arc math ──────────────────────────────────────────────────────────────────
const arcY       = (n: number, d: number) => d * n * n;
const arcRotate  = (n: number) => n * Math.abs(n) * 18;
const arcScale   = (n: number) => Math.max(0.72, 1.0 - Math.abs(n) * 0.3);
const arcOpacity = (n: number) => {
  const a = Math.abs(n);
  if (a > 0.95) return 0;
  if (a > 0.80) return 1 - (a - 0.80) / 0.15;
  return 1;
};

// ── Responsive dims ───────────────────────────────────────────────────────────
type Dims = { cardW: number; cardH: number; gap: number; arcDepth: number; wrapH: number; speed: number };

function getDims(vw: number): Dims {
  if (vw < 480)  return { cardW: 120, cardH: 170, gap: 12, arcDepth: 40, wrapH: 210, speed: 0.45 };
  if (vw < 768)  return { cardW: 155, cardH: 218, gap: 16, arcDepth: 52, wrapH: 265, speed: 0.50 };
  if (vw < 1024) return { cardW: 178, cardH: 248, gap: 18, arcDepth: 62, wrapH: 295, speed: 0.52 };
  return               { cardW: 200, cardH: 280, gap: 20, arcDepth: 70, wrapH: 330, speed: 0.55 };
}

// ── Animation variants ────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.0, ease: "easeOut" as const } },
};

const carouselReveal: Variants = {
  hidden:  { opacity: 0, y: 60, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function ArcCarousel() {
  const router       = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef   = useRef<HTMLElement>(null);
  const rafRef       = useRef<number>(0);
  const offsetRef    = useRef(0);
  const pausedRef    = useRef(false);
  const dragRef = useRef<{ active: boolean; startX: number; startOffset: number; moved: boolean; trackLen: number }>({
    active: false,
    startX: 0,
    startOffset: 0,
    moved: false,
    trackLen: 0,
  });
  const hoveredIdxRef    = useRef<number | null>(null);
  const hoverProgressRef = useRef<Map<number, number>>(new Map());

  // Trigger animations when section enters viewport
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  const [dims, setDims] = useState<Dims>(() =>
    typeof window !== "undefined" ? getDims(window.innerWidth) : getDims(1280)
  );

  useEffect(() => {
    const onResize = () => setDims(getDims(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ── RAF loop ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const { cardW, cardH, gap, arcDepth, wrapH, speed } = dims;
    const step     = cardW + gap;
    const TOTAL    = PROJECTS.length;
    const trackLen = TOTAL * step;
    const HOVER_LIFT = 22;

    function frame() {
      const el = containerRef.current;
      if (!el) return;

      if (!pausedRef.current) offsetRef.current = (offsetRef.current + speed) % trackLen;

      const wrapW   = el.parentElement?.offsetWidth ?? 900;
      const centerX = wrapW / 2;
      const cardEls = el.children as HTMLCollectionOf<HTMLElement>;
      const n       = cardEls.length;
      const baseIdx = Math.floor(offsetRef.current / step) - Math.floor(n / 2);

      for (let i = 0; i < n; i++) {
        const card  = cardEls[i];
        const idx   = baseIdx + i;
        const rawX  = idx * step - offsetRef.current + centerX - cardW / 2;
        const normX = (rawX + cardW / 2 - centerX) / (wrapW * 0.5);

        const isHovered = hoveredIdxRef.current === i;
        const prev = hoverProgressRef.current.get(i) ?? 0;
        const next = isHovered
          ? Math.min(1, prev + 0.07)
          : Math.max(0, prev - 0.07);
        hoverProgressRef.current.set(i, next);
        const hp = next;

        const t = hp * hp * (3 - 2 * hp);

        const lift       = t * HOVER_LIFT;
        const extraScale = 1 + t * 0.06;

        card.style.left      = `${rawX}px`;
        card.style.bottom    = `${wrapH - cardH - arcY(normX, arcDepth) + lift}px`;
        card.style.width     = `${cardW}px`;
        card.style.height    = `${cardH}px`;
        card.style.transform = `rotate(${arcRotate(normX)}deg) scale(${arcScale(normX) * extraScale})`;
        card.style.opacity   = `${arcOpacity(normX)}`;
        card.style.zIndex    = t > 0.01 ? "50" : `${Math.round((1 - Math.abs(normX)) * 20)}`;

        const glowA = (t * 0.55).toFixed(2);
        const glowB = (t * 0.35).toFixed(2);
        card.style.boxShadow = t > 0.01
          ? `0 ${8 + t * 32}px ${24 + t * 40}px rgba(22,30,84,${glowA}), 0 0 ${20 + t * 40}px rgba(113,181,194,${glowB}), 0 0 ${8 + t * 20}px rgba(255,132,75,${(t * 0.3).toFixed(2)})`
          : "0 8px 32px rgba(22,30,84,0.12)";

        const dataIdx = ((idx % TOTAL) + TOTAL) % TOTAL;
        const proj    = PROJECTS[dataIdx];

        const overlay    = card.querySelector<HTMLElement>(".arc-hover-overlay");
        const labelRest  = card.querySelector<HTMLElement>(".arc-label-rest");
        const labelHover = card.querySelector<HTMLElement>(".arc-label-hover");
        const titleHoverEl = card.querySelector<HTMLElement>(".arc-title-hover");
        if (overlay)    overlay.style.opacity    = String(t);
        if (labelRest)  labelRest.style.opacity  = String(1 - t);
        if (labelHover) labelHover.style.opacity = String(t);
        if (titleHoverEl && titleHoverEl.textContent !== proj.title) {
          titleHoverEl.textContent = proj.title;
        }

        if (card.dataset.projId !== proj.id) {
          card.dataset.projId = proj.id;
          card.dataset.slug   = proj.slug;

          const bg = card.querySelector<HTMLElement>(".arc-bg");
          if (bg) bg.style.background = proj.gradient;
          const titleEl = card.querySelector<HTMLElement>(".arc-title");
          if (titleEl) titleEl.textContent = proj.title;
          const descEl = card.querySelector<HTMLElement>(".arc-desc");
          if (descEl) descEl.textContent = proj.desc;
          const imgEl = card.querySelector<HTMLImageElement>(".arc-img");
          if (imgEl) { imgEl.src = proj.image; imgEl.alt = proj.title; }
          const hoverTitle = card.querySelector<HTMLElement>(".arc-title-hover");
          if (hoverTitle) hoverTitle.textContent = proj.title;
        }
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, [dims]);

  // ── Pointer handlers — all card-level now ─────────────────────────────────
    function onCardPointerDown(e: React.PointerEvent<HTMLDivElement>) {
  pausedRef.current = true;
  dragRef.current = {
    active:      true,
    startX:      e.clientX,
    startOffset: offsetRef.current,
    moved:       false,
    trackLen:    PROJECTS.length * (dims.cardW + dims.gap),
  };
  try {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  } catch {}
  e.stopPropagation();
}

function onCardPointerMove(e: React.PointerEvent<HTMLDivElement>) {
  if (!dragRef.current.active) return;
  const delta = Math.abs(e.clientX - dragRef.current.startX);
  if (delta > 6) dragRef.current.moved = true;
  const trackLen    = dragRef.current.trackLen;
  const offsetDelta = dragRef.current.startX - e.clientX;
  offsetRef.current = ((dragRef.current.startOffset + offsetDelta) % trackLen + trackLen) % trackLen;
  e.stopPropagation();
}

function endDrag(e: React.PointerEvent<HTMLDivElement>) {
  dragRef.current.active = false;
  try {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  } catch {}
  setTimeout(() => { pausedRef.current = false; }, 1200);
  e.stopPropagation();
}

    function onCardPointerUp(e: React.PointerEvent<HTMLDivElement>) {
      dragRef.current.active = false;
      setTimeout(() => { pausedRef.current = false; }, 1200);
      e.stopPropagation();
    }

    function onCardClick(e: React.MouseEvent<HTMLDivElement>) {
      if (dragRef.current.moved) {
        dragRef.current.moved = false;
        return;
      }
      const slug = (e.currentTarget as HTMLElement).dataset.slug;
      if (slug) router.push(`/view-project/${slug}`);
    }

    function onCardEnter(e: React.MouseEvent<HTMLDivElement>) {
      pausedRef.current = true;
      hoveredIdxRef.current = Number((e.currentTarget as HTMLElement).dataset.poolIdx);
    }

    function onCardLeave() {
      pausedRef.current = false;
      hoveredIdxRef.current = null;
    }

  const poolSize = PROJECTS.length * 3;

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative flex flex-col items-center overflow-hidden w-full bg-(--background)"
      style={{ minHeight: "100dvh", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {/* ── Ambient glows — fade in ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-[#71B5C2]/25 blur-[110px]" />
        <div className="absolute top-0 -right-32 w-[480px] h-[480px] rounded-full bg-[#FF844B]/20 blur-[100px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[700px] h-[320px] rounded-full bg-[#FFD580]/25 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] rounded-full bg-[#83E3B6]/20 blur-[90px]" />
      </motion.div>

      {/* ── Floating particles — each staggered ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            // entrance: scale + fade in staggered
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? {
              opacity: [0, 0.7, 1, 0.7],
              scale:   [0, 1.2, 1, 1.5, 1],
              y:       [0, -32, 0],
              x:       [0, p.id % 2 === 0 ? 14 : -14, 0],
              rotate:  [0, p.id % 3 === 0 ? 180 : 0, 0],
            } : { opacity: 0, scale: 0 }}
            transition={{
              duration:   p.dur,
              delay:      0.4 + i * 0.07, // stagger entrance
              repeat:     Infinity,
              ease:       "easeInOut" as const,
            }}
          >
            <span style={{ color: p.color, fontSize: p.size, lineHeight: 1, display: "block", filter: `drop-shadow(0 0 8px ${p.color}) drop-shadow(0 0 18px ${p.color})` }}>
              {p.symbol}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ── Decorative blobs — fade + scale in ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {[
          { w: 180, h: 180, top: "15%", left: "8%",   color: "var(--light-blue)", dur: 8, delay: 0 },
          { w: 140, h: 140, top: "55%", right: "6%",  color: "var(--accent)",     dur: 9, delay: 2 },
          { w: 100, h: 100, bottom: "30%", left: "30%", color: "#83E3B6",         dur: 7, delay: 4 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: b.w, height: b.h, ...b, background: `radial-gradient(circle, color-mix(in srgb, ${b.color} 30%, transparent), transparent 70%)` }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isInView ? {
              opacity: [0, 0.35, 0.65, 0.35],
              scale:   [0.6, 1, 1.2, 1],
            } : { opacity: 0, scale: 0.6 }}
            transition={{
              duration: b.dur,
              delay:    0.3 + i * 0.2,
              repeat:   Infinity,
              ease:     "easeInOut" as const,
            }}
          />
        ))}
      </div>

      {/* ── Heading — fade up ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.15 }}
        className="relative text-center z-10 px-4 pt-20 pb-2 shrink-0"
        style={{ overflow: "visible" }}
      >
        <div className="absolute hidden xl:flex flex-col items-start" style={{ right: "calc(100% + 16px)", top: 68, overflow: "visible" }}>
          <span style={{ fontFamily: "cursive", fontSize: 15, color: "var(--primary)", whiteSpace: "nowrap", opacity: 0.75, transform: "rotate(-10deg)", display: "block", transformOrigin: "left center" }}>check these out</span>
          <svg width="80" height="44" viewBox="0 0 80 44" fill="none" style={{ overflow: "visible", marginTop: 4 }}>
            <path d="M 8 6 C 20 6, 58 10, 70 36" stroke="var(--primary)" strokeWidth="2" fill="none" strokeLinecap="round" strokeOpacity="0.7" />
            <path d="M 59 30 L 70 36 L 65 24" stroke="var(--primary)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.85" />
          </svg>
        </div>

        <h2
          className="font-(family-name:--font-super-warming) font-black text-(--primary) uppercase tracking-wide leading-none"
          style={{ fontSize: "clamp(1.8rem, 7vw, 5rem)", textShadow: "0 4px 30px color-mix(in srgb, var(--primary) 8%, transparent)" }}
        >
          Thingsssss I&apos;ve{" "}
          <span className="text-(--accent)" style={{ textShadow: "0 4px 30px color-mix(in srgb, var(--accent) 30%, transparent)" }}>Built</span>
        </h2>

        <div className="absolute hidden xl:flex flex-col items-end" style={{ left: "calc(100% + 16px)", top: 118, overflow: "visible" }}>
          <span style={{ fontFamily: "cursive", fontSize: 15, color: "var(--accent)", whiteSpace: "nowrap", opacity: 0.75, transform: "rotate(8deg)", display: "block", transformOrigin: "right center" }}>explore my work</span>
          <svg width="80" height="44" viewBox="0 0 80 44" fill="none" style={{ overflow: "visible", marginTop: 4 }}>
            <path d="M 72 6 C 60 6, 22 10, 10 36" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeOpacity="0.7" />
            <path d="M 21 30 L 10 36 L 15 24" stroke="var(--accent)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.85" />
          </svg>
        </div>
      </motion.div>

      {/* ── Subtitle — fade up, slightly delayed ── */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ delay: 0.3 }}
        className="font-(family-name:--font-urbanist) text-sm md:text-base mt-4 mb-0 max-w-xs md:max-w-sm text-center leading-relaxed relative z-10 px-6 shrink-0"
        style={{ color: "color-mix(in srgb, var(--text) 50%, transparent)" }}
      >
        A curated collection of my favorite projects — each one a story worth telling.
      </motion.p>

      {/* ── Arc Carousel — rises up last ── */}
      <motion.div
          variants={carouselReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.5 }}
          className="relative w-full z-10 shrink-0 select-none"
          style={{ height: dims.wrapH, marginTop: 48, cursor: "grab", overflow: "visible" }}
          onMouseLeave={() => {
            pausedRef.current   = false;
            dragRef.current.active = false;
            hoveredIdxRef.current  = null;
          }}
        >
        {/* ── Edge fades ── */}
        <div className="pointer-events-none absolute inset-0 z-20" style={{ overflow: "hidden" }}>
          <div className="absolute left-0 top-0 bottom-0" style={{ width: "clamp(60px,12vw,140px)", background: "linear-gradient(to right, var(--background) 0%, transparent 100%)" }} />
          <div className="absolute right-0 top-0 bottom-0" style={{ width: "clamp(60px,12vw,140px)", background: "linear-gradient(to left, var(--background) 0%, transparent 100%)" }} />
        </div>

        {/* ── Card pool ── */}
        <div ref={containerRef} className="absolute inset-0" style={{ pointerEvents: "none", overflow: "visible" }}>
          {Array.from({ length: poolSize }).map((_, i) => {
            const proj = PROJECTS[i % PROJECTS.length];
            return (
              <div
                key={i}
                data-pool-idx={i}
                data-proj-id={proj.id}
                data-slug={proj.slug}
                onClick={onCardClick}
                onMouseEnter={onCardEnter}
                onMouseLeave={onCardLeave}
                onPointerDown={onCardPointerDown}
                onPointerMove={onCardPointerMove}
                onPointerUp={onCardPointerUp}
                onPointerCancel={endDrag}
                style={{
                  position:        "absolute",
                  borderRadius:    16,
                  willChange:      "transform, opacity, box-shadow, bottom",
                  touchAction:     "none",
                  transformOrigin: "bottom center",
                  cursor:          "pointer",
                  pointerEvents:   "auto",
                  width:           dims.cardW,
                  height:          dims.cardH,
                }}
              >
                {/* Inner clip wrapper */}
                <div style={{ position: "absolute", inset: 0, borderRadius: 16, overflow: "hidden", pointerEvents: "none" }}>
                  {/* Gradient bg + image */}
                  <div className="arc-bg absolute inset-0" style={{ background: proj.gradient }}>
                    <img
                      className="arc-img absolute inset-0 w-full h-full object-cover"
                      src={proj.image} alt={proj.title} draggable={false}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>

                  {/* ── Hover overlay ── */}
                  <div className="arc-hover-overlay absolute inset-0" style={{
                    background: "linear-gradient(160deg, rgba(8,10,28,0.55) 0%, rgba(8,10,28,0.82) 100%)",
                    opacity: 0,
                    transition: "opacity 0.01s linear",
                  }} />

                  {/* ── Resting label ── */}
                  <div className="arc-label-rest absolute bottom-0 left-0 right-0" style={{
                    padding: `${dims.cardW * 0.18}px ${dims.cardW * 0.07}px ${dims.cardW * 0.07}px`,
                    background: "linear-gradient(to top, color-mix(in srgb, var(--primary) 88%, transparent) 0%, transparent 100%)",
                    transition: "opacity 0.01s linear",
                  }}>
                    <span className="arc-title font-(family-name:--font-super-warming) block text-white uppercase" style={{ fontSize: dims.cardW * 0.082, fontWeight: 700, lineHeight: 1.1, letterSpacing: "0.05em" }}>{proj.title}</span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="arc-desc font-(family-name:--font-urbanist) block" style={{ fontSize: dims.cardW * 0.055, color: "var(--light-blue)", opacity: 0.9 }}>{proj.desc}</span>
                      <span style={{ color: "var(--accent)", fontSize: dims.cardW * 0.055, opacity: 0.9 }}>→</span>
                    </div>
                  </div>

                  {/* ── Hover content ── */}
                  <div className="arc-label-hover absolute inset-0 flex flex-col items-center justify-center gap-3" style={{
                    padding: `${dims.cardW * 0.08}px`,
                    opacity: 0,
                    transition: "opacity 0.01s linear",
                  }}>
                    <span className="arc-title-hover font-(family-name:--font-super-warming) text-white uppercase text-center" style={{ fontSize: dims.cardW * 0.09, fontWeight: 700, lineHeight: 1.1, letterSpacing: "0.05em", textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
                      {proj.title}
                    </span>
                    <span
                      className="font-(family-name:--font-urbanist)"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 5,
                        background: "var(--accent)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: dims.cardW * 0.056,
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        padding: `${dims.cardW * 0.032}px ${dims.cardW * 0.1}px`,
                        borderRadius: 999,
                        boxShadow: "0 4px 20px rgba(255,132,75,0.45), 0 2px 8px rgba(0,0,0,0.3)",
                        whiteSpace: "nowrap",
                        marginTop: dims.cardW * 0.02,
                      }}
                    >
                      View Project
                      <span style={{ fontSize: dims.cardW * 0.07 }}>→</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

    </section>
  );
}