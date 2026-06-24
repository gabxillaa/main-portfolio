"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { X } from "lucide-react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  heading?: string;
  subtext?: string;
  primaryButton?: { label: string; onClick: () => void };
  secondaryButton?: { label: string; onClick: () => void };
};

const headingStyles = "font-[family-name:var(--font-display)] text-2xl md:text-3xl font-normal text-[var(--primary)] uppercase tracking-tight leading-none text-center";
const subtextStyles = "font-[family-name:var(--font-body)] text-xs md:text-sm font-light text-[var(--light-primary)] max-w-xs text-center mt-2 antialiased";

export default function Modal({
  isOpen, onClose, children, heading, subtext, primaryButton, secondaryButton
}: ModalProps) {

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Editorial Matte Overlay Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[var(--dark-green)]/40 backdrop-blur-md transition-opacity duration-300"
          />

          {/* Modal Centering Viewport */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-16 pointer-events-none"
          >
            {/* Premium Structure Framework Container */}
            <div className="relative w-full max-w-md pointer-events-auto bg-[var(--background)] p-6 md:p-8 rounded-2xl border border-[var(--dark-green)]/10 shadow-xl max-h-[85vh] overflow-hidden flex flex-col justify-between gap-6">


              {/* Dismiss Action Control Link */}
              <button
                onClick={onClose}
                aria-label="Close interactive prompt window"
                className="absolute top-4 right-4 p-2 text-[var(--primary)]/40 hover:text-[var(--primary)] transition-colors duration-200 cursor-pointer rounded-full focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Layout Branding Content Presentation Headings */}
              {heading && (
                <div className="flex flex-col items-center mt-4 shrink-0">
                  <h2 className={headingStyles}>{heading}</h2>
                  {subtext && <p className={subtextStyles}>{subtext}</p>}
                </div>
              )}

              {/* Central Project Canvas Content */}
              <div
                className="overflow-y-auto flex-1 min-h-0 w-full text-[var(--primary)] font-[family-name:var(--font-body)]"
                style={{ scrollbarWidth: "thin", scrollbarColor: "var(--dark-green)/10 transparent" }}
              >
                {children}
              </div>

              {/* Actions Interface Section Blocks */}
              {(primaryButton || secondaryButton) && (
                <div className="flex flex-col gap-2 shrink-0 w-full mt-2">
                  {primaryButton && (
                    <button
                      onClick={primaryButton.onClick}
                      className="w-full h-11 rounded-full font-[family-name:var(--font-body)] text-xs font-semibold tracking-widest uppercase text-[var(--background)] bg-[var(--primary)] border border-[var(--primary)] hover:bg-transparent hover:text-[var(--primary)] transition-all duration-300 cursor-pointer"
                    >
                      {primaryButton.label}
                    </button>
                  )}
                  {secondaryButton && (
                    <button
                      onClick={secondaryButton.onClick}
                      className="w-full h-11 rounded-full font-[family-name:var(--font-body)] text-xs font-semibold tracking-widest uppercase text-[var(--primary)] bg-transparent border border-[var(--dark-green)]/20 hover:border-[var(--primary)] transition-all duration-300 cursor-pointer"
                    >
                      {secondaryButton.label}
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}