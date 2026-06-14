"use client";

import { useEffect } from "react";

export default function ScrollReset() {
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []); // runs once on every mount — including back navigation

  return null;
}