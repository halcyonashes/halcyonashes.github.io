"use client";
import { useEffect, useState } from "react";

const isDarkNow = (): boolean => {
  const explicit = document.documentElement.dataset.theme;
  if (explicit) return explicit === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(isDarkNow());
  }, []);

  const toggle = () => {
    const next = isDarkNow() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable (private mode); the override still applies for this page view.
    }
    setIsDark(next === "dark");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      className="button"
    >
      Dark theme
    </button>
  );
}
