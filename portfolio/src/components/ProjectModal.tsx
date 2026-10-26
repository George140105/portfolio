"use client";
import { AnimatePresence, motion, useDragControls, type PanInfo, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import ProjectCover from "~/components/ProjectCover";
import { SkeletonImage, SkeletonVideo } from "~/components/ui/Media";
import PhoneFrame from "~/components/ui/PhoneFrame";
import type { Project } from "~/data/projects";

interface Props {
  projects: Project[];
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}

// Where a flick would come to rest (Apple's projection from "Designing Fluid Interfaces").
const projectFlick = (velocity: number, rate = 0.998) => ((velocity / 1000) * rate) / (1 - rate);

const useIsMobile = () => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return mobile;
};

/** Offset and scale that place the centred dialog over the card it was opened from. */
function cardOrigin(slug: string) {
  const card = document.querySelector(`[data-project="${slug}"]`);
  if (!card) return null;
  const r = card.getBoundingClientRect();
  if (r.bottom < 0 || r.top > window.innerHeight) return null;
  const dialogWidth = Math.min(896, window.innerWidth - 48);
  return {
    x: r.left + r.width / 2 - window.innerWidth / 2,
    y: r.top + r.height / 2 - window.innerHeight / 2,
    scale: r.width / dialogWidth,
  };
}

type SheetCustom = { mobile: boolean; slug: string };

// Phones: a bottom sheet that rises from, and returns to, the bottom edge.
// Larger screens: the dialog grows out of the card that opened it and shrinks back into it.
const sheetVariants: Variants = {
  hidden: ({ mobile, slug }: SheetCustom) => {
    if (mobile) return { y: "100%", transition: { type: "spring", bounce: 0, duration: 0.35 } };
    const o = cardOrigin(slug);
    const transition = { type: "spring" as const, bounce: 0, duration: 0.4, opacity: { duration: 0.2, delay: 0.15 } };
    return o
      ? { x: o.x, y: o.y, scale: o.scale, opacity: 0, transition }
      : { x: 0, y: 60, scale: 1, opacity: 0, transition };
  },
  shown: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    transition: { type: "spring", bounce: 0, duration: 0.45, opacity: { duration: 0.15 } },
  },
};

// Next slides in from the right and Previous from the left, so the motion matches the button.
const pageVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 24 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -24 }),
};

