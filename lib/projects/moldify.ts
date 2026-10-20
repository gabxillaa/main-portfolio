import { ProjectData } from "./types";

export const moldify: ProjectData = {
  slug:      "moldify",
  title:     "Moldify",
  desc:      "Mold Investigation System",
  gradient:  "linear-gradient(160deg,#71B5C2 0%,#3a8fa0 100%)",
  thumbnail: "/assets/moldify/moldify.svg",
  liveUrl:   "https://moldify.vercel.app",

  impactSummary: "A case management system that replaced Viber messages and handwritten notes for BPI's mold investigations.",
  overview: {
    role: "UI/UX Designer & Front-End Developer",
    team: "3 members",
    platforms: "Mobile & Web",
  },

  context: "The Philippines loses a massive amount of crops every year to mold, and the Bureau of Plant Industry (BPI), the agency responsible for investigating it, was doing everything manually, with handwritten notes, Viber messages, and no centralized system. Clients had no formal way to report mold concerns, mycologists had no unified platform to document findings, and administrators coordinated through informal channels. With too few trained mycologists to meet demand and existing tools either too expensive or too slow for fieldwork, the process was fragmented, hard to track, and prone to human error, making it difficult to respond to outbreaks before they caused serious damage.",

  solution: "We built Moldify, a cross-platform investigation and case management system designed for BPI's workflows. It supports four user roles across mobile and web: farmers (Clients) who submit mold reports, Mycologists who investigate and diagnose cases using a mold identification tool, Administrators who oversee and assign cases, and a public-facing Community module for mold education.",

  myRole: "I owned the UI/UX and front-end for all four modules, from the initial wireframes and design system to the deployed mobile app and web platform. My teammates handled the backend and the ML model, and the documentation of the project.",

  process: [
    {
      id: "research",
      iconUrl: "https://api.iconify.design/lucide:search.svg",
      title: "Research",
      takeaway: "Interviews with BPI staff, an empathy map, and a benchmark of different applications showed the real problem was workflow, not just identification.",
      detail: "Before opening any design tool, we ran pre-survey questionnaires and interviews with BPI personnel and mycologists to understand how they worked, turned what we heard into an empathy map, and benchmarked three existing apps: Picture This, ShroomID, and Mold Finder AI. Farmer needs reached us through BPI mycologists rather than direct interviews, which I would change next time.",
      insights: [
        {
          finding: "BPI coordinated cases through walk-ins, Viber, email, and calls, with handwritten notes and no central record.",
          decision: "Put every case in one system with a clear status (Pending, In Progress, Resolved, Rejected) that clients, mycologists, and admins can all see.",
        },
        {
          finding: "Mycologists warned that too many data fields would delay their recommendations.",
          decision: "Kept the investigation flow to BPI's own stages (Initial Observation, In Vitro, In Vivo, Recommendation) with high-level fields.",
        },
        {
          finding: "Early notifications were essential for coordinating around BPI staff's busy schedules.",
          decision: "Added status notifications for clients and mycologists, and a notification screen for each role.",
        },
        {
          finding: "None of the three benchmarked apps had expert validation, and two limited free use.",
          decision: "Made the mycologist the final authority: low-confidence scans (below 85%) need manual confirmation, and wrong predictions can be flagged.",
        },
      ],
      images: [
        {
          group: "Empathy map",
          src: "/assets/moldify/Empathy-Map.png",
          alt: "Empathy map of BPI mycologists and personnel with four quadrants: Think, Feels, Says, and Does",
          caption: "Based on interviews with BPI mycologists and personnel.",
          wide: true,
        },
        {
          group: "Competitive analysis",
          src: "/assets/moldify/Competitive-Analysis.png",
          alt: "Table comparing existing mold and plant identification apps with Moldify across nine features",
          caption: "How existing mold and plant identification apps compare with Moldify",
          wide: true,
        },
      ],
    },
    {
      id: "design",
      iconUrl: "https://api.iconify.design/mdi:palette.svg",
      title: "Design",
      takeaway: "One design system kept four modules consistent across mobile and web.",
      detail: "I designed all four modules in Figma for both mobile and web, starting with mid-fidelity wireframes in Miro to validate layout and flow, then moving to high-fidelity interactive prototypes before handoff. I built the design system from scratch to keep four different user flows visually consistent: a green and amber palette tied to BPI's agricultural identity, typography, icons, and reusable component sticker sheets.",
      // DRAFT: confirm each decision matches what you actually designed.
      insights: [
        {
          finding: "BPI's scattered channels (walk-ins, Viber, email, calls) had no shared flow between roles.",
          decision: "Mapped one connected flow across roles: Client reports, Admin assigns, Mycologist investigates, and the Client receives the recommendation.",
        },
        {
          finding: "Mycologists said too many fields would slow down their recommendations.",
          decision: "Split the Input Characteristics screen into five tabs instead of one long form, so each step stays short.",
        },
        {
          finding: "Many users were farmers who weren't tech-savvy.",
          decision: "Kept the report form to the essentials: crop name, address, date first observed, up to 5 photos, and a description.",
        },
        {
          finding: "Four roles with very different needs had to feel like one product.",
          decision: "Built one design system for both platforms: a green and amber palette, a shared type system, and reusable components.",
        },
      ],
      images: [
        {
          group: "From research to flow",
          src: "/assets/moldify/Before-After-Workflow.png",
          alt: "Diagram comparing BPI's previous scattered channels with Moldify's single connected case workflow",
          caption: "How the research finding became the system flow.",
          wide: true,
        },
        {
          group: "Mid-fidelity wireframes",
          src: "/assets/moldify/Mid-Fi-1.png",
          alt: "Mid-fidelity wireframe, set 1",
          caption: "Wireframes in Miro, used to validate layout and flow before visual design.",
        },
        {
          group: "Mid-fidelity wireframes",
          src: "/assets/moldify/Mid-Fi-2.png",
          alt: "Mid-fidelity wireframe, set 2",
        },
        {
          group: "Mid-fidelity wireframes",
          src: "/assets/moldify/Mid-Fi-3.png",
          alt: "Mid-fidelity wireframe, set 3",
        },
        {
          group: "Mid-fidelity wireframes",
          src: "/assets/moldify/Mid-Fi-4.png",
          alt: "Mid-fidelity wireframe, set 4",
        },
        {
          group: "Visual identity",
          src: "/assets/moldify/Brand-Sheet.png",
          alt: "Moldify brand sheet showing the logo, color palette, typography, and icon style",
          caption: "Brand sheet: logo, colors, fonts, and icons shared across mobile and web.",
          wide: true,
        },
        {
          group: "High-fidelity screens",
          src: "/assets/moldify/Hi-Fi-Client-Module.png",
          alt: "High-fidelity screens of the Moldify Client module",
          caption: "Client module",
          wide: true,
        },
        {
          group: "High-fidelity screens",
          src: "/assets/moldify/Hi-Fi-Myco-Module.png",
          alt: "High-fidelity screens of the Moldify Mycologist module",
          caption: "Mycologist module",
          wide: true,
        },
        {
          group: "High-fidelity screens",
          src: "/assets/moldify/Hi-Fi-Admin-Module.png",
          alt: "High-fidelity screens of the Moldify Administrator module",
          caption: "Administrator module",
          wide: true,
        },
        {
          group: "High-fidelity screens",
          src: "/assets/moldify/Hi-Fi-Community-Module.png",
          alt: "High-fidelity screens of the Moldify Community module",
          caption: "Community module",
          wide: true,
        },
      ],
    },
    {
      id: "build",
      iconUrl: "https://api.iconify.design/lucide:code.svg",
      title: "Build",
      takeaway: "Shipped the same experience to Android and the web.",
      detail: "I built the mobile app in Flutter and the web platform in Next.js and Tailwind CSS, deploying the web platform on Vercel and the mobile app as an Android APK. Each module had its own user flow, so keeping the interface consistent while serving very different users was the main challenge.",
    },
    {
      id: "testing",
      iconUrl: "https://api.iconify.design/mdi:clipboard-check.svg",
      title: "Test & Review",
      takeaway: "Strong functional results, with a usability gap for non-technical users.",
      detail: `All 41 functional test cases across the four modules passed. We then gathered feedback from 130 people: 30 IT professionals rated Moldify "Excellent" on ISO/IEC 25010 (3.33 to 3.70 out of 4), while 100 non-IT users, including BPI personnel and farmers, gave a System Usability Scale (SUS) score of 58.98 ("Fair"). The feedback showed the interface needed more work for non-technical users, which became a key roadmap item.`,
    },
  ],

  results: [
    { value: "41/41", label: "Functional Tests Passed", sublabel: "All four modules" },
    { value: "3.52", label: "ISO/IEC 25010 Rating", sublabel: "Out of 4.00, rated by 30 IT professionals" },
    { value: "58.98", label: "SUS Score", sublabel: "100 non-IT users, mainly held back by slow ML responses (5-10s)" },
  ],
  resultDiscussion: `All 41 functional test cases passed across the four modules, giving a 100% success rate and confirming that the system works as intended. In non-functional testing, the Community and Administrator modules performed well, handling around 100 concurrent users with stable response times of about 100ms and no errors.

  However, the Mycologist module failed its performance tests, mainly because the ML inference API was running on AWS Lambda without GPU support, not because of issues in the application itself. This same limitation also caused failures in resource utilization, capacity, and scalability tests, while compatibility across modules passed without issues.

  For evaluation, 30 IT professionals rated the system as "Excellent" across all ISO/IEC 25010 metrics, with scores ranging from 3.33 to 3.70 out of 4.00. Functional completeness and appropriateness scored the highest at 3.70, which basically validated the system’s overall design and implementation.

  On the other hand, 100 non-IT users gave an average SUS score of 58.98, labeled as "Fair." This wasn’t really about the interface design itself, but more about slow response times (5 to 10 seconds due to the AWS Lambda bottleneck) and some bugs during testing.`,

  techStack: [
    { name: "TypeScript",  icon: "https://api.iconify.design/logos:typescript-icon.svg",  bg: "#deeaf7" },
    { name: "Next.js",     icon: "https://api.iconify.design/logos:nextjs-icon.svg",       bg: "#e4e4e6" },
    { name: "Tailwind",    icon: "https://api.iconify.design/logos:tailwindcss-icon.svg",  bg: "#ddf1fc" },
    { name: "Flutter",     icon: "https://api.iconify.design/logos:flutter.svg",           bg: "#d9edf8" },
    { name: "Vercel",      icon: "https://api.iconify.design/logos:vercel-icon.svg",       bg: "#e4e4e6" },
    { name: "Figma",       icon: "https://api.iconify.design/logos:figma.svg",             bg: "#fde8e2" },
    { name: "Miro",        icon: "https://api.iconify.design/simple-icons:miro.svg",       bg: "#fff8d6" },
  ],

  // Gallery is grouped by module; array order = tab order.
  // DRAFT: group assignments for the new screenshots are inferred from filenames. Move any that are in the wrong module.
  gallery: [
    { group: "Overview", src: "/assets/moldify/Moldify-Mobile.png", alt: "Moldify mobile app screens" },

    { group: "Client", src: "/assets/moldify/sign-up.png", alt: "Moldify client sign up screen" },
    { group: "Client", src: "/assets/moldify/submit-report.png", alt: "Moldify client screen for submitting a mold report" },
    { group: "Client", src: "/assets/moldify/wikimold.png", alt: "Moldify community module, Wikimold mold encyclopedia" },

    { group: "Mycologist", src: "/assets/moldify/mold-scan.png", alt: "Moldify mycologist mold scan screen" },
    { group: "Mycologist", src: "/assets/moldify/mold-result.png", alt: "Moldify mycologist mold identification result screen" },
    { group: "Mycologist", src: "/assets/moldify/mold-report.png", alt: "Moldify mycologist investigation report screen" },

    { group: "Administrator", src: "/assets/moldify/Moldify-LogIn.png", alt: "Moldify web log in screen" },
    { group: "Administrator", src: "/assets/moldify/admin-module-1.png", alt: "Moldify administrator module, screen 1 of 4" },
    { group: "Administrator", src: "/assets/moldify/admin-module-2.png", alt: "Moldify administrator module, screen 2 of 4" },
    { group: "Administrator", src: "/assets/moldify/admin-module-3.png", alt: "Moldify administrator module, screen 3 of 4" },
    { group: "Administrator", src: "/assets/moldify/admin-module-4.png", alt: "Moldify administrator module, screen 4 of 4" },
    { group: "Administrator", src: "/assets/moldify/case-manage.png", alt: "Moldify administrator case management screen" },

    { group: "Community", src: "/assets/moldify/Moldify-BG.png", alt: "Moldify web landing page with the welcome banner" },
    { group: "Community", src: "/assets/moldify/community-module-1.png", alt: "Moldify web FAQ page" },
    { group: "Community", src: "/assets/moldify/community-module-2.png", alt: "Moldify web FAQ page" },
    { group: "Community", src: "/assets/moldify/Moldify-FAQ.png", alt: "Moldify web FAQ page" },

  ],

  reflection: `Moldify was my most complete project at that point, with real users, workflows, and constraints. It pushed me to design for very different needs, from farmers submitting reports to administrators managing cases, all within one consistent system. Many of the users were farmers who weren't tech-savvy, which made me realize how important empathy is in UI/UX and forced me to simplify interactions so the system was intuitive, not just functional.

The results were mixed but insightful. IT experts rated it "Excellent," but non-IT users gave a SUS score of 58.98 ("Fair"). Usability isn't only visual consistency, it's also performance, response times, and how the interface behaves under real-world use. Unclear feature scope early on also caused repeated rework, which taught me to lock requirements before design starts.

If I were to rebuild it, I would involve end users much earlier, treat performance as a design requirement rather than a final check, and test with non-technical users before launch.
`,
};