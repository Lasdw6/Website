import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const skills = [
    'Python',
    'TypeScript',
    'React',
    'Node.js',
    'Machine Learning',
    'Data Analysis',
    'Optimization',
    'Combinatorics',
    'Problem Solving',
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-black dark:text-dark-text mb-8 text-center"
      >
        About Me
      </motion.h2>
      <div className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <p className="text-gray-700 dark:text-dark-muted mb-4">
              Hi, I'm Vividh. I like to build software and solve problems, especially my own.
            </p>
            {/*
            <p className="text-gray-700 dark:text-dark-muted mb-4">
              Here's what I'm currently listening to:
            </p>
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/track/5ihS6WN0LHG3fgk5zVsMsA?utm_source=generator"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
            */}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black dark:text-dark-text mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black dark:text-dark-text mb-2">Interests</h3>
            <p className="text-gray-700 dark:text-dark-muted">
              I like to solve real-world problems. My interests include Full Stack Development and AI Agents.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;