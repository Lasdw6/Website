import React from 'react';
import { motion } from 'framer-motion';
import Card from '../components/Card';

const Education: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-black dark:text-dark-text mb-8"
      >
        Education
      </motion.h2>

      <div className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="relative">
          <img src="/UW.png" alt="UW Logo" className="w-8 h-8 mr-2 inline-block align-middle rounded-full" />
            <Card
              name={<span className="flex items-center">University of Waterloo</span>}
              logo="UW.png"
              description="Canada's top innovation university, renowned for its co-op programs and excellence in mathematics, computer science, and engineering. Ranked #1 in Canada for Computer Science, Mathematics, and Engineering (Maclean's 2023)"
              location="Waterloo, Ontario, Canada"
              website="https://uwaterloo.ca/"
              founded="1957"
            />
            <p className="text-gray-700 dark:text-dark-muted">Bachelor of Mathematics in Combinatorics and Optimization with a Minor in Computer Science</p>
            <p className="text-gray-600 dark:text-dark-muted">2023 - Present</p>
          </div>
        </motion.div>
      </div>0
    </div>
  );
};

export default Education;
