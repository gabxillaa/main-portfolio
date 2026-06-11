import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getAdjacentProject } from "@/lib/projects";
import ProjectPage from "./project-page";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;  // ← await it
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title:       `${project.title} — Portfolio`,
    description: project.tagline,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;  // ← await it
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const nextProject = getAdjacentProject(slug);

  return <ProjectPage project={project} nextProject={nextProject} />;
}