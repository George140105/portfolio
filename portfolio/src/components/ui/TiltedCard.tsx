"use client";
// A lean take on React Bits' <TiltedCard />: tilts in 3D toward the cursor and springs back.
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  amplitude?: number;
  className?: string;
}

export default function TiltedCard({ children, amplitude = 10, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.6 };
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-amplitude, amplitude]), spring);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [amplitude, -amplitude]), spring);
  const scale = useSpring(1, spring);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div className={`[perspective:900px] ${className ?? ""}`}>
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, scale }}
        onPointerMove={onMove}
        onPointerEnter={(e) => e.pointerType === "mouse" && scale.set(1.03)}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
          scale.set(1);
        }}
        className="h-full w-full [transform-style:preserve-3d]"
      >
        {children}
      </motion.div>
    </div>
  );
}
