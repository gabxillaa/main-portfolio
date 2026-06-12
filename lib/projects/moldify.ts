import { ProjectData } from "./types";

export const moldify: ProjectData = {
  slug:      "moldify",
  title:     "Moldify",
  tagline:   "Moldify is a thesis project that bridges farmers and mold experts through AI-powered mold identification, helping protect crops from mold damage.",
  desc:      "Mold Investigation System",
  gradient:  "linear-gradient(160deg,#71B5C2 0%,#3a8fa0 100%)",
  thumbnail: "/assets/moldify.svg",
  liveUrl:   "https://moldify.vercel.app",

  context:  "The Philippines loses a massive amount of crops every year to mold, and the people responsible for investigating it, the Bureau of Plant Industry (BPI), were doing everything manually. Handwritten notes, Viber messages, no centralized system. Meanwhile, there aren't enough trained mycologists in the country to keep up with the demand, and the tools they do have are either too expensive or too slow for everyday fieldwork. Something needed to change.",
  problem:  "BPI had no digital infrastructure for managing mold investigation cases. Clients had no way to formally report mold concerns, mycologists had no unified platform to document their findings, and administrators were coordinating everything through informal channels. The whole process was fragmented, hard to track, and prone to human error, making it difficult to catch and respond to mold outbreaks before they caused serious agricultural damage.",
  solution: "We built Moldify, a cross-platform investigation and case management system designed specifically for BPI's workflows. It supports four user roles across a mobile app and web platform: farmers (Clients) who submit mold reports, Mycologists who investigate and diagnose cases using a mold identification tool powered by CNN and ANN algorithms, Administrators who oversee and assign cases, and a public-facing Community module for general mold education. My role covered everything on the design and frontend side, from the initial wireframes all the way to the deployed interface.",

  process: [
    {
      iconUrl: "https://api.iconify.design/lucide:search.svg",
      title:  "Requirements Analysis",
      detail: "Before touching any design tool, we sat down with actual BPI personnel and mycologists to understand how they worked. We ran interviews, built empathy maps, and studied existing tools in the market like Picture This and Mold Finder AI. That research shaped every decision we made, from what features to include to how each user role's interface should feel.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:palette.svg",
      title:  "Design Phase",
      detail: "I designed the full system in Figma, all four modules, across both mobile and web. I built a complete design system from scratch, including a color palette (green and amber tones tied to BPI's agricultural identity), typography, icons, and reusable component sticker sheets. I started with mid-fidelity wireframes using Miro to validate layout and flow, then pushed everything to high-fidelity interactive prototypes before handing off to development.",
    },
     {
      iconUrl: "https://api.iconify.design/lucide:code.svg",
      title:  "Develop Phase",
      detail: "I built the mobile app using Flutter and the web platform with Next.js and Tailwind CSS. Each of the four modules had its own distinct user flow, so keeping things visually consistent while serving very different user needs was a real challenge.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:bug-check.svg",
      title:  "Testing Phase",
      detail: "Every feature I built went through functional testing, 41 test cases across all four modules, and everything passed. I also helped assess the app against ISO/IEC 25010 standards, covering performance, compatibility, and flexibility. Seeing 100% pass rate across the board was a solid confirmation that what we built actually worked the way it was supposed to.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:rocket-launch.svg",
      title:  "Deployment Phase",
      detail: "The mobile app was deployed as an APK for Android, and the web platform went live on Vercel. The backend ran on Firebase and AWS Lambda, with the AI model served through a containerized API. From a frontend perspective, everything was live and accessible across devices, the deployment confirmed the cross-platform architecture held up in a real environment.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:clipboard-check.svg",
      title:  "Review Phase",
      detail: `After deployment, we gathered feedback from 130 people, 30 IT professionals and 100 non-IT users including actual BPI personnel and farmers. The IT experts rated Moldify "Excellent" across all ISO/IEC 25010 metrics, with scores ranging from 3.33 to 3.70 out of 4. The non-IT users gave a System Usability Scale (SUS) score of 58.98 — a "Fair" rating. It was clear feedback that the interface needed more work for non-technical users, and that became a key item on the roadmap.`,
    },
  ],

  results: [
    { value: "58.98", label: "SUS Score", sublabel: "Non-IT Survey ((Mycologists, Farmers, Students, Etc.)"},
    { value: "3.52", label: "ISO/IEC 25010 metrics", sublabel: "(IT Professionals)"},
    { value: "100%",  label: "Functionality Testing"},
    { value: "93.33%", label: "AI Model", sublabel: "CNN Accuracy"},
  ],
  resultDiscussion: `All 41 functional test cases passed across the four modules, giving a 100% success rate and confirming that the system works as intended. In non-functional testing, the Community and Administrator modules performed well, handling around 100 concurrent users with stable response times of about 100ms and no errors. However, the Mycologist module failed its performance tests, mainly because the ML inference API was running on AWS Lambda without GPU support, not because of issues in the application itself. This same limitation also caused failures in resource utilization, capacity, and scalability tests, while compatibility across modules passed without issues. For evaluation, 30 IT professionals rated the system as "Excellent" across all ISO/IEC 25010 metrics, with scores ranging from 3.33 to 3.70 out of 4.00. Functional completeness and appropriateness scored the highest at 3.70, which basically validated the system’s overall design and implementation. On the other hand, 100 non-IT users gave an average SUS score of 58.98, labeled as "Fair." This wasn’t really about the interface design itself, but more about slow response times (5 to 10 seconds due to the AWS Lambda bottleneck) and some bugs during testing.`,

techStack: [
  { name: "TypeScript", icon: "https://api.iconify.design/logos:typescript-icon.svg", bg: "#3178C6" },
  { name: "Next.js", icon: "https://api.iconify.design/logos:nextjs-icon.svg", bg: "#000000" },
  { name: "Tailwind", icon: "https://api.iconify.design/logos:tailwindcss-icon.svg", bg: "#38BDF8" },
  { name: "Flutter", icon: "https://api.iconify.design/logos:flutter.svg", bg: "#02569B" },
  { name: "Node.js", icon: "https://api.iconify.design/logos:nodejs-icon.svg", bg: "#3C873A" },
  { name: "Express", icon: "https://api.iconify.design/simple-icons:express.svg", bg: "#000000" },
  { name: "Firebase", icon: "https://api.iconify.design/logos:firebase.svg", bg: "#FFCA28" },
  { name: "Python", icon: "https://api.iconify.design/logos:python.svg", bg: "#3776AB" },
  { name: "TensorFlow", icon: "https://api.iconify.design/simple-icons:tensorflow.svg", bg: "#FF6F00" },
  { name: "Keras", icon: "https://api.iconify.design/simple-icons:keras.svg", bg: "#D00000" },
  { name: "AWS", icon: "https://api.iconify.design/logos:aws.svg", bg: "#FF9900" },
  { name: "Vercel", icon: "https://api.iconify.design/logos:vercel-icon.svg", bg: "#000000" },
  { name: "Figma", icon: "https://api.iconify.design/logos:figma.svg", bg: "#F24E1E" },
  { name: "Miro", icon: "https://api.iconify.design/simple-icons:miro.svg", bg: "#FFD02F" },
],

  gallery: [
    { src: "/assets/Moldify-BG.png", alt: "Dashboard view" },
    { src: "/assets/Moldify-LogIn.png", alt: "Detection result" },
  ],

  reflection: `Moldify was my most complete project at that point, with real users, workflows, and constraints. As a frontend experience, it pushed me to design for very different user needs, from farmers submitting reports to administrators managing cases, all within one consistent system. The results were mixed but insightful. IT experts rated it “Excellent,” but the SUS score from non-IT users was 58.98 (“Fair”). From a frontend perspective, that made it clear that usability isn’t just about design consistency, but also performance, response times, and how the interface behaves under real-world conditions. If I rebuilt it, I’d involve non-technical users earlier and treat usability and performance as core parts of the UI, not final checks.`,
};