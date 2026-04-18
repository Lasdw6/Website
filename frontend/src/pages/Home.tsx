import React from 'react';
import Experience from './Experience';
import Education from './Education';
import Projects from './Projects';
import Blog from './Blog';
import GitHubProfileCommit from '../components/GitHubProfileCommit';

const Home: React.FC = () => {
  return (
    <div className="pt-16 pb-2 flex justify-center">
      <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8">
        <div className="space-y-1">
          {/* Hero Section */}
          <section id="home">
            <h1 className="text-4xl font-medium text-minimal-grey">
              hi im vividh
            </h1>
          </section>

          <section id="education">
            <Education />
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

          <section id="github">
            <GitHubProfileCommit username="Lasdw6" />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
