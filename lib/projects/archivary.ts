import { ProjectData } from "./types";

export const archivary: ProjectData = {
  slug:      "archivary",
  title:     "Archivary",
  tagline:   "Archivary Library Management System is a desktop application that streamlines library operations by managing books, borrowing transactions, users, and reports through a centralized interface.",
  desc:      "Archival Management System",
  gradient:  "linear-gradient(160deg,#71B5C2 0%,#3a8fa0 100%)",
  thumbnail: "/assets/archivary.svg",

  context:  "Archivary, a Library Management System was one of my earlier software projects and was developed as a course requirement during my second year. The goal was to replace manual library processes with a centralized desktop application that could manage books, borrowing transactions, users, and reports. As the team's frontend developer and UI/UX designer, I focused on creating an interface that felt organized and easy to navigate, from the initial wireframes in Figma to the custom WinForms components used throughout the system.",
  problem:  "Many school libraries still rely on logbooks, spreadsheets, or fragmented systems to track books and borrowing records. This can make everyday tasks like searching for books, monitoring due dates, and generating reports more time-consuming than they need to be. Our challenge was not only to digitize these processes but also to make them simple enough for staff to learn and use comfortably.",
  solution: "We built a desktop-based Library Management System using C# WinForms and MySQL. From the frontend side, I focused on creating a clean and consistent experience through custom UI components, including rounded buttons, textboxes, panels, and comboboxes. The goal was to move away from the default WinForms look and create something that felt more modern and approachable while keeping navigation straightforward through a sidebar-based layout.",

  process: [
    {
      iconUrl: "https://api.iconify.design/lucide:search.svg",
      title:  "Requirements Analysis",
      detail: `We started by identifying the system's core features, including authentication, book management, borrowing transactions, reporting, and user management. As the UI/UX designer, I focused on understanding what information users needed to view, search, and manage so the wireframes and layouts could be planned effectively. During this phase, we also discussed whether the application should be responsive in different desktop screen sizes, since achieving that in WinForms is much more challenging than in web development. After exploring different approaches and doing some research, we decided it was achievable and included responsiveness as part of the project's goals.`,
    },
     {
      iconUrl: "https://api.iconify.design/mdi:palette.svg",
      title:  "Design Phase",
      detail: "The design phase was shared equally among the three frontend developers. We worked together in Figma to create wireframes for the login screen, main layout, and the system's core modules, including books, transactions, reports, users, and settings. My focus was on helping shape a clean and consistent interface, with design decisions centered around simple navigation, organized layouts, and a modern visual style that would later guide development.",
    },
     {
      iconUrl: "https://api.iconify.design/lucide:code.svg",
      title:  "Develop Phase",
      detail: "Development responsibilities were divided equally among the three frontend developers, with each of us handling different panels and features while following the same design system. I worked on building and refining parts of the interface using custom WinForms components such as rounded buttons, textboxes, panels, and other reusable controls. We also collaborated on shared UI elements, responsiveness improvements, navigation behavior, and various interface fixes to ensure the application felt cohesive from screen to screen.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:bug-check.svg",
      title:  "Testing Phase",
      detail: "Testing responsibilities were also shared among the three frontend developers. We first verified our assigned features individually before testing the system as a whole, ensuring that navigation, forms, pop-up messages, and responsive behaviors worked correctly across all modules. The system achieved a 100% pass rate in functional testing.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:rocket-launch.svg",
      title:  "Deployment Phase",
      detail: "Once development and testing were complete, the application was packaged as a desktop executable and connected to the MySQL database. By this stage, all custom UI components, navigation systems, and styling were fully integrated into the final product.",
    },
     {
      iconUrl: "https://api.iconify.design/mdi:clipboard-check.svg",
      title:  "Review Phase",
      detail: "Looking back, the final system closely matched the original wireframes and requirements. Seeing all the different panels, forms, and components come together into a complete application was satisfying, especially since much of the work involved maintaining consistency across a fairly large desktop system.",
    },
  ],

  results: [
    { value: "100%", label: "Functional Testing" },
  ],
  resultDiscussion: "The system achieved a 100% pass rate in functional testing, which confirmed that all core features worked as intended. This included authentication, book management, borrowing and returning transactions, reporting, user management, and settings. From a frontend perspective, the results showed that the interface successfully supported these workflows, with forms, tables, navigation, and custom UI components functioning correctly across all modules. Seeing every test case pass was reassuring because it validated that the designs we planned in Figma translated effectively into a working application.",

  techStack: [
  { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", bg: "#E6E8FD" },
  { name: ".NET", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg", bg: "#E6E8FD" },
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", bg: "#D6EFF7" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", bg: "#FDE2E2" },
  { name: "bcrypt", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg", bg: "#E2F5E5" },
  { name: "EPPlus", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg", bg: "#FDE6D8" },
],

  gallery: [
    { src: "/assets/archivary/archivary-login.png", alt: "Dashboard view" },
    { src: "/assets/archivary/archivary-list.png", alt: "Detection result" },
    { src: "/assets/archivary/archivary-book.png", alt: "Detection result" },
    { src: "/assets/archivary/archivary-view-book.png", alt: "Detection result" },
    { src: "/assets/archivary/archivary-users.png", alt: "Detection result" },
  ],

  reflection: "Archivary was one of the projects that made me appreciate how much work goes into designing seemingly simple interfaces. At first, creating custom buttons, textboxes, and panels felt like small details, but those details ended up shaping how the entire application felt to use. It was also one of my first experiences working closely with a newly formed team, so there was a learning curve when it came to communication and collaboration. Looking back, I'm proud of how cohesive the final interface turned out and how much I learned about turning wireframes into working software. More importantly, it reinforced something I still carry into projects today: good UI/UX is not just about making things look nice, but making them feel natural and easy for people to use.",
};