"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Heart, ArrowRight } from "lucide-react";
import FeedbackModal from "./modals/feedback-modal";

// ── Confetti ──────────────────────────────────────────────────────────────────
const CONFETTI_COLORS = ["var(--accent)", "#71B5C2", "#83E3B6", "#FF844B", "#FFD580", "#F24E1E", "#fff"];
const SYMBOLS = ["✦", "★", "◆", "•", "✿", "♥"];

function ConfettiPiece({ x, color, symbol, delay }: {
  x: number;
  color: string;
  symbol: string;
  delay: number;
}) {
  const drift  = (Math.random() - 0.5) * 300;
  const rotate = Math.random() * 720 - 360;
  return (
    <motion.span
      className="pointer-events-none fixed select-none"
      style={{ left: x, top: "50%", fontSize: Math.random() * 14 + 10, color, zIndex: 9999 }}
      initial={{ y: 0, x: 0, opacity: 1, rotate: 0, scale: 1 }}
      animate={{ y: -400, x: drift, opacity: 0, rotate, scale: [1, 1.4, 0.8] }}
      transition={{ duration: 1.6 + Math.random() * 0.8, delay, ease: "easeOut" }}
    >
      {symbol}
    </motion.span>
  );
}

type ConfettiItem = { id: number; x: number; color: string; symbol: string; delay: number };

