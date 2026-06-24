"use client";

import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden text-[var(--background)] bg-[var(--dark-green)] selection:bg-[var(--beige)] selection:text-[var(--primary)]">
      {/* Structural Accent Top Divider Line */}
      <div className="w-full h-1 bg-[var(--primary)]" />

      {/* Main Footer Container with tighter padding */}
      <div className="relative z-10 w-full px-6 pt-10 pb-4 md:px-16">

        {/* Full Opacity Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10 mix-blend-overlay">
          <img
            src="/assets/footer-overlay.svg"
            alt="Footer Overlay"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Content Layout with tighter padding gaps */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-wrap justify-between items-start gap-8 pb-8">
          {/* Left Side Content */}
          <div className="space-y-3 flex-1 min-w-[300px]">
            <h3 className="text-4xl font-[family-name:var(--font-display)]">Got a cool idea?</h3>
            <p className="max-w-xs text-base text-[var(--background)]/90 font-[family-name:var(--font-body)]">
              I love turning ideas into simple, usable interfaces that people actually enjoy using.
            </p>
            <button
              className="px-6 py-2.5 text-[var(--background)] bg-[var(--primary)] hover:bg-[var(--beige)] hover:text-[var(--dark-green)] tracking-wider rounded-full font-[family-name:var(--font-display)] transition-colors duration-300 cursor-pointer"
            >
              Download Resume
            </button>
          </div>

          {/* Right Side Social Links */}
          <div className="flex flex-col gap-3 flex-1 min-w-[200px] md:items-end">
            <h4 className="text-2xl font-bold font-[family-name:var(--font-display)]">Social Links</h4>
            <div className="flex gap-3">
              {[
                { href: 'https://www.linkedin.com/in/faith-gabrielle-gamboa/', Icon: FaLinkedin, label: 'LinkedIn' },
                { href: 'https://github.com/gabxillaa', Icon: FaGithub, label: 'GitHub' },
                { href: 'mailto:faithgabriellegamboa046@gmail.com', Icon: FaEnvelope, label: 'Email' },
                { href: 'tel:+639674306842', Icon: FaPhone, label: 'Phone' },
              ].map(({ href, Icon, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="p-3 text-lg rounded-full bg-[var(--beige)] text-[var(--dark-green)] hover:bg-[var(--background)] transition-colors duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Let's Work Together Watermark pushed tighter to bottom */}
        <div className="absolute -bottom-17 left-0 w-full text-center pointer-events-none z-0">
          <h2
            className="text-[9vw] font-black uppercase tracking-wider select-none opacity-[0.03]"
            style={{ color: 'var(--background)', fontFamily: 'var(--font-display)' }}
          >
            LET&apos;S WORK TOGETHER
          </h2>
        </div>

        {/* Copyright Section */}
        <div className="relative z-20 text-center pt-4 border-t border-[var(--background)]/10">
          <p className="text-md font-[family-name:var(--font-body)] text-[var(--background)]/80">
            &copy;2026 <span className="font-bold text-[var(--beige)] font-[family-name:var(--font-display)]">Faith-Portfolio.</span> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}