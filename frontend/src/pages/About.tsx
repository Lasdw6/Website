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
    'Mathematics',
    'Problem Solving',
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-black dark:text-dark-text mb-8"
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
            <h3 className="text-xl font-semibold text-black dark:text-dark-text mb-2">Education</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-black dark:text-dark-text">University of Waterloo</h4>
                <p className="text-gray-700 dark:text-dark-muted">Bachelor of Mathematics in Combinatorics and Optimization</p>
                <p className="text-gray-600 dark:text-dark-muted">2023 - Present</p>
              </div>
            </div>
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
              I'm passionate about applying mathematical optimization and combinatorial
              techniques to solve real-world problems. My interests include machine
              learning, algorithm design, and mathematical modeling. I enjoy working
              on challenging problems that require both analytical thinking and
              practical implementation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 