"use client";

import { usePathname } from "next/navigation";
import Footer from "@/app/components/footer";
import { ProjectData } from "@/lib/projects/types";
import ScrollReset from "./scroll-reset";
import ProjectHero from "@/app/components/view-project/project-hero";
import ProjectSections from "@/app/components/view-project/project-sections";
import ProjectProcess from "@/app/components/view-project/project-process";
import ProjectResults from "@/app/components/view-project/project-results";
import ProjectTechStack from "@/app/components/view-project/project-tech-stack";
import ProjectGallery from "@/app/components/view-project/project-gallery";
import ProjectFooterSections from "@/app/components/view-project/project-footer";


interface ProjectPageProps {
  project: ProjectData;
  nextProject: ProjectData | null;
}

export default function ProjectPage({ project, nextProject }: ProjectPageProps) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="min-h-screen w-full overflow-x-hidden" style={{ background: "var(--background)" }}>
      <ScrollReset />

      <ProjectHero project={project} />
      <ProjectSections project={project} />
      <ProjectProcess process={project.process} />
      <ProjectResults results={project.results} resultDiscussion={project.resultDiscussion} />
      <ProjectTechStack techStack={project.techStack} />
      <ProjectGallery images={project.gallery} title={project.title} />
      <ProjectFooterSections reflection={project.reflection} nextProject={nextProject} />

      <Footer />
    </div>
  );
}