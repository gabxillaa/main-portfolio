import { ProjectData } from "./types";

export const deck: ProjectData = {
  slug:      "deck",
  title:     "Deck",
  tagline:   "Deck is a mobile and web app for creating and studying flashcards with AI-powered generation",
  desc:      "Deck Management System",
  gradient:  "linear-gradient(160deg,#71B5C2 0%,#3a8fa0 100%)",
  thumbnail: "/assets/deck.svg",

  context:  "Medical students at the University of Makati were drowning in coursework, and making good study materials like flashcards was eating up time they didn't have. Flashcards work great for memory retention through active recall, but creating them manually is tedious, and on top of that, juggling deadlines and study schedules added even more stress. Existing apps offered automation or customization, but rarely both without a trade-off.",
  problem:  "Students needed a way to create flashcards quickly without sacrificing personalization, plus a way to manage tasks and deadlines in one place. There was also no system in place for moderating user-generated content, if students could publish decks publicly, someone needed to review them for quality and appropriateness.",
  solution: "We built Deck,  a mobile app for students and a web platform for moderators. Students can create flashcards manually or generate them automatically with Gemini AI (from PDFs or prompts), organize tasks into folders, study through Study Mode and Quiz Mode, track their progress, and publish decks publicly. Moderators review publishing requests (with AI-assisted content flagging), manage reported content, handle ban appeals, and monitor platform analytics through a dashboard. ",

  process: [
    {
      iconUrl: "https://api.iconify.design/lucide:search.svg",
      title:  "Requirements Analysis",
      detail: "We scoped out two user types: Students and Moderators,  and broke down every feature into detailed components like Account Manager, Task Manager, Deck Manager, and Content Manager. We also documented what was explicitly out of scope, like live tutoring and full classroom management, to keep the project realistic and focused.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:palette.svg",
      title:  "Design Phase",
      detail: "This was my primary area of responsibility and ended up taking more time and effort than originally expected. As part of a team of three frontend developers, I worked closely with another frontend teammate to design the application's UI in Figma, starting with wireframes and later developing high-fidelity prototypes. We covered screens across both platforms, including the splash screen, onboarding flow, task manager, deck library, study modes, moderator dashboard, account management, and content review pages. One of our frontend teammates was often difficult to reach throughout the project, which meant the two of us had to take on additional screens and design tasks outside our original scope to keep progress moving. Much of the design system and overall user experience across both the mobile app and web platform was ultimately shaped through our combined efforts.",
    },
     {
      iconUrl: "https://api.iconify.design/lucide:code.svg",
      title:  "Develop Phase",
      detail: "Alongside an active frontend teammate, we built a large portion of the mobile app's UI in Flutter and the web platform's UI in CodeIgniter with Tailwind CSS. For the mobile app, she primarily handled the task manager and authentication features, while I focused on the flashcard system, account management, and study modes. Development of the moderator web platform was shared more evenly between us. Although our team had three frontend developers, delays from the third member often required us to take on additional work to keep the project progressing. Firebase handled authentication, real-time data, and storage, while Fisher-Yates Shuffle and KNN supported flashcard randomization and deck recommendations.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:bug-check.svg",
      title:  "Testing Phase",
      detail: "We ran functional tests across both modules , 24 test cases for the Student mobile app and 22 for the Moderator web app, all passing at 100%. Non-functional testing covered compatibility (the web app needed to run on Edge, Safari, and Opera) and performance (3-second load times, support for 150 concurrent users scaling to 300 under peak load)  and they both passed.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:rocket-launch.svg",
      title:  "Deployment Phase",
      detail: "The system was deployed with the mobile app and web platform connected through Firebase as the central database for real-time syncing of shared decks and cross-platform data access. The web platform was hosted using Hostinger to support deployment and public access.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:clipboard-check.svg",
      title:  "Review Phase",
      detail: `We ran User Acceptance Testing using the ISO 25010 model with 10 respondents, landing an overall average score of 3.66 which means "Acceptable" on the Likert scale. Functional Suitability (3.76) and Usability (3.78) scored the highest, with users praising the AI deck generation and account management flows. From there, we gathered specific feedback that shaped our recommendations list for future versions.`,
    },
  ],

  results: [
    { value: "3.66", label: "SUS Score", sublabel: "Non-IT Survey (Medical Students, Etc.)" },
    { value: "100%", label: "Functional Testing" },
    { value: "≤3s",  label: "Non Functional Testing", sublabel: "Performance (API response time)" },
  ],
  resultDiscussion: "Overall, the system performed well across all evaluation stages. Functional testing reached a 100% pass rate for both the Student and Moderator modules, which means every tested feature worked correctly without errors. Non-functional testing showed that the system stayed usable across major browsers like Edge, Safari, and Opera, met the 3-second response time target (meaning pages and actions loaded quickly enough for normal use), and handled 150 concurrent users with scalability up to 300 (meaning it could support multiple users at the same time without breaking or slowing down significantly). For User Acceptance Testing under ISO 25010, the system scored 3.66 out of 4, which is considered “Acceptable” and means users generally found it effective and usable. The highest scores were in Usability and Functional Suitability, showing that users found it easy to navigate and useful for studying, especially the AI-generated flashcards. Other areas like performance, reliability, security, and compatibility were still acceptable, but indicate parts of the system that could be improved in future updates.",

  techStack: [
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", bg: "#FDE2E2" },
  { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", bg: "#D6EFF7" },
  { name: "CodeIgniter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg", bg: "#FDE6D8" },
  { name: "Tailwind",    icon: "https://api.iconify.design/logos:tailwindcss-icon.svg",  bg: "#ddf1fc" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", bg: "#FDF1D6" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", bg: "#E2F5E5" },
  { name: "Gemini AI", icon: "https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png", bg: "#E6E8FD" },
],

  gallery: [
    { src: "/assets/deck/Deck-LogIn.png", alt: "Dashboard view" },
    { src: "/assets/deck/Deck-Dashboard.png", alt: "Detection result" },
    { src: "/assets/deck/Deck-Modal.png", alt: "Detection result" },
    { src: "/assets/deck/Deck-Mobile1.png", alt: "Detection result" },
    { src: "/assets/deck/Deck-Mobile2.png", alt: "Detection result" },
  ],

  reflection: `Deck started as a second-year project and was later revived in third year with a much bigger scope, including a full moderator web platform.

The early phase was a bit challenging since the team had to realign on direction before development could properly start.

The main difficulty wasn’t the technical work, but the team setup. We had three frontend developers, but one teammate was often hard to reach, which caused delays in key outputs like wireframes and slowed down progress.

In practice, the two of us who were consistently active ended up handling most of the frontend workload while balancing our own coursework.

Despite that, I still look back on the project with a mix of pride and relief. Working closely with my reliable teammate made a big difference, and it was satisfying seeing everything come together after all the delays and adjustments.

There was some frustration with the lack of communication from the third member, mainly because of how it affected pacing, but it also taught us how to adapt and keep things moving.

Seeing the final UAT score of 3.66 felt rewarding, like proof that despite the challenges, we still managed to build something functional and useful for the users it was meant for.`
};