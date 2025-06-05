import React from 'react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <div className="space-y-16 pt-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-black dark:text-dark-text mb-4">
            Hi, I'm Vividh Mahajan
          </h1>
          <p className="text-xl text-gray-700 dark:text-dark-muted mb-4">
            Combinatorics and Optimization Student @ University of Waterloo
          </p>
          <p className="text-lg text-gray-700 dark:text-dark-muted mb-6">
            Backend | AI/ML | Full Stack
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-red-600 dark:bg-red-700 text-white px-8 py-3 rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
            >
              View My Work
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white dark:bg-dark-secondary text-red-600 dark:text-red-400 border-2 border-red-600 dark:border-red-400 px-8 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-dark-tertiary transition-colors"
            >
              Contact Me
            </button>
          </div>
        </motion.div>
      </section>

      {/* Featured Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-dark-text">Latest Projects</h2>
          <p className="text-gray-700 dark:text-dark-muted">
            Explore my recent work in AI and machine learning, including my Agentic Personal Assistant and Deep Research Agent projects. I focus on building intelligent systems that solve real-world problems.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors"
        >
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-dark-text">Skills & Expertise</h2>
          <p className="text-gray-700 dark:text-dark-muted">
            Proficient in Python, TypeScript, and modern AI frameworks. Experienced in building scalable applications using React, FastAPI, and cloud technologies. Currently pursuing a degree in Combinatorics and Optimization with a minor in Computer Science at the University of Waterloo.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Home; 