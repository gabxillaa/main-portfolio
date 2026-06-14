"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  message?: string;
};

export default function LoadingOverlay({ open, message = "Sending..." }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-50 flex items-center justify-center rounded-[2.5rem] bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center gap-3 text-white"
          >
            <div className="h-10 w-10 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <p className="text-sm opacity-80">{message}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}