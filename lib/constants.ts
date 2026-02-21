export const FRAME_COUNT = 192;
export const FRAME_PATH = "/sequence/frame_";
export const FRAME_EXT = ".webp";

export const COLORS = {
  bg: "#0A0A0A",
  surface: "#111111",
  border: "#1F1F1F",
  accent: "#C9A96E",
  accentDim: "#8B6E42",
} as const;

export const SPRING_CONFIG = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.001,
} as const;

export interface Project {
  number: string;
  category: string;
  title: string;
  description: string;
  techStack: string[];
  links: { label: string; href: string }[];
  status: { label: string; color: string };
}

export const PROJECTS: Project[] = [
  {
    number: "01",
    category: "FULL STACK APPLICATION",
    title: "TradeTrack Pro",
    description:
      "A comprehensive trading analytics platform built for retail investors who demand institutional-grade portfolio insights. Real-time data ingestion, custom alerting, and a dashboard that actually makes sense of the noise.",
    techStack: [
      "Next.js",
      "Spring Boot",
      "PostgreSQL",
      "Redis",
      "WebSockets",
      "Docker",
    ],
    links: [
      { label: "GitHub", href: "#" },
      { label: "Live Demo", href: "#" },
    ],
    status: { label: "SHIPPED", color: "rgba(74,222,128,0.7)" },
  },
  {
    number: "02",
    category: "REAL-TIME PLATFORM",
    title: "DevCollab",
    description:
      "A real-time collaborative code editor and project management tool for remote dev teams. Think Notion meets VS Code — minus the bloat. Websocket-powered with conflict resolution and version diffing.",
    techStack: [
      "React.js",
      "Node.js",
      "Socket.io",
      "MongoDB",
      "JWT Auth",
      "Tailwind CSS",
    ],
    links: [
      { label: "GitHub", href: "#" },
      { label: "Case Study", href: "#" },
    ],
    status: { label: "IN PROGRESS", color: "rgba(251,191,36,0.7)" },
  },
  {
    number: "03",
    category: "DEVELOPER TOOL",
    title: "APIForge",
    description:
      "A no-fuss REST API testing and documentation generator. Import a Postman collection or write from scratch — it auto-generates beautiful, shareable API docs in seconds. Built for developers who hate writing docs but love reading good ones.",
    techStack: [
      "Java",
      "Spring Boot",
      "React.js",
      "PostgreSQL",
      "Docker",
      "OpenAPI 3.0",
    ],
    links: [{ label: "GitHub", href: "#" }],
    status: { label: "OPEN SOURCE", color: "rgba(96,165,250,0.7)" },
  },
];

export const SKILLS = [
  {
    category: "Backend",
    items: [
      "Java",
      "Spring Boot",
      "Hibernate",
      "REST APIs",
      "Next.js",
    ],
  },
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      "Docker",
      "Git",
      "Postman",
      "IntelliJ",
      "VS Code",
    ],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MySQL"],
  },
] as const;
