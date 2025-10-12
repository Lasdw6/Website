import React from 'react';
import { motion, Variants } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  period: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Agentic Personal Assistant",
    period: "Jan. 2025 - Present",
    description: "AI-powered personal assistant with RAG, FastAPI, and cloud deployment.",
    technologies: ["Python", "FastAPI", "Langchain", "Pinecone", "AWS", "Docker", "Git"],
    link: "https://github.com/Lasdw6",
    image: "image.png"
  },
  {
    title: "Deep Research Agent",
    period: "Apr. 2025 - May 2025",
    description: "Research agent integrating multiple tools and ReAct pattern for decision-making.",
    technologies: ["Python", "Langgraph", "Langchain", "Git"],
    link: "https://huggingface.co/spaces/Lasdw/Deep_Research_Agent",
    image: "Deep_Research_Agent.png"
  },
  {
    title: "Job Application Tracker",
    period: "June 2024 - Sep. 2024",
    description: "Web app for tracking job applications, with LLM email parsing and cloud deployment.",
    technologies: ["Python", "Typescript", "React", "MongoDB", "OAuth2", "LLMs", "Git"],
    link: "https://github.com/Lasdw6",
    image: "JobTracker.png"
  },
  {
    title: "Tea Tree Chat",
    period: "June 2025 - Present",
    description: "Open-source BYOK chat app alternative to ChatGPT, built with FastAPI and AWS.",
    technologies: ["Python", "FastAPI", "Next.js", "Typescript", "Postgres", "Langchain", "Git"],
    link: "https://askteatree.chat",
    image: "Teatree.png"
  },
  {
    title: "Personal Portfolio Website",
    period: "Mar. 2024 - Present",
    description: "Modern, responsive portfolio website with animations and project showcase.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Git"],
    link: "https://github.com/Lasdw6/Website",
    image: "image.png"
  },
  {
    title: "Chess Game with Computer Players",
    period: "June 2024 - Aug. 2024",
    description: "Chess game with computer AI, real-time move generation, and OOP design.",
    technologies: ["C++", "std::vector", "OOP"],
    link: "https://github.com/Lasdw6/chess.exe",
    image: "chess.jpg"
  }
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 12, mass: 1 } }
};

const Projects: React.FC = () => {
  const diagramData = '{"highlight":"#0000ff","nav":true,"resize":true,"toolbar":"zoom","edit":false,"url":"/flowchart.drawio"}';

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-black dark:text-dark-text mb-2">Projects</h1>
        <p className="text-lg text-gray-700 dark:text-dark-muted">
          My recent work and personal projects
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)' }}
            className="bg-white dark:bg-dark-secondary rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden cursor-pointer"
          >
            <img src={project.image} alt={project.title} className="w-full h-64 object-cover"/>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-black dark:text-dark-text">{project.title}</h2>
                  <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">{project.period}</span>
                </div>
                <p className="text-gray-600 dark:text-dark-muted mb-4 h-20 overflow-hidden">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-black dark:text-dark-text mb-4">Answering Process Flowchart</h2>
        <div
          className="mxgraph border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          data-mxgraph={diagramData}
          style={{ maxWidth: '100%', height: '600px' }}
        />
      </div>
    </div>
  );
};

export default Projects; 