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

const headingStyles = "font-(family-name:--font-super-warming) text-3xl text-white tracking-wide";
const subtextStyles = "font-(family-name:--font-urbanist) text-sm text-white/60 max-w-[280px] mb-6";

export default function Modal({
  isOpen, onClose, children, heading, subtext, primaryButton, secondaryButton
}: ModalProps) {
    useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Solid Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
           className="fixed inset-0 z-50 bg-[#060D3E]/60 backdrop-blur-sm transition-colors"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            {/* Solid Card */}
            <div className="relative w-full max-w-md pointer-events-auto bg-[#10184F] p-8 rounded-3xl border-4 border-white/5 shadow-2xl">

              {/* Decorative Accent Dots (The "Fun" Element) */}
                <div className="absolute top-6 left-6 flex gap-1.5">
                    {/* Dot 1: Start color (FF9363) */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF9363]" />

                    {/* Dot 2: Mid-gradient color (60EEE7) */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#60EEE7]" />

                    {/* Dot 3: End color (BBE0EF) */}
                    <div className="w-2.5 h-2.5 rounded-full bg-[#BBE0EF]" />
                </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 text-white/40 hover:text-[var(--accent)] transition-colors cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              {heading && (
                <div className="flex flex-col items-center gap-1 text-center mt-6 mb-8">
                  <p className={headingStyles}>{heading}</p>
                  {subtext && <p className={subtextStyles}>{subtext}</p>}
                </div>
              )}

              {/* Content */}
              <div className="mb-8">{children}</div>

              {/* Solid Accent Buttons */}
              {(primaryButton || secondaryButton) && (
                <div className="flex flex-col gap-3">
                  {primaryButton && (
                    <button
                      onClick={primaryButton.onClick}
                      className="w-full py-4 rounded-xl font-bold text-[#060D3E] bg-[var(--accent)] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
                    >
                      {primaryButton.label}
                    </button>
                  )}
                  {secondaryButton && (
                    <button
                      onClick={secondaryButton.onClick}
                      className="w-full py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 active:scale-[0.99] transition-all cursor-pointer"
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