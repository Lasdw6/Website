import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { Routes, Route } from 'react-router-dom';
import Resume from './pages/Resume';

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
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-dark-primary transition-colors duration-300">
        <Routes>
          <Route path="/resume" element={<Resume />} />
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <main>
                  <section id="home" className="bg-white dark:bg-dark-primary">
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
                  <section id="experience" className="bg-red-100 dark:bg-red-900/20">
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
                  <section id="projects" className="bg-white dark:bg-dark-primary">
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
                  <section id="about" className="bg-red-100 dark:bg-red-900/20">
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
                  <section id="contact" className="bg-white dark:bg-dark-primary">
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
              </>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App; 