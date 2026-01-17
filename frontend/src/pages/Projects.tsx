import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../shared/projects';

const Projects: React.FC = () => {
  return (
    <div>
      <Link to="/projects" className="block mb-0.5">
        <h2 className="text-xl font-medium text-minimal-grey hover:text-minimal-red transition-colors cursor-pointer">
          Projects
        </h2>
      </Link>
      <div className="space-y-0">
        {projects.filter(project => !project.hideFromHome).map((project, index) => {
          const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');

          return (
            <Link
              key={index}
              to={`/projects/${projectSlug}`}
              className="block px-2 py-0 rounded hover:bg-minimal-grey-darker/20 transition-colors"
            >
              <div className="text-base text-minimal-grey leading-tight">
                {project.title}
              </div>
              {project.shortDescription && (
                <div className="text-xs text-minimal-grey-dark opacity-75 leading-tight -mt-1 pl-2">
                  {project.shortDescription}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
