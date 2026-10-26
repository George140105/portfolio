"use client";
import { motion } from "motion/react";
import type { IconType } from "react-icons";
import { FaBasketballBall, FaJava, FaUsers } from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiDocker,
  SiExpo,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPandas,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSupabase,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { projects, TECH_FILTER_EVENT } from "~/data/projects";

interface Group {
  title: string;
  skills: { name: string; icon?: IconType }[];
}

const groups: Group[] = [
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "C++", icon: SiCplusplus },
      { name: "C", icon: SiC },
      { name: "Java", icon: FaJava },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "SQL" },
    ],
  },
  {
    title: "AI / ML & Data",
    skills: [
      { name: "pandas", icon: SiPandas },
      { name: "scikit-learn", icon: SiScikitlearn },
      { name: "Keras" },
      { name: "YOLO" },
      { name: "Gemini API" },
      { name: "MS SQL Server" },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Firebase", icon: SiFirebase },
      { name: "Supabase", icon: SiSupabase },
    ],
  },
  {
    title: "Mobile, Web & Tools",
    skills: [
      { name: "React Native", icon: SiReact },
      { name: "Expo", icon: SiExpo },
      { name: "React", icon: SiReact },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "Git", icon: SiGit },
      { name: "Docker", icon: SiDocker },
      { name: "Vercel", icon: SiVercel },
      { name: "Figma", icon: SiFigma },
    ],
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const usedIn = (name: string) => projects.filter((p) => p.techStack.includes(name)).length;

const showProjectsBuiltWith = (name: string) => {
  window.dispatchEvent(new CustomEvent(TECH_FILTER_EVENT, { detail: name }));
  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
};

const chipClass = "flex items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 py-1.5 text-sm";

const Skills = () => (
  <section id="skills" className="px-4 py-24 sm:px-6 sm:py-32">
    <div className="mx-auto max-w-6xl">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="font-serif text-5xl leading-none sm:text-6xl md:text-7xl"
      >
        What I work <span className="italic text-highlight">with</span>
      </motion.h2>
      <p className="mt-5 max-w-xl text-muted-foreground sm:text-lg">
        Tap a skill with a number to see the projects I built with it.
      </p>

      <div className="mt-12 grid gap-10 border-t border-border pt-10 md:grid-cols-3 md:gap-8">
        {groups.map((g, gi) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: gi * 0.1, ease }}
          >
            <h3 className="font-mono text-xs text-muted-foreground">
              0{gi + 1} — {g.title}
            </h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.skills.map((s, si) => {
                const used = usedIn(s.name);
                const content = (
                  <>
                    {s.icon && <s.icon size={13} className="text-muted-foreground" />}
                    {s.name}
                    {used > 0 && <span className="font-mono text-xs text-muted-foreground">{used}</span>}
                  </>
                );
                return (
                  <motion.li
                    key={s.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.1 + si * 0.035, duration: 0.4 }}
                  >
                    {/* Only skills with projects behind them are buttons; the rest are plain labels. */}
                    {used > 0 ? (
                      <button
                        onClick={() => showProjectsBuiltWith(s.name)}
                        title={`See ${used} project${used === 1 ? "" : "s"} built with ${s.name}`}
                        className={`${chipClass} transition-[border-color,transform] hover:border-foreground/40 active:scale-95`}
                      >
                        {content}
                      </button>
                    ) : (
                      <span className={chipClass}>{content}</span>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease }}
        className="mt-16 grid gap-6 border-t border-border pt-10 sm:grid-cols-[auto_1fr_1fr] sm:items-baseline sm:gap-10"
      >
        <h3 className="font-serif text-2xl italic">Off the keyboard</h3>
        <div className="flex items-start gap-3">
          <FaBasketballBall className="mt-1 shrink-0 text-primary" />
          <div>
            <div className="font-medium">Basketball, U21 Cairo League</div>
            <div className="text-sm text-muted-foreground">Heliopolis Sporting Club</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <FaUsers className="mt-1 shrink-0 text-primary" />
          <div>
            <div className="font-medium">IEEE GUC, Team Support</div>
            <div className="text-sm text-muted-foreground">Coordinating teams, organizing member trips</div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Skills;
