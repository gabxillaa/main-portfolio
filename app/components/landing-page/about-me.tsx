import React from "react";

export default function AboutMe() {
  const marqueeStyles = `
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee {
      display: flex;
      width: max-content;
      animation: marquee 35s linear infinite;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: marqueeStyles }} />

      <section className="relative w-full min-h-screen flex flex-col bg-[var(--background)] text-[var(--dark-green)] overflow-hidden font-sans">

        {/* ── CLEAN MARQUEE BANNER ── */}
        <div className="w-full bg-[var(--dark-green)] text-[var(--background)] py-3 overflow-hidden flex whitespace-nowrap z-30 shrink-0 select-none">
          <div className="animate-marquee shrink-0 flex items-center text-[10px] font-mono font-medium uppercase tracking-[0.3em]">
            {Array.from({ length: 12 }).map((_, i) => (
              <React.Fragment key={i}>
                <span className="px-8">Creative Developer</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--background)] inline-block opacity-40" />
              </React.Fragment>
            ))}
          </div>
          <div className="animate-marquee shrink-0 flex items-center text-[10px] font-mono font-medium uppercase tracking-[0.3em]" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <React.Fragment key={i}>
                <span className="px-8">Creative Developer</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--background)] inline-block opacity-40" />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── ORGANIC EDITORIAL CONTENT GRID ── */}
        <div className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col justify-start pt-12 md:pt-16 lg:pt-20 pb-20">
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-20 items-center">

            {/* LEFT COLUMN: NATURAL PORTRAIT (Slightly relaxed, no harsh borders) */}
            <div className="col-span-1 md:col-span-5 flex justify-center md:justify-start">
              <div className="w-full max-w-[300px] md:max-w-none aspect-[3/4] overflow-hidden rounded-xl shadow-md md:rotate-[-1.5deg] transition-transform duration-500 hover:rotate-0 bg-[var(--background)]">
                <img
                  src="assets/me-2.png"
                  alt="Faith"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* RIGHT COLUMN: TYPOGRAPHY & STORY */}
            <div className="col-span-1 md:col-span-7 flex flex-col justify-center">

              {/* Main Script-Style Greeting */}
              <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight uppercase leading-none text-[var(--primary)] mb-2 select-none">
                MEET FAITH
              </h1>

              {/* Wide-Tracked Subtitle */}
              <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-[var(--dark-green)] font-bold mb-8 opacity-80">
                Designer &bull; Developer &bull; Creator
              </p>

              {/* High-End Inline Editorial Hook with Beige Accent Highlight */}
              <h2 className="font-[family-name:var(--font-body)] text-xl md:text-2xl font-medium tracking-tight text-[var(--dark-green)] leading-relaxed mb-6 max-w-xl">
                I build clean digital spaces where interaction meets{" "}
                <span className="relative inline-block px-1 z-10 whitespace-nowrap">
                  <span className="absolute inset-x-0 bottom-1 h-3 bg-[var(--beige)] -z-10 transform scale-x-105" />
                  <span className="font-[family-name:var(--font-display)] font-normal text-[var(--primary)] italic">timeless design.</span>
                </span>
              </h2>

              {/* Clean Typography Frame */}
              <div className="font-sans text-sm md:text-base leading-relaxed text-[var(--dark-green)] space-y-5 max-w-xl text-justify font-light antialiased">
                <p>
                  I'm a frontend developer and UI/UX designer passionate about
                  building intuitive, user-centered digital experiences. Throughout
                  my academic projects, I've worked on mobile apps, web platforms,
                  desktop systems, and even game development, translating ideas and
                  requirements into interfaces that are both functional and easy to
                  use.
                </p>
                <p>
                  What drives my work is empathy for the end user. I enjoy
                  understanding how people interact with technology and finding
                  ways to make those interactions simpler, more intuitive, and more
                  meaningful. To me, good design is not just about how something
                  looks, but how effectively it helps users achieve their goals.
                </p>
              </div>
            </div>

          </div>
        </div>

      </section>
    </>
  );
}