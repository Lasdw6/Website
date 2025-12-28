import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface ExperienceItem {
  title: string;
  company: string;
  logo: string;
  description?: string;
  location?: string;
  website?: string;
  period?: string;
  skills?: string[];
  technologies?: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineering Intern",
    company: "Manulife",
    logo: "manulife.svg",
    period: "Aug. 2025 - Present",
    description: "A leading international financial services group. Building secure, compliant AI agent systems for customer and operational use cases.",
    location: "Toronto, Canada",
    website: "https://www.manulife.com/",
    skills: ["AI Agents", "Large Language Models (LLMs)", "Retrieval-Augmented Generation (RAG)", "Azure"],
    technologies: ["LangChain", "Terraform", "OpenAI SDK", "Azure", "Vector Databases", "Python", "TypeScript"]
  },
  {
    title: "Software Engineering Intern",
    company: "GOQii",
    logo: "GOQii.png",
    period: "May 2025 - Aug. 2025",
    description: "GOQii is a global preventive healthcare platform that combines advanced wearable technology, expert coaching, and a holistic ecosystem to help users achieve a healthier lifestyle.",
    location: "Menlo Park, CA, USA",
    website: "https://www.goqii.com/",
    skills: ["AI Agents", "Large Language Models (LLMs)", "Retrieval-Augmented Generation (RAG)", "Tool Orchestration"],
    technologies: ["Computer Vision", "Deep Learning", "AI Agents", "LangChain", "SQL"]
  },
  {
    title: "Machine Learning Engineering Intern",
    company: "The Innovation Story",
    logo: "TIS.png",
    period: "Dec. 2024 - Feb. 2025",
    description: "The Innovation Story is a data-driven innovation company specializing in artificial intelligence, machine learning, and digital transformation solutions for global clients.",
    location: "Bangalore, India",
    website: "https://theinnovationstory.com/",
    skills: ["Machine Learning", "Computer Vision", "Model Training", "Data Processing"],
    technologies: ["PyTorch", "YOLOv11", "Graph Algorithms"]
  },
  {
    title: "Software Engineering Intern",
    company: "Electron Online",
    logo: "electron.jpg",
    period: "Sep. 2024 - Dec. 2024",
    description: "A technology startup focused on building scalable web and cloud solutions, integrating modern AI and automation for businesses.",
    location: "Mumbai, India",
    website: "https://electrongroup.com/",
    skills: ["Full Stack Development", "Cloud Optimization", "NLP & LLM Integration", "API Development"],
    technologies: ["Django", "React", "NLP", "Google Cloud", "Web Scraping", "API Integration"]
  },
  {
    title: "Software Engineering Intern",
    company: "SciTara Technologies",
    logo: "Scitara.png",
    period: "May 2022 - June 2022",
    description: "A scientific software company focused on laboratory automation and data integration for clinical and research environments.",
    location: "Marlborough, MA, USA",
    website: "https://scitara.com/",
    skills: ["Device automation", "Data collection optimization", "Excel macro development", "Clinical data processing"],
    technologies: ["Python", "NodeJS", "Excel"]
  }
];

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
                      {exp.website ? (
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {exp.company}
                        </a>
                      ) : (
                        exp.company
                      )}
                    </h2>
                    <p className="text-base text-minimal-grey">{exp.title}</p>
                    {exp.period && (
                      <p className="text-sm text-minimal-grey-dark">{exp.period}</p>
                    )}
                  </div>
                </div>
                
                {exp.description && (
                  <p className="text-base text-minimal-grey leading-relaxed">
                    {exp.description}
                  </p>
                )}
                
                {exp.location && (
                  <p className="text-sm text-minimal-grey-dark">{exp.location}</p>
                )}

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

