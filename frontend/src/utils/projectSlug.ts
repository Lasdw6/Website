import { ProjectItem } from '../shared/projects';

export const toProjectSlug = (project: ProjectItem): string => {
  if (project.slug && project.slug.trim().length > 0) {
    return project.slug;
  }

  return project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
