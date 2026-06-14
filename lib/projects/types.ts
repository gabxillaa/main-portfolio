export type ProcessStep = {
  iconUrl: string;
  title: string;
  detail: string;
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
};

export type ProjectData = {
  slug: string;
  title: string;
  tagline: string;
  desc: string;              // short subtitle shown in the carousel card
  gradient: string;          // card gradient used in carousel
  thumbnail: string;         // image shown in carousel card
  liveUrl?: string;
  repoUrl?: string;
  context: string;
  problem: string;
  solution: string;
  process: ProcessStep[];
  results?: ResultStat[];    // optional — some projects don't have this
  resultDiscussion?: string; // optional — only present when results exist
  techStack: TechItem[];
  gallery: GalleryImage[];
  reflection: string;
};