import React from 'react';
import { Link } from 'react-router-dom';
import { education } from '../shared/education';

const Education: React.FC = () => {
  const getEducationSlug = (university: string) => {
    return university.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-minimal-grey mb-0.5">
        Education
      </h2>
      <div className="space-y-0">
        {education.map((edu, index) => {
          const slug = getEducationSlug(edu.university);
          return (
            <Link
              key={index}
              to={`/education/${slug}`}
              className="flex items-start space-x-2 px-2 py-0 rounded hover:bg-minimal-grey-darker/20 transition-colors cursor-pointer block"
            >
              {edu.logo && (
                <img 
                  src={edu.logo} 
                  alt={`${edu.university} Logo`} 
                  className="w-8 h-8 object-contain mt-0.5 flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <div className="text-base text-minimal-grey leading-tight">
                  {edu.shortDegree || edu.degree}
                </div>
                <div className="text-xs text-minimal-grey-dark leading-tight -mt-0.5">
                  {edu.university}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Education;
