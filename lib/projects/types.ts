export type ProcessInsight = {
  finding: string;
  decision: string;
};

export type ProcessImage = {
  src: string;
  alt: string;
  caption?: string;
  group?: string;   // label shown above a set of images, e.g. "Empathy maps"
  wide?: boolean;   // spans the full width (good for wireframes and flows)
};

export type ProcessStep = {
  id?: string;               // optional anchor id for the step
  iconUrl: string;
  title: string;
  takeaway?: string;         // optional one-line summary shown above the detail
  detail: string;
  insights?: ProcessInsight[];
  images?: ProcessImage[];
};

export type ResultStat = {
  value: string;
  label: string;
  sublabel?: string;
};

export type TechItem = {
  name: string;
  icon: string;
  bg: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
  group?: string;   // category tab in the gallery, e.g. "Mycologist"
};

export type ProjectData = {
  slug: string;
  title: string;
  impactSummary?: string;
  desc: string;              // short subtitle shown in the carousel card
  gradient: string;          // card gradient used in carousel
  thumbnail: string;         // image shown in carousel card
  liveUrl?: string;
  repoUrl?: string;

  overview?: {
    role?: string;
    team?: string;
    timeline?: string;
    platforms?: string;
  };

  context: string;           // background + problem, merged
  problem?: string;          // legacy: only for projects not yet merged
  solution: string;          // what we built
  myRole?: string;           // what I owned

  process: ProcessStep[];
  results?: ResultStat[];
  resultDiscussion?: string;
  techStack: TechItem[];
  gallery: GalleryImage[];
  reflection: string;
};