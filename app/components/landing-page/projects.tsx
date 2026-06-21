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
      className="relative w-full h-[100dvh] min-h-[600px] bg-[var(--background)] overflow-hidden px-6 md:px-12 lg:px-16 grid grid-rows-[auto_1fr_auto] pt-12 pb-8 gap-4 md:gap-6"
    >
      {/* ── ROW 1: Editorial Section Header ── */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
        <div className="col-span-1 md:col-span-5">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[var(--primary)] font-bold block mb-1 uppercase">
            Selected Works
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight uppercase leading-none text-[var(--primary)]">
            Projects
          </h2>
        </div>
        <div className="col-span-1 md:col-span-7 md:pl-4 hidden sm:block">
          <p className="font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[var(--light-gray)] max-w-md md:text-justify antialiased">
            A curated deep dive into sequential case studies. Scroll with a wheel, use your keyboard arrows, or use the interactive frame dashboard below to browse.
          </p>
        </div>
      </div>

      {/* ── ROW 2: Screen-Bounded Dynamic Slide Runway ── */}
      <div className="relative w-full h-full min-h-0 bg-[var(--dark-green)]/[0.01]">
        <div className="w-full h-full max-w-6xl mx-auto py-2">
          <Swiper
            cssMode={true}
            navigation={{
              prevEl: ".custom-editorial-prev",
              nextEl: ".custom-editorial-next",
            }}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Mousewheel, Keyboard]}
            spaceBetween={0}
            slidesPerView={1}
            grabCursor={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex + 1)}
            className="mySwiper w-full h-full overflow-hidden rounded-sm"
          >
            {projects.map((project, index) => (
              <SwiperSlide key={project.slug} className="w-full h-full">
                <article
                  onClick={() => router.push(`/view-project/${project.slug}`)}
                  className="group relative w-full h-full cursor-pointer select-none overflow-hidden bg-[var(--dark-green)]/5"
                >
                  {/* Backdrop Image Asset */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      draggable={false}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-102"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>

                  {/* Layout Overlay Mask */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[var(--dark-green)]/95 via-[var(--dark-green)]/40 to-[var(--dark-green)]/20 transition-opacity duration-500 opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-[var(--primary)]/5 mix-blend-multiply pointer-events-none" />

                  {/* Corner Meta Tags */}
                  <div className="absolute top-0 inset-x-0 p-6 md:p-8 flex justify-between items-start z-20">
                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--beige)] bg-[var(--dark-green)]/40 backdrop-blur-md px-3 py-1 rounded-xs">
                      INDEX // 0{index + 1}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest text-[var(--beige)]/40 uppercase">
                      {project.slug.toUpperCase()} // ©2026
                    </span>
                  </div>

                  {/* Bottom Type Presentation Block */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col items-start gap-1 max-w-3xl">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--beige)]/70 block">
                      {project.desc || "Interactive System Structure"}
                    </span>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-4xl lg:text-5xl font-normal tracking-tight text-[var(--background)] uppercase leading-none">
                      {project.title}
                    </h3>

                    <div className="w-full flex items-center justify-between pt-3 mt-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] font-mono text-[var(--beige)]/40 uppercase tracking-wider hidden xs:block">
                        Open Project Portfolio Dossier
                      </span>
                      <span className="text-xs font-mono font-medium uppercase tracking-widest text-[var(--background)] flex items-center gap-2">
                        Explore Case Study <span className="transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>

                  {/* Base Gold Trim Accent */}
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C9A96E] transition-all duration-700 ease-out group-hover:w-full" aria-hidden />
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ── ROW 3: High-Visibility Timeless Interface Controls ── */}
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 pb-2">

        {/* Left Side: Large Ghost Counter + Fractional Text */}
        <div className="flex items-baseline gap-4 select-none self-start sm:self-auto">
          <span className="font-[family-name:var(--font-display)] leading-none tracking-tighter text-[var(--primary)] text-4xl md:text-5xl opacity-15">
            {pad(activeIndex)}
          </span>
          <span className="font-mono text-[11px] font-medium tracking-[0.25em] text-[var(--primary)] uppercase">
            {pad(activeIndex)} &mdash; {pad(totalSlides)}
          </span>
        </div>

        {/* Center Side: Hairline Timeline Progress Bar */}
        <div className="grow max-w-md h-px bg-[var(--dark-green)]/20 relative hidden md:block" role="presentation">
          <div
            className="absolute inset-y-0 left-0 bg-[#C9A96E] transition-all duration-500 ease-out"
            style={{ width: `${totalSlides > 1 ? ((activeIndex - 1) / (totalSlides - 1)) * 100 : 100}%` }}
          />
        </div>

        {/* Right Side: Bold Editorial Navigation Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            aria-label="Navigate to previous project slide"
            disabled={activeIndex === 1}
            className="font-[family-name:var(--font-body)] custom-editorial-prev flex items-center justify-center gap-3 h-12 px-6 rounded-full border-2 border-[var(--primary)] font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[var(--primary)] bg-transparent transition-all duration-300 hover:bg-[var(--primary)] hover:text-[var(--background)] disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-[var(--primary)] disabled:pointer-events-none cursor-pointer select-none"
          >
            <span>&larr;</span> PREV
          </button>

          <button
            aria-label="Navigate to next project slide"
            disabled={activeIndex === totalSlides}
            className="font-[family-name:var(--font-body)] custom-editorial-next flex items-center justify-center gap-3 h-12 px-8 rounded-full bg-[var(--primary)] font-mono text-xs font-semibold tracking-[0.2em] uppercase text-[var(--background)] border-2 border-[var(--primary)] transition-all duration-300 hover:bg-transparent hover:text-[var(--primary)] disabled:opacity-20 disabled:hover:bg-[var(--primary)] disabled:hover:text-[var(--background)] disabled:pointer-events-none cursor-pointer select-none"
          >
            NEXT <span>&rarr;</span>
          </button>
        </div>

      </div>
    </section>
  );
}