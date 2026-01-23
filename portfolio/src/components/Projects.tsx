"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";
import { FaTools, FaClock, FaCode } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  video: string | null;
  images?: string[];
  techStack?: string[];
  duration?: string;
  category: string;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedProjectData, setSelectedProjectData] =
    useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoAspectRatio, setVideoAspectRatio] = useState<
    "portrait" | "landscape"
  >("portrait");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const projects: Project[] = [
    {
      title: "Homebase – Household Management App",
      description:
        "A collaborative household management app that lets members share tasks, documents, and events in real time, with instant notifications to keep everyone in sync. Built with React Native, Homebase streamlines family organization with intuitive task assignment, shared calendars, and document storage. Features include real-time push notifications, member role management, and seamless synchronization across all devices.",
      video: "homebase_preview.mp4",
      techStack: [
        "React Native",
        "TypeScript",
        "Firebase",
        "Push Notifications",
        "Real-time Database",
      ],
      duration: "4 months",
      category: "React Native",
    },
    {
      title: "Hiryo – Family Safety & Location App",
      description:
        "A family and friends safety app that shows circle members' locations on a live map and sends updates when they arrive or leave a place, featuring a robust SOS alert system for emergencies. Hiryo provides peace of mind with real-time location tracking, geofencing capabilities, and instant emergency alerts. The app includes customizable safety circles, location history, and battery-efficient tracking.",
      video: null,
      images: [],
      techStack: [
        "React Native",
        "TypeScript",
        "Google Maps API",
        "Geofencing",
        "Push Notifications",
        "Real-time Tracking",
      ],
      duration: "5 months",
      category: "React Native",
    },
    {
      title: "Helper - Mobile Support App",
      description:
        "A comprehensive mobile support application built with React Native. The app includes both frontend mobile and backend components, featuring user authentication, real-time support chat, and a robust admin dashboard. Built with modern technologies and following best practices in mobile development.",
      video: "helper.mp4",
      techStack: [
        "React Native",
        "TypeScript",
        "Node.js",
        "Express",
        "TailwindCSS",
      ],
      duration: "3 months",
      category: "React Native",
    },
    {
      title: "Mahsooly - Agricultural Management Platform",
      description:
        "A full-stack agricultural management system with web and mobile interfaces. Features include farmer registration, field inspection management, digital guides, finance management, and multi-language support (Arabic/English). The platform facilitates communication between farmers, field inspectors, and service providers.",
      video: null,
      images: [
        "/m_1.jpg",
        "/m_2.jpg",
        "/m_3.jpg",
        "/m_4.jpg",
        "/m_5.jpg",
        "/m_6.jpg",
      ],
      techStack: ["React Native", "Next.js", "Node.js", "TypeScript", "i18n"],
      duration: "6 months",
      category: "React Native",
    },
    {
      title: "GoE - Hotel Booking Platform",
      description:
        "A modern hotel booking platform built with Next.js and TypeScript. Features include a responsive design, popular destinations showcase, featured hotels listing, and booking functionality. The platform offers an intuitive user interface with city-based hotel search and comprehensive booking management.",
      video: "goe.mp4",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      duration: "2 months",
      category: "React",
    },
    {
      title: "Process Management Simulator",
      description:
        "A comprehensive process management simulator implementing multiple scheduling algorithms including FIFO, Round Robin, and Multi-Level Feedback Queue (MLFQ). Features a dynamic terminal-based UI using ncurses library, displaying real-time memory usage, process queues, and console outputs. The simulator provides visual insights into how different scheduling algorithms handle process management.",
      video: "os_project.mp4",
      techStack: ["C", "ncurses", "Process Scheduling", "Memory Management"],
      duration: "2 weeks",
      category: "C",
    },
    {
      title: "Tic Tac Toe",
      description:
        "A classic game implementation featuring a clean user interface and smooth gameplay mechanics. Players can compete against each other in this timeless strategy game. The AI opponent offers different difficulty levels for enhanced gameplay experience.",
      video: "tictactoe(1).mp4",
      techStack: ["Java Swing", "Object-Oriented Programming"],
      duration: "1 day",
      category: "Java",
    },
    {
      title: "Connect 4",
      description:
        "An engaging implementation of the Connect 4 game with a modern interface. Features include smooth animations, player vs player mode, and win detection algorithms. The game includes a score tracking system and replay functionality.",
      video: "Connect 4.mp4",
      techStack: ["Java Swing", "Game Logic", "UI Design"],
      duration: "1 day",
      category: "Java",
    },
    {
      title: "Flappy Bird",
      description:
        "A recreation of the popular Flappy Bird game with custom graphics and physics. Includes features like obstacle generation, collision detection, and score tracking. The game progressively increases in difficulty as the player's score rises.",
      video: "Flappy Bird.mp4",
      techStack: ["Java Swing", "Game Physics", "Animation"],
      duration: "2 days",
      category: "Java",
    },
    {
      title: "Attack On Titan",
      description:
        "A Plants vs Zombies-inspired game set in the Attack on Titan universe. Players must defend their territory by strategically placing units to combat incoming threats. Features include multiple unit types, resource management, and progressive difficulty.",
      video: "Attack on Titan.mp4",
      techStack: ["JavaFX", "Game Design", "Strategic Elements"],
      duration: "University Project",
      category: "Java",
    },
    {
      title: "SCAD - Internship Management System",
      description:
        "A comprehensive internship management system for the German University in Cairo. Features include student registration, company posting management, internship applications tracking, and administrative dashboard. Built as a collaborative project to streamline the internship process for students and faculty.",
      video: "scad.mp4",
      techStack: ["React", "Tailwind CSS"],
      duration: "1 months",
      category: "React",
    },
  ];

  const categories = ["React Native", "React", "Java", "C"];
  const projectsByCategory = categories.map((category) => ({
    name: category,
    projects: projects.filter((project) => project.category === category),
  }));

  const handleProjectSelect = (categoryIndex: number, projectIndex: number) => {
    const project = projectsByCategory[categoryIndex].projects[projectIndex];
    setSelectedProject(projectIndex);
    setSelectedProjectData(project);
    setCurrentImageIndex(0);
    setShowOverlay(true); // Reset overlay when switching projects

    // Detect video aspect ratio for both mobile and desktop
    if (project.video) {
      // Create temporary video element to check dimensions
      const tempVideo = document.createElement("video");
      tempVideo.src = project.video;
      tempVideo.onloadedmetadata = () => {
        const isPortrait = tempVideo.videoHeight > tempVideo.videoWidth;
        setVideoAspectRatio(isPortrait ? "portrait" : "landscape");
      };
    }

    // Auto-scroll to video on mobile
    if (isMobile) {
      setTimeout(() => {
        const videoElement = document.querySelector("video");
        const imageElement = document.querySelector(
          ".relative.w-full.mx-auto.rounded-lg",
        );
        const targetElement = videoElement || imageElement;

        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 300);
    }
  };

  const handleVideoClick = () => {
    if (!isMobile) return; // Only toggle on mobile

    if (showOverlay) {
      // Hide overlay and play video
      setShowOverlay(false);
      if (videoRef.current) {
        videoRef.current.play();
      }
    } else {
      // Show overlay and pause video
      setShowOverlay(true);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  };

  const navigateProject = (direction: "prev" | "next") => {
    if (!selectedProjectData) return;

    // Find current project's category and index
    let currentCategoryIndex = -1;
    let currentProjectIndex = -1;

    projectsByCategory.forEach((category, catIndex) => {
      const projIndex = category.projects.findIndex(
        (p) => p.title === selectedProjectData.title,
      );
      if (projIndex !== -1) {
        currentCategoryIndex = catIndex;
        currentProjectIndex = projIndex;
      }
    });

    if (currentCategoryIndex === -1) return;

    const currentCategory = projectsByCategory[currentCategoryIndex];

    if (direction === "next") {
      // Try next project in same category
      if (currentProjectIndex < currentCategory.projects.length - 1) {
        handleProjectSelect(currentCategoryIndex, currentProjectIndex + 1);
      } else {
        // Move to first project of next category
        const nextCategoryIndex =
          (currentCategoryIndex + 1) % projectsByCategory.length;
        if (projectsByCategory[nextCategoryIndex].projects.length > 0) {
          setExpandedCategory(projectsByCategory[nextCategoryIndex].name);
          handleProjectSelect(nextCategoryIndex, 0);
        }
      }
    } else {
      // Try previous project in same category
      if (currentProjectIndex > 0) {
        handleProjectSelect(currentCategoryIndex, currentProjectIndex - 1);
      } else {
        // Move to last project of previous category
        const prevCategoryIndex =
          currentCategoryIndex === 0
            ? projectsByCategory.length - 1
            : currentCategoryIndex - 1;
        const prevCategory = projectsByCategory[prevCategoryIndex];
        if (prevCategory.projects.length > 0) {
          setExpandedCategory(prevCategory.name);
          handleProjectSelect(
            prevCategoryIndex,
            prevCategory.projects.length - 1,
          );
        }
      }
    }
  };

  useEffect(() => {
    if (selectedProjectData?.images) {
      const timer = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % selectedProjectData.images!.length,
        );
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [selectedProjectData]);

  return (
    <section id="projects" className="px-10 py-24 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-6xl text-foreground font-bold mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Projects
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Categories and Projects List */}
          <div className="lg:w-1/3">
            <motion.div className="space-y-4">
              {projectsByCategory.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <motion.div
                    className={`cursor-pointer p-4 rounded-lg transition-colors bg-card hover:bg-card-hover`}
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === category.name
                          ? null
                          : category.name,
                      )
                    }
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl text-card-foreground font-semibold flex items-center justify-between">
                      {category.name}
                      {expandedCategory === category.name ? (
                        <MdKeyboardArrowDown className="w-6 h-6" />
                      ) : (
                        <MdKeyboardArrowRight className="w-6 h-6" />
                      )}
                    </h3>
                  </motion.div>

                  <AnimatePresence>
                    {expandedCategory === category.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="pl-4"
                      >
                        {category.projects.map((project, projectIndex) => (
                          <motion.div
                            key={projectIndex}
                            className={`cursor-pointer p-4 mt-2 rounded-lg transition-colors ${
                              selectedProjectData?.title === project.title
                                ? "bg-card-hover border border-blue-500/50"
                                : "bg-card hover:bg-card-hover"
                            }`}
                            onClick={() =>
                              handleProjectSelect(categoryIndex, projectIndex)
                            }
                            whileHover={{ x: 10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <h4 className="text-lg text-card-foreground">
                              {project.title}
                            </h4>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Project Details */}
          <div className="lg:w-2/3 relative">
            {/* Desktop Navigation Arrows */}
            {!isMobile && selectedProjectData && (
              <>
                <button
                  onClick={() => navigateProject("prev")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-card hover:bg-card-hover p-3 rounded-full shadow-lg transition-all hover:scale-110 border border-primary/20"
                  aria-label="Previous project"
                >
                  <svg
                    className="w-6 h-6 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => navigateProject("next")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-card hover:bg-card-hover p-3 rounded-full shadow-lg transition-all hover:scale-110 border border-primary/20"
                  aria-label="Next project"
                >
                  <svg
                    className="w-6 h-6 text-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            <AnimatePresence mode="wait">
              {selectedProjectData && (
                <motion.div
                  key={selectedProjectData.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Show title and tech stack on desktop, or on mobile if no video */}
                  {(!isMobile || !selectedProjectData.video) && (
                    <>
                      <motion.h3
                        className="text-3xl font-bold text-foreground"
                        layoutId={`title-${selectedProjectData.title}`}
                      >
                        {selectedProjectData.title}
                      </motion.h3>

                      <motion.div className="flex flex-col gap-4 text-sm text-primary">
                        <div className="flex items-center gap-2">
                          <FaTools className="text-gray-500 dark:text-gray-400" />
                          <span className="font-medium">Tech Stack:</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {selectedProjectData.techStack?.map((tech, index) => (
                            <span
                              key={index}
                              className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                            >
                              <FaCode className="text-xs" />
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <FaClock className="text-gray-500 dark:text-gray-400" />
                          <span>Duration: {selectedProjectData.duration}</span>
                        </div>
                      </motion.div>

                      <motion.p
                        className="text-foreground text-xl leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {selectedProjectData.description}
                      </motion.p>
                    </>
                  )}
                  {/* Mobile View with Overlay */}
                  {isMobile && selectedProjectData.video && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="relative w-full mx-auto rounded-lg overflow-hidden shadow-2xl bg-gray-800/50 cursor-pointer"
                      onClick={handleVideoClick}
                      style={{
                        maxWidth:
                          videoAspectRatio === "portrait" ? "600px" : "100%",
                      }}
                    >
                      <video
                        ref={videoRef}
                        className="w-full h-auto object-contain"
                        loop
                        muted
                        playsInline
                        preload="auto"
                        onLoadedMetadata={(e) => {
                          const video = e.currentTarget;
                          const isPortrait =
                            video.videoHeight > video.videoWidth;
                          setVideoAspectRatio(
                            isPortrait ? "portrait" : "landscape",
                          );
                        }}
                      >
                        <source
                          src={selectedProjectData.video}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>

                      {/* Overlay */}
                      <AnimatePresence>
                        {showOverlay && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center overflow-y-auto"
                          >
                            <motion.h3
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.05 }}
                              className="text-xl sm:text-2xl font-bold text-white mb-3"
                            >
                              {selectedProjectData.title}
                            </motion.h3>

                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                              className="flex flex-wrap gap-2 justify-center mb-3"
                            >
                              {selectedProjectData.techStack?.map(
                                (tech, index) => (
                                  <span
                                    key={index}
                                    className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-200 text-xs"
                                  >
                                    <FaCode className="text-xs" />
                                    {tech}
                                  </span>
                                ),
                              )}
                            </motion.div>

                            <motion.p
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.15 }}
                              className="text-white text-xs sm:text-sm leading-relaxed mb-4 max-w-lg"
                            >
                              {selectedProjectData.description}
                            </motion.p>
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm"
                            >
                              <span>Tap to play video</span>
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* Desktop View - Original Layout */}
                  {!isMobile && selectedProjectData.video && (
                    <>
                      <motion.p
                        className="text-foreground text-xl leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {selectedProjectData.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative w-full mx-auto rounded-lg overflow-hidden shadow-2xl bg-gray-800/50"
                        style={{
                          maxWidth:
                            videoAspectRatio === "portrait" ? "450px" : "800px",
                        }}
                      >
                        <video
                          className="w-full h-auto object-contain"
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          onLoadedMetadata={(e) => {
                            const video = e.currentTarget;
                            const isPortrait =
                              video.videoHeight > video.videoWidth;
                            setVideoAspectRatio(
                              isPortrait ? "portrait" : "landscape",
                            );
                          }}
                        >
                          <source
                            src={selectedProjectData.video}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </motion.div>
                    </>
                  )}

                  {selectedProjectData.images &&
                    selectedProjectData.images.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative w-full mx-auto rounded-lg overflow-hidden shadow-2xl"
                      >
                        <AnimatePresence mode="wait">
                          <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px]">
                            <Image
                              key={currentImageIndex}
                              src={
                                selectedProjectData.images[currentImageIndex]
                              }
                              alt={`Project image ${currentImageIndex + 1}`}
                              fill
                              sizes="100vw"
                              className="object-contain"
                              quality={75}
                              priority
                            />
                          </div>
                        </AnimatePresence>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {selectedProjectData.images.map((_, index) => (
                            <button
                              key={index}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentImageIndex
                                  ? "bg-white"
                                  : "bg-white/50"
                              }`}
                              onClick={() => setCurrentImageIndex(index)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}

                  {!selectedProjectData.video &&
                    (!selectedProjectData.images ||
                      selectedProjectData.images.length === 0) && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="relative w-full max-w-2xl mx-auto rounded-lg overflow-hidden shadow-2xl bg-gray-800/50 p-12"
                      >
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="text-6xl mb-4">📱</div>
                          <p className="text-gray-400 text-lg">
                            Media coming soon
                          </p>
                        </div>
                      </motion.div>
                    )}
                </motion.div>
              )}
            </AnimatePresence>

            {!selectedProjectData && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex items-center justify-center text-gray-500"
              >
                Select a project to view details
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
