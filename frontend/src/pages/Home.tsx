import React from 'react';
import Experience from './Experience';
import Projects from './Projects';
import Blog from './Blog';
import HoverCard from '../components/HoverCard';

const Home: React.FC = () => {
  return (
    <div className="pt-16 pb-8 flex justify-center">
      <div className="max-w-xl w-full px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <section id="home">
            <h1 className="text-4xl font-medium text-minimal-grey mb-1">
              Vividh Mahajan
            </h1>
            <div className="flex items-center space-x-2">
              <img 
                src="/UW.png" 
                alt="University of Waterloo" 
                className="w-8 h-8 object-contain"
              />
              <HoverCard
                content={{
                  title: "University of Waterloo",
                  description: "Canada's top innovation university, renowned for its co-op programs and excellence in mathematics, computer science, and engineering. Ranked #1 in Canada for Computer Science, Mathematics, and Engineering.",
                  location: "Waterloo, Ontario, Canada",
                  website: "https://uwaterloo.ca/"
                }}
              >
                <span className="text-lg text-minimal-grey">
                  Math and CS
                </span>
              </HoverCard>
            </div>
          </section>

          <section id="experience">
            <Experience />
          </section>

          <section id="projects">
            <Projects />
          </section>

          <section id="blog">
            <Blog />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
