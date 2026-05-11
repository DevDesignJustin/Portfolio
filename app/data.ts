// ── Theme & accent ─────────────────────────────────────────────────────────────
export const THEMES = {
  dark: {
    bg: "#070707",
    surface: "#0c0c0c",
    txt: "#efefef",
    muted: "#555",
    subtle: "#282828",
    border: "#161616",
  },
  light: {
    bg: "#f5f0e8",
    surface: "#ece7dc",
    txt: "#1a1410",
    muted: "#8a7a6a",
    subtle: "#d4cdc4",
    border: "#ddd8d0",
  },
};

export const ACCENT_COLORS = [
  "#a78bfa",
  "#2dd4bf",
  "#fb923c",
  "#f472b6",
  "#4ade80",
];

// ── UI constants ───────────────────────────────────────────────────────────────
export const NAV = [
  "about",
  "work",
  "mini",
  "skills",
  "github",
  "experience",
  "contact",
];
export const PROJ_INITIAL = 5;
export const GITHUB_USERNAME = "DevDesignJustin";

export const TICKER = [
  "NEXT.JS",
  "TYPESCRIPT",
  "REACT",
  "DARK MODE ONLY",
  "FIGMA",
  "LATE NIGHT BUILDS",
  "GSAP",
  "TAILWIND CSS",
  "PERFORMANCE OBSESSED",
  "NODE.JS",
  "OPEN TO WORK",
  "POSTGRESQL",
  "CLEAN CODE",
  "DOCKER",
  "VERCEL",
  "CSS GRID ENTHUSIAST",
];

// ── Portfolio data ─────────────────────────────────────────────────────────────
export const projects = [
  {
    num: "01",
    title: "KPSAUSA",
    cat: "Web Application",
    year: "2026",
    link: "https://www.kpsausa.org/en",
    stack: [
      "Next.js",
      "TypeScript",
      "Stripe",
      "PostgreSQL",
      "Tailwind",
      "Shadcn",
      "Resend",
      "Printful",
    ],
    desc: "KPSAUSA is a non-profit organization that empowers Korean American Para Athletes to compete at the highest level.",
  },
  {
    num: "02",
    title: "ChessMate",
    cat: "Web Application",
    year: "2026",
    link: "https://chessmate.pro",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Supabase",
      "Stripe",
      "Shadcn",
      "Resend",
    ],
    desc: "ChessMate is a web application that allows users create, manage, and joing tournaments with ease",
  },
  {
    num: "03",
    title: "Bin Clean",
    cat: "Web Application",
    year: "2026",
    link: "https://bincleaningfp.com",
    stack: ["HTML", "CSS", "JavaScript", "Tailwind", "GSAP"],
    desc: "A simple static website for a local garbage bin cleaning buisness",
  },
  {
    num: "04",
    title: "LHS Chess Club",
    cat: "Web Application",
    year: "2026",
    link: "https://lhs-chess-website.vercel.app/",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Shadcn",
      "Sanity",
      "Resend",
      "Supabase",
      "GSAP",
    ],
    desc: "A website for Livingston High School Chess Club",
  },
];

export const miniProjects = [
  {
    title: "Zentry Clone",
    tag: "Website Clone",
    year: "2025",
    link: "https://zentry.kjustin.me",
    github: "https://github.com/DevDesignJustin/Zentry-Clone",
    stack: ["React", "GSAP", "Tailwind"],
    desc: "A clone of the Zentry Game website",
  },
  {
    title: "Mojito Cocktails",
    tag: "Cocktail Website",
    year: "2026",
    link: "https://mojito.kjustin.me",
    github: "https://github.com/DevDesignJustin/Mojito-Cocktail-Landing-Page",
    stack: ["React", "GSAP", "Tailwind"],
    desc: "A website design for a cocktail website",
  },
  {
    title: "GTA VI Clone",
    tag: "Website Clone",
    year: "2025",
    link: "https://gtavi.kjustin.me",
    github: "https://github.com/DevDesignJustin/GTA-VI-Clone",
    stack: ["React", "GSAP", "Tailwind"],
    desc: "A clone of the GTA VI Game website",
  },
  {
    title: "Minimal Minis",
    tag: "Collection of Small Projects",
    year: "2026",
    link: "https://minimal-minis.kjustin.me",
    github: "https://github.com/DevDesignJustin/Minimal-Minis",
    stack: ["HTML", "CSS", "JavaScript"],
    desc: "A clone of the GTA VI Game website",
  },
];

