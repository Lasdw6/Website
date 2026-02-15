export type PublicProjectStatus = 'live' | 'released' | 'preview' | 'maintenance';

export interface PublicProjectLink {
  label: string;
  url: string;
}

export interface PublicProjectLinks {
  website?: string;
  npm?: string;
  github?: string;
}

export interface PublicProjectUpdate {
  date: string;
  title: string;
  status: PublicProjectStatus;
  summary: string;
  links: PublicProjectLink[];
}

export interface PublicProjectSummary {
  slug: string;
  name: string;
  status: PublicProjectStatus;
  tagline: string;
  description: string;
  links: PublicProjectLinks;
  lastUpdated: string;
}

export interface PublicProjectDetail extends PublicProjectSummary {
  updates: PublicProjectUpdate[];
}
