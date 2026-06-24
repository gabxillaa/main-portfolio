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
  `;

  return (
    /* FIXED: Changed to <section> and added id="home" so the navbar links work perfectly */
    <section
      id="home"
      className="h-screen max-h-[100vh] bg-[var(--background)] text-[var(--dark-green)] selection:bg-[var(--dark-green)] selection:text-[var(--background)] flex flex-col justify-between px-6 md:px-12 lg:px-16 font-sans overflow-hidden relative"
    >

      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />



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
          <p className="text-sm sm:text-base md:text-lg text-[var(--dark-green)] leading-relaxed max-w-3xl font-[family-name:var(--font-body)] font-light">
            I design interfaces and build the code behind them. From wireframes to working products, I care about how things look, how they feel, and how they hold up when real people use them.
          </p>
        </div>

      </main>

    </section>
  );
}