// ── No escape messages ───────────────────────────────────────────────────────
const ESCAPE_MESSAGES = [
  "No",
  "Nice try",
  "Are you sure?",
  "Try again",
  "Really?",
  "Keep clicking!",
  "Giving up yet?",
  "Still there?",
  "You're persistent!",
  "Okay, stop it now",
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function DidYouLikeIt() {
  const [noPos, setNoPos]             = useState({ x: 0, y: 0 });
  const [escaped, setEscaped]         = useState(0);
  const [celebrated, setCelebrated]   = useState(false);
  const [confetti, setConfetti]       = useState<ConfettiItem[]>([]);
  const [modalOpen, setModalOpen]     = useState(false);

  const noRef      = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const confettiId = useRef(0);

  // ── No escape ───────────────────────────────────────────────────────────────
  const handleNoEscape = useCallback(() => {
    const section = sectionRef.current;
    const btn     = noRef.current;
    if (!section || !btn) return;

    const sRect = section.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    const pad   = 24;
    const maxX  = sRect.width  - bRect.width  - pad;
    const maxY  = sRect.height - bRect.height - pad;

    let newX: number, newY: number, attempts = 0;
    do {
      newX = pad + Math.random() * maxX;
      newY = pad + Math.random() * maxY;
      attempts++;
    } while (
      attempts < 10 &&
      Math.abs(newX - noPos.x) < 120 &&
      Math.abs(newY - noPos.y) < 80
    );

    setNoPos({ x: newX, y: newY });
    setEscaped(prev => prev + 1);
  }, [noPos]);

  // ── Yes — two paths ─────────────────────────────────────────────────────────
  const handleYes = useCallback(() => {
    if (escaped <= 5) {
      const pieces: ConfettiItem[] = Array.from(
        { length: 48 },
        (_, i) => ({
          id: confettiId.current++,
          x: Math.random() * window.innerWidth,
          color:
            CONFETTI_COLORS[
              Math.floor(Math.random() * CONFETTI_COLORS.length)
            ],
          symbol:
            SYMBOLS[
              Math.floor(Math.random() * SYMBOLS.length)
            ],
          delay: i * 0.03,
        })
      );

      setConfetti(pieces);
      setCelebrated(true);

      setTimeout(() => setConfetti([]), 3500);

      setTimeout(() => {
        document
          .getElementById("contact-me")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 1400);

      return;
    }

    // Yes after playing No → confetti + feedback modal
    const pieces: ConfettiItem[] = Array.from({ length: 48 }, (_, i) => ({
      id:     confettiId.current++,
      x:      Math.random() * window.innerWidth,
      color:  CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      delay:  i * 0.03,
    }));
    setConfetti(pieces);
    setCelebrated(true);
    setTimeout(() => setConfetti([]), 3500);
    setTimeout(() => setModalOpen(true), 1200);
  }, [escaped]);

  const noLabel    = ESCAPE_MESSAGES[Math.min(escaped, ESCAPE_MESSAGES.length - 1)];
  const isFloating = escaped > 0;

  return (
    <>
      <FeedbackModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <section
        ref={sectionRef}
        className="relative w-full min-h-[60vh] bg-(--background) flex items-center justify-center overflow-hidden"
      >
        {/* Confetti */}
        <AnimatePresence>
          {confetti.map(p => <ConfettiPiece key={p.id} {...p} />)}
        </AnimatePresence>

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(ellipse, var(--accent) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 w-full max-w-screen-lg mx-auto px-8 md:px-16 flex flex-col items-center text-center gap-10">
          <AnimatePresence mode="wait">
            {!celebrated ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-10"
              >
                {/* Heading */}
                <div className="flex flex-col items-center gap-3">
                  <span
                    className="font-(family-name:--font-super-warming) text-xs font-black uppercase tracking-[0.3em]"
                    style={{ color: "var(--accent)" }}
                  >
                    Quick question
                  </span>
                  <h2
                    className="font-(family-name:--font-super-warming) font-black uppercase tracking-wide leading-none"
                    style={{
                      fontSize: "clamp(2rem, 6vw, 4.5rem)",
                      color: "var(--primary)",
                      textShadow: "0 4px 30px color-mix(in srgb, var(--primary) 8%, transparent)",
                    }}
                  >
                    Did you like{" "}
                    <span
                      className="text-(--accent)"
                      style={{ textShadow: "0 4px 30px color-mix(in srgb, var(--accent) 30%, transparent)" }}
                    >
                      my work?
                    </span>
                  </h2>

                  {escaped >= 3 && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-(family-name:--font-urbanist) text-base text-(--text)/60"
                    >
                      {escaped >= 20 ? "Okay, you have legendary patience. I'm impressed."
                        : escaped >= 15 ? "Are you trying to break my code? It's working."
                        : escaped >= 12 ? "My cursor-tracking is getting tired."
                        : escaped >= 10 ? "I can do this all day."
                        : escaped >= 7  ? "Seriously, it's just going to move."
                        : escaped >= 5  ? "You're really committed to this."
                        : "The button seems a bit shy today."}
                    </motion.p>
                  )}
                </div>

                {/* Buttons */}
                <div
                  className="relative w-full flex items-center justify-center gap-6"
                  style={{ minHeight: 80 }}
                >
                  {/* YES */}
                  <motion.button
                    onClick={handleYes}
                    whileHover={{ scale: 1.06 }}
                    className="cursor-pointer flex items-center gap-2 font-(family-name:--font-urbanist) font-black uppercase tracking-widest text-sm px-10 py-4 rounded-full"
                    style={{ background: "var(--accent)", color: "#fff" }}
                  >
                    {escaped <=5 ? "Yes!!" : "Okay fine, yes"} <CheckCircle2 size={18} />
                  </motion.button>

                  {/* NO */}
                  <motion.button
                    ref={noRef}
                    onMouseEnter={handleNoEscape}
                    onTouchStart={handleNoEscape}
                    onClick={handleNoEscape}
                    animate={isFloating
                      ? {
                          x: noPos.x - (sectionRef.current?.offsetWidth  ?? 0) / 2 + 60,
                          y: noPos.y - (sectionRef.current?.offsetHeight ?? 0) / 2,
                        }
                      : { x: 0, y: 0 }
                    }
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="cursor-pointer font-(family-name:--font-urbanist) font-black uppercase tracking-widest text-sm px-10 py-4 rounded-full border-2"
                    style={{
                      position:    isFloating ? "absolute" : "relative",
                      borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)",
                      color:       "color-mix(in srgb, var(--primary) 50%, transparent)",
                      background:  "transparent",
                      zIndex:      20,
                      whiteSpace:  "nowrap",
                    }}
                  >
                    {noLabel}
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="celebrated"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="p-4 rounded-full bg-(--accent)/10 text-(--accent)">
                  <Heart size={48} fill="currentColor" />
                </div>
                <h2
                  className="font-(family-name:--font-super-warming) font-black uppercase tracking-wide"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--primary)" }}
                >
                  You Just Made My{" "}
                  <span className="text-(--accent)">Day!</span>
                </h2>
                <p className="flex items-center gap-2 font-(family-name:--font-urbanist) text-base text-gray-500">
                  Thank you for playing along!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}