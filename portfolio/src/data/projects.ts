export type ProjectCategory = "Mobile" | "AI & Data" | "Web" | "Systems" | "Games";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights?: string[];
  category: ProjectCategory;
  year?: string;
  techStack: string[];
  video?: string;
  /** Small still shown on the card; the video itself only loads on hover or when opened. */
  poster?: string;
  images?: string[];
  /** A (hopefully funny) note shown in place of media until a demo exists. */
  cover?: string;
  status?: "In progress";
  featured?: boolean;
}

/** Window event the Skills section fires to filter projects by one technology. */
export const TECH_FILTER_EVENT = "filter-projects-by-tech";

export const categories: ProjectCategory[] = [
  "Mobile",
  "AI & Data",
  "Web",
  "Systems",
  "Games",
];

export const projects: Project[] = [
  {
    slug: "tablet-builder",
    video: "/projects/tablet-builder.mp4",
    poster: "/projects/posters/tablet-builder.webp",
    title: "Tablet Builder Puzzle",
    tagline: "Bachelor thesis: a web game that teaches how tablets work",
    description:
      "An educational web game that teaches K–12 students how tablet hardware works by assembling one piece by piece. Difficulty tiers are aligned with Bloom's Taxonomy, so younger students recognise components while older students reason about how they work together.",
    highlights: [
      "Field-tested with 21 students across three age groups",
      "Statistically significant learning gain (Wilcoxon signed-rank test)",
      "Difficulty tiers mapped to Bloom's Taxonomy levels",
    ],
    category: "Web",
    year: "2026",
    techStack: ["Web Game", "Educational Design", "User Study"],
    featured: true,
  },
  {
    slug: "nl-to-sql",
    video: "/projects/nl-to-sql.mp4",
    poster: "/projects/posters/nl-to-sql.webp",
    title: "Natural Language to SQL",
    tagline: "Ask a question in plain English, get a safe SQL query",
    description:
      "A system that converts natural-language questions into valid, executable SQL queries against MS SQL Server using the Gemini API. Generated queries pass through safety guardrails before they ever touch the database.",
    highlights: [
      "Produces executable SQL from free-form questions",
      "Guardrails block unsafe or destructive generated queries",
    ],
    category: "AI & Data",
    year: "2026",
    techStack: ["Python", "Gemini API", "MS SQL Server"],
    featured: true,
  },
  {
    slug: "f1-podium",
    images: [
      "/projects/f1/1-grid-vs-podium.jpg",
      "/projects/f1/2-roc-pr-test.jpg",
      "/projects/f1/3-shap-global.jpg",
      "/projects/f1/4-shap-waterfall.jpg",
    ],
    title: "F1 Podium Prediction",
    tagline: "Predicting podium finishes from qualifying data",
    description:
      "Predicts Formula 1 podium finishes from post-qualifying data spanning 1950–2024. Compares a tree ensemble with a Keras neural network, using time-based splits so the models never peek into the future.",
    highlights: [
      "75 seasons of race data",
      "Time-based train/test splits to avoid leakage",
      "Beat the baseline on PR-AUC",
    ],
    category: "AI & Data",
    year: "2026",
    techStack: ["Python", "pandas", "scikit-learn", "Keras"],
  },
  {
    slug: "vehicle-tracking",
    cover: "Hold on, I'm filming. The cars won't stop moving.",
    title: "Vehicle Detection, Tracking & Counting",
    tagline: "Counting traffic in UA-DETRAC video",
    description:
      "A team computer-vision pipeline that detects vehicles with YOLO, tracks them across frames with ByteTrack, and counts them in UA-DETRAC traffic video.",
    category: "AI & Data",
    year: "2026",
    techStack: ["Python", "YOLO", "ByteTrack", "Computer Vision"],
    status: "In progress",
  },
  {
    slug: "finaria-pipeline",
    cover: "Demo's still in the pipeline. Literally.",
    title: "Stock Market Data Pipeline",
    tagline: "With Finaria, for bank-crisis simulations",
    description:
      "A Dockerized data-engineering pipeline, built with Finaria, that cleans their stock-market data and tests how realistic it is for use in bank-crisis simulations.",
    category: "AI & Data",
    year: "2026",
    techStack: ["Python", "Docker", "Data Engineering"],
    status: "In progress",
  },
  {
    slug: "readflow",
    video: "/projects/readflow.mp4",
    poster: "/projects/posters/readflow.webp",
    title: "ReadFlow",
    tagline: "A calm, distraction-free reading app",
    description:
      "A cross-platform mobile reading app with a minimal, distraction-free reader interface, built with React Native and Expo.",
    category: "Mobile",
    year: "2026",
    techStack: ["React Native", "Expo", "TypeScript"],
  },
  {
    slug: "expense-tracker",
    video: "/projects/expense-tracker.mp4",
    poster: "/projects/posters/expense-tracker.webp",
    title: "Expense Tracker",
    tagline: "Offline-first budgeting with a dark fintech look",
    description:
      "A Flutter expense tracker with income and expense transactions, categories, a balance card with a privacy toggle, recurring bills and a category breakdown. Everything is stored locally in SQLite, so it works fully offline.",
    highlights: [
      "Offline-first SQLite storage with foreign keys and indexed, paginated queries",
      "Money stored as integer cents to avoid floating-point rounding errors",
      "Recurring bills, search and filters, and a category spending breakdown",
    ],
    category: "Mobile",
    techStack: ["Flutter", "Dart", "SQLite", "Provider"],
  },
  {
    slug: "homebase",
    title: "Homebase – Household Manager",
    tagline: "Shared tasks, events and documents in real time",
    description:
      "A household management app where members share tasks, events and documents, kept in sync in real time with Supabase and backed by push notifications.",
    highlights: [
      "Real-time sync across every member's device",
      "Shared tasks, events calendar and document storage",
      "Push notifications for assignments and updates",
    ],
    category: "Mobile",
    year: "2025",
    techStack: ["React Native", "Expo", "Supabase", "Push Notifications"],
    video: "/projects/homebase.mp4",
    poster: "/projects/posters/homebase.webp",
    featured: true,
  },
  {
    slug: "hiryo",
    video: "/projects/hiryo.mp4",
    poster: "/projects/posters/hiryo.webp",
    title: "Hiryo – Family Safety",
    tagline: "Live location, geofencing and SOS alerts",
    description:
      "A family safety app that shows circle members on a shared live map, notifies you when they arrive at or leave a place, and sends SOS alerts in emergencies. Most of the work went into making background location reliable on Android.",
    highlights: [
      "Background location sharing, geofencing and shared maps",
      "Solved Android permission, background-execution and battery-optimisation limits",
      "Simplified onboarding and permission flows to cut early drop-off",
      "Managed Google Play releases, internal testing tracks and compliance",
    ],
    category: "Mobile",
    year: "2025",
    techStack: ["React Native", "Expo", "Supabase", "Geofencing"],
    featured: true,
  },
  {
    slug: "helper",
    title: "Helper – Mobile Support App",
    tagline: "Support chat with an admin dashboard",
    description:
      "A mobile support application with user authentication, real-time support chat and an admin dashboard, covering both the React Native client and the Node.js backend.",
    category: "Mobile",
    techStack: ["React Native", "TypeScript", "Node.js", "Express"],
    video: "/projects/helper.mp4",
    poster: "/projects/posters/helper.webp",
  },
  {
    slug: "mahsooly",
    title: "Mahsooly – Agriculture Platform",
    tagline: "Connecting farmers with field inspectors",
    description:
      "An agricultural management platform with web and mobile interfaces: farmer registration, field inspections, digital guides, finance management and full Arabic/English support.",
    category: "Mobile",
    year: "2024",
    techStack: ["React Native", "Next.js", "Node.js", "i18n"],
    images: ["/m_1.jpg", "/m_2.jpg", "/m_3.jpg", "/m_4.jpg", "/m_5.jpg", "/m_6.jpg"],
  },
  {
    slug: "events-system",
    cover: "10 developers, 0 screen recordings. Classic.",
    title: "Events Management System",
    tagline: "University events platform, 10-person Agile team",
    description:
      "A university events platform built by a 10-person Agile team. I worked on backend logic, database schema design and integrating the frontend with the API.",
    category: "Web",
    year: "2025",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    slug: "scad",
    title: "SCAD – Internship System",
    tagline: "Internship management for GUC",
    description:
      "An internship management system for the German University in Cairo: student registration, company postings, application tracking and an admin dashboard.",
    category: "Web",
    techStack: ["React", "Tailwind CSS"],
    video: "/projects/scad.mp4",
    poster: "/projects/posters/scad.webp",
  },
  {
    slug: "goe",
    title: "GoE – Hotel Booking",
    tagline: "Find and book hotels by city",
    description:
      "A hotel booking platform with city-based search, popular destinations, featured hotels and booking management.",
    category: "Web",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    video: "/projects/goe.mp4",
    poster: "/projects/posters/goe.webp",
  },
  {
    slug: "tomasulo",
    cover: "The demo is executing out of order. It'll commit soon.",
    title: "Tomasulo Simulator",
    tagline: "Out-of-order execution, cycle by cycle",
    description:
      "A C++ simulator of Tomasulo's algorithm that shows how instructions issue, execute out of order and write back through reservation stations and the common data bus.",
    category: "Systems",
    techStack: ["C++", "Computer Architecture"],
  },
  {
    slug: "os-simulator",
    title: "Process Management Simulator",
    tagline: "FIFO, Round Robin and MLFQ scheduling",
    description:
      "An OS process-management simulator in C implementing FIFO, Round Robin and Multi-Level Feedback Queue scheduling, with an ncurses terminal UI that shows memory, queues and output live.",
    category: "Systems",
    techStack: ["C", "ncurses", "Scheduling", "Memory Management"],
    video: "/projects/os-simulator.mp4",
    poster: "/projects/posters/os-simulator.webp",
  },
  {
    slug: "color-sorter",
    cover: "The sorter is camera shy. Negotiations ongoing.",
    title: "Embedded Color Sorter",
    tagline: "A microcontroller that sorts by colour",
    description:
      "An embedded system written in C that reads objects with a colour sensor and drives actuators to sort them.",
    category: "Systems",
    techStack: ["C", "Embedded Systems", "Sensors"],
  },
  {
    slug: "attack-on-titan",
    title: "Attack on Titan",
    tagline: "Tower-defence strategy game",
    description:
      "A Plants vs Zombies–style strategy game set in the Attack on Titan universe, with multiple unit types, resource management and rising difficulty.",
    category: "Games",
    techStack: ["Java", "JavaFX", "OOP"],
    video: "/projects/attack-on-titan.mp4",
    poster: "/projects/posters/attack-on-titan.webp",
  },
  {
    slug: "flappy-bird",
    title: "Flappy Bird",
    tagline: "Physics, obstacles and rising difficulty",
    description:
      "A recreation of Flappy Bird with custom graphics, obstacle generation, collision detection and score tracking.",
    category: "Games",
    techStack: ["Java Swing", "Game Physics"],
    video: "/projects/flappy-bird.mp4",
    poster: "/projects/posters/flappy-bird.webp",
  },
  {
    slug: "connect-4",
    title: "Connect 4",
    tagline: "Two-player game with win detection",
    description:
      "Connect 4 with smooth animations, a player-vs-player mode, win detection, score tracking and replay.",
    category: "Games",
    techStack: ["Java Swing"],
    video: "/projects/connect-4.mp4",
    poster: "/projects/posters/connect-4.webp",
  },
  {
    slug: "tic-tac-toe",
    title: "Tic Tac Toe",
    tagline: "The classic, with an AI opponent",
    description:
      "Tic Tac Toe with a clean interface and an AI opponent with multiple difficulty levels.",
    category: "Games",
    techStack: ["Java Swing", "OOP"],
    video: "/projects/tic-tac-toe.mp4",
    poster: "/projects/posters/tic-tac-toe.webp",
  },
];
