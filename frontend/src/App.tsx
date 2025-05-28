import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section id="home" className="bg-white">
          <motion.div 
            className="container mx-auto px-4 py-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <Home />
          </motion.div>
        </section>
        <section id="experience" className="bg-red-50">
          <motion.div 
            className="container mx-auto px-4 py-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <Experience />
          </motion.div>
        </section>
        <section id="projects" className="bg-white">
          <motion.div 
            className="container mx-auto px-4 py-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <Projects />
          </motion.div>
        </section>
        <section id="about" className="bg-red-50">
          <motion.div 
            className="container mx-auto px-4 py-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <About />
          </motion.div>
        </section>
        <section id="contact" className="bg-white">
          <motion.div 
            className="container mx-auto px-4 py-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <Contact />
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default App; 