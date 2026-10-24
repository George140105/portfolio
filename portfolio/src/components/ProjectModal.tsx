"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
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

const Gallery = ({ images, phone }: { images: string[]; phone?: boolean }) => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % images.length), 3500);
    return () => clearInterval(id);
  }, [images.length, i]);

  return (
    <div className="relative h-full w-full">
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
      <div className={`absolute inset-x-0 flex justify-center gap-1.5 ${phone ? "bottom-[4%]" : "bottom-3"}`}>
        {images.map((src, n) => (
          <button
            key={src}
            onClick={() => setI(n)}
            aria-label={`Show image ${n + 1}`}
            className={`h-1.5 rounded-full transition-all ${n === i ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectModal = ({ projects, index, onChange, onClose }: Props) => {
  const project = index === null ? null : projects[index];
  const total = projects.length;
  const go = (step: number) => index !== null && onChange((index + step + total) % total);

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

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-title"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-border bg-card shadow-2xl sm:rounded-3xl"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-background/85 backdrop-blur hover:bg-background"
            >
              <FaTimes size={13} />
            </button>

            <div className="overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  // On large screens the phone sits on the left and stays put while the details scroll.
                  className={phone ? "lg:flex lg:items-start" : undefined}
                >
                  <div
                    className={`relative flex items-center justify-center border-b border-border ${
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

                  <div className={`p-6 sm:p-8 ${phone ? "lg:flex-1 lg:self-center lg:p-10" : ""}`}>
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
                  className="flex items-center gap-2 rounded-full px-3 py-2 text-sm hover:bg-muted"
                >
                  <FaChevronLeft size={11} /> Previous
                </button>
                <span className="font-mono text-xs text-muted-foreground">
                  {(index ?? 0) + 1} / {total}
                </span>
                <button
                  onClick={() => go(1)}
                  className="flex items-center gap-2 rounded-full px-3 py-2 text-sm hover:bg-muted"
                >
                  Next <FaChevronRight size={11} />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
