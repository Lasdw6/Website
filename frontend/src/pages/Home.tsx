import React from 'react';
import { motion } from 'framer-motion';
import About from './About';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
import Education from './Education';
import Hobbies from './Hobbies';
import LeadershipCommunity from './LeadershipCommunity';

const Home: React.FC = () => {
  return (
    <div className="space-y-16 pt-16">
      {/* Hero Section */}
      <section id="home" className="text-center py-20">
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

      <section id="about">
        <About />
      </section>

      <section id="education">
        <Education />
      </section>

      <section id="experience">
        <Experience />
      </section>

      <section id="leadership">
        <LeadershipCommunity />
      </section>

      <section id="projects">
        <Projects />
      </section>
      
      <section id="hobbies" className="pb-16">
        <Hobbies />
      </section>

      <section id="contact" className="pb-16">
        <Contact />
      </section>

    </div>
  );
};

export default Home;