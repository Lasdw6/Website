import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resume from './pages/Resume';
import HireMe from './pages/HireMe';
import LinkedIn from './pages/LinkedIn';
import GitHub from './pages/GitHub';
import InteractiveBackground from './components/InteractiveBackground';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="dark">
      <InteractiveBackground />
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/hireme" element={<HireMe />} />
          <Route path="/Hireme" element={<HireMe />} />
          <Route path="/linkedin" element={<LinkedIn />} />
          <Route path="/github" element={<GitHub />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;