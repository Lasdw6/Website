import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { experiences } from '../shared/experiences';

const ExperienceDetail: React.FC = () => {
  const { experienceSlug } = useParams<{ experienceSlug: string }>();
  
  // Create slug from company: lowercase, replace spaces with hyphens, remove special chars
  const experience = experiences.find(exp => {
    const slug = exp.company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return slug === experienceSlug;
  });

  if (!experience) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="pt-16 pb-8 flex justify-center">
      <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="mb-8">
            <Link 
              to="/" 
              className="text-base text-minimal-grey hover:text-minimal-red transition-colors"
            >
              ← Back
            </Link>
            <div className="flex items-center space-x-3 mt-4 mb-2">
              <img 
                src={experience.logo}
                alt={`${experience.company} Logo`} 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-4xl font-medium text-minimal-grey">
                  {experience.website ? (
                    <a
                      href={experience.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-minimal-red transition-colors"
                    >
                      {experience.company}
                    </a>
                  ) : (
                    experience.company
                  )}
                </h1>
                <p className="text-base text-minimal-grey mt-1">{experience.title}</p>
                <p className="text-sm text-minimal-grey-dark mt-1">{experience.period} • {experience.location}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-base text-minimal-grey leading-relaxed">
              <p>{experience.description}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-medium text-minimal-grey">Key Achievements</h2>
              <ul className="space-y-3">
                {experience.achievements.map((achievement, index) => (
                  <li key={index} className="text-base text-minimal-grey leading-relaxed">
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-medium text-minimal-grey">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-minimal-grey-darker text-minimal-grey rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {experience.skills && experience.skills.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xl font-medium text-minimal-grey">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-minimal-grey-darker text-minimal-grey rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetail;

