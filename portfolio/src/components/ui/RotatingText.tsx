"use client";
// A lean take on React Bits' <RotatingText />: cycles words, staggering each letter in and out.
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

interface Props {
  words: string[];
  interval?: number;
  className?: string;
}

export default function RotatingText({ words, interval = 2800, className }: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-flex overflow-hidden ${className ?? ""}`}>
      {/* Screen readers get the whole list once instead of a new word every few seconds. */}
      <span className="sr-only">{new Intl.ListFormat("en", { type: "conjunction" }).format(words)}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={words[i]} className="inline-flex whitespace-pre" aria-hidden>
          {words[i].split("").map((ch, n) => (
            <motion.span
              key={n}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              exit={{ y: "-110%" }}
              transition={{ type: "spring", damping: 30, stiffness: 400, delay: n * 0.02 }}
              className="inline-block"
            >
              {ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
