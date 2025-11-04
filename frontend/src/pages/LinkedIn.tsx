import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const LinkedIn: React.FC = () => {
  useEffect(() => {
    // Redirect to LinkedIn profile after a short delay
    const timer = setTimeout(() => {
      window.location.href = 'https://linkedin.com/in/vividhm';
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-primary transition-colors duration-300">
      <motion.div
        className="container mx-auto px-4 py-20 text-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <svg
            className="h-24 w-24 mx-auto text-[#0077b5]"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </motion.div>
        <h2 className="text-3xl font-bold text-black dark:text-dark-text mb-4">
          Redirecting to LinkedIn...
        </h2>
        <p className="text-lg text-gray-700 dark:text-dark-muted mb-6">
          You'll be redirected to my LinkedIn profile shortly.
        </p>
        <a
          href="https://linkedin.com/in/vividhm"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#0077b5] text-white hover:bg-[#005885] transition-all duration-200 shadow-md hover:shadow-lg font-medium"
        >
          Go to LinkedIn Profile
        </a>
      </motion.div>
    </div>
  );
};

export default LinkedIn;

