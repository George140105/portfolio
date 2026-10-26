"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { HiMoon, HiSun } from "react-icons/hi";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // The theme is only known on the client, so hold the button's place until then.
  if (!mounted) return <span className="skeleton block h-10 w-10 rounded-full" aria-hidden />;

  const isDark = resolvedTheme !== "light";

  // The new theme spreads out in a circle from the button, so the change visibly starts where you pressed.
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return setTheme(next);

    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    // Far enough to cover the corner of the viewport furthest from the button.
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = document.startViewTransition(() => flushSync(() => setTheme(next)));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 600, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  return (
    <button
      onClick={toggle}
      className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition-transform hover:bg-muted active:scale-90"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ y: 16, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -16, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? <HiMoon size={18} /> : <HiSun size={18} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
