"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiLightBulb } from "react-icons/hi";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-zinc-800 dark:bg-zinc-100 shadow-lg hover:scale-110 transition-transform"
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{
          rotate: theme === "dark" ? 0 : 360,
          scale: theme === "dark" ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <HiLightBulb
          className={`w-6 h-6 ${
            theme === "dark"
              ? "text-zinc-600"
              : "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]"
          }`}
        />
      </motion.div>
    </motion.button>
  );
}
