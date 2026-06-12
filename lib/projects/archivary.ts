import { ProjectData } from "./types";

export const archivary: ProjectData = {
  slug:      "archivary",
  title:     "Archivary",
  tagline:   "Your actual tagline here",
  desc:      "Archival Management System",
  gradient:  "linear-gradient(160deg,#71B5C2 0%,#3a8fa0 100%)",
  thumbnail: "/assets/archivary.svg",

  context:  "Your real context text...",
  problem:  "Your real problem text...",
  solution: "Your real solution text...",

  process: [
    {
      iconUrl: "https://api.iconify.design/lucide:search.svg",
      title:  "Requirements Analysis",
      detail: "The team started by identifying who would use the system: clients, mycologists, and BPI administrators. They conducted interviews, built empathy maps, and ran surveys to understand real pain points and workflows. Benchmarking against existing apps like Picture This and Mold Finder AI also helped shape what features were needed.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:palette.svg",
      title:  "Design Phase",
      detail: "With requirements in hand, the team translated everything into visual and structural blueprints. They created data flow diagrams, entity-relationship diagrams, use case diagrams, and a system architecture layout. High-fidelity prototypes were built in Figma, along with a branding sheet and color palette to keep the look consistent and professional.",
    },
     {
      iconUrl: "https://api.iconify.design/lucide:code.svg",
      title:  "Develop Phase",
      detail: "Your real process detail...",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:bug-check.svg",
      title:  "Testing Phase",
      detail: "Your real process detail...",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:rocket-launch.svg",
      title:  "Deployment Phase",
      detail: "Your real process detail...",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:clipboard-check.svg",
      title:  "Review Phase",
      detail: "Your real process detail...",
    },
  ],

  results: [
    { value: "93.33%", label: "CNN Accuracy" },
    { value: "87.88%", label: "F1 Score" },
    { value: "61.67",  label: "SUS Score", sublabel: "(Non-IT Survey)" },
  ],
  resultDiscussion: "Your real discussion...",

  techStack: [
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      bg:   "#000000",
    },
    // ... rest of stack
  ],

  gallery: [
    { src: "/projects/archivary/screen-1.jpg", alt: "Dashboard view" },
    { src: "/projects/archivary/screen-2.jpg", alt: "Detection result" },
  ],

  reflection: "Your real reflection...",
};