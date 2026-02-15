import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PublicProjectDetail } from '../shared/publicProjects';
import { getPublicProjectBySlug } from '../utils/publicProjectsApi';

const LabProjectDetail: React.FC = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const [project, setProject] = useState<PublicProjectDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!projectSlug) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      try {
        const data = await getPublicProjectBySlug(projectSlug);
        if (isMounted) {
          setProject(data);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : '';
        if (isMounted) {
          if (errorMessage.includes('404')) {
            setNotFound(true);
          } else {
            setHasError(true);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    load();
    return () => {
      isMounted = false;
    };
  }, [projectSlug]);

  const canonicalLinks = useMemo(() => {
    if (!project) {
      return [];
    }

    const links: Array<{ label: string; url: string }> = [];
    if (project.links.website) links.push({ label: 'Website', url: project.links.website });
    if (project.links.npm) links.push({ label: 'npm', url: project.links.npm });
    if (project.links.github) links.push({ label: 'GitHub', url: project.links.github });
    return links;
  }, [project]);

  return (
    <div className="pt-16 pb-8 flex justify-center">
      <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/labs" className="text-base text-minimal-grey hover:text-minimal-red transition-colors">
            ← Back
          </Link>
        </div>

        {isLoading && <p className="text-base text-minimal-grey">Loading updates...</p>}

        {!isLoading && notFound && (
          <div className="space-y-2">
            <h1 className="text-3xl font-medium text-minimal-grey">Project not found</h1>
            <p className="text-base text-minimal-grey-dark">This public lab endpoint does not exist yet.</p>
          </div>
        )}

        {!isLoading && hasError && (
          <div className="space-y-2">
            <h1 className="text-3xl font-medium text-minimal-grey">Updates unavailable</h1>
            <p className="text-base text-minimal-grey-dark">Please check again later.</p>
          </div>
        )}

        {!isLoading && !notFound && !hasError && project && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-medium text-minimal-grey">{project.name}</h1>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 bg-minimal-grey-darker text-minimal-grey rounded">
                  {project.status}
                </span>
                <span className="text-xs text-minimal-grey-dark">Last updated {project.lastUpdated}</span>
              </div>
              <p className="text-base text-minimal-grey">{project.description}</p>
            </div>

            {canonicalLinks.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xl font-medium text-minimal-grey">Links</h2>
                <div className="flex flex-wrap gap-4">
                  {canonicalLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-minimal-red hover:underline"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-xl font-medium text-minimal-grey">Updates</h2>
              {project.updates.length === 0 && (
                <p className="text-base text-minimal-grey-dark">No updates yet.</p>
              )}
              {project.updates.map((update, index) => (
                <div key={`${update.date}-${index}`} className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg text-minimal-grey">{update.title}</h3>
                    <span className="text-xs px-2 py-1 bg-minimal-grey-darker text-minimal-grey rounded">
                      {update.status}
                    </span>
                  </div>
                  <p className="text-xs text-minimal-grey-dark">{update.date}</p>
                  <p className="text-base text-minimal-grey leading-relaxed">{update.summary}</p>
                  {update.links.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {update.links.map((link) => (
                        <a
                          key={`${update.date}-${link.url}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-minimal-red hover:underline"
                        >
                          {link.label} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LabProjectDetail;
