"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import ProjectCover from "~/components/ProjectCover";
import ProjectModal from "~/components/ProjectModal";
import { SkeletonImage, SkeletonVideo } from "~/components/ui/Media";
import { categories, projects, type Project, type ProjectCategory } from "~/data/projects";

type Filter = "All" | ProjectCategory;

const ease = [0.22, 1, 0.36, 1] as const;

// Phone recordings and screenshots are portrait; fit them to full height instead of cropping.
const fitClass = (portrait: boolean) =>
  portrait
    ? "object-contain py-3 drop-shadow-xl group-hover:scale-[1.02]"
    : "object-cover object-top group-hover:scale-[1.04]";

const CardMedia = ({ project }: { project: Project }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [portrait, setPortrait] = useState(false);

  // Metadata may already be loaded before React attached its listener.
  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 1) setPortrait(v.videoHeight > v.videoWidth);
  }, []);

  if (project.video) {
    return (
      <div
        className="relative h-full w-full bg-muted"
        onMouseEnter={() => videoRef.current?.play().catch(() => {})}
        onMouseLeave={() => videoRef.current?.pause()}
      >
        <SkeletonVideo
          ref={videoRef}
          // The fragment makes browsers decode a real frame instead of showing a black box.
          src={`${project.video}#t=${project.thumbAt ?? 0.5}`}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedMetadata={(e) => setPortrait(e.currentTarget.videoHeight > e.currentTarget.videoWidth)}
          className={`h-full w-full transition-transform duration-700 ${fitClass(portrait)}`}
        />
        <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-opacity group-hover:opacity-0">
          <FaPlay size={9} className="ml-0.5" />
        </span>
      </div>
    );
  }

  if (project.images?.length) {
    return (
      <div className="relative h-full w-full bg-muted">
        <SkeletonImage
          src={project.images[0]}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={(e) => setPortrait(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth)}
          className={`transition-transform duration-700 ${fitClass(portrait)}`}
        />
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
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-border bg-card/90 text-left transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-foreground/25"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border">
        <CardMedia project={project} />
        {project.status && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-background/85 px-2.5 py-1 font-mono text-[11px] backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />
            in progress
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
          <span>{project.category}</span>
          {project.year && <span>{project.year}</span>}
        </div>
        <h3 className="mt-2 font-serif text-2xl leading-tight">{project.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{project.tagline}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(() => {
    const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);
    // Featured work first; otherwise keep the authored (newest-first) order.
    return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }, [filter]);

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
            Things I&apos;ve <span className="italic text-primary">built</span>
          </h2>
          <p className="mt-5 text-muted-foreground sm:text-lg">
            Apps, models, pipelines, simulators and a few games. Filter by area, then open a card
            for the details.
          </p>
        </motion.header>

        {/* Filters: a swipeable row on phones */}
        <div className="-mx-4 mt-10 overflow-x-auto px-4 no-scrollbar sm:mx-0 sm:px-0">
          <div role="tablist" aria-label="Project categories" className="isolate flex w-max gap-1.5">
            {filters.map((f) => {
              const selected = filter === f;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={selected}
                  onClick={(e) => {
                    setFilter(f);
                    e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                  }}
                  className={`relative whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors ${
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

        <motion.ul layout className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProjectCard key={p.slug} project={p} onOpen={() => setOpenIndex(i)} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <ProjectModal
        projects={visible}
        index={openIndex}
        onChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  );
};

export default Projects;