export const experience = [
  {
    role: "Full Stack Dev",
    company: "3",
    period: "2024 — Present",
    desc: "Learned backend and databases, and started building full web applications.",
  },
  {
    role: "Frontend Dev",
    company: "2",
    period: "2021 — 2023",
    desc: "First time using an IDE. Built small interactive website using HTML, CSS, and JavaScript",
  },
  {
    role: "Scratch User",
    company: "1",
    period: "2019 — 2021",
    desc: "Started block coding, and built small animations to full multiplayer cloud games.",
  },
];

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "GSAP",
  "HTML",
  "CSS",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Redis",
  "GraphQL",
  "Git",
  "Figma",
  "Docker",
  "AWS",
  "Vercel",
];

export const skillCategories = [
  {
    label: "All",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "HTML",
      "CSS",
      "Node.js",
      "Python",
      "PostgreSQL",
      "Redis",
      "GraphQL",
      "Git",
      "Figma",
      "Docker",
      "AWS",
      "Vercel",
    ],
  },
  {
    label: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "HTML",
      "CSS",
    ],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
  },
  { label: "Tools", skills: ["Git", "Figma", "Docker", "AWS", "Vercel"] },
];

// ── Terminal commands ──────────────────────────────────────────────────────────
export const TERM_COMMANDS: Record<string, (a: string[]) => string[]> = {
  help: () => [
    "Available commands:",
    "",
    "  whoami    — who is justin?",
    "  skills    — tech stack",
    "  projects  — selected work",
    "  ls        — alias for projects",
    "  contact   — get in touch",
    "  neofetch  — system info",
    "  hire      — best decision ever",
    "  sudo      — try it 😏",
    "  clear     — clear terminal",
  ],
  whoami: () => [
    "Justin Kim",
    "────────────────────────────",
    "Role      Full-Stack & AI Developer",
    "Location  New Jersey, USA",
    "Status    ● Available for work",
    "Email     devdesignjustin@gmail.com",
    "Since     2019",
  ],
  skills: () => [
    "Frontend   React · Next.js · TypeScript · Tailwind · GSAP · HTML · CSS",
    "Backend    Node.js · Python · PostgreSQL · Redis",
    "Tools      Git · Figma · Docker · AWS · Vercel",
  ],
  projects: () => [
    "01  Commerce Platform    — Next.js · Stripe · PostgreSQL",
    "02  Design System        — React · Storybook · Figma",
    "03  Analytics Dashboard  — React · D3.js · FastAPI",
  ],
  ls: (a) => TERM_COMMANDS.projects(a),
  contact: () => [
    "📧  devdesignjustin@gmail.com",
    `🔗  github.com/${GITHUB_USERNAME}`,
    "    → Scroll down to reach out",
  ],
  hire: () => [
    "Great choice! 🎉",
    "→ Scrolling to contact section...",
    "(or email devdesignjustin@gmail.com directly)",
  ],
  sudo: () => [
    "sudo: you need level 99 credentials",
    "hint: try  sudo hire-me",
  ],
  "sudo hire-me": () => [
    "[sudo] password for you: ••••••••",
    "Access granted 🔓",
    "✓ Sending offer letter",
    "✓ Scheduling onboarding",
    "✓ Setting up workspace",
    "Welcome aboard! (email me for real though)",
  ],
  neofetch: () => [
    "  ██╗██╗  ██╗",
    "  ██║██║ ██╔╝",
    "  ██║█████╔╝   justin@portfolio",
    "  ██║██╔═██╗   ─────────────────────",
    "  ╚█████╔╝██║  OS: macOS Sequoia",
    "   ╚════╝ ╚═╝  Shell: zsh",
    "              Editor: VS Code",
    "              Browser: Arc",
    "              Drink: Water 💧 /day",
    "              Status: Available",
  ],
};
