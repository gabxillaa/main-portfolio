"use client";

import React from "react";
import {
  SiTypescript, SiNextdotjs, SiFlutter, SiFirebase,
  SiTailwindcss, SiUnity, SiFigma, SiMiro, SiGit,
} from "react-icons/si";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const ALL_TECHS = [
  // SLIDE 1 ITEMS (7 Items max)
  { name: "Next.js",    icon: SiNextdotjs,   color: "#111111", bg: "rgba(17, 17, 17, 0.04)", border: "rgba(17, 17, 17, 0.15)",   tag: "Framework", span: "col-span-2", featured: true },
  { name: "TypeScript", icon: SiTypescript,  color: "#3178C6", bg: "rgba(49, 120, 198, 0.04)", border: "rgba(49, 120, 198, 0.15)",   tag: "Language",  span: "col-span-1", featured: false },
  { name: "Flutter",    icon: SiFlutter,     color: "#54C5F8", bg: "rgba(84, 197, 248, 0.04)",  border: "rgba(84, 197, 248, 0.15)",   tag: "Mobile",   span: "col-span-1", featured: false },
  { name: "Unity",      icon: SiUnity,       color: "#000000", bg: "rgba(0, 0, 0, 0.04)",       border: "rgba(0, 0, 0, 0.15)",        tag: "Engine",   span: "col-span-2", featured: true },
  { name: "Tailwind",   icon: SiTailwindcss, color: "#38BDF8", bg: "rgba(56, 189, 248, 0.04)",  border: "rgba(56, 189, 248, 0.15)",   tag: "Frontend", span: "col-span-1", featured: false },
  { name: "Firebase",   icon: SiFirebase,    color: "#FFA611", bg: "rgba(255, 166, 17, 0.04)",  border: "rgba(255, 166, 17, 0.15)",   tag: "Backend",  span: "col-span-1", featured: false },
  { name: "Figma",      icon: SiFigma,       color: "#F24E1E", bg: "rgba(242, 78, 30, 0.04)",   border: "rgba(242, 78, 30, 0.15)",    tag: "Design",   span: "col-span-1", featured: false },

  // SLIDE 2 ITEMS (Remaining Items)
  { name: "Git",        icon: SiGit,         color: "#F05032", bg: "rgba(240, 80, 50, 0.04)",   border: "rgba(240, 80, 50, 0.15)",    tag: "Version",  span: "col-span-2", featured: true },
  { name: "Miro",       icon: SiMiro,        color: "#FFA611", bg: "rgba(255, 166, 17, 0.04)",  border: "rgba(255, 166, 17, 0.15)",       tag: "Strategy", span: "col-span-1", featured: false },
];

export default function TechStack() {
  const chunkTechs = (arr: typeof ALL_TECHS, size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };

  const techSlides = chunkTechs(ALL_TECHS, 7);

  return (
    <section
      id="tech-stack"
      className="relative w-full min-h-screen bg-[var(--background)] flex items-center px-6 md:px-12 lg:px-16 py-20 overflow-hidden"
    >
      {/* Immersive Ambient Background Glows */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl bg-[radial-gradient(circle,var(--accent)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl bg-[radial-gradient(circle,#38BDF8_0%,transparent_70%)]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start selection:bg-[var(--primary)] selection:text-[var(--background)]">

        {/* Left Content Masthead */}
        <div className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-32">
          <span className="text-xs font-[family-name:var(--font-body)] tracking-[0.3em] text-[var(--primary)] font-bold block uppercase">
            Capabilities // Blueprint
          </span>

          <h2 className="font-[family-name:var(--font-display)] font-normal uppercase text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none text-[var(--primary)]">
            Tech <br />
            <span className="text-[var(--accent)]">Ecosystem.</span>
          </h2>

          <p className="font-[family-name:var(--font-body)] text-sm md:text-base leading-relaxed text-[var(--dark-green)] max-w-xl text-left font-light">
            These are the tools I've picked up along the way, the ones I've actually spent time with, broken things in, and learned to trust.
          </p>
        </div>


        <div
          className="lg:col-span-8 w-full select-none
            [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination]:flex [&_.swiper-pagination]:justify-center [&_.swiper-pagination]:items-center [&_.swiper-pagination]:gap-1.5 [&_.swiper-pagination]:h-5 [&_.swiper-pagination]:overflow-visible
            [&_.swiper-pagination-bullet]:!bg-[var(--primary)] [&_.swiper-pagination-bullet]:!opacity-20 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:transition-all [&_.swiper-pagination-bullet]:duration-300
            [&_.swiper-pagination-bullet-active]:!opacity-100 [&_.swiper-pagination-bullet-active]:!bg-[var(--accent,var(--primary))] [&_.swiper-pagination-bullet-active]:scale-125"
        >
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            className="techSwiper w-full"
          >
            {techSlides.map((slideItems, slideIndex) => (
              <SwiperSlide key={slideIndex} className="w-full">
                <div className="w-full grid grid-cols-3 gap-3 md:gap-4 auto-rows-[150px] p-1 pb-12">
                  {slideItems.map((tech, i) => {
                    const globalIndex = slideIndex * 7 + i + 1;

                    return (
                      <motion.div
                        key={tech.name}
                        className={`group relative flex flex-col justify-between p-6 rounded-2xl overflow-hidden cursor-pointer ${tech.span}`}
                        style={{
                          backgroundColor: tech.bg,
                          border: `1px solid ${tech.border}`,
                        }}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{
                          y: -4,
                          borderColor: tech.color,
                          boxShadow: `0 12px 30px -10px color-mix(in srgb, ${tech.color} ${tech.featured ? "20%" : "10%"}, transparent)`
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      >
                        {/* Scaled Watermark Icon */}
                        <div
                          className="absolute -right-2 -bottom-4 transition-all duration-500 pointer-events-none transform group-hover:scale-110 group-hover:rotate-3"
                          style={{ opacity: tech.featured ? 0.08 : 0.04 }}
                        >
                          <tech.icon size={tech.featured ? 130 : 96} style={{ color: tech.color }} />
                        </div>

                        {/* Card Meta Row */}
                        <div className="w-full flex justify-between items-center z-10">
                          <span className="font-mono text-xs tracking-widest text-[var(--primary)]/40 group-hover:text-[var(--primary)]/70 transition-colors duration-300">
                            #{String(globalIndex).padStart(2, "0")}
                          </span>
                          <span
                            className="font-mono text-xs tracking-wider uppercase px-2 py-0.5 rounded-md font-medium"
                            style={{
                              backgroundColor: `color-mix(in srgb, ${tech.color} 10%, transparent)`,
                              color: tech.color
                            }}
                          >
                            {tech.tag}
                          </span>
                        </div>

                        {/* Card Identity Footer */}
                        <div className="flex items-center gap-3 z-10 mt-auto">
                          <tech.icon
                            size={tech.featured ? 26 : 22}
                            style={{ color: tech.color }}
                            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-transform duration-300 group-hover:scale-105"
                          />
                          <span
                            className={`font-mono tracking-wide uppercase text-[var(--primary)] ${
                              tech.featured ? "text-base font-bold" : "text-xs font-medium"
                            }`}
                          >
                            {tech.name}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </section>
  );
}