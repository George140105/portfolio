"use client";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { FaArrowRight, FaCheck, FaCopy, FaEnvelope } from "react-icons/fa";
import Magnet from "~/components/ui/Magnet";

const EMAIL = "george05.amgad@gmail.com";

// Opens the visitor's mail app with everything but their own words already written.
const MAILTO = `mailto:${EMAIL}?${new URLSearchParams({
  subject: "Hello from your portfolio",
  body: "Hi George,\n\nI came across your portfolio and I'd like to talk about [an internship / a role / a project].\n\nBest,\n[Your name]",
})
  .toString()
  .replace(/\+/g, "%20")}`;

const links = [
  { href: MAILTO, label: "Email", value: EMAIL },
  { href: "https://github.com/George140105", label: "GitHub", value: "George140105" },
  {
    href: "https://www.linkedin.com/in/george-amgad-reyad/",
    label: "LinkedIn",
    value: "george-amgad-reyad",
  },
  { href: "/George_Amgad_Resume.pdf", label: "Resume", value: "View PDF" },
];

type Corner = "tl" | "tr" | "bl" | "br";

/*
 * Cartoon arrows, all drawn for the top-left corner in a 120×80 box: they start near (6, 8) and
 * arrive at the arrowhead's base around (98, 54), heading down-right. Other corners mirror them.
 * Every path ends travelling along the same direction, so one arrowhead fits them all.
 */
const ARROWS = {
  swoosh: "M6 8 C 40 2, 78 14, 98 54",
  loop: "M4 12 C 28 -2, 62 4, 60 26 C 58 44, 34 42, 40 26 C 46 10, 78 14, 90 40 L 98 54",
  wave: "M4 6 C 18 22, 28 -4, 42 12 C 56 28, 64 4, 76 24 C 82 34, 90 40, 98 54",
  bounce: "M4 16 C 16 0, 30 4, 34 20 C 38 34, 54 36, 58 22 C 62 8, 82 14, 90 40 L 98 54",
};
// Chunky filled head, tip at (106, 68), pointing along the arrows' final direction.
const ARROW_HEAD = "M106 68 L105 49 L91 57.5 Z";

