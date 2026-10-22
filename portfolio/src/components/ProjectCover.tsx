import type { IconType } from "react-icons";
import { FaBrain, FaGamepad, FaGlobe, FaMicrochip, FaMobileAlt } from "react-icons/fa";
import type { Project, ProjectCategory } from "~/data/projects";

export const categoryIcon: Record<ProjectCategory, IconType> = {
  Mobile: FaMobileAlt,
  "AI & Data": FaBrain,
  Web: FaGlobe,
  Systems: FaMicrochip,
  Games: FaGamepad,
};

/** Stand-in for projects without a demo yet: a camera viewfinder with a note. */
export default function ProjectCover({ project, large }: { project: Project; large?: boolean }) {
  const Icon = categoryIcon[project.category];
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-muted/70 p-8">
      {/* Viewfinder corners */}
      <span aria-hidden className="absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-foreground/25" />
      <span aria-hidden className="absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-foreground/25" />
      <span aria-hidden className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-foreground/25" />
      <span aria-hidden className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-foreground/25" />

      <span className="absolute bottom-[1.05rem] left-9 flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-foreground/70">
        <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
        REC
      </span>
      <Icon aria-hidden className="absolute right-9 top-[1.1rem] text-foreground/40" size={12} />

      <p
        className={`max-w-[18rem] text-center font-serif italic leading-snug text-foreground/80 ${
          large ? "text-2xl sm:text-3xl" : "text-xl"
        }`}
      >
        {project.cover ?? "Hold on, I'm filming."}
      </p>
    </div>
  );
}
