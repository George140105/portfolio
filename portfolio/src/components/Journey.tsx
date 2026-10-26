"use client";
import { motion, useMotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import {
  FaAward,
  FaBriefcase,
  FaChalkboardTeacher,
  FaFlask,
  FaGraduationCap,
  FaRocket,
  FaUsers,
} from "react-icons/fa";

type Kind = "Education" | "Work" | "Teaching" | "Award" | "Research" | "Leadership" | "Next";

interface Milestone {
  year: string;
  period: string;
  kind: Kind;
  title: string;
  org: string;
  place?: string;
  points: string[];
  tags?: string[];
  future?: boolean;
}

const kindIcon: Record<Kind, IconType> = {
  Education: FaGraduationCap,
  Work: FaBriefcase,
  Teaching: FaChalkboardTeacher,
  Award: FaAward,
  Research: FaFlask,
  Leadership: FaUsers,
  Next: FaRocket,
};

// Oldest first: the trail is read top-to-bottom, forward in time.
const milestones: Milestone[] = [
  {
    year: "2021",
    period: "Jul 2021 – Jun 2022",
    kind: "Teaching",
    title: "Teaching Assistant, A-Level Mathematics",
    org: "Nefertari International Schools",
    place: "Cairo, Egypt",
    points: [
      "Supported A-Level Mathematics teaching for 50 students while still in school",
      "Explained problem-solving methods, created and graded quizzes, and helped with exam preparation",
    ],
  },
  {
    year: "2022",
    period: "2022",
    kind: "Award",
    title: "Top 1% nationally in IGCSE",
    org: "Nefertari International Schools",
    points: ["124% overall IGCSE score", "Earned an academic scholarship for university"],
  },
  {
    year: "2022",
    period: "2022 – Jun 2027 (expected)",
    kind: "Education",
    title: "BSc Computer Science",
    org: "German University in Cairo (GUC)",
    place: "Cairo, Egypt",
    points: [
      "GPA 1.05 on the German scale (lower is better)",
      "Coursework in Operating Systems, Computer Architecture, Embedded Systems, Data Engineering and Computer Vision",
    ],
    tags: ["Scholarship", "Final year"],
  },
  {
    year: "2024",
    period: "Aug 2024 – Dec 2024",
    kind: "Work",
    title: "Software Engineer Intern",
    org: "KemitWare",
    place: "Remote",
    points: [
      "Developed cross-platform React Native apps for Android and iOS",
      "Integrated authentication and real-time messaging with backend APIs",
    ],
    tags: ["React Native", "iOS", "Android"],
  },
  {
    year: "2025",
    period: "Jun 2025 – Feb 2026",
    kind: "Work",
    title: "Mobile Software Engineer",
    org: "Hiryo",
    place: "Hybrid · Intern (Jun – Aug 2025), then Part-Time",
    points: [
      "Built background location sharing, geofencing, shared maps and SOS alerts for a family safety app, working through Android's permission, background-execution and battery limits",
      "Simplified onboarding and permission flows to reduce early drop-off, and managed Google Play releases, testing tracks and compliance",
      "Built a household management app with shared tasks, events and documents, synced in real time with Supabase",
    ],
    tags: ["React Native", "Expo", "Supabase"],
  },
  {
    year: "2026",
    period: "2026",
    kind: "Research",
    title: "Bachelor Thesis: Tablet Builder Puzzle",
    org: "German University in Cairo",
    points: [
      "A web game teaching K–12 students how tablet hardware works, with Bloom's Taxonomy-aligned difficulty tiers",
      "Field-tested with 21 students across three age groups, with a statistically significant learning gain (Wilcoxon signed-rank test)",
    ],
  },
  {
    year: "2026",
    period: "2026 – Present",
    kind: "Leadership",
    title: "Team Support Member",
    org: "IEEE GUC",
    points: ["Coordinate across club teams and resolve conflicts", "Organize trips and outings for members"],
  },
  {
    year: "2027",
    period: "June 2027 and beyond",
    kind: "Next",
    title: "Graduation, then a Master's degree",
    org: "The next stop",
    points: ["Finishing my BSc and continuing to a Master's degree"],
    future: true,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

interface Trail {
  d: string;
  width: number;
  height: number;
  ys: number[];
}

/** Builds a winding path through the node centres; each leg swings out toward the empty side. */
function buildTrail(points: { x: number; y: number }[], swing: number): string {
  if (!points.length) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const dy = b.y - a.y;
    const s = (i % 2 === 0 ? 1 : -1) * swing;
    d += ` C ${a.x + s} ${a.y + dy * 0.4}, ${b.x + s} ${b.y - dy * 0.4}, ${b.x} ${b.y}`;
  }
  return d;
}

/** Path length at which the (vertically monotonic) path reaches height `y`. */
function lengthAtY(path: SVGPathElement, total: number, y: number): number {
  let lo = 0;
  let hi = total;
  for (let n = 0; n < 18; n++) {
    const mid = (lo + hi) / 2;
    if (path.getPointAtLength(mid).y < y) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

const MilestoneRow = ({
  m,
  index,
  reached,
  nodeRef,
}: {
  m: Milestone;
  index: number;
  reached: boolean;
  nodeRef: (el: HTMLSpanElement | null) => void;
}) => {
  const Icon = kindIcon[m.kind];
  const onLeft = index % 2 === 0;

  return (
    <li className="relative grid grid-cols-[3rem_1fr] gap-x-4 pb-16 md:grid-cols-[1fr_5rem_1fr] md:gap-x-0 md:pb-20">
      <div className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2">
        <span
          ref={nodeRef}
          className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 ${
            reached
              ? m.future
                ? "border-primary bg-background text-primary"
                : "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground"
          } ${m.future ? "border-dashed" : ""}`}
        >
          <Icon size={16} />
        </span>
      </div>

      {/* Year on the opposite side of the card (desktop only) */}
      <motion.span
        aria-hidden
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-25% 0px" }}
        transition={{ duration: 0.8, ease }}
        className={`row-start-1 hidden select-none self-start font-serif text-6xl italic leading-none text-muted-foreground/40 md:block ${
          onLeft ? "col-start-3 pl-16 text-left" : "col-start-1 pr-16 text-right"
        }`}
      >
        {m.year}
      </motion.span>

      <motion.article
        initial={{ opacity: 0, x: onLeft ? -28 : 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.8, ease }}
        className={`relative col-start-2 row-start-1 ${onLeft ? "md:col-start-1 md:mr-6" : "md:col-start-3 md:ml-6"}`}
      >
        {/* Short arrow from the trail into the card */}
        <svg
          aria-hidden
          viewBox="0 0 40 12"
          className={`absolute top-4 h-3 w-5 text-foreground/50 md:w-7 ${
            onLeft ? "-left-5 md:left-auto md:-right-7 md:rotate-180" : "-left-5 md:-left-7"
          }`}
        >
          <motion.path
            d="M0 6 H34 M28 1 L35 6 L28 11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-25% 0px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </svg>

        <div
          className={`rounded-2xl border p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 sm:p-6 ${
            m.future
              ? "border-dashed border-primary/50 bg-card/60"
              : "border-border bg-card/90 hover:border-foreground/25"
          }`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <span className="font-mono text-xs text-primary">{m.period}</span>
            <span className="font-mono text-xs text-muted-foreground">{m.kind}</span>
          </div>
          <h3 className="mt-3 font-serif text-2xl leading-tight sm:text-[1.7rem]">{m.title}</h3>
          <p className="mt-1 text-sm text-foreground/80">
            {m.org}
            {m.place && <span className="text-muted-foreground"> · {m.place}</span>}
          </p>
          <ul className="mt-4 space-y-2">
            {m.points.map((p) => (
              <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-[0.6rem] h-px w-3 shrink-0 bg-muted-foreground/60" />
                {p}
              </li>
            ))}
          </ul>
          {m.tags && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {m.tags.map((t) => (
                <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.article>
    </li>
  );
};

const Journey = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGGElement>(null);
  const nodeEls = useRef<(HTMLSpanElement | null)[]>([]);
  const nodeLengths = useRef<number[]>([]);
  const [trail, setTrail] = useState<Trail | null>(null);
  const [markers, setMarkers] = useState<{ x: number; y: number; angle: number }[]>([]);
  const [reached, setReached] = useState(0);
  const drawn = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 65%", "end 65%"] });

  // Measure node centres and (re)build the trail whenever the layout changes size.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const box = list.getBoundingClientRect();
      const points = nodeEls.current.map((el) => {
        const r = el!.getBoundingClientRect();
        return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
      });
      const swing = window.innerWidth >= 768 ? 70 : 16;
      setTrail({
        d: buildTrail(points, swing),
        width: box.width,
        height: box.height,
        ys: points.map((p) => p.y),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(list);
    return () => ro.disconnect();
  }, []);

  const update = useCallback(
    (progress: number) => {
      const path = pathRef.current;
      if (!path || !trail) return;
      const total = path.getTotalLength();
      const first = trail.ys[0];
      const last = trail.ys[trail.ys.length - 1];
      const targetY = first + Math.min(1, Math.max(0, progress)) * (last - first);
      const len = lengthAtY(path, total, targetY);
      drawn.set(total ? len / total : 0);

      // Arrowhead sits at the tip and points along the trail.
      const p = path.getPointAtLength(len);
      const q = path.getPointAtLength(Math.min(total, len + 1));
      const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
      tipRef.current?.setAttribute("transform", `translate(${p.x} ${p.y}) rotate(${angle})`);

      const count = nodeLengths.current.filter((l) => l <= len + 2).length;
      setReached((r) => (r === count ? r : count));
    },
    [trail, drawn]
  );

  // Once the trail exists, find where each node and each mid-leg arrow sits along it.
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !trail) return;
    const total = path.getTotalLength();
    nodeLengths.current = trail.ys.map((y) => lengthAtY(path, total, y));
    const mids = trail.ys.slice(0, -1).map((y, i) => {
      const len = lengthAtY(path, total, (y + trail.ys[i + 1]) / 2);
      const p = path.getPointAtLength(len);
      const q = path.getPointAtLength(len + 1);
      return { x: p.x, y: p.y, angle: (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI };
    });
    setMarkers(mids);
    update(scrollYProgress.get());
  }, [trail, update, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", update);

  return (
    <section id="journey" className="relative overflow-x-clip px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="mb-16 max-w-2xl md:mb-24"
        >
          <h2 className="font-serif text-5xl leading-none sm:text-6xl md:text-7xl">
            The road <span className="italic text-highlight">so far</span>
          </h2>
          <p className="mt-5 text-muted-foreground sm:text-lg">
            From explaining A-Level maths as a student myself to shipping apps and running a
            user study for my thesis. Scroll and follow the trail.
          </p>
        </motion.header>

        <ol ref={listRef} className="relative">
          {trail && (
            <svg
              aria-hidden
              width={trail.width}
              height={trail.height}
              className="pointer-events-none absolute left-0 top-0 overflow-visible"
            >
              {/* The full route, faint and dotted like a footpath on a map */}
              <path
                ref={pathRef}
                d={trail.d}
                fill="none"
                stroke="rgb(var(--muted-foreground) / 0.35)"
                strokeWidth="2"
                strokeDasharray="1 9"
                strokeLinecap="round"
              />
              {/* Direction arrows halfway along each leg */}
              {markers.map((mk, i) => (
                <path
                  key={i}
                  d="M -5 -5 L 2 0 L -5 5"
                  fill="none"
                  stroke="rgb(var(--muted-foreground) / 0.6)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  transform={`translate(${mk.x} ${mk.y}) rotate(${mk.angle})`}
                />
              ))}
              {/* The part you've travelled, inked in as you scroll */}
              <motion.path
                d={trail.d}
                fill="none"
                stroke="rgb(var(--primary))"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ pathLength: drawn }}
              />
              <g ref={tipRef}>
                <path
                  d="M -9 -7 L 3 0 L -9 7"
                  fill="none"
                  stroke="rgb(var(--primary))"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          )}

          {milestones.map((m, i) => (
            <MilestoneRow
              key={m.title}
              m={m}
              index={i}
              reached={i < reached}
              nodeRef={(el) => {
                nodeEls.current[i] = el;
              }}
            />
          ))}
        </ol>

        <Languages />
      </div>
    </section>
  );
};

const languages = [
  { lang: "Arabic", level: "Native" },
  { lang: "English", level: "Professional" },
  { lang: "French", level: "Intermediate, B1" },
  { lang: "German", level: "Elementary, A2" },
];

const Languages = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, ease }}
    className="mt-4 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-baseline sm:gap-10"
  >
    <h3 className="font-serif text-2xl italic">Languages I speak</h3>
    <ul className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
      {languages.map((l) => (
        <li key={l.lang}>
          <div className="font-medium">{l.lang}</div>
          <div className="text-sm text-muted-foreground">{l.level}</div>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default Journey;
