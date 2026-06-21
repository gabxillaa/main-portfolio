import React from 'react';

export default function EditorialHero() {
  const animationStyles = `
    @keyframes subtleFadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .editorial-reveal {
      opacity: 0;
      animation: subtleFadeUp 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .dotted-overlay {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(var(--dark-green) 1px, transparent 1px);
      background-size: 24px 24px;
      opacity: 0.2;
      pointer-events: none;
      z-index: 0;
    }
  `;

  return (
    <div className="h-screen max-h-[100vh] bg-[var(--background)] text-[var(--dark-green)] selection:bg-[var(--primary)] selection:text-[var(--background)] flex flex-col justify-between px-6 md:px-12 lg:px-16 font-sans overflow-hidden relative">

      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />

      {/* DOTTED BACKGROUND OVERLAY */}
      <div className="dotted-overlay" />

      {/* HEADER NAVIGATION CONSTRAINT */}
      <header className="w-full z-50 flex-shrink-0">
        {/* Your Navbar component sits safely here */}
      </header>

      {/* MAIN HERO CONTENT - Structured exactly to match image_ffb9b9.png */}
      <main className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center items-center text-center my-auto z-10 py-8">

        {/* Discipline Label */}
        <div className="flex items-center gap-3 mb-10 editorial-reveal" style={{ animationDelay: '150ms' }}>
          <span className="text-xs font-[family-name:var(--font-body)] uppercase tracking-[0.28em] text-[var(--dark-green)] font-semibold">
            UI/UX DESIGNER &amp; FRONT END DEVELOPER
          </span>
        </div>

        {/* Hero Typography matched exactly to the line breaks in image_ffb9b9.png */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[1.02] text-[var(--dark-green)] max-w-4xl editorial-reveal select-none flex flex-col items-center" style={{ animationDelay: '300ms' }}>
          <span className="font-[family-name:var(--font-body)] font-medium tracking-tighter text-[var(--dark-green)]">
            Transforming
          </span>
          <span className="font-[family-name:var(--font-body)] font-medium tracking-tighter text-[var(--dark-green)] mt-1">
            Ideas into <span className="font-[family-name:var(--font-display)] font-normal text-[var(--primary)] italic ml-2">Digital</span>
          </span>
          <span className="font-[family-name:var(--font-display)] font-normal text-[var(--primary)] italic mt-2 block">
            Reality
          </span>
        </h1>

        {/* Minimal Separator Line */}
        <div className="w-16 h-px bg-[var(--dark-green)]/15 my-10 editorial-reveal" style={{ animationDelay: '450ms' }} />

        {/* Balanced Body Block */}
        <div className="editorial-reveal" style={{ animationDelay: '600ms' }}>
          <p className="text-sm md:text-base text-[var(--light-gray)] leading-relaxed max-w-2xl font-sans font-light">
            Bridging pixel-perfect high-fidelity designs with clean, production-ready React ecosystems.
            Designing frameworks that think like interfaces, and building code that respects typography.
          </p>
        </div>

      </main>

    </div>
  );
}