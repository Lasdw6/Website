import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BeakerIcon } from '@heroicons/react/24/outline';
import { PublicProjectSummary } from '../shared/publicProjects';
import { getPublicProjectsIndex } from '../utils/publicProjectsApi';

const LabsIndex: React.FC = () => {
  const [projects, setProjects] = useState<PublicProjectSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        const data = await getPublicProjectsIndex();
        if (isMounted) {
          setProjects(data);
        }
      } catch {
        if (isMounted) {
          setError('Unable to load labs right now.');
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
  }, []);

  return (
    <div className="pt-16 pb-8 flex justify-center">
      <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="text-base text-minimal-grey hover:text-minimal-red transition-colors">
            ← Back
          </Link>
          <h1 className="text-4xl font-medium text-minimal-grey mt-4 mb-2">Labs</h1>
          <p className="text-base text-minimal-grey-dark flex items-center gap-1">
            <span>See what I am cooking in the Lab</span>
            <BeakerIcon className="h-4 w-4" aria-hidden="true" />
          </p>
        </div>

        {isLoading && <p className="text-base text-minimal-grey">Loading labs...</p>}
        {error && <p className="text-base text-minimal-grey-dark">{error}</p>}

        {!isLoading && !error && (
          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.slug} className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <Link to={`/labs/${project.slug}`} className="text-2xl font-medium text-minimal-red hover:underline">
                    {project.name}
                  </Link>
                  <span className="text-xs px-2 py-1 bg-minimal-grey-darker text-minimal-grey rounded">
                    {project.status}
                  </span>
                </div>
                <p className="text-base text-minimal-grey leading-normal">{project.tagline}</p>
                <p className="text-xs text-minimal-grey-dark">Last updated {project.lastUpdated}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LabsIndex;
