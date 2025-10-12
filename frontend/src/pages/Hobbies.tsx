import React from 'react';
import { motion, Variants } from 'framer-motion';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 12, mass: 1 } }
};

const Hobbies: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-black dark:text-dark-text mb-8 text-center"
      >
        Hobbies
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)' }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors flex flex-col items-center"
        >
          {/* Chess Emoji */}
          <div className="mb-4 text-5xl">
            <a
              href="https://www.chess.com/member/Lasdw"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 focus:text-red-600 transition-colors outline-none"
              aria-label="View my Chess.com profile"
            >
              <span role="img" aria-label="Chess Knight">♞</span>
            </a>
          </div>
          <h3 className="text-xl font-semibold text-black dark:text-dark-text mb-4">Chess</h3>
          <p className="text-gray-700 dark:text-dark-muted mb-0 text-center">
            I enjoy the process of learning and improving. I went from 700 to 2000 rating in 1 and a half year<br />
            <a
              href="https://www.chess.com/member/Lasdw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 dark:text-red-400 underline decoration-dotted decoration-gray-300 underline-offset-2 hover:text-red-700 dark:hover:text-red-300 transition-colors"
            >
              My Chess.com profile
            </a>
          </p>
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)' }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors flex flex-col items-center"
        >
          {/* Gym Emoji */}
          <div className="mb-4 text-5xl">
            <span role="img" aria-label="Exersise">💪</span>
          </div>
          <h3 className="text-xl font-semibold text-black dark:text-dark-text mb-4">Exersise</h3>
          <p className="text-gray-700 dark:text-dark-muted mb-0 text-center">
              I love staying active by lifting weights, playing tennis, and doing calisthenics to get stronger and healthier
          </p>
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)' }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-dark-secondary p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors flex flex-col items-center"
        >
          {/* Drums Emoji */}
          <div className="mb-4 text-5xl">
            <span role="img" aria-label="Drums">🎶</span>
          </div>
          <h3 className="text-xl font-semibold text-black dark:text-dark-text mb-4">Music & Drums</h3>
          <p className="text-gray-700 dark:text-dark-muted mb-0 text-center">
            My favorite song to play on the drums is "Paradise City" by Guns N' Roses, I also love listening to Juice WRLD</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Hobbies;
