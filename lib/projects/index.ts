import { moldify }          from "./moldify";
import { deck }             from "./deck";
import { archivary }        from "./archivary";
import { throughTheWoods }  from "./through-the-woods";
import { ProjectData }      from "./types";

export const projects: ProjectData[] = [
  moldify,
  deck,
  archivary,
  throughTheWoods,
];

export function getProjectBySlug(slug: string): ProjectData | null {
  return projects.find((p) => p.slug === slug) ?? null;
}

export function getAdjacentProject(currentSlug: string): ProjectData | null {
  const idx  = projects.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return null;
  return projects[(idx + 1) % projects.length]; // wraps around
}