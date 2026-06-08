"use client";

import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden text-white bg-[#060D3E]">
      {/* Top Orange Border */}
      <div className="w-full h-1 bg-gradient-to-r from-[#F16D34] to-[#FF986A]" />

      {/* Main Footer Container */}
      <div
        className="relative z-10 w-full px-6 pt-16 pb-8 md:px-16"
        style={{
          background: 'linear-gradient(180deg, #10184F 0%, #060D3E 100%)'
        }}
      >
        {/* Full Opacity Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/assets/footer-overlay.svg"
            alt="Footer Overlay"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Content Layout */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-wrap justify-between items-start gap-12 pb-16">
          {/* Left Side Content */}
          <div className="space-y-4 flex-1 min-w-[300px]">
            <h3 className="text-4xl font-bold font-(family-name:--font-super-warming)">Lorem Ipsum</h3>
            <p className="max-w-xs text-base text-white/90 font-(family-name:--font-urbanist)">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </p>
            <button
              className="px-6 py-2.5 font-bold text-white tracking-wider rounded-full font-(family-name:--font-super-warming)"
              style={{ background: 'linear-gradient(90deg, #FF9363 0%, #F54C00 100%)' }}
            >
              Download Resume
            </button>
          </div>

          {/* Right Side Social Links */}
          <div className="flex flex-col gap-3 flex-1 min-w-[200px] md:items-end">
            <h4 className="text-2xl font-bold font-(family-name:--font-super-warming)">Social Links</h4>
            <div className="flex gap-3">
              {[
                { href: 'https://www.linkedin.com/in/faith-gabrielle-gamboa/', Icon: FaLinkedin, label: 'LinkedIn' },
                { href: 'https://github.com/your-username', Icon: FaGithub, label: 'GitHub' },
                { href: 'mailto:your@email.com', Icon: FaEnvelope, label: 'Email' },
                { href: 'tel:+1234567890', Icon: FaPhone, label: 'Phone' },
              ].map(({ href, Icon, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="p-3 text-lg rounded-full bg-[#D6E6ED] text-[#060D3E] hover:opacity-95"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Let's Work Together Watermark at the very bottom edge */}
        <div className="absolute -bottom-18 left-0 w-full text-center pointer-events-none z-0">
          <h2
            className="text-[9vw] font-black uppercase tracking-wider select-none"
            style={{ color: '#D9D9D9', opacity: 0.05, fontFamily: 'var(--font-super-warming)' }}
          >
            LET&apos;S WORK TOGETHER
          </h2>
        </div>

        {/* Copyright Section */}
        <div className="relative z-20 text-center">
            <p className="text-md font-(family-name:--font-urbanist) text-white/80">
                &copy;2026 <span className="font-bold text-[var(--accent)] font-(family-name:--font-super-warming)">Portfolio.</span> All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}