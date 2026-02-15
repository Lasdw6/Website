import { PublicProjectDetail, PublicProjectSummary } from '../shared/publicProjects';

const INDEX_ENDPOINT = '/api/public/projects.json';
const PROJECT_ENDPOINT_PREFIX = '/api/public/projects';

const sortByNewestFirst = <T extends { date: string }>(items: T[]): T[] => {
  return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export async function getPublicProjectsIndex(): Promise<PublicProjectSummary[]> {
  const response = await fetch(INDEX_ENDPOINT);
  if (!response.ok) {
    throw new Error(`Failed to fetch public projects index: ${response.status}`);
  }

  const data = await response.json() as PublicProjectSummary[];
  return data.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
}

export async function getPublicProjectBySlug(slug: string): Promise<PublicProjectDetail> {
  const response = await fetch(`${PROJECT_ENDPOINT_PREFIX}/${slug}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch project ${slug}: ${response.status}`);
  }

  const data = await response.json() as PublicProjectDetail;
  return {
    ...data,
    updates: sortByNewestFirst(data.updates || [])
  };
}
