"use client";
import { createTimeline, splitText, stagger, svg, utils } from "animejs";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { FaArrowDown, FaGithub, FaLinkedin } from "react-icons/fa";
import CountUp from "~/components/ui/CountUp";
import Magnet from "~/components/ui/Magnet";
import { SkeletonImage } from "~/components/ui/Media";
import RotatingText from "~/components/ui/RotatingText";
import TiltedCard from "~/components/ui/TiltedCard";
import { projects } from "~/data/projects";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const Hero = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  // Intro choreography with anime.js: letters rise in one by one, then the underline is drawn.
  useEffect(() => {
    const name = nameRef.current;
    const underline = underlineRef.current;
    if (!name || !underline) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      name.style.visibility = "visible";
      return;
    }

    // Park the letters below their clip boxes and hide the underline before revealing the heading.
    const split = splitText(name, { chars: { wrap: "clip" } });
    const [drawable] = svg.createDrawable(underline);
    utils.set(split.chars, { y: "110%" });
    utils.set(drawable, { draw: "0 0" });
    name.style.visibility = "visible";
    const tl = createTimeline({ defaults: { ease: "outExpo" } })
      .add(split.chars, { y: ["110%", "0%"], duration: 900, delay: stagger(35) }, 150)
      .add(drawable, { draw: ["0 0", "0 1"], duration: 900, ease: "inOutQuad" }, "-=300");

    return () => {
      tl.revert();
      split.revert();
    };
  }, []);

  return (
    <section id="home" className="relative px-4 pb-20 pt-28 sm:px-6 md:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.25fr_0.75fr] md:gap-14">
        <div className="relative z-10">
          <motion.p {...fade(0)} className="font-mono text-xs text-muted-foreground sm:text-sm">
            Software engineer · Cairo, Egypt
          </motion.p>

          <h1
            ref={nameRef}
            style={{ visibility: "hidden" }}
            className="hero-name mt-4 font-serif text-[clamp(3.5rem,13vw,8.5rem)] leading-[0.9] tracking-tight"
          >
            George <br className="hidden sm:block" />
            <span className="relative inline-block">
              Amgad
              <svg
                aria-hidden
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full overflow-visible text-highlight sm:-bottom-3 sm:h-4"
              >
                <path
                  ref={underlineRef}
                  d="M3 14 C 60 4, 120 4, 170 10 S 260 17, 297 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <motion.p {...fade(0.5)} className="mt-8 text-2xl leading-snug sm:text-3xl">
            I build{" "}
            <RotatingText
              words={["mobile apps", "websites", "data pipelines"]}
              className="font-serif italic text-highlight"
            />
          </motion.p>

          <motion.p
            {...fade(0.6)}
            className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I&apos;m a final-year Computer Science student at the German University in Cairo. I&apos;ve
            shipped a family-safety app that had to keep location working in the background on
            Android, and lately I&apos;ve been building ML models, computer-vision pipelines and a
            natural-language-to-SQL system. Next up: a Master&apos;s degree.
          </motion.p>

          <motion.div {...fade(0.7)} className="mt-8 flex flex-wrap items-center gap-3">
            <Magnet>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-[background-color,color,transform] hover:bg-primary hover:text-primary-foreground active:scale-[0.97] active:duration-100"
              >
                See my work
                <FaArrowDown className="transition-transform group-hover:translate-y-0.5" size={12} />
              </a>
            </Magnet>
            <a
              href="/George_Amgad_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium transition-[border-color,transform] hover:border-foreground active:scale-[0.97] active:duration-100"
            >
              View resume
            </a>
            <div className="ml-1 flex gap-1">
              {[
                { href: "https://github.com/George140105", label: "GitHub", Icon: FaGithub },
                {
                  href: "https://www.linkedin.com/in/george-amgad-reyad/",
                  label: "LinkedIn",
                  Icon: FaLinkedin,
                },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] hover:bg-muted hover:text-foreground active:scale-90 active:duration-100"
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.dl
            {...fade(0.85)}
            className="mt-12 grid max-w-xl grid-cols-2 gap-y-6 border-t border-border pt-6 sm:grid-cols-4"
          >
            {[
              // German grades run from 1.0 (best) down to 4.0, so this one is shown as-is, not counted up.
              { value: "1.05", label: "GPA (1.0 is the best)" },
              { value: "Top 1%", label: "IGCSE, nationally" },
              { value: <CountUp to={2} />, label: "Industry roles" },
              { value: <CountUp to={projects.length} />, label: "Projects" },
            ].map((s) => (
              <div key={s.label}>
                <dd className="font-serif text-4xl leading-none">{s.value}</dd>
                <dt className="mt-2 text-xs text-muted-foreground">{s.label}</dt>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="order-first md:order-last"
        >
          <TiltedCard className="w-36 sm:w-44 md:w-full">
            <figure className="relative aspect-square overflow-hidden rounded-2xl bg-muted shadow-2xl shadow-black/20 md:aspect-[4/5] md:rounded-[1.75rem]">
              <SkeletonImage
                src="/george.jpg"
                alt="George Amgad smiling, in a grey suit, standing in front of a tree"
                fill
                priority
                sizes="(max-width: 768px) 176px, 420px"
                className="object-cover object-[50%_18%]"
              />
            </figure>
          </TiltedCard>
          <p className="mt-3 hidden font-mono text-xs text-muted-foreground md:block">
            German University in Cairo · Class of 2027
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
