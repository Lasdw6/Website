import React from 'react';
import { Link } from 'react-router-dom';

interface ExperienceItem {
  title: string;
  company: string;
  logo: string;
  description?: string;
  location?: string;
  website?: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineering Intern",
    company: "Manulife",
    logo: "manulife.svg",
    description: "A leading international financial services group. Building secure, compliant AI agent systems for customer and operational use cases.",
    location: "Toronto, Canada",
    website: "https://www.manulife.com/"
  },
  {
    title: "Software Engineering Intern",
    company: "GOQii",
    logo: "GOQii.png",
    description: "GOQii is a global preventive healthcare platform that combines advanced wearable technology, expert coaching, and a holistic ecosystem to help users achieve a healthier lifestyle.",
    location: "Menlo Park, CA, USA",
    website: "https://www.goqii.com/"
  },
  {
    title: "Machine Learning Engineering Intern",
    company: "The Innovation Story",
    logo: "TIS.png",
    description: "The Innovation Story is a data-driven innovation company specializing in artificial intelligence, machine learning, and digital transformation solutions for global clients.",
    location: "Bangalore, India",
    website: "https://theinnovationstory.com/"
  },
  {
    title: "Software Engineering Intern",
    company: "Electron Online",
    logo: "electron.jpg",
    description: "A technology startup focused on building scalable web and cloud solutions, integrating modern AI and automation for businesses.",
    location: "Mumbai, India",
    website: "https://electrongroup.com/"
  },
  {
    title: "Software Engineering Intern",
    company: "SciTara Technologies",
    logo: "Scitara.png",
    description: "A scientific software company focused on laboratory automation and data integration for clinical and research environments.",
    location: "Marlborough, MA, USA",
    website: "https://scitara.com/"
  }
];

const Experience: React.FC = () => {
  return (
    <div>
      <Link to="/work" className="block mb-3">
        <h2 className="text-2xl font-medium text-minimal-grey hover:text-minimal-red transition-colors cursor-pointer">
          Experience →
        </h2>
      </Link>
      <div className="space-y-1.5">
        {experiences.map((exp, index) => (
          <div key={index} className="flex space-x-2">
            <div className="w-9 flex items-start justify-center flex-shrink-0 pt-0.5">
              <img 
                src={exp.logo} 
                alt={`${exp.company} Logo`} 
                className="w-7 h-7 object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="text-base text-minimal-grey">
                {exp.website ? (
                  <a
                    href={exp.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-minimal-red hover:text-minimal-red transition-colors"
                  >
                    {exp.company}
                  </a>
                ) : (
                  <span className="text-minimal-red">{exp.company}</span>
                )}
              </div>
              <div className="text-base text-minimal-grey">
                {exp.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
