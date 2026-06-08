"use client";

import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ["Home", "About Me", "Projects", "Tech Stack"];
  const sectionIds = ["home", "about-me", "projects", "tech-stack"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((e) => e.isIntersecting);
        if (visibleSections.length > 0) {
          const mostVisible = visibleSections.reduce((c, e) =>
            e.intersectionRatio > c.intersectionRatio ? e : c
          );
          setActiveSection(mostVisible.target.id);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -55% 0px" }
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
    <nav className={`fixed top-0 left-0 w-full z-50 flex items-center justify-end px-8 py-6 md:px-16 transition-colors duration-300 ${isScrolled ? "bg-(--primary) backdrop-blur-md border-b border-white/10" : "bg-transparent border-b border-transparent"}`}>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-x-12 font-(family-name:--font-super-warming) text-white text-lg tracking-wide">
        {navItems.map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className={`transition-colors duration-200 hover:text-(--accent) ${activeSection === item.toLowerCase().replace(/\s+/g, "-") ? "text-(--accent)" : "text-white"}`}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* Action Button */}
      <button className="hidden md:block ml-12 cursor-pointer bg-(--light-blue) text-(--primary) font-(family-name:--font-super-warming) font-bold px-6 py-2.5 rounded-full shadow-sm hover:scale-105 hover:shadow-[0_0_20px_rgba(187,224,239,0.65)] active:scale-95 transition-all duration-300">
        Contact Me
      </button>

      {/* Mobile Hamburger Button */}
      <button className="md:hidden flex flex-col justify-center items-center w-8 h-8 z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : "-translate-y-1"}`} />
        <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : "my-1"}`} />
        <div className={`w-7 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : "translate-y-1"}`} />
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-(--primary) flex flex-col items-center justify-center gap-y-8 md:hidden transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={closeMenu}
            className="text-2xl text-white font-(family-name:--font-super-warming)"
          >
            {item}
          </a>
        ))}
        <button onClick={closeMenu} className="font-(family-name:--font-super-warming) mt-4 bg-(--light-blue) text-(--primary) font-bold px-8 py-3 rounded-full">
          Contact Me
        </button>
      </div>
    </nav>
  );
}