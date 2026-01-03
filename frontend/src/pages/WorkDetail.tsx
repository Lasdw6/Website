import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { experiences } from '../shared/experiences';

const WorkDetail: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

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
            <h1 className="text-4xl font-medium text-minimal-grey mt-4 mb-2">Work</h1>
          </div>

          <div className="space-y-10">
            {experiences.map((exp, index) => {
              const companySlug = exp.company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              return (
              <div key={index} id={companySlug} className="space-y-4 scroll-mt-20">
                <div className="flex items-center space-x-3">
                  <img 
                    src={exp.logo}
                    alt={`${exp.company} Logo`} 
                    className="w-8 h-8 object-contain"
                  />
                  <div>
                    <h2 className="text-2xl font-medium text-minimal-red">
                      <Link
                        to={`/experience/${companySlug}`}
                        className="hover:underline"
                      >
                        {exp.company}
                      </Link>
                    </h2>
                    <p className="text-base text-minimal-grey">{exp.title}</p>
                    <p className="text-sm text-minimal-grey-dark">{exp.period} • {exp.location}</p>
                  </div>
                </div>
                
                <p className="text-base text-minimal-grey leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-minimal-grey">Key Achievements:</h3>
                  <ul className="space-y-2 list-disc list-inside text-sm text-minimal-grey">
                    {exp.achievements.slice(0, 2).map((achievement, i) => (
                      <li key={i} className="leading-relaxed">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/experience/${companySlug}`}
                    className="text-sm text-minimal-red hover:underline inline-block mt-2"
                  >
                    Read more →
                  </Link>
                </div>

                {exp.skills && exp.skills.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-minimal-grey">Key Skills:</h3>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-minimal-grey-darker text-minimal-grey rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-minimal-grey">Technologies:</h3>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-minimal-grey-darker text-minimal-grey rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {index < experiences.length - 1 && (
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

export default WorkDetail;

