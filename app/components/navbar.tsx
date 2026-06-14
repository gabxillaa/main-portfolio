"use client";

import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ["Home", "About Me", "Projects", "Tech Stack", "Contact Me"];
  const sectionIds = ["home", "about-me", "projects", "tech-stack", "contact-me"];

  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 20);

    // Force last section active near bottom of page
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 50) {
      setActiveSection(sectionIds[sectionIds.length - 1]);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // Check if we are already locked to the bottom of the page
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= pageHeight - 50) {
        return; // Let handleScroll handle the Contact Me state
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      threshold: 0,
      // Loosened margins slightly to prevent blank gaps between sections
      rootMargin: "-30% 0px -40% 0px",
    }
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

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 flex items-center justify-end px-8 py-6 md:px-16 transition-colors duration-300 ${
      isMenuOpen
        ? "bg-(--primary) border-b border-white/10"
        : isScrolled
          ? "bg-(--primary) backdrop-blur-md border-b border-white/10"
          : "bg-transparent border-b border-transparent"
    }`}>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-x-12 font-(family-name:--font-super-warming) text-white text-lg tracking-wide">
        {navItems.map((item, index) => {
          const targetId = item.toLowerCase().replace(/\s+/g, "-");
          const isActive = activeSection === targetId;
          const isLast = index === navItems.length - 1;

          return isLast ? (
            <a
              key={item}
              href={`#${targetId}`}
              className={`cursor-pointer bg-(--light-blue) text-(--primary) font-(family-name:--font-super-warming) font-bold px-6 py-2.5 rounded-full shadow-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(187,224,239,0.65)] active:scale-95 transition-all duration-300 ${isActive ? "relative after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-1 after:bg-(--light-blue) after:rounded-full after:shadow-[0_0_8px_rgba(187,224,239,0.8)]" : ""}`}
            >
              {item}
            </a>
          ) : (
            <li key={item}>
              <a
                href={`#${targetId}`}
                className={`transition-colors duration-200 hover:text-(--accent) ${isActive ? "text-(--accent)" : "text-white"}`}
              >
                {item}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Mobile Hamburger Button */}
      <button className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"}`} />
        <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : "my-1"}`} />
        <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"}`} />
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 top-0 bg-(--primary) flex flex-col items-center justify-center gap-y-8 md:hidden overflow-y-auto py-24 transition-all duration-300 ${
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      }`}>
        {navItems.map((item, index) => {
          const targetId = item.toLowerCase().replace(/\s+/g, "-");
          const isActive = activeSection === targetId;
          const isLast = index === navItems.length - 1;

          return isLast ? (
            <a
              key={item}
              href={`#${targetId}`}
              onClick={closeMenu}
              className={`font-(family-name:--font-super-warming) font-bold mt-4 bg-(--light-blue) text-(--primary) px-8 py-3 rounded-full shadow-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(187,224,239,0.65)] active:scale-95 transition-all duration-300 cursor-pointer ${isActive ? "relative after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-1 after:bg-(--light-blue) after:rounded-full after:shadow-[0_0_8px_rgba(187,224,239,0.8)]" : ""}`}
            >
              {item}
            </a>
          ) : (
            <a
              key={item}
              href={`#${targetId}`}
              onClick={closeMenu}
              className={`text-2xl font-(family-name:--font-super-warming) tracking-wide transition-colors duration-200 hover:text-(--accent) ${isActive ? "text-(--accent)" : "text-white"}`}
            >
              {item}
            </a>
          );
        })}
      </div>
    </nav>
  );
}