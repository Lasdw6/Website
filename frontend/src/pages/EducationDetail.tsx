import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { education } from '../shared/education';

const EducationDetail: React.FC = () => {
  const { educationSlug } = useParams<{ educationSlug: string }>();
  
  // Create slug from university: lowercase, replace spaces with hyphens, remove special chars
  const edu = education.find(e => {
    const slug = e.university.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return slug === educationSlug;
  });

  if (!edu) {
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
                src={edu.logo}
                alt={`${edu.university} Logo`} 
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-4xl font-medium text-minimal-grey">
                  {edu.website ? (
                    <a
                      href={edu.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-minimal-red transition-colors"
                    >
                      {edu.university}
                    </a>
                  ) : (
                    edu.university
                  )}
                </h1>
                <p className="text-base text-minimal-grey mt-1">{edu.degree}</p>
                <p className="text-sm text-minimal-grey-dark mt-1">{edu.period} • {edu.location}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="text-base text-minimal-grey leading-relaxed">
              <p>{edu.description}</p>
            </div>

            {edu.achievements && edu.achievements.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-medium text-minimal-grey">Achievements & Activities</h2>
                <ul className="space-y-3">
                  {edu.achievements.map((achievement, index) => (
                    <li key={index} className="text-base text-minimal-grey leading-relaxed">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {edu.coursework && edu.coursework.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xl font-medium text-minimal-grey">Relevant Coursework</h2>
                <ul className="space-y-2">
                  {edu.coursework.map((course, index) => (
                    <li key={index} className="text-base text-minimal-grey leading-relaxed">
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {edu.externalCourses && edu.externalCourses.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xl font-medium text-minimal-grey">External Courses</h2>
                <ul className="space-y-2">
                  {edu.externalCourses.map((course, index) => (
                    <li key={index} className="text-base text-minimal-grey leading-relaxed">
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationDetail;



