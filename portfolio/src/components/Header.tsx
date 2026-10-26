"use client";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import ThemeToggle from "~/components/ThemeToggle";

// The name in the header already leads home, so the nav only lists destinations.
const sections = [
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const Header = () => {
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // A section is "active" when it crosses the upper-middle band of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === "home" ? null : entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    [{ id: "home" }, ...sections].forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // While the menu is open: lock the page behind it and let Escape close it.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 -z-10 bg-black/30 backdrop-blur-[2px] md:hidden"
          />
        )}
      </AnimatePresence>
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-primary"
      />
      <div
        className={`border-b transition-colors duration-300 ${
          scrolled || menuOpen
            ? `border-border backdrop-blur-md ${menuOpen ? "bg-background" : "bg-background/80"}`
            : "border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#home" onClick={() => setMenuOpen(false)} className="font-serif text-2xl leading-none">
            George Amgad<span className="text-primary">.</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={`relative py-1 text-sm transition-colors ${
                  active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
                {active === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-foreground"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:bg-muted active:scale-90 md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col px-4 pb-4">
                {sections.map(({ id, label }, i) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                    className={`flex items-baseline justify-between border-b border-border py-3 font-serif text-3xl transition-opacity active:opacity-60 ${
                      active === id ? "text-primary" : ""
                    }`}
                  >
                    {label}
                    <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
