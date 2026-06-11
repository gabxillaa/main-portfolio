import { ProjectData } from "./types";

export const deck: ProjectData = {
  slug:      "deck",
  title:     "Deck",
  tagline:   "Your actual tagline here",
  desc:      "Deck Management System",
  gradient:  "linear-gradient(160deg,#71B5C2 0%,#3a8fa0 100%)",
  thumbnail: "/assets/deck.svg",
  liveUrl:   "https://deck.vercel.app",

  context:  "Your real context text...",
  problem:  "Your real problem text...",
  solution: "Your real solution text...",

  process: [
    {
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
      title:  "Requirements Analysis",
      detail: "Your real process detail...",
    },
     {
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
      title:  "Design Phase",
      detail: "Your real process detail...",
    },
     {
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
      title:  "Develop Phase",
      detail: "Your real process detail...",
    },
     {
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
      title:  "Testing Phase",
      detail: "Your real process detail...",
    },
     {
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
      title:  "Deployment Phase",
      detail: "Your real process detail...",
    },
     {
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
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
    { src: "/projects/deck/screen-1.jpg", alt: "Dashboard view" },
    { src: "/projects/deck/screen-2.jpg", alt: "Detection result" },
  ],

  reflection: "Your real reflection...",
};