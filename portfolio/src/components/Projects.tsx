"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { FaArrowRight, FaPlay, FaTimes } from "react-icons/fa";
import ProjectCover from "~/components/ProjectCover";
import ProjectModal from "~/components/ProjectModal";
import { SkeletonImage } from "~/components/ui/Media";
import PhoneFrame from "~/components/ui/PhoneFrame";
import { categories, projects, TECH_FILTER_EVENT, type Project, type ProjectCategory } from "~/data/projects";

type Filter = "All" | ProjectCategory;

const ease = [0.22, 1, 0.36, 1] as const;

// "All" opens on a short, strong selection; the rest is one tap away.
const INITIAL_COUNT = 6;

const hasMedia = (p: Project) => !!(p.video || p.images?.length);

// Phone recordings and screenshots are portrait; fit them to full height instead of cropping.
const fitClass = (portrait: boolean) =>
  portrait
    ? "object-contain py-3 drop-shadow-xl group-hover:scale-[1.02]"
    : "object-cover object-top group-hover:scale-[1.04]";

// Mobile apps sit inside a phone outline, so their media fills the screen instead.
const phoneFit = "object-cover object-top";

const CardPhone = ({ children }: { children: ReactNode }) => (
  <div className="absolute inset-0 flex items-center justify-center">
    <PhoneFrame className="h-[88%] transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-[1.03]">
      {children}
    </PhoneFrame>
  </div>
);

