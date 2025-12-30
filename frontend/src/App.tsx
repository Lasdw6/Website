import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resume from './pages/Resume';
import HireMe from './pages/HireMe';
import LinkedIn from './pages/LinkedIn';
import GitHub from './pages/GitHub';
import ProjectsDetail from './pages/ProjectsDetail';
import ProjectDetail from './pages/ProjectDetail';
import WorkDetail from './pages/WorkDetail';
import BlogDetail from './pages/BlogDetail';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="bg-minimal-black min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/hireme" element={<HireMe />} />
          <Route path="/Hireme" element={<HireMe />} />
          <Route path="/linkedin" element={<LinkedIn />} />
          <Route path="/github" element={<GitHub />} />
        <Route path="/projects" element={<ProjectsDetail />} />
        <Route path="/projects/:projectSlug" element={<ProjectDetail />} />
        <Route path="/work" element={<WorkDetail />} />
        <Route path="/writing/:blogSlug" element={<BlogDetail />} />
        </Routes>
    </div>
  );
}

export default App;