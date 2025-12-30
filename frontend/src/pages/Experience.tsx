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
    title: "AI Software Engineering Intern",
    company: "Manulife",
    logo: "manulife.svg",
    description: "A leading international financial services group. Building secure, compliant AI agent systems for customer and operational use cases.",
    location: "Toronto, Canada",
    website: "https://www.manulife.com/"
  },
  {
    title: "AI Software Engineering Intern",
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
      <Link to="/work" className="block mb-1">
        <h2 className="text-xl font-medium text-minimal-grey hover:text-minimal-red transition-colors cursor-pointer">
          Experience
        </h2>
      </Link>
      <div className="space-y-0.5">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="flex items-start space-x-2 px-2 py-0 rounded hover:bg-minimal-grey-darker/20 transition-colors cursor-pointer"
            onClick={() => exp.website && window.open(exp.website, '_blank')}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
