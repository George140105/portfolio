"use client";
// A lean take on React Bits' <CountUp />: counts to `to` once the number scrolls into view.
import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

interface Props {
  to: number;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function CountUp({ to, decimals = 0, duration = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = to.toFixed(decimals);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, to, decimals, duration, reduce]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {(0).toFixed(decimals)}
    </span>
  );
}
