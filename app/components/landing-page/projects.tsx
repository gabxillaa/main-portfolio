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
      className="relative w-full min-h-screen bg-[var(--background)] overflow-hidden flex flex-col px-4 sm:px-8 md:px-12 lg:px-16 pt-8 pb-6 sm:pt-10 sm:pb-8 md:py-12 gap-4 sm:gap-6"
    >
      {/* ── ROW 1: Editorial Section Header ── */}
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-6 shrink-0 selection:bg-[var(--primary)] selection:text-[var(--background)]">
        <div className="flex flex-col items-start">
          <span className="text-xs font-[family-name:var(--font-body)] tracking-[0.3em] text-[var(--primary)] font-bold block mb-1 uppercase">
            Selected Works
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight uppercase leading-none text-[var(--primary)]">
            Projects
          </h2>
        </div>

        <div className="sm:block max-w-xs sm:max-w-sm text-left sm:text-right self-start sm:self-end">
          <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--dark-green)] font-light">
            A curated deep dive into sequential case studies. Scroll with a
            wheel, use your keyboard arrows, or use the interactive controls
            below to browse.
          </p>
        </div>
      </div>

      {/* ── ROW 2: Swiper Slide Runway ── */}
      {/*
        Swiper injects its own .swiper and .swiper-wrapper divs that don't
        inherit h-full from Tailwind. We give the outer runway an explicit
        height via inline style so the chain never breaks, and override the
        Swiper internals with the global CSS block below.
      */}
      <style>{`
        .mySwiper { height: 100% !important; }
        .mySwiper .swiper-wrapper { height: 100% !important; }
        .mySwiper .swiper-slide { height: 100% !important; }
      `}</style>

      <div
        className="relative w-full overflow-hidden shrink-0 md:shrink"
        style={{ height: "clamp(280px, 60vh, 560px)" }}
      >
        <div className="w-full h-full max-w-6xl mx-auto">
          <Swiper
            navigation={{
              prevEl: ".custom-editorial-prev",
              nextEl: ".custom-editorial-next",
            }}
            mousewheel={{ forceToAxis: true }}
            keyboard={{ enabled: true }}
            modules={[Navigation, Mousewheel, Keyboard]}
            spaceBetween={16}
            slidesPerView={1}
            grabCursor={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex + 1)}
            className="mySwiper w-full overflow-hidden rounded-xl"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.slug} className="w-full h-full">
                <article
                  onClick={() => router.push(`/view-project/${project.slug}`)}
                  className="group relative w-full h-full cursor-pointer select-none overflow-hidden bg-[var(--dark-green)]/5 rounded-xl"
                >
                  {/* Backdrop Image */}
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

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--dark-green)]/95 via-[var(--dark-green)]/50 to-[var(--dark-green)]/20 transition-opacity duration-500 opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-[var(--primary)]/5 mix-blend-multiply pointer-events-none" />

                  {/* Text Block */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 z-20 flex flex-col items-start gap-1 w-full">
                    <span className="text-[10px] sm:text-xs font-[family-name:var(--font-body)] tracking-widest uppercase text-[var(--beige)]/70 block">
                      {project.desc || "Interactive System Structure"}
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight text-[var(--background)] uppercase leading-none">
                      {project.title}
                    </h3>

                    <div className="w-full flex items-center justify-between pt-2 mt-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] sm:text-xs font-[family-name:var(--font-body)] font-medium uppercase tracking-widest text-[var(--background)] flex items-center gap-2">
                        Explore Case Study{" "}
                        <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Accent Border */}
                  <div
                    className="absolute bottom-0 left-0 w-0 h-[3px] bg-[var(--primary)] transition-all duration-700 ease-out group-hover:w-full"
                    aria-hidden
                  />
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ── ROW 3: Controls Bar ── */}
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between gap-3 sm:gap-4 shrink-0 pt-3 border-t border-[var(--dark-green)]/10">

        {/* Counter */}
        <div className="flex items-baseline gap-2 sm:gap-3 select-none">
          <span className="font-[family-name:var(--font-display)] leading-none tracking-tighter text-[var(--primary)] text-2xl sm:text-3xl md:text-5xl opacity-15">
            {pad(activeIndex)}
          </span>
          <span className="font-[family-name:var(--font-body)] text-[10px] sm:text-[11px] font-medium tracking-[0.2em] sm:tracking-[0.25em] text-[var(--primary)] uppercase whitespace-nowrap">
            {pad(activeIndex)} &mdash; {pad(totalSlides)}
          </span>
        </div>

        {/* Progress Bar — visible at md+ */}
        <div
          className="hidden md:block grow max-w-md h-px bg-[var(--dark-green)]/20 relative"
          role="presentation"
        >
          <div
            className="absolute inset-y-0 left-0 bg-[var(--primary)] transition-all duration-500 ease-out"
            style={{
              width: `${
                totalSlides > 1
                  ? ((activeIndex - 1) / (totalSlides - 1)) * 100
                  : 100
              }%`,
            }}
          />
        </div>

        {/* Nav Buttons */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Navigate to previous project slide"
            disabled={activeIndex === 1}
            className="font-[family-name:var(--font-body)] custom-editorial-prev flex items-center justify-center gap-1.5 h-9 sm:h-10 md:h-11 px-3 sm:px-4 md:px-5 rounded-full border border-[var(--primary)] text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-wider uppercase text-[var(--primary)] bg-transparent transition-all duration-300 hover:bg-[var(--primary)] hover:text-[var(--background)] disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-[var(--primary)] disabled:pointer-events-none cursor-pointer select-none whitespace-nowrap"
          >
            <span>&larr;</span>
            <span className="hidden sm:inline">PREV</span>
          </button>

          <button
            aria-label="Navigate to next project slide"
            disabled={activeIndex === totalSlides}
            className="font-[family-name:var(--font-body)] custom-editorial-next flex items-center justify-center gap-1.5 h-9 sm:h-10 md:h-11 px-4 sm:px-5 md:px-6 rounded-full bg-[var(--primary)] text-[10px] sm:text-[11px] md:text-xs font-semibold tracking-wider uppercase text-[var(--background)] border border-[var(--primary)] transition-all duration-300 hover:bg-transparent hover:text-[var(--primary)] disabled:opacity-20 disabled:hover:bg-[var(--primary)] disabled:hover:text-[var(--background)] disabled:pointer-events-none cursor-pointer select-none whitespace-nowrap"
          >
            <span className="hidden sm:inline">NEXT</span>
            <span>&rarr;</span>
          </button>
        </div>

      </div>
    </section>
  );
}