const CardMedia = ({ project }: { project: Project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [portrait, setPortrait] = useState(false);
  const phone = project.category === "Mobile";
  const fit = phone ? phoneFit : fitClass(portrait);
  // Cards show a tiny poster; the video is only fetched once someone hovers the card.
  const [wantVideo, setWantVideo] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (wantVideo) videoRef.current?.play().catch(() => {});
  }, [wantVideo]);

  if (project.video) {
    const media = (
      <>
        {project.poster && (
          <SkeletonImage
            src={project.poster}
            alt=""
            fill
            unoptimized
            onLoad={(e) => setPortrait(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth)}
            className={`transition-transform duration-700 ${fit}`}
          />
        )}
        {wantVideo && (
          <video
            ref={videoRef}
            src={project.video}
            muted
            loop
            playsInline
            preload="auto"
            onPlaying={() => setPlaying(true)}
            className={`absolute inset-0 h-full w-full transition-[opacity,transform] duration-500 ${fit} ${
              playing ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </>
    );
    return (
      <div
        className="relative h-full w-full bg-muted"
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          if (wantVideo) videoRef.current?.play().catch(() => {});
          else setWantVideo(true);
        }}
        onPointerLeave={() => videoRef.current?.pause()}
      >
        {phone ? <CardPhone>{media}</CardPhone> : media}
        <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-opacity group-hover:opacity-0 [@media(hover:none)]:hidden">
          <FaPlay size={9} className="ml-0.5" />
        </span>
      </div>
    );
  }

  if (project.images?.length) {
    const media = (
      <SkeletonImage
        src={project.images[0]}
        alt=""
        fill
        sizes={phone ? "200px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        onLoad={(e) => setPortrait(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth)}
        className={`transition-transform duration-700 ${fit}`}
      />
    );
    return (
      <div className="relative h-full w-full bg-muted">
        {phone ? <CardPhone>{media}</CardPhone> : media}
      </div>
    );
  }

  return <ProjectCover project={project} />;
};

const ProjectCard = ({ project, onOpen }: { project: Project; onOpen: () => void }) => (
  <motion.li
    layout
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.96 }}
    transition={{ duration: 0.45, ease }}
  >
    <button
      onClick={onOpen}
      data-project={project.slug}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card/90 text-left transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-foreground/25 active:translate-y-0 active:scale-[0.98] active:duration-100"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border">
        <CardMedia project={project} />
        {project.status && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-background/85 px-2.5 py-1 font-mono text-xs backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
            in progress
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground">
          <span>{project.category}</span>
          {project.year && <span>{project.year}</span>}
        </div>
        <h3 className="mt-2 font-serif text-2xl leading-tight">{project.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{project.tagline}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="font-mono text-xs leading-relaxed text-muted-foreground">
            {project.techStack.slice(0, 3).join(" · ")}
          </p>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
            <FaArrowRight size={11} className="-rotate-45 transition-transform group-hover:rotate-0" />
          </span>
        </div>
      </div>
    </button>
  </motion.li>
);

const Projects = () => {
  const [filter, setFilter] = useState<Filter>("All");
  // Set from the Skills section: show only projects built with one technology.
  const [tech, setTech] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const onTech = (e: Event) => {
      setTech((e as CustomEvent<string>).detail);
      setFilter("All");
    };
    window.addEventListener(TECH_FILTER_EVENT, onTech);
    return () => window.removeEventListener(TECH_FILTER_EVENT, onTech);
  }, []);

  const matching = useMemo(() => {
    let list = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    if (tech) list = list.filter((p) => p.techStack.includes(tech));
    // Featured work first, then anything with a demo; otherwise keep the authored (newest-first) order.
    const rank = (p: Project) => (p.featured ? 0 : hasMedia(p) ? 1 : 2);
    return [...list].sort((a, b) => rank(a) - rank(b));
  }, [filter, tech]);

  const collapsed = filter === "All" && !tech && !showAll && matching.length > INITIAL_COUNT;
  const visible = collapsed ? matching.slice(0, INITIAL_COUNT) : matching;

  const filters: Filter[] = ["All", ...categories];
  const count = (f: Filter) =>
    f === "All" ? projects.length : projects.filter((p) => p.category === f).length;

  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="max-w-xl"
        >
          <h2 className="font-serif text-5xl leading-none sm:text-6xl md:text-7xl">
            Things I&apos;ve <span className="italic text-highlight">built</span>
          </h2>
          <p className="mt-5 text-muted-foreground sm:text-lg">
            Apps, models, pipelines, simulators and a few games. Filter by area, then open a card
            for the details.
          </p>
        </motion.header>

        {/* Filters: a swipeable row on phones */}
        <div className="-mx-4 mt-10 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
          <div role="group" aria-label="Filter projects by area" className="isolate flex w-max gap-1.5">
            {filters.map((f) => {
              const selected = filter === f;
              return (
                <button
                  key={f}
                  aria-pressed={selected}
                  onClick={(e) => {
                    setFilter(f);
                    e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                  }}
                  className={`relative whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-[color,border-color,transform] active:scale-95 ${
                    selected
                      ? "border-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="project-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-foreground"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {f}
                  <sup className="ml-1 font-mono text-[10px] opacity-70">{count(f)}</sup>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {tech && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden"
            >
              <p className="flex flex-wrap items-center gap-2 pt-4 text-sm text-muted-foreground">
                Built with
                <button
                  onClick={() => setTech(null)}
                  aria-label={`Clear ${tech} filter`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 font-medium text-primary-foreground transition-transform active:scale-95"
                >
                  {tech} <FaTimes size={10} />
                </button>
                <span>
                  · {matching.length} project{matching.length === 1 ? "" : "s"}
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.ul layout className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProjectCard key={p.slug} project={p} onOpen={() => setOpenIndex(i)} />
            ))}
          </AnimatePresence>
        </motion.ul>

        {collapsed && (
          <motion.div layout className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium transition-[border-color,transform] hover:border-foreground active:scale-[0.97] active:duration-100"
            >
              Show all {matching.length} projects
              <FaArrowRight size={11} className="rotate-90 transition-transform group-hover:translate-y-0.5" />
            </button>
          </motion.div>
        )}
      </div>

      {/* The modal pages through everything that matches, not just the cards on screen. */}
      <ProjectModal
        projects={matching}
        index={openIndex}
        onChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  );
};

export default Projects;