const notes: { corner: Corner; text: string; arrow: keyof typeof ARROWS; className: string }[] = [
  { corner: "tl", text: "Go on, click it!", arrow: "loop", className: "left-0 top-0" },
  { corner: "tr", text: "I reply within 2 days", arrow: "swoosh", className: "right-0 top-4 hidden sm:flex" },
  {
    corner: "bl",
    text: "Internships? Research? Let's talk",
    arrow: "wave",
    className: "bottom-4 left-0 hidden sm:flex",
  },
  {
    corner: "br",
    text: "The email is already written for you",
    arrow: "bounce",
    className: "bottom-0 right-0",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A handwritten note with a cartoon arrow pointing at the button. The arrow sketches itself in,
 * then "boils" like a hand-drawn cartoon: a noise filter wobbles its outline, stepping to a new
 * random pattern a few times a second. While the button is hovered the arrows lean in toward it
 * and boil faster.
 */
const Note = ({
  corner,
  text,
  arrow,
  className,
  index,
  eager,
}: {
  corner: Corner;
  text: string;
  arrow: keyof typeof ARROWS;
  className: string;
  index: number;
  eager: boolean;
}) => {
  const right = corner.endsWith("r");
  const bottom = corner.startsWith("b");
  const delay = 0.3 + index * 0.15;
  const filterId = `sketch-${useId().replace(/:/g, "")}`;
  const reduce = useReducedMotion();
  const inView = { once: true, margin: "-15% 0px" };

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute flex max-w-[11rem] select-none sm:max-w-[15rem] md:max-w-[10rem] lg:max-w-[14rem] ${
        bottom ? "flex-col-reverse" : "flex-col"
      } ${right ? "items-end text-right" : "items-start"} ${className}`}
    >
      <motion.p
        initial={{ opacity: 0, y: bottom ? -8 : 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.5, delay, ease }}
        className={`font-serif text-lg italic leading-snug text-highlight sm:text-2xl md:text-lg lg:text-2xl ${
          right ? "rotate-2" : "-rotate-2"
        }`}
      >
        {text}
      </motion.p>
      <motion.svg
        viewBox="0 0 120 80"
        overflow="visible"
        animate={{ x: eager ? (right ? -8 : 8) : 0, y: eager ? (bottom ? -8 : 8) : 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.35 }}
        className={`h-14 w-24 text-foreground/75 sm:h-20 sm:w-32 ${right ? "mr-6 sm:mr-10" : "ml-6 sm:ml-10"}`}
      >
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed={index + 1}>
              {/* Stepped, not smooth: hand-drawn animation redraws a few frames a second. */}
              {!reduce && (
                <animate
                  key={eager ? "fast" : "slow"}
                  attributeName="seed"
                  values={`${index + 1};${index + 9};${index + 4};${index + 13}`}
                  dur={eager ? "0.32s" : "0.6s"}
                  calcMode="discrete"
                  repeatCount="indefinite"
                />
              )}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <g
          filter={`url(#${filterId})`}
          transform={`translate(${right ? 120 : 0} ${bottom ? 80 : 0}) scale(${right ? -1 : 1} ${bottom ? -1 : 1})`}
        >
          {/* The main ink line, sketched in from the tail */}
          <motion.path
            d={ARROWS[arrow]}
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={inView}
            transition={{ duration: 0.7, delay: delay + 0.15, ease: "easeInOut" }}
          />
          {/* A lighter, slightly offset second pass, like a pencil going over the line again */}
          <motion.path
            d={ARROWS[arrow]}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            opacity={0.45}
            transform="translate(2 -1.5)"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={inView}
            transition={{ duration: 0.6, delay: delay + 0.45, ease: "easeInOut" }}
          />
          {/* The head lands with a little cartoon pop once the line arrives */}
          <motion.path
            d={ARROW_HEAD}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={inView}
            transition={{ type: "spring", bounce: 0.55, duration: 0.45, delay: delay + 0.8 }}
          />
        </g>
      </motion.svg>
    </div>
  );
};

const Contact = () => {
  const [copied, setCopied] = useState(false);
  // True while the button is hovered or focused: the arrows lean in.
  const [eager, setEager] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = MAILTO;
    }
  };

  return (
    <footer id="contact" className="relative px-4 pb-10 pt-24 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="font-serif text-5xl leading-none sm:text-6xl md:text-8xl"
        >
          Say <span className="italic text-highlight">hello</span>
        </motion.h2>
        <p className="mt-5 max-w-xl text-muted-foreground sm:text-lg">
          I&apos;m open to internships, research positions and engineering roles. One click and
          you&apos;re writing to me.
        </p>

        <div className="mt-6 grid items-center gap-8 md:grid-cols-[1fr_0.8fr] md:gap-16">
          {/* The stage: the button in the middle, notes and arrows in the corners pointing at it. */}
          <div className="relative flex flex-col items-center py-32 sm:py-40">
            {notes.map((n, i) => (
              <Note key={n.corner} {...n} index={i} eager={eager} />
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              className="relative"
            >
              {/* A slow ring that ripples out from the button to draw the eye. */}
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-primary"
                animate={{ scale: [1, 1.18], opacity: [0.3, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.8, ease: "easeOut" }}
              />
              <Magnet strength={0.15}>
                <a
                  href={MAILTO}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setEager(true)}
                  onPointerLeave={() => setEager(false)}
                  onFocus={() => setEager(true)}
                  onBlur={() => setEager(false)}
                  className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-9 py-5 text-xl font-medium text-primary-foreground shadow-2xl shadow-primary/30 transition-transform active:scale-[0.97] active:duration-100 sm:gap-4 sm:px-14 sm:py-7 sm:text-3xl md:px-10 md:py-6 md:text-2xl lg:px-14 lg:py-7 lg:text-3xl"
                >
                  <FaEnvelope className="shrink-0 text-[0.8em]" />
                  Email me
                  <FaArrowRight className="shrink-0 text-[0.6em] transition-transform group-hover:translate-x-1" />
                </a>
              </Magnet>
            </motion.div>
          </div>

          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="border-t border-border"
          >
            {links.map(({ href, label, value }) => (
              <li key={label} className="flex items-center gap-2 border-b border-border">
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex min-w-0 flex-1 items-baseline justify-between gap-4 py-4 transition-opacity active:opacity-60"
                >
                  <span className="font-mono text-xs text-muted-foreground">{label}</span>
                  <span className="flex min-w-0 items-center gap-2 text-right">
                    <span className="truncate transition-colors group-hover:text-primary">{value}</span>
                    <FaArrowRight
                      size={10}
                      className="shrink-0 -rotate-45 text-muted-foreground transition-transform group-hover:rotate-0 group-hover:text-primary"
                    />
                  </span>
                </a>
                {/* mailto: does nothing on computers without a mail app, so offer a copy too. */}
                {label === "Email" && (
                  <button
                    onClick={copyEmail}
                    aria-label={copied ? "Email copied" : "Copy email address"}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] hover:bg-muted hover:text-foreground active:scale-90"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={copied ? "done" : "copy"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {copied ? <FaCheck size={12} className="text-primary" /> : <FaCopy size={12} />}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                )}
              </li>
            ))}
          </motion.ul>
        </div>

        <p className="mt-16 flex flex-col gap-1 border-t border-border pt-6 font-mono text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <span>&copy; {new Date().getFullYear()} George Amgad</span>
          <span>Cairo, Egypt</span>
        </p>
      </div>
    </footer>
  );
};

export default Contact;
