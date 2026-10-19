import { ProjectData } from "./types";

export const deck: ProjectData = {
  slug:      "deck",
  title:     "Deck",
  desc:      "Deck Management System",
  gradient:  "linear-gradient(160deg,#71B5C2 0%,#3a8fa0 100%)",
  thumbnail: "/assets/deck.svg",

  impactSummary: "No more making flashcards by hand. Deck generates them with AI and keeps students on top of their tasks and deadlines.",
  overview: {
    role: "UI/UX Designer & Front-End Developer",
    team: "5 members",
    timeline: "January to May 2025",
    platforms: "Mobile & Web",
  },

  context: "Medical students at the University of Makati were drowning in coursework, and making good study materials like flashcards was eating up time they didn't have. Flashcards work well for memory retention through active recall, but creating them by hand is tedious, and juggling deadlines and study schedules added more stress. Existing apps offered automation or customization, but rarely both without a trade-off. Students needed a fast way to create personalized flashcards and manage their tasks in one place, and because decks could be published publicly, someone also had to review them for quality and appropriateness.",

  solution: "We built Deck, a mobile app for students and a web platform for moderators. Students can create flashcards manually or generate them with Gemini AI from a file or a prompt, organize tasks into folders, study in Study Mode and Quiz Mode, track their progress, and publish decks publicly. Moderators review publishing requests with AI-assisted content flagging, manage reported content, handle ban appeals, and monitor platform activity through an analytics dashboard.",

  myRole: "I was one of the UI/UX designers and front-end developers. I designed the interface in Figma with a teammate, covering the mobile app and the moderator web platform. On mobile, I built the flashcard system, account management, and study modes in Flutter, and I shared development of the moderator web platform with my teammate.",

  process: [
    {
      id: "research",
      iconUrl: "https://api.iconify.design/lucide:search.svg",
      title: "Research",
      takeaway: "Students wanted AI speed without losing control, which shaped one flow from deadlines to studying.",
      detail: "We started from a clear problem: medical students had little time to make flashcards by hand, and existing tools forced a choice between automation and customization. From the project charter we built an empathy map and a student journey map, which showed how students move from checking deadlines to creating and studying decks. We also wrote down what was out of scope, so a four-month project stayed realistic.",
      // DRAFT: insights come from the charter, journey map, and scope document. Confirm them against your empathy map.
      insights: [
        {
          finding: "Making flashcards by hand took too long for medical students with heavy workloads.",
          decision: "Made AI generation a main way to create a deck: upload a file, or enter a subject and topic, and choose how many cards to generate.",
        },
        {
          finding: "Existing apps forced a trade-off between automation and customization.",
          decision: "Kept manual creation alongside AI, and kept every generated card fully editable.",
        },
        {
          finding: "The journey map showed students starting each session by reviewing their tasks and decks.",
          decision: "Built a home screen that shows the latest quiz score, the nearest deadlines with priority, and decks to continue.",
        },
        {
          finding: "A four-month timeline could not cover everything students might want.",
          decision: "Left out live tutoring, grading of open-ended answers, classroom management, and a student web app, and focused on tasks, flashcards, and moderation.",
        },
      ],
      images: [
        {
          group: "Empathy map",
          src: "/assets/deck/Empathy-Map.png",
          alt: "Empathy map of Deck's student users",
          caption: "Built during project initiation from the pre-survey and charter.",
          wide: true,
        },
        {
          group: "Student journey",
          src: "/assets/deck/User-Journey-Map.jpg",
          alt: "Student journey map from log in to studying flashcards and managing the account",
          caption: "Student journey map, including opportunities such as a quiz timer and linking decks to tasks.",
          wide: true,
        },
      ],
    },
    {
      id: "design",
      iconUrl: "https://api.iconify.design/mdi:palette.svg",
      title: "Design",
      takeaway: "One design system kept a student mobile app and a moderator web platform consistent.",
      detail: "I worked with another frontend teammate to design the interface in Figma, starting with mid-fidelity wireframes and moving to high-fidelity prototypes for both platforms. The screens covered onboarding, task folders and tasks, the deck library, study and quiz modes, account settings, and the moderator dashboard and review pages. The design took more time than expected, and we took on screens beyond our original scope to keep the project moving.",
      // DRAFT: confirm each decision matches what you designed.
      insights: [
        {
          finding: "Students were juggling deadlines and study material in separate places.",
          decision: "Gave tasks three views (overview, list, and calendar) with progress charts, and put both tasks and decks in one app.",
        },
        {
          finding: "Public decks needed quality control without making moderators read every card.",
          decision: "Designed publishing review so AI pre-scans each deck and flagged decks are visually distinguished for the moderator.",
        },
        {
          finding: "Students needed to understand the result of every action.",
          decision: "Defined one set of alert, confirmation, success, and error dialogs and reused it across every module.",
        },
        {
          finding: "Studying works best when hard cards come up first.",
          decision: "Let students star difficult cards, which then appear first in the learn modes.",
        },
      ],
      images: [

        {
          group: "From research to flow",
          src: "/assets/deck/Before-After-Workflow.png",
          alt: "Diagram comparing how students studied and planned before Deck with Deck's single flow",
          caption: "How the problem became the app's flow.",
          wide: true,
        },
        {
          group: "Mid-fidelity wireframes",
          src: "/assets/deck/Mid-Fi-1.png",
          alt: "Mid-fidelity wireframes for Deck, set 1",
          caption: "Wireframes used to validate layout and flow before visual design.",
        },
        {
          group: "Mid-fidelity wireframes",
          src: "/assets/deck/Mid-Fi-2.png",
          alt: "Mid-fidelity wireframes for Deck, set 2",
        },
        {
          group: "Visual identity",
          src: "/assets/deck/Brand-Sheet.png",
          alt: "Deck brand sheet showing the logo, colors, typography, and mascot",
          caption: "Brand sheet shared across the mobile app and the web platform.",
          wide: true,
        },
        {
          group: "High-fidelity screens",
          src: "/assets/deck/Hi-Fi-Client-Module-1.png",
          alt: "High-fidelity screens of the Deck student mobile app, set 1",
          caption: "Student mobile app",
          wide: true,
        },
        {
          group: "High-fidelity screens",
          src: "/assets/deck/Hi-Fi-Client-Module-2.png",
          alt: "High-fidelity screens of the Deck student mobile app, set 2",
          caption: "Student mobile app",
          wide: true,
        },
        {
          group: "High-fidelity screens",
          src: "/assets/deck/Hi-Fi-Admin-Module.png",
          alt: "High-fidelity screens of the Deck moderator web platform",
          caption: "Moderator web platform",
          wide: true,
        },
      ],
    },
    {
      id: "build",
      iconUrl: "https://api.iconify.design/lucide:code.svg",
      title: "Build",
      takeaway: "A Flutter app for students and a CodeIgniter web platform for moderators, sharing one Firebase backend.",
      detail: "We built the mobile app in Flutter and the moderator web platform in CodeIgniter with Tailwind CSS. On mobile, I focused on the flashcard system, account management, and study modes, while my teammate handled the task manager and authentication. We shared the moderator platform more evenly. Firebase handled authentication, real-time data, and storage, Gemini AI generated flashcards and quiz choices, and Fisher-Yates Shuffle and KNN supported card randomization and deck recommendations.",
    },
    {
      id: "testing",
      iconUrl: "https://api.iconify.design/mdi:clipboard-check.svg",
      title: "Test & Review",
      takeaway: "Every functional test case passed, and users rated Deck \"Acceptable\" overall, with AI deck generation among the top scores.",
      detail: `We tested every feature on both platforms, and every functional test case was marked as passed. Non-functional testing covered browser compatibility (Edge, Safari, and Opera) and performance, including the 3-second load target and support for 150 concurrent users scaling to 300. In User Acceptance Testing with 10 respondents under ISO 25010, Deck scored 3.66 out of 4 ("Acceptable"). Usability (3.78) and Functional Suitability (3.76) scored highest, and the statement that AI-generated decks were accurate scored 3.9. The feedback shaped our recommendations for future versions.`,
    },
  ],

  results: [
    { value: "3.66", label: "ISO 25010 UAT Rating", sublabel: "Out of 4.00, rated by 10 respondents" },
    { value: "3.9",  label: "AI-Generated Decks", sublabel: "Rated accurate by respondents; 9 of 10 gave the top score" },
    { value: "100%", label: "Functional Tests Passed", sublabel: "Student mobile app and moderator web platform" },
  ],
  resultDiscussion: `Functional testing was marked as passed for both the student mobile app and the moderator web platform, so the tested features worked as intended. Non-functional testing showed the web platform worked across Edge, Safari, and Opera and met the 3-second load requirement, with support for 150 concurrent users and scaling to 300.

In User Acceptance Testing under ISO 25010, Deck scored 3.66 out of 4, which is considered "Acceptable." The highest categories were Usability (3.78) and Functional Suitability (3.76), and respondents rated AI deck generation, sign up, publishing decks, and finding shared decks at 3.9.

The lowest scores were still in the Acceptable range, but they point to what to improve next: working across different devices (3.3), trust in how user data is handled (3.4), and avoiding critical bugs during study sessions (3.4).`,

  techStack: [
    { name: "Figma",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", bg: "#FDE2E2" },
    { name: "Flutter",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", bg: "#D6EFF7" },
    { name: "CodeIgniter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg", bg: "#FDE6D8" },
    { name: "Tailwind",    icon: "https://api.iconify.design/logos:tailwindcss-icon.svg", bg: "#ddf1fc" },
  ],

  gallery: [
    { src: "/assets/deck/Deck-LogIn.png", alt: "Deck log in screen" },
    { src: "/assets/deck/Deck-Dashboard.png", alt: "Deck moderator dashboard" },
    { src: "/assets/deck/Deck-Modal.png", alt: "Deck modal dialog" },
    { src: "/assets/deck/Deck-Mobile1.png", alt: "Deck mobile app screens, set one" },
    { src: "/assets/deck/Deck-Mobile2.png", alt: "Deck mobile app screens, set two" },
  ],

  reflection: `Deck started as a second-year project and was revived in third year with a much bigger scope, including a full moderator web platform. The early phase meant realigning the team on direction before development could properly start.

The main difficulty wasn't the technical work, it was the team setup. Uneven availability delayed key outputs like wireframes, so the two of us who were consistently active carried most of the frontend workload alongside our coursework. It taught me to adapt, and working closely with a reliable teammate made a big difference.

The 3.66 UAT score, and the 3.9 for AI-generated decks, showed we had built something useful for the students it was meant for.

If I did it again, I would agree on task ownership and checkpoints at the start so delays surface earlier. For the product, the next steps from our own recommendations are a quiz timer, linking decks to tasks, clearer instructions for identification quizzes, and loading screens that say what the system is doing.`,
};