import { ProjectData } from "./types";

export const archivary: ProjectData = {
  slug:      "archivary",
  title:     "Archivary",
  desc:      "Archival Management System",
  gradient:  "linear-gradient(160deg,#71B5C2 0%,#3a8fa0 100%)",
  thumbnail: "/assets/archivary.svg",

  impactSummary: "A desktop library management system designed to replace logbooks and spreadsheets for tracking books, borrowing, users, and reports.",
  overview: {
    role: "UI/UX Designer & Front-End Developer",
    team: "5 members",
    platforms: "Desktop",
  },

  context: "Archivary was one of my earlier software projects, developed as a course requirement during my second year. Many school libraries still rely on logbooks, spreadsheets, or fragmented systems to track books and borrowing records, which makes everyday tasks like searching for books, monitoring due dates, and generating reports more time-consuming than they need to be. The goal was to replace those manual processes with one centralized desktop application, and to make it simple enough for staff to learn and use comfortably.",

  solution: "We built a desktop-based Library Management System using C# WinForms and MySQL that manages books, borrowing transactions, users, and reports, with straightforward navigation through a sidebar-based layout. To move away from the default WinForms look, we used custom UI components, including rounded buttons, textboxes, panels, and comboboxes, for a more modern and approachable feel.",

  myRole: "I was one of three frontend developers and the team's UI/UX designer. I helped shape the interface from the initial Figma wireframes through to the custom WinForms components, built and refined panels and features, and shared UI work like responsiveness and navigation behavior with the team.",

  process: [
    {
      id: "requirements",
      iconUrl: "https://api.iconify.design/lucide:search.svg",
      title: "Requirements",
      takeaway: "The features came with the course, so my job was turning them into screens, and responsive desktop layouts became a project goal.",
      detail: "The feature set was assigned by the course: authentication, book management, borrowing transactions, reporting, and user management. Because the features were given rather than researched with library staff, my part of this phase was working out what information users would need to view, search, and manage in each module, so the wireframes could be planned around those tasks. We also discussed whether the app should be responsive across desktop screen sizes, which is much harder in WinForms than on the web. After researching different approaches, we decided it was achievable and made it part of the project's goals.",
      insights: [
        {
          finding: "The features were set by the course, with no direct input from library staff.",
          decision: "Planned each module around what staff would need to view, search, and manage, and kept the scope to those five modules.",
        },
        {
          finding: "Responsive layouts are much harder in WinForms than on the web.",
          decision: "Researched the available approaches, concluded it was achievable, and made responsiveness an explicit project goal.",
        },
      ],
    },
    {
      id: "design",
      iconUrl: "https://api.iconify.design/mdi:palette.svg",
      title: "Design",
      takeaway: "A shared brand sheet and high-fidelity wireframes kept three developers building the same product.",
      detail: "The design phase was shared equally among the three frontend developers. We worked together in Figma to create wireframes for the login screen, main layout, and the core modules: books, transactions, reports, users, and settings, then moved them to high fidelity. A brand sheet defined the colors and typography every screen followed. My focus was on a clean, consistent interface, with design decisions centered on simple navigation, organized layouts, and a modern visual style that would guide development.",
      // DRAFT: confirm each decision matches what you designed.
      insights: [
        {
          finding: "The system had five modules that staff would switch between often.",
          decision: "Used a sidebar-based layout with one entry per module, so any screen is one click away.",
        },
        {
          finding: "Default WinForms controls look dated and inconsistent from screen to screen.",
          decision: "Designed custom rounded buttons, textboxes, panels, and comboboxes to be reused across every module.",
        },
        {
          finding: "Three developers building different panels in parallel risked inconsistent screens.",
          decision: "Defined colors and typography once in a brand sheet that every panel followed.",
        },
      ],
      images: [
        {
          group: "From logbook to system",
          src: "/assets/archivary/Before-After-Workflow.png",
          alt: "Diagram comparing a typical manual library process using logbooks and spreadsheets with Archivary's single connected workflow",
          caption: "How a typical manual library process maps to Archivary's single flow.",
          wide: true,
        },
        {
          group: "Visual identity",
          src: "/assets/archivary/Brand-Sheet.png",
          alt: "Archivary brand sheet showing the color palette and typography",
          caption: "Brand sheet: the colors and typography used across every screen.",
          wide: true,
        },
        {
          group: "High-fidelity wireframes",
          src: "/assets/archivary/Hi-Fi-1.png",
          alt: "High-fidelity wireframe of the Archivary desktop app, screen 1 of 6",
          caption: "High-fidelity wireframes in Figma, the reference for the WinForms build.",
          wide: true,
        },
        {
          group: "High-fidelity wireframes",
          src: "/assets/archivary/Hi-Fi-2.png",
          alt: "High-fidelity wireframe of the Archivary desktop app, screen 2 of 6",
          wide: true,
        },
        {
          group: "High-fidelity wireframes",
          src: "/assets/archivary/Hi-Fi-3.png",
          alt: "High-fidelity wireframe of the Archivary desktop app, screen 3 of 6",
          wide: true,
        },
        {
          group: "High-fidelity wireframes",
          src: "/assets/archivary/Hi-Fi-4.png",
          alt: "High-fidelity wireframe of the Archivary desktop app, screen 4 of 6",
          wide: true,
        },
        {
          group: "High-fidelity wireframes",
          src: "/assets/archivary/Hi-Fi-5.png",
          alt: "High-fidelity wireframe of the Archivary desktop app, screen 5 of 6",
          wide: true,
        },
        {
          group: "High-fidelity wireframes",
          src: "/assets/archivary/Hi-Fi-6.png",
          alt: "High-fidelity wireframe of the Archivary desktop app, screen 6 of 6",
          wide: true,
        },
      ],
    },
    {
      id: "build",
      iconUrl: "https://api.iconify.design/lucide:code.svg",
      title: "Build",
      takeaway: "Reusable custom controls kept a large desktop system consistent from screen to screen.",
      detail: "Development was divided equally among the three of us, with each handling different panels and features while following the same design system. I built and refined parts of the interface using custom WinForms components such as rounded buttons, textboxes, panels, and other reusable controls. We also collaborated on shared UI elements, responsiveness improvements, navigation behavior, and interface fixes so the application felt cohesive.",
    },
    {
      id: "testing",
      iconUrl: "https://api.iconify.design/mdi:bug-check.svg",
      title: "Test & Review",
      takeaway: "Every function passed testing, and the final system closely matched the original wireframes.",
      detail: "Testing was shared among the three frontend developers. We verified our assigned features individually, then tested the system as a whole, checking navigation, forms, pop-up messages, and responsive behavior across all modules. The system achieved a 100% pass rate in functional testing. The application was then packaged as a desktop executable connected to the MySQL database. The final system closely matched the original wireframes and requirements, which was satisfying given how much of the work was maintaining consistency across a fairly large desktop system.",
    },
  ],

  results: [
    { value: "100%", label: "Functional Testing", sublabel: "Authentication, books, transactions, reports, users, and settings" },
  ],
  resultDiscussion: `The system achieved a 100% pass rate in functional testing, confirming that all core features worked as intended. This covered authentication, book management, borrowing and returning transactions, reporting, user management, and settings.

From a frontend perspective, the results showed that the interface supported these workflows, with forms, tables, navigation, and custom UI components working correctly across all modules. Seeing every test case pass validated that the designs we planned in Figma translated effectively into a working application.`,

  techStack: [
    { name: "C#",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", bg: "#E6E8FD" },
    { name: ".NET",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg", bg: "#E6E8FD" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", bg: "#DDEFF6" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", bg: "#FDE2E2" },
  ],

  gallery: [
    { src: "/assets/archivary/archivary-login.png", alt: "Archivary log in screen" },
    { src: "/assets/archivary/archivary-list.png", alt: "Archivary book list" },
    { src: "/assets/archivary/archivary-book.png", alt: "Archivary book management screen" },
    { src: "/assets/archivary/archivary-view-book.png", alt: "Archivary book details view" },
    { src: "/assets/archivary/archivary-users.png", alt: "Archivary user management screen" },
  ],

  reflection: `Archivary made me appreciate how much work goes into designing seemingly simple interfaces. Creating custom buttons, textboxes, and panels felt like small details at first, but they shaped how the entire application felt to use.

It was also one of my first experiences working closely with a newly formed team, so there was a learning curve in communication and collaboration. I'm proud of how cohesive the final interface turned out and how much I learned about turning wireframes into working software.

It reinforced something I still carry into projects today: good UI/UX is not just about making things look nice, but making them feel natural and easy for people to use.`,
};