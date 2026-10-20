import { ProjectData } from "./types";

export const throughTheWoods: ProjectData = {
  slug:      "through-the-woods",
  title:     "Through the Woods",
  desc:      "Interactive Storytelling Experience",
  gradient:  "linear-gradient(160deg,#71B5C2 0%,#3a8fa0 100%)",
  thumbnail: "/assets/through-the-woods.svg",

  impactSummary: "A story-driven puzzle-platformer for Android where every new ability arrives with the story, so players learn by playing. It scored 93.75 out of 100 in a usability assessment.",
  overview: {
    role: "Game Developer",
    team: "5 members",
    timeline: "September to December 2024",
    platforms: "Android",
  },

  context: "Puzzle-platformers like Celeste, Gris, and Limbo showed that an emotional story and tight platforming can strengthen each other. Our team, Odyssey, wanted to build a game in that spirit, where the puzzles and platforming reflect the protagonist's growth from timid to courageous. That meant introducing new abilities (double jump, wall jump, dash) at the right pace, and supporting lives, checkpoint saves, dialogue, cutscenes, and a full HUD on mid-range Android phones (octa-core, 8GB RAM, Android 11).",

  solution: "We built Through the Woods, a pixelated 2D puzzle-platformer following Eira, a 13-year-old girl rescuing her brother Riel from a witch, inspired by Hansel and Gretel. It has a tutorial and six stages, each teaching one new mechanic, with mechanical and physics-based puzzles, a 3-life system with checkpoint saves, cutscenes and dialogue, a HUD for lives, stamina, and breadcrumbs, and three save slots.",

  // DRAFT: the project charter also lists "implement UI designs and assets in the game engine"
  // under your role. If you built the HUD or menu screens in Unity, add one sentence about it
  // here and in the Production step. It is the strongest front-end evidence in this project.
  myRole: "I was one of two programmers on a five-person team. I integrated game assets and implemented the player's core systems in Unity: character movement, double jump, wall jump, and dashing, plus puzzles, environmental interactions, camera movement, and basic animations. The other programmer handled level progression, checkpoints, lives, and save and load.",

  process: [
    {
      id: "initiation",
      iconUrl: "https://api.iconify.design/lucide:flag.svg",
      title: "Initiation",
      takeaway: "We defined the player experience and the device limits before choosing a single mechanic.",
      detail: "We started with the player. A survey questionnaire, user stories, a user journey map, and an empathy map shaped who we were building for, and we recorded the scope, tools, milestones, and team roles in a project charter and requirements document. These deliverables were due in September 2024.",
      insights: [
          {
            finding: "Players feel frustrated when controls are unresponsive.",
            decision: "Required movement to stop the moment input stops, and tested input response at 0.1 seconds or less.",
          },
          {
            finding: "Players disengage when gameplay gets repetitive and the story loses momentum.",
            decision: "Gave each stage one new ability, added a mini-boss in Stage 3, and tied each ability to Eira's story.",
          },
          {
            finding: "Players get confused when level layouts make the next objective unclear.",
            decision: "Added context-sensitive help prompts and an on-screen collectible counter. Level clarity still came back as a recommendation after testing.",
          },
          {
            finding: "Compelling story and relatable characters make a game memorable.",
            decision: "Built the story on the Hero's Journey, with new abilities inspired by Eira's memories of Riel.",
          },
        ],
        images: [
          { group: "Empathy map", src: "/assets/ttw/Empathy-Map.png", alt: "Aggregated empathy map of platformer players: think, feel, say, and do", caption: "Team deliverable from project initiation.", wide: true },
          { group: "User journey map", src: "/assets/ttw/User-Journey-Map.png", alt: "Player journey map from adjusting settings to navigating challenges", caption: "Player journey, with improvement opportunities at each stage.", wide: true },
          { group: "Competitive analysis", src: "/assets/ttw/Competitive-Analysis.png", alt: "Table comparing Celeste, Limbo, Gris and similar games with Through the Woods across six features", caption: "How existing puzzle-platformers inform the design.", wide: true },
        ],
    },
    {
      id: "pre-production",
      iconUrl: "https://api.iconify.design/mdi:palette.svg",
      title: "Pre-Production",
      takeaway: "The story, six stages, and the full interface were planned before development began.",
      detail: "Most of the planning happened here. We built the story on a Hero's Journey structure, designed four settings (the village, the forest, the cave, and Waga's lair) and five characters, and blueprinted a tutorial plus six stages, each built around one new mechanic. The interface was designed in Figma across low, mid, and high-fidelity prototypes, alongside the screen flow, touch controls, software architecture, and use cases.",
      insights: [
        {
          finding: "Requirements asked for mechanics to be introduced gradually and explained when they first appear.",
          decision: "Gave each stage one new ability: double jump in Stage 2, wall jump in Stage 4, and dash in Stage 5, with a final stage that tests all of them. Context-sensitive help prompts explain each new mechanic.",
        },
        {
          finding: "Players needed to read their status at a glance on a small touch screen.",
          decision: "Limited the HUD to lives, stamina, and breadcrumbs, with settings behind a hamburger menu.",
        },
        {
          finding: "Story moments should not block players who want to keep playing.",
          decision: "Added skip buttons to cutscenes and dialogue, and showed the speaker's portrait on the left of each dialogue box.",
        },
        {
          finding: "Players needed to leave and resume without losing progress.",
          decision: "Used checkpoint saves with three save slots, and a warning modal before a new game replaces the oldest save.",
        },
      ],
    },
    {
      id: "production",
      iconUrl: "https://api.iconify.design/lucide:code.svg",
      title: "Production",
      takeaway: "I built the player's movement, puzzles, and camera in Unity, so each new ability worked the moment the story introduced it.",
      detail: "I integrated the game assets and implemented the player's core systems in Unity: running, jumping, double jump, wall jump, and dashing, then the puzzles and environmental interactions (levers, pressure plates, and pushable objects), camera movement, and basic animations. The other programmer built level progression and the breadcrumb collection requirement to advance, plus checkpoints, the 3-life system, and save and load. We worked in Visual Studio and tracked changes on GitHub.",
      // DRAFT: group, alt text, and caption are inferred from the filenames. Edit them to describe what each screenshot shows.
      images: [
        { group: "Unity implementation", src: "/assets/ttw/unity-1.png", alt: "Through the Woods in the Unity editor, screenshot 1 of 6", caption: "Screenshots from the Unity project, where the player systems, puzzles, and camera were built." },
        { group: "Unity implementation", src: "/assets/ttw/unity-2.png", alt: "Through the Woods in the Unity editor, screenshot 2 of 6" },
        { group: "Unity implementation", src: "/assets/ttw/unity-3.png", alt: "Through the Woods in the Unity editor, screenshot 3 of 6" },
        { group: "Unity implementation", src: "/assets/ttw/unity-4.png", alt: "Through the Woods in the Unity editor, screenshot 4 of 6" },
        { group: "Unity implementation", src: "/assets/ttw/unity-5.png", alt: "Through the Woods in the Unity editor, screenshot 5 of 6" },
        { group: "Unity implementation", src: "/assets/ttw/unity-6.png", alt: "Through the Woods in the Unity editor, screenshot 6 of 6" },
      ],
    },
    {
      id: "testing",
      iconUrl: "https://api.iconify.design/mdi:bug-check.svg",
      title: "Testing",
      takeaway: "Every functional, GUI, and non-functional test passed, and the usability assessment pointed to accessibility as the main gap.",
      detail: "We tested on a target device (octa-core, 8GB RAM, Android 11) using the Unity Profiler and manual testing, with our own tester and a designated tester from another group. All 25 functional test cases across five components passed, and all 62 GUI test cases covering every menu, modal, and gameplay screen passed. The game also met all six non-functional criteria: compatibility, capacity, performance efficiency, reliability, scalability, and maintainability. The usability assessment scored 93.75 out of 100 across 28 criteria. Learnability, operability, and engagement scored full marks, while inclusivity scored lowest: colorblind support rated 1 and accessible controls rated 2 out of 4.",
    },
    {
      id: "release",
      iconUrl: "https://api.iconify.design/lucide:rocket.svg",
      title: "Release",
      takeaway: "Packaged as an Android APK and released in December 2024.",
      detail: "Once the game was stable, we packaged it as an Android APK and released it in December 2024, closing the project on the charter's final milestone. Feedback from testers shaped our recommendations for the next version: a clearer tutorial and level direction, animated cutscenes and character expressions, performance tuning for frame rate and memory, and the accessibility gap the usability assessment flagged.",
    },
  ],

  results: [
    { value: "93.75", label: "Usability Score", sublabel: "Out of 100, across 28 criteria" },
    { value: "100%",  label: "GUI Testing", sublabel: "All menus and screens (62 test cases)" },
    { value: "100%",  label: "Functional Testing", sublabel: "All five components (25 test cases)" },
    { value: "30+ FPS", label: "Performance Efficiency", sublabel: "Minimum frame rate target met on the test device" },
  ],
  resultDiscussion: `All 25 functional test cases passed across core gameplay, puzzles and environment interaction, narrative and progression, user experience and interface, and audio and visuals. Non-functional testing also passed all six criteria: the game ran on the target specs (Android 11, octa-core, 8GB RAM), stayed under 80% CPU and RAM, held at least 30 FPS, and kept load times under 5 seconds.

GUI testing passed all 62 test cases, covering the splash screen, main menu, exit, settings, load game, and new game menus, and the gameplay screen.

The usability assessment scored 93.75 out of 100. Learnability, operability, and engagement all scored full marks, which suggests the gradual introduction of mechanics and the clear HUD worked. User error protection scored 3 out of 4 on two items, pointing to room for more warnings and recovery hints. Inclusivity scored lowest, with colorblind support at 1 and accessible controls at 2, and it is the clearest area for future improvement.`,

  techStack: [
    { name: "Unity (C#)",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg", bg: "#e4e4e6" },
    { name: "Figma",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", bg: "#fde8e2" },
    { name: "Visual Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg", bg: "#e8e0f5" },
    { name: "GitHub",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", bg: "#e4e4e6" },
  ],

  gallery: [
    { src: "/assets/ttw/ttw.png",   alt: "Through the Woods gameplay screenshot 1" },
    { src: "/assets/ttw/ttw-2.png", alt: "Through the Woods gameplay screenshot 2" },
    { src: "/assets/ttw/ttw-1.png", alt: "Through the Woods gameplay screenshot 3" },
    { src: "/assets/ttw/ttw-7.jpg", alt: "Through the Woods gameplay screenshot 4" },
    { src: "/assets/ttw/ttw-6.jpg", alt: "Through the Woods gameplay screenshot 5" },
    { src: "/assets/ttw/ttw-5.jpg", alt: "Through the Woods gameplay screenshot 6" },
    { src: "/assets/ttw/ttw-4.jpg", alt: "Through the Woods gameplay screenshot 7" },
    { src: "/assets/ttw/ttw-3.jpg", alt: "Through the Woods gameplay screenshot 8" },
  ],

  reflection: `This was my first time building a full game from the ground up instead of a productivity or management app, and the shift was bigger than I expected. I'm not really a gamer, so I spent a lot of time watching playthroughs of games like Celeste, Hollow Knight, and Terraria to understand how mechanics, pacing, and movement are supposed to feel, then translated what I saw into Unity step by step.

Debugging in Unity was a different kind of challenge. Issues rarely came from a single line of code, but from how multiple systems interacted, so I had to go through elements one by one to find what was breaking. It was frustrating at times, but rewarding when small fixes finally made everything work together.

Designing for a narrative meant thinking about pacing, not just functionality. A double jump stopped being just a mechanic and became a story moment, like Eira realizing she is capable of more than she thought.

The 93.75 usability score felt rewarding, but the inclusivity score stood out. We had overlooked accessibility features like colorblind support during development, and it isn't something you can easily patch at the end. Next time, I would plan accessibility from the design phase.`,
};