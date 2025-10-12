import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resume from './pages/Resume';
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
        </Routes>
      </div>
    </div>
  );
}

export default App;