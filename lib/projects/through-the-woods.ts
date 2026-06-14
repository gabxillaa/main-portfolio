import { ProjectData } from "./types";

export const throughTheWoods: ProjectData = {
  slug:      "through-the-woods",
  title:     "Through the Woods",
  tagline:   "Through the Woods is a Unity-based 2D puzzle-platformer where gameplay and narrative follow a young girl’s emotional journey through platforming and environmental puzzles.",
  desc:      "Interactive Storytelling Experience",
  gradient:  "linear-gradient(160deg,#71B5C2 0%,#3a8fa0 100%)",
  thumbnail: "/assets/through-the-woods.svg",

  context:  "Puzzle-platformers like Celeste, Gris, and Limbo proved that emotionally resonant stories paired with tight platforming mechanics can create unforgettable experiences. Our team, Odyssey, wanted to create something in that same spirit, a game where the puzzles and platforming aren't just obstacles, but reflections of the protagonist's emotional growth.",
  problem:  "We needed to build a 2D pixel-art puzzle-platformer for mobile that could weave narrative and gameplay together seamlessly. That meant designing six interconnected stages, each introducing new mechanics (double jump, wall jump, dashing) at the right pace, while also handling a lives system, checkpoint saves, dialogue, cutscenes, and a full HUD, all running smoothly on mid-range Android devices.",
  solution: "We built Through the Woods, a story-driven puzzle-platformer following Eira, a 13-year-old girl rescuing her brother from a witch, inspired by Hansel and Gretel. The game features six progressive stages teaching platforming mechanics (running, jumping, double jump, wall jump, dashing), environmental puzzles (levers, pressure plates, pushable objects), a 3-life system with checkpoint saves, cutscenes and dialogue sequences, and a full settings/save system with three save slots. I worked on implementing the Player Module's core systems in Unity, bringing the design and assets to life as functional gameplay.",

  process: [
    {
      iconUrl: "https://api.iconify.design/lucide:search.svg",
      title:  "Initiation Phase",
      detail: "We started by figuring out what players would actually want from the game. Through surveys, user journey maps, and empathy mapping, we built a clear picture of the experience we wanted to create, then shaped it into a project charter to guide everything that followed.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:palette.svg",
      title:  "Pre Production Phase",
      detail: "Most of the heavy planning happened here. We built the story using a Hero’s Journey structure, designed the world settings like villages, forests, caves, and a witch’s lair, and created the characters and their roles. We also broke the game down into six stages, designed the full UI in Figma, mapped out the system architecture, and planned the gameplay flow in detail so development would be smoother later on.",
    },
     {
      iconUrl: "https://api.iconify.design/lucide:code.svg",
      title:  "Production Phase",
      detail: "This is where everything started coming to life. As one of the two game developers in a five-person team, I focused on integrating game assets and implementing core gameplay systems in Unity. My work included character movement, jumping mechanics such as double jump, wall jump, and dashing, along with puzzles, environmental interactions, camera movement, and basic animations. The other game developer handled the level progression system, including the apple collection requirement to advance to the next stage, as well as checkpoints, lives, and save/load systems. It was the stage where our designs finally turned into a playable game.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:bug-check.svg",
      title:  "Testing Phase",
      detail: "We tested everything step by step to make sure the game actually felt and worked right. All core gameplay, puzzles, UI, and audio systems were tested with 25 functional test cases, all passing. We also checked performance and stability across different scenarios, along with 62 GUI tests for all menus and screens, which helped us catch small issues and polish the experience.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:rocket-launch.svg",
      title:  "Release Phase",
      detail: "Once everything was stable, we packaged the game as an Android APK and prepared it for release. It was designed to run on devices with at least Android 11, and we officially wrapped up and released the project in December 2024.",
    },

  ],

  results: [
    { value: "93.75%", label: "Usability Assessment", sublabel: "Non-IT Survey" },
    { value: "100%",  label: "GUI Testing", sublabel: "All Menus and Screens" },
    { value: "100%", label: "Functional Testing", sublabel: "All Features" },
    { value: "30+ FPS", label: "Performance Efficiency", sublabel: "Frame Rate" },
  ],
  resultDiscussion: "The overall evaluation shows that the game performed well across all key quality areas. Functional testing achieved a 100% pass rate, meaning all core gameplay systems such as movement, puzzles, progression, UI, and audio-visual features worked correctly without errors. Non-functional testing also passed all criteria, which means the game runs efficiently on the target device specifications (Android 11, Octa-core, 8GB RAM), maintains stable performance with low CPU and memory usage, responds quickly to player input, and stays reliable without frequent crashes. GUI testing passed all 62 test cases, meaning every menu and gameplay screen was consistent, functional, and easy to navigate, ensuring a smooth user experience across the entire interface. Usability scored 93.75/100, which indicates that players generally found the game easy to learn, engaging, and intuitive to play, especially in terms of controls and interaction. However, the lower inclusivity score highlights limited accessibility features, meaning the game lacks support options such as colorblind settings or broader accessibility adjustments, which is an area for future improvement.",

  techStack: [
  {
    name: "Unity (C#)",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
    bg:   "#e4e4e6",
  },
  {
    name: "Figma",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    bg:   "#fde8e2",
  },
  {
    name: "Photoshop",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
    bg:   "#dcecfb",
  },
  {
    name: "Unity Profiler",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
    bg:   "#e4e4e6",
  },
  {
    name: "Manual Testing",
    icon: "https://api.iconify.design/mdi:test-tube.svg",
    bg:   "#dff2de",
  },
],

  gallery: [
    { src: "/assets/ttw/ttw.png", alt: "Detection result" },
    { src: "/assets/ttw/ttw-2.png", alt: "Detection result" },
    { src: "/assets/ttw/ttw-1.png", alt: "Dashboard view" },
    { src: "/assets/ttw/ttw-7.jpg", alt: "Dashboard view" },
    { src: "/assets/ttw/ttw-6.jpg", alt: "Dashboard view" },
    { src: "/assets/ttw/ttw-5.jpg", alt: "Dashboard view" },
    { src: "/assets/ttw/ttw-4.jpg", alt: "Dashboard view" },
    { src: "/assets/ttw/ttw-3.jpg", alt: "Dashboard view" },
  ],

  reflection: `This was my first time building a full game from the ground up instead of a productivity or management app, and the shift was honestly bigger than expected.

Since I am not really a gamer, I had to spend a lot of time watching playthroughs and breakdowns of games like Celeste, Hollow Knight, and Terraria just to understand how certain mechanics, pacing, and player movement systems are supposed to feel.

A lot of it was learning by observation first, then trying to translate what I saw into Unity step by step.

Debugging in Unity was also a completely different kind of challenge. Issues rarely came from a single line of code, but from the environment itself like how multiple systems interacted, so I had to go through elements one by one just to figure out what was breaking.

It was frustrating at times, but also rewarding when small fixes finally made everything work together.

Translating a narrative-driven design where even puzzles are meant to carry emotion meant constantly thinking about pacing, not just functionality. Something like a double jump stopped being just a mechanic and became a story moment, like Eira realizing she is capable of more than she thought.

Seeing the usability results made everything feel more real. Scoring 93.75 felt rewarding, but the Inclusivity score stood out in an uncomfortable way since it showed we had completely overlooked accessibility features like colorblind support during development.

That is something I would definitely prioritize much earlier next time, since it is not something you can just easily patch at the end.

Overall, the project felt like a mix of learning, frustration, and excitement, and it pushed me to think more deeply about gameplay feel, emotional pacing, and what it really means to design for different kinds of players.`
};