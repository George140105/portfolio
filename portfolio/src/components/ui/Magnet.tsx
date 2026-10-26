"use client";
// A lean take on React Bits' <Magnet />: the child leans toward the cursor while it's nearby.
// Only active on devices with a fine pointer, so touch screens are unaffected.
// Critically damped: hovering carries no momentum, so the button shouldn't overshoot.
import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

export default function Magnet({ children, strength = 0.25 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 30 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}
