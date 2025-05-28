import React from 'react';
import { motion, Variants } from 'framer-motion';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  skills: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineering Intern",
    company: "GOQii - Mobile Vision Team",
    period: "May 2025 - Aug. 2025",
    skills: [
      "Computer Vision",
      "Deep Learning",
      "Mobile App Development",
      "User Experience",
      "Performance Optimization"
    ],
    technologies: ["Computer Vision", "Deep Learning", "Mobile Development"]
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "The Innovation Story",
    period: "Dec. 2024 - Feb. 2025",
    skills: [
      "Machine Learning",
      "Computer Vision",
      "Model Training",
      "Performance Optimization",
      "Data Processing"
    ],
    technologies: ["PyTorch", "YOLOv11", "Graph Algorithms", "Machine Learning"]
  },
  {
    title: "Software Engineering Intern",
    company: "Electron Online",
    period: "Sep. 2024 - Dec. 2024",
    skills: [
      "Full Stack Development",
      "Data Pipeline Engineering",
      "Cloud Optimization",
      "NLP & LLM Integration",
      "API Development"
    ],
    technologies: ["Django", "React", "NLP", "Google Cloud", "Web Scraping", "API Integration"]
  }
];

const Experience: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: (index: number) => ({ 
      opacity: 0,
      y: 50,
      scale: 0.8,
    }),
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 1
      }
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-black mb-2">Work Experience</h1>
        <p className="text-lg text-gray-700">
          My professional journey and technical expertise
        </p>
      </motion.div>

      <div className="relative pb-16">
        {/* Static Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-red-600 h-full" />

        {/* Start flag at bottom */}
        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-10 h-10 bg-red-600 rounded-full z-10">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-6 h-6"
            >
              <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/>
            </svg>
          </div>
        </div>

        {/* Experience items */}
        <motion.div
          className="space-y-8 md:space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              className="relative flex items-center"
              style={{ marginTop: index === 0 ? 0 : '0' }}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-600 rounded-full z-10" />

              {/* Experience card */}
              <motion.div
                className={`w-full md:w-7/12 bg-white p-4 md:p-6 rounded-lg shadow-md ${
                  index % 2 === 0 ? 'md:mr-auto md:-ml-24' : 'md:ml-auto md:-mr-24'
                }`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)"
                }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg md:text-xl font-semibold text-black mb-2">
                  {exp.title}
                </h3>
                <h4 className="text-base md:text-lg text-red-600 mb-2">{exp.company}</h4>
                <p className="text-sm md:text-base text-gray-600 mb-4">{exp.period}</p>
                
                <div className="mb-4">
                  <h5 className="text-xs md:text-sm font-semibold text-gray-700 mb-2">Key Skills:</h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 md:px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs md:text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs md:text-sm font-semibold text-gray-700 mb-2">Technologies:</h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 md:px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs md:text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Experience; 