const Gallery = ({ images, phone }: { images: string[]; phone?: boolean }) => {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance, but hold still while someone is looking at it with the pointer.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % images.length), 3500);
    return () => clearInterval(id);
  }, [images.length, i, paused]);

  return (
    <div
      className="relative h-full w-full"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={images[i]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
        >
          <SkeletonImage
            src={images[i]}
            alt=""
            fill
            sizes={phone ? "320px" : "(max-width: 896px) 100vw, 896px"}
            className={phone ? "object-cover object-top" : "object-contain"}
          />
        </motion.div>
      </AnimatePresence>
      <div className={`absolute inset-x-0 flex justify-center ${phone ? "bottom-[2%]" : "bottom-1"}`}>
        {images.map((src, n) => (
          // The dot is small; the button around it is a comfortable tap target.
          <button
            key={src}
            onClick={() => setI(n)}
            aria-label={`Show image ${n + 1}`}
            aria-current={n === i ? "true" : undefined}
            className="flex h-6 items-center px-[3px]"
          >
            <span
              className={`block h-1.5 rounded-full transition-all ${n === i ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const ProjectModal = ({ projects, index, onChange, onClose }: Props) => {
  const project = index === null ? null : projects[index];
  const total = projects.length;
  const [dir, setDir] = useState(1);
  const go = (step: number) => {
    if (index === null) return;
    setDir(step);
    onChange((index + step + total) % total);
  };

  const mobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const sheetDrag = useDragControls();
  const pageSwipe = useDragControls();

  const open = index !== null;

  // Keep keyboard and screen-reader focus inside the dialog, then hand it back to the card.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const outside = [document.querySelector("main"), document.querySelector("header")];
    outside.forEach((el) => el?.setAttribute("inert", ""));
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      outside.forEach((el) => el?.removeAttribute("inert"));
      opener?.focus({ preventScroll: true });
    };
  }, [open]);

  // Sheet drag starts from the grabber or the media, never from video controls or buttons.
  const startSheetDrag = (e: React.PointerEvent) => {
    if (!mobile || (e.target as Element).closest("button, video[controls]")) return;
    sheetDrag.start(e);
  };

  const onSheetDragEnd = (_: unknown, info: PanInfo) => {
    const height = sheetRef.current?.offsetHeight ?? window.innerHeight;
    // Decide from where the flick is heading, not where the finger let go.
    if (info.offset.y + projectFlick(info.velocity.y) > height * 0.4) onClose();
  };

  const onSwipeEnd = (_: unknown, info: PanInfo) => {
    const projected = info.offset.x + projectFlick(info.velocity.x);
    if (projected < -120) go(1);
    else if (projected > 120) go(-1);
  };

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, total]);

  const hasMedia = !!(project?.video || project?.images?.length);
  const phone = hasMedia && project?.category === "Mobile";

  if (!mounted) return null;

  // Rendered at the end of <body> so everything else can be made inert while it's open.
  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
        >
          {/* Only the scrim fades; the sheet itself moves, so a swiped-away sheet stays solid as it leaves. */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            onClick={onClose}
          />

          <motion.div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            custom={{ mobile, slug: project.slug }}
            variants={sheetVariants}
            initial="hidden"
            animate="shown"
            exit="hidden"
            drag={mobile ? "y" : false}
            dragListener={false}
            dragControls={sheetDrag}
            dragConstraints={{ top: 0, bottom: 0 }}
            // Follows the finger 1:1 downward; resists firmly if pulled up.
            dragElastic={{ top: 0.06, bottom: 1 }}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 45 }}
            onDragEnd={onSheetDragEnd}
            className="relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-2xl sm:rounded-3xl"
          >
            {/* Grabber: shows the sheet can be pulled down, and gives the drag a clear place to start. */}
            <div
              onPointerDown={startSheetDrag}
              className="absolute inset-x-0 top-0 z-10 flex h-7 touch-none justify-center pt-2 sm:hidden"
            >
              <span className="h-1 w-10 rounded-full bg-neutral-400/90" />
            </div>

            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-background/85 backdrop-blur transition-transform hover:bg-background active:scale-90"
            >
              <FaTimes size={13} />
            </button>

            <div className="overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={project.slug}
                  custom={dir}
                  variants={pageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2 }}
                  drag={mobile && total > 1 ? "x" : false}
                  dragListener={false}
                  dragControls={pageSwipe}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.35}
                  onDragEnd={onSwipeEnd}
                  // On large screens the phone sits on the left and stays put while the details scroll.
                  className={phone ? "lg:flex lg:items-start" : undefined}
                >
                  <div
                    onPointerDown={phone || !project.video ? startSheetDrag : undefined}
                    className={`relative flex items-center justify-center border-b border-border ${
                      phone || !project.video ? "touch-none sm:touch-auto" : ""
                    } ${
                      !hasMedia
                        ? "h-44 sm:h-52"
                        : phone
                          ? "h-[52dvh] bg-muted py-5 sm:h-[62vh] sm:py-6 lg:sticky lg:top-0 lg:h-[min(78dvh,720px)] lg:w-[42%] lg:shrink-0 lg:border-b-0 lg:border-r lg:py-8"
                          : "h-[38dvh] bg-black sm:h-[52vh]"
                    }`}
                  >
                    {phone && project.video ? (
                      // Controls don't fit a phone-sized screen; the demo just loops.
                      <PhoneFrame className="h-full">
                        <SkeletonVideo
                          key={project.video}
                          src={project.video}
                          poster={project.poster}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="h-full w-full object-cover object-top"
                        />
                      </PhoneFrame>
                    ) : phone && project.images?.length ? (
                      <PhoneFrame className="h-full">
                        <Gallery images={project.images} phone />
                      </PhoneFrame>
                    ) : project.video && project.poster ? (
                      // The poster shows instantly while the video buffers.
                      <video
                        key={project.video}
                        src={project.video}
                        poster={project.poster}
                        preload="auto"
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-contain"
                      />
                    ) : project.video ? (
                      <SkeletonVideo
                        key={project.video}
                        src={project.video}
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-contain"
                      />
                    ) : project.images?.length ? (
                      <Gallery images={project.images} />
                    ) : (
                      <ProjectCover project={project} large />
                    )}
                  </div>

                  {/* On phones, swiping the text sideways pages between projects. */}
                  <div
                    onPointerDown={(e) => mobile && total > 1 && pageSwipe.start(e)}
                    className={`touch-pan-y p-6 sm:p-8 ${phone ? "lg:flex-1 lg:self-center lg:p-10" : ""}`}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                      <span className="text-primary">{project.category}</span>
                      {project.year && <span>{project.year}</span>}
                      {project.status && <span>· {project.status.toLowerCase()}</span>}
                    </div>
                    <h3 id="project-title" className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    {project.highlights && (
                      <ul className="mt-6 space-y-2.5">
                        {project.highlights.map((h) => (
                          <li key={h} className="flex gap-3 text-sm">
                            <span className="mt-[0.55rem] h-px w-4 shrink-0 bg-primary" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {project.techStack.map((t) => (
                        <span key={t} className="rounded-full bg-muted px-3 py-1 font-mono text-xs">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {total > 1 && (
              <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                <button
                  onClick={() => go(-1)}
                  className="flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-transform hover:bg-muted active:scale-95"
                >
                  <FaChevronLeft size={11} /> Previous
                </button>
                <span className="font-mono text-xs text-muted-foreground">
                  {(index ?? 0) + 1} / {total}
                </span>
                <button
                  onClick={() => go(1)}
                  className="flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-transform hover:bg-muted active:scale-95"
                >
                  Next <FaChevronRight size={11} />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
