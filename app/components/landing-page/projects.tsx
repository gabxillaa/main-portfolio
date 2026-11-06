"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects";
import { ProjectData } from "@/lib/projects/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import "swiper/css";

const pad = (n: number) => String(n).padStart(2, "0");

export default function ArcCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(1);
  const totalSlides = projects.length;

  return (
    <section
      id="projects"
      className="relative flex min-h-svh w-full flex-col justify-between overflow-hidden bg-[var(--background)] px-5 py-6 sm:px-8 md:px-12 lg:h-svh lg:px-16 lg:py-8"
    >
      <style>{`
        .mySwiper { width: 100%; height: 100%; }
        .mySwiper .swiper-wrapper { height: 100%; }
        .mySwiper .swiper-slide { height: 100%; display: flex; }
      `}</style>

      {/* ── Editorial Header ── */}
      <header className="mx-auto flex w-full max-w-6xl shrink-0 items-end justify-between border-b border-[var(--dark-green)]/15 pb-4">
        <div className="flex flex-col gap-1">
          <span className="font-[family-name:var(--font-body)] text-xs font-bold uppercase tracking-[0.3em] text-[var(--primary)]">
            Selected Works &mdash; {pad(activeIndex)} / {pad(totalSlides)}
          </span>
          <h2 className="m-0 font-[family-name:var(--font-display)] text-3xl font-normal uppercase leading-none tracking-tight text-[var(--dark-green)] md:text-4xl">
            Projects
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Previous project"
            disabled={activeIndex === 1}
            className="custom-editorial-prev flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--dark-green)]/25 text-[var(--dark-green)] transition-all duration-300 hover:border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] disabled:pointer-events-none disabled:opacity-20"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Next project"
            disabled={activeIndex === totalSlides}
            className="custom-editorial-next flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[var(--primary)] bg-[var(--primary)] text-[var(--background)] transition-all duration-300 hover:bg-transparent hover:text-[var(--primary)] disabled:pointer-events-none disabled:opacity-20"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* ── Main Runway ── */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col py-4 lg:min-h-0">
        <Swiper
          navigation={{
            prevEl: ".custom-editorial-prev",
            nextEl: ".custom-editorial-next",
          }}
          mousewheel={{ forceToAxis: true }}
          keyboard={{ enabled: true }}
          modules={[Navigation, Mousewheel, Keyboard]}
          spaceBetween={32}
          slidesPerView={1}
          grabCursor={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex + 1)}
          className="mySwiper w-full flex-1"
        >
          {projects.map((project, i) => {
            const open = () => router.push(`/view-project/${project.slug}`);
            const h = project.highlights;

            return (
              <SwiperSlide key={project.slug}>
                <article
                  role="link"
                  tabIndex={0}
                  onClick={open}
                  onKeyDown={(e) => e.key === "Enter" && open()}
                  className="group grid w-full h-full cursor-pointer select-none grid-cols-1 overflow-hidden rounded-3xl border border-[var(--dark-green)]/15 bg-[var(--background)] transition-all duration-500 hover:border-[var(--primary)]/50 lg:grid-cols-12"
                >
                  {/* Left Column: Full-Height Cover Thumbnail */}
                  <div className="relative h-64 sm:h-80 lg:col-span-6 lg:h-full overflow-hidden bg-[var(--dark-green)]/10">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      draggable={false}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />

                    {/* Meta Badge */}
                    <div className="absolute top-5 left-5 z-10">
                      <span className="rounded-full bg-[var(--background)]/90 px-3.5 py-1.5 font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--dark-green)] border border-[var(--dark-green)]/15 backdrop-blur-md">
                        {pad(i + 1)} — {project.overview?.platforms || "Web & Mobile"}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Architectural Info Dossier */}
                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6 lg:p-10">
                    {/* Header */}
                    <div className="flex flex-col gap-2">
                      <span className="font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--primary)]">
                        {project.desc || "Case Study"}
                      </span>
                      <h3 className="m-0 font-[family-name:var(--font-display)] text-3xl font-normal uppercase leading-tight tracking-tight text-[var(--dark-green)] sm:text-4xl lg:text-5xl group-hover:text-[var(--primary)] transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    {/* Highlights List */}
                    {h ? (
                      <div className="flex flex-col gap-3 my-auto py-4 border-t border-b border-[var(--dark-green)]/15 font-[family-name:var(--font-body)]">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Context</span>
                          <p className="m-0 text-xs sm:text-sm leading-relaxed text-[var(--dark-green)]/80  line-clamp-2">{h.context}</p>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Solution</span>
                          <p className="m-0 text-xs sm:text-sm leading-relaxed text-[var(--dark-green)]/80  line-clamp-2">{h.solution}</p>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--primary)]">Results</span>
                          <p className="m-0 text-xs sm:text-sm leading-relaxed text-[var(--dark-green)]/80  line-clamp-2">{h.result}</p>
                        </div>
                      </div>
                    ) : project.impactSummary ? (
                      <p className="my-auto py-6 border-t border-b border-[var(--dark-green)]/15 font-[family-name:var(--font-body)] text-xs sm:text-sm text-[var(--dark-green)]/80 leading-relaxed font-light">
                        {project.impactSummary}
                      </p>
                    ) : null}

                    {/* Footer Callout */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-[family-name:var(--font-body)] text-xs font-bold uppercase tracking-widest text-[var(--dark-green)] group-hover:text-[var(--primary)] transition-colors">
                        Explore Case Study
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--dark-green)]/25 text-[var(--dark-green)] transition-all duration-300 group-hover:border-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-[var(--background)]">
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* ── Segmented Footer Track ── */}
      <footer className="mx-auto flex w-full max-w-6xl shrink-0 items-center justify-between pt-2">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {projects.map((p, idx) => (
            <span
              key={p.slug}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx + 1 === activeIndex
                  ? "w-8 bg-[var(--primary)]"
                  : "w-2 bg-[var(--dark-green)]/20"
              }`}
            />
          ))}
        </div>
        <span className="font-[family-name:var(--font-body)] text-[10px] font-medium uppercase tracking-widest text-[var(--dark-green)]/50 hidden sm:inline">
          [ Scroll wheel / Keyboard arrows to browse ]
        </span>
      </footer>
    </section>
  );
}