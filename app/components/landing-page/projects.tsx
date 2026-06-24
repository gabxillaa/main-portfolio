"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";

import "swiper/css";

export default function ArcCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(1);
  const totalSlides = projects.length;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen md:h-screen bg-[var(--background)] overflow-hidden px-4 md:px-12 lg:px-16 flex flex-col justify-between pt-8 pb-6 md:py-12 gap-6"
    >
      {/* ── ROW 1: Editorial Section Header ── */}
      {/* Fixed: Restructured layout using flex justification to anchor description to the absolute right edge */}
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-end gap-4 shrink-0 selection:bg-[var(--primary)] selection:text-[var(--background)]">
        <div className="flex flex-col items-start">
          <span className="text-xs font-[family-name:var(--font-body)] tracking-[0.3em] text-[var(--primary)] font-bold block mb-1 uppercase">
            Selected Works
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight uppercase leading-none text-[var(--primary)]">
            Projects
          </h2>
        </div>

        {/* Fixed: Set text-right, justified-end, and balanced max-width to cleanly flush against the carousel frame boundary */}
        <div className="hidden sm:block max-w-sm text-right self-end">
          <p className="font-[family-name:var(--font-body)] text-sm md:text-base leading-relaxed text-[var(--dark-green)] space-y-5 max-w-xl text-left font-light">
            A curated deep dive into sequential case studies. Scroll with a wheel, use your keyboard arrows, or use the interactive frame dashboard below to browse.
          </p>
        </div>
      </div>

      {/* ── ROW 2: Screen-Bounded Dynamic Slide Runway ── */}
      <div className="relative w-full h-[48vh] md:h-auto md:flex-1 min-h-[300px] overflow-hidden shrink-0 md:shrink font-sans">
        <div className="w-full h-full max-w-6xl mx-auto py-1">
          <Swiper
            navigation={{
              prevEl: ".custom-editorial-prev",
              nextEl: ".custom-editorial-next",
            }}
            mousewheel={{ forceToAxis: true }}
            keyboard={{ enabled: true }}
            modules={[Navigation, Mousewheel, Keyboard]}
            spaceBetween={20}
            slidesPerView={1}
            grabCursor={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex + 1)}
            className="mySwiper w-full h-full overflow-hidden rounded-xl"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={project.slug} className="w-full h-full">
                <article
                  onClick={() => router.push(`/view-project/${project.slug}`)}
                  className="group relative w-full h-full cursor-pointer select-none overflow-hidden bg-[var(--dark-green)]/5 rounded-xl"
                >
                  {/* Backdrop Image Asset */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      draggable={false}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>

                  {/* Layout Overlay Mask */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--dark-green)]/95 via-[var(--dark-green)]/50 to-[var(--dark-green)]/20 transition-opacity duration-500 opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-[var(--primary)]/5 mix-blend-multiply pointer-events-none" />

                  {/* Bottom Type Presentation Block */}
                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 z-20 flex flex-col items-start gap-1 w-full">
                    <span className="text-xs font-[family-name:var(--font-body)] tracking-widest uppercase text-[var(--beige)]/70 block">
                      {project.desc || "Interactive System Structure"}
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-xl md:text-3xl lg:text-4xl font-normal tracking-tight text-[var(--background)] uppercase leading-none">
                      {project.title}
                    </h3>

                    <div className="w-full flex items-center justify-between pt-2 mt-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs font-[family-name:var(--font-body)] font-medium uppercase tracking-widest text-[var(--background)] flex items-center gap-2">
                        Explore Case Study <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>

                  {/* Base Core Color Accent Border Accent */}
                  <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-[var(--primary)] transition-all duration-700 ease-out group-hover:w-full" aria-hidden />
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ── ROW 3: High-Visibility Timeless Interface Controls ── */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-4 shrink-0 pt-2 border-t border-[var(--dark-green)]/10 sm:border-t-0">

        {/* Left Side: Large Ghost Counter + Fractional Text */}
        <div className="flex items-baseline gap-3 md:gap-4 select-none">
          <span className="font-[family-name:var(--font-display)] leading-none tracking-tighter text-[var(--primary)] text-3xl md:text-5xl opacity-15">
            {pad(activeIndex)}
          </span>
          <span className="font-[family-name:var(--font-body)] text-[10px] md:text-[11px] font-medium tracking-[0.25em] text-[var(--primary)] uppercase whitespace-nowrap">
            {pad(activeIndex)} &mdash; {pad(totalSlides)}
          </span>
        </div>

        {/* Center Side: Hairline Timeline Progress Bar */}
        <div className="grow max-w-md h-px bg-[var(--dark-green)]/20 relative hidden md:block" role="presentation">
          <div
            className="absolute inset-y-0 left-0 bg-[var(--primary)] transition-all duration-500 ease-out"
            style={{ width: `${totalSlides > 1 ? ((activeIndex - 1) / (totalSlides - 1)) * 100 : 100}%` }}
          />
        </div>

        {/* Right Side: Bold Editorial Navigation Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            aria-label="Navigate to previous project slide"
            disabled={activeIndex === 1}
            className="font-[family-name:var(--font-body)] custom-editorial-prev flex items-center justify-center gap-2 h-10 md:h-11 px-4 md:px-5 rounded-full border border-[var(--primary)] text-[11px] md:text-xs font-semibold tracking-wider uppercase text-[var(--primary)] bg-transparent transition-all duration-300 hover:bg-[var(--primary)] hover:text-[var(--background)] disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-[var(--primary)] disabled:pointer-events-none cursor-pointer select-none whitespace-nowrap"
          >
            <span>&larr;</span> <span className="hidden xs:inline">PREV</span>
          </button>

          <button
            aria-label="Navigate to next project slide"
            disabled={activeIndex === totalSlides}
            className="font-[family-name:var(--font-body)] custom-editorial-next flex items-center justify-center gap-2 h-10 md:h-11 px-5 md:px-6 rounded-full bg-[var(--primary)] text-[11px] md:text-xs font-semibold tracking-wider uppercase text-[var(--background)] border border-[var(--primary)] transition-all duration-300 hover:bg-transparent hover:text-[var(--primary)] disabled:opacity-20 disabled:hover:bg-[var(--primary)] disabled:hover:text-[var(--background)] disabled:pointer-events-none cursor-pointer select-none whitespace-nowrap"
          >
            <span className="hidden xs:inline">NEXT</span> <span>&rarr;</span>
          </button>
        </div>

      </div>
    </section>
  );
}