import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../shared/projects';

const Projects: React.FC = () => {
  return (
    <div>
      <Link to="/projects" className="block mb-3">
        <h2 className="text-2xl font-medium text-minimal-grey hover:text-minimal-red transition-colors cursor-pointer">
          Projects →
        </h2>
      </Link>
      <div className="space-y-1.5">
        {projects.map((project, index) => {
          const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');
          
          return (
            <div key={index}>
              <Link
                to={`/projects/${projectSlug}`}
                className="text-base text-minimal-grey hover:text-minimal-red transition-colors"
              >
                {project.title}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
