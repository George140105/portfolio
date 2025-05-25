"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Header = () => {
  const [activeSection, setActiveSection] = useState("");

  const scrollToSection = (id: string) => {
    // Map 'home' to 'about' and 'about' to 'timeline'
    const sectionMap: { [key: string]: string } = {
      home: "about",
      about: "timeline",
      projects: "projects",
      contact: "contact",
    };

    const element = document.getElementById(sectionMap[id] || id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    setActiveSection("");

    const observerOptions = {
      rootMargin: "-10% 0px -80% 0px",
      threshold: [0.2, 0.5, 0.8],
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        const currentSection = visibleSections[0].target.id;
        // Map the sections back for the active state
        if (currentSection === "about") {
          setActiveSection("home");
        } else if (currentSection === "timeline") {
          setActiveSection("about");
        } else {
          setActiveSection(currentSection);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe all sections including timeline
    const sections = ["about", "timeline", "projects", "contact"];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      } else {
        console.warn(`Section with id '${section}' not found`);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed left-0 top-0 h-screen w-36 md:w-48 bg-card/95 backdrop-blur-sm z-50 flex items-center shadow-lg border-r border-primary/10">
      <div className="w-full py-6">
        <motion.nav
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-14 items-center"
        >
          {["home", "about", "projects", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`text-lg font-medium ${
                activeSection === section ? "text-primary" : "text-foreground"
              } hover:text-primary transition-all capitalize hover:scale-110 relative group writing-mode-vertical px-3 py-2`}
            >
              <span className="inline-block">{section}</span>
              <span
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 ${
                  activeSection === section ? "w-8" : "w-0"
                } bg-primary transition-all group-hover:w-8 rounded-full`}
              ></span>
            </button>
          ))}
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;
