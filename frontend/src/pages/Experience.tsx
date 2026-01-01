import React from 'react';
import { Link } from 'react-router-dom';
import { experiences } from '../shared/experiences';

const Experience: React.FC = () => {
  const getExperienceSlug = (company: string) => {
    return company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  return (
    <div>
      <Link to="/work" className="block mb-1">
        <h2 className="text-xl font-medium text-minimal-grey hover:text-minimal-red transition-colors cursor-pointer">
          Experience
        </h2>
      </Link>
      <div className="space-y-0.5">
        {experiences.map((exp, index) => {
          const slug = getExperienceSlug(exp.company);
          return (
            <Link
              key={index}
              to={`/experience/${slug}`}
              className="flex items-start space-x-2 px-2 py-0 rounded hover:bg-minimal-grey-darker/20 transition-colors cursor-pointer block"
            >
              <img 
                src={exp.logo}
                alt={`${exp.company} Logo`} 
                className="w-8 h-8 object-contain mt-0.5 flex-shrink-0"
              />
              <div className="flex-1">
                <div className="text-base text-minimal-grey leading-tight">
                  {exp.title}
                </div>
                <div className="text-xs text-minimal-grey-dark leading-tight -mt-0.5">
                  {exp.company}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Experience;
