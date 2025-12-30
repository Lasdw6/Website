import React from 'react';

interface EducationItem {
  degree: string;
  university: string;
  logo?: string;
  website?: string;
}

const education: EducationItem[] = [
  {
    degree: "Math and CS",
    university: "University of Waterloo",
    logo: "/UW.png",
    website: "https://uwaterloo.ca/"
  }
];

const Education: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-medium text-minimal-grey mb-1">
        Education
      </h2>
      <div className="space-y-0.5">
        {education.map((edu, index) => (
          <div 
            key={index} 
            className="flex items-start space-x-2 px-2 py-0 rounded hover:bg-minimal-grey-darker/20 transition-colors cursor-pointer"
            onClick={() => edu.website && window.open(edu.website, '_blank')}
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
                {edu.degree}
              </div>
              <div className="text-xs text-minimal-grey-dark leading-tight -mt-0.5">
                {edu.university}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
