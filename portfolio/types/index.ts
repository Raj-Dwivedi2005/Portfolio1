export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectSection {
  heading: string;
  body: string[]; // paragraphs or bullet-like lines
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  featured: boolean;
  order: number;
  techStack: string[];
  github?: string; // undefined = not yet available
  liveDemo?: string; // undefined = no live demo
  hasScreenshots: boolean;
  sections: ProjectSection[];
  pendingNote?: string; // internal note shown as a TODO marker in the UI while content is unconfirmed
}

export interface ExperienceEntry {
  role: string;
  company: string;
  dates: string;
  bullets: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  group: "Core Engineering" | "Specialized Tech";
}
