import React from 'react';
import { motion } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  period: string;
}

const projects: Project[] = [
  {
    title: "Agentic Personal Assistant",
    period: "Jan. 2025 - Present",
    description: "Developed a personal assistant using Python and FastAPI, integrating retrieval-augmented generation (RAG) with Pinecone for efficient knowledge retrieval. Designed the architecture using Model Context Protocol(MCP) and the Evaluator-Optimizer workflow. Built and deployed the assistant on AWS Fargate using Docker, ensuring scalability and efficient API performance.",
    technologies: ["Python", "FastAPI", "Langchain", "Pinecone", "AWS", "Docker", "Git"],
    link: "https://github.com/Lasdw6"
  },
  {
    title: "Deep Research Agent",
    period: "Apr. 2025 - May 2025",
    description: "Developed a research agent using LangGraph and LangChain frameworks that integrate multiple tools (such as Tavily Search, Audio processing, and Python code execution) for comprehensive information gathering. Implemented a ReAct (Reasoning, Action, Observation) pattern architecture for step-by-step decision-making and tool selection. The Agent has been submitted to the GAIA(General AI Assistant)-benchmark leaderboard for evaluation.",
    technologies: ["Python", "Langgraph", "Langchain", "Git"],
    link: "https://huggingface.co/spaces/Lasdw/Deep_Research_Agent"
  },
  {
    title: "Job Application Tracker",
    period: "June 2024 - Sep. 2024",
    description: "Developed a web application to help users track and manage their job applications efficiently. Successfully launched a closed beta testing phase with 20 registered users, using Google OAuth2. Used LLMs to parse and categorize email data. Utilized Docker to deploy the Django server on AWS, and MongoDB to store login credentials.",
    technologies: ["Python", "Typescript", "React", "MongoDB", "OAuth2", "LLMs", "Git"],
    link: "https://github.com/Lasdw6"
  },
  {
    title: "Personal Portfolio Website",
    period: "Mar. 2024 - Present",
    description: "Designed and developed a modern, responsive personal portfolio website using React and TypeScript. Implemented smooth animations with Framer Motion, created a dynamic timeline for work experience, and built a grid-based project showcase. The website features a clean, professional design with a red color scheme and interactive elements.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Git"],
    link: "https://github.com/Lasdw6/Website"
  }
];

const Projects: React.FC = () => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-semibold text-black dark:text-dark-text mb-2">{project.title}</h2>
            <p className="text-gray-700 dark:text-dark-muted mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
            >
              View Project →
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects; 