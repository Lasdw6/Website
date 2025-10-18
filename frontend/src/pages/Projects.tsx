import React from 'react';
import { motion, Variants } from 'framer-motion';
import { projects } from '../shared/projects';

// projects imported from shared module

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 12, mass: 1 } }
};

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => {
          // Determine the primary link based on priority: demo -> liveSite -> github
          const primaryLink = project.demo || project.liveSite || project.github;
          
          return (
            <motion.a
              key={index}
              href={primaryLink}
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
          );
        })}
      </div>
    </div>
  );
};

export default Projects; 