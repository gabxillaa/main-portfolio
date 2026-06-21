"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function EditorialNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navItems = ["Home", "About", "Projects", "Stack", "Contact"];
  const sectionIds = ["home", "about-me", "projects", "tech-stack", "contact-me"];

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      if (scrollPosition >= pageHeight - 50) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const scrollPosition = window.scrollY + window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        if (scrollPosition >= pageHeight - 50) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0, rootMargin: "-35% 0px -45% 0px" }
    );

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-[var(--background)]/85 backdrop-blur-xl border-b border-[var(--primary)]/5 shadow-sm"
            : "py-8 bg-transparent border-b border-transparent"
        }`}
      >
        {/* EDITORIAL LOGO */}
        <a href="#home" className="group flex items-baseline gap-3 select-none z-50">
          <div className="flex items-baseline">
            <span className="font-(family-name:--font-display) text-[28px] font-extralight italic text-[var(--dark-green)] leading-none tracking-tight">
              faith
            </span>
            <span className="font-[family-name:var(--font-display)] text-[28px] font-light italic text-[var(--dark-green)] leading-none ml-0.5">
              .
            </span>
          </div>
          <div className="w-0.5 h-4 bg-[var(--primary)]/60 group-hover:bg-[var(--primary)]/40 transition-colors duration-300" />
          <span className="font-[family-name:var(--font-body)] text-[7px] tracking-[0.35em] uppercase text-[var(--light-gray)]/90 group-hover:text-[var(--light-gray)]/100 transition-colors duration-300">
            portfolio
          </span>
        </a>

        {/* DESKTOP NAV */}
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-7 font-[family-name:var(--font-body)] text-[11px] font-medium tracking-[0.22em] uppercase">
            {navItems.map((item, index) => {
              const targetId = item.toLowerCase().replace(/\s+/g, "-");
              const isActive = activeSection === targetId;
              const isLast = index === navItems.length - 1;

              if (isLast) {
                return (
                  <li key={item} className="ml-2">
                    <a
                      href={`#${targetId}`}
                      className={`inline-block px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md ${
                        isActive
                          ? "bg-[var(--primary)] text-[var(--background)] shadow-[0_4px_14px_var(--primary)/20]"
                          : "bg-[var(--dark-green)] text-[var(--background)] hover:bg-[var(--primary)]"
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                );
              }

              return (
                <li key={item} className="relative">
                  <a href={`#${targetId}`} className={`transition-colors duration-300 ${
                        isActive
                          ? "text-[var(--dark-green)] font-semibold"
                          : "text-[var(--light-gray)]/65 hover:text-[var(--dark-green)]"
                      }`}
                    >
                    {item}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--dark-green)]/90" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* THEME TOGGLE WITH LUCIDE ICONS */}
          <button
            onClick={toggleTheme}
            className="cursor-pointer group relative p-2.5 bg-(--beige)/80 hover:bg-(--beige) text-(--light-gray) hover:text-(--dark-green) transition-all duration-300 focus:outline-none rounded-full overflow-hidden"
            aria-label="Toggle theme"
          >
            <div className="relative w-4 h-4 transition-transform duration-500 ease-out group-hover:scale-110 group-active:scale-95 flex items-center justify-center">
              {isDarkMode ? (
                <Sun
                  className="w-4 h-4 absolute inset-0 animate-[spin_0.4s_ease-out_1] origin-center transition-transform duration-300 group-hover:rotate-180"
                  strokeWidth={1.5}
                />
              ) : (
                <Moon
                  className="w-4 h-4 absolute inset-0 transition-transform duration-300 group-hover:-rotate-12"
                  strokeWidth={1.5}
                />
              )}
            </div>
          </button>

          {/* HAMBURGER */}
          <button
            className="md:hidden flex flex-col justify-center items-end w-5 h-5 z-50 gap-[5px]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Navigation"
          >
            <div className={`h-0.5 bg-[var(--dark-green)] transition-all duration-300 ${isMenuOpen ? "w-5 rotate-45 translate-y-[6px]" : "w-5"}`} />
            <div className={`h-0.5 bg-[var(--dark-green)] transition-all duration-300 ${isMenuOpen ? "opacity-0 w-0" : "w-3"}`} />
            <div className={`h-0.5 bg-[var(--dark-green)] transition-all duration-300 ${isMenuOpen ? "w-5 -rotate-45 -translate-y-[6px]" : "w-4"}`} />
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-[var(--background)] z-40 md:hidden flex flex-col justify-between px-8 pt-36 pb-12 transition-all duration-500 ease-in-out ${
          isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-y-7 font-[family-name:var(--font-body)] text-[13px] uppercase tracking-[0.28em] font-medium">
          {navItems.map((item) => {
            const targetId = item.toLowerCase().replace(/\s+/g, "-");
            const isActive = activeSection === targetId;
            return (
              <a
                key={item}
                href={`#${targetId}`}
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors duration-300 self-start flex items-center gap-2 ${
                  isActive ? "text-[var(--dark-green)] font-semibold" : "text-[var(--light-gray)]/45 hover:text-[var(--dark-green)]"
                }`}
              >
                {isActive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />}
                {item}
              </a>
            );
          })}
        </div>

        <div className="border-t border-[var(--primary)]/8 pt-5 flex justify-between font-[family-name:var(--font-body)] text-[7px] tracking-[0.28em] uppercase text-[var(--light-gray)]/35">
          <span>faith / studio</span>
          <span>© 2026</span>
        </div>
      </div>
    </>
  );
}