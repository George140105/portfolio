"use client";
import { MotionConfig } from "motion/react";
import { useEffect } from "react";
import Contact from "~/components/Contact";
import Header from "~/components/Header";
import Hero from "~/components/Hero";
import Journey from "~/components/Journey";
import Projects from "~/components/Projects";
import Skills from "~/components/Skills";

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Journey />
        <Skills />
        <Contact />
      </main>
    </MotionConfig>
  );
}
