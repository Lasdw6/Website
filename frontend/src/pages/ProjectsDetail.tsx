import React from 'react';
import { projects } from '../shared/projects';
import { Link } from 'react-router-dom';

const ProjectsDetail: React.FC = () => {
  return (
    <div className="pt-16 pb-8 flex justify-center">
      <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="mb-8">
            <Link 
              to="/" 
              className="text-base text-minimal-grey hover:text-minimal-red transition-colors"
            >
              ← Back
            </Link>
            <h1 className="text-4xl font-medium text-minimal-grey mt-4 mb-2">Projects</h1>
          </div>

          <div className="space-y-10">
            {projects.map((project, index) => {
              const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');
              
              return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Link 
                      to={`/projects/${projectSlug}`}
                      className="text-2xl font-medium text-minimal-red hover:underline"
                    >
                      {project.title}
                    </Link>
                    <span className="text-sm text-minimal-grey-dark">{project.period}</span>
                  </div>
                  
                  <p className="text-base text-minimal-grey leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 bg-minimal-grey-darker text-minimal-grey rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {index < projects.length - 1 && (
                    <div className="border-t border-minimal-grey-darker pt-8 mt-8"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsDetail;

