import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { projects as allProjects } from '../shared/projects';

const HireMe: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift() || null;
    return null;
  };

  const setCookie = (name: string, value: string, days = 30) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
  };
  
  const getStoredVariant = (): 'fullstack' | 'agent' | null => {
    try {
      const v = localStorage.getItem('hire_variant');
      return v === 'agent' || v === 'fullstack' ? (v as 'fullstack' | 'agent') : null;
    } catch {
      return null;
    }
  };
  
  const setStoredVariant = (v: 'fullstack' | 'agent') => {
    try {
      localStorage.setItem('hire_variant', v);
    } catch {
      // ignore
    }
  };
  
  const hasLock = (): boolean => {
    try { return sessionStorage.getItem('hire_variant_lock') === '1'; } catch { return false; }
  };
  
  const setLock = () => {
    try { sessionStorage.setItem('hire_variant_lock', '1'); } catch { /* ignore */ }
  };
  
  useEffect(() => {
    try { sessionStorage.removeItem('hire_variant_lock'); } catch { /* ignore */ }
  }, []);
  
  const savedCookie = getCookie('hire_variant');
  const savedStore = getStoredVariant();
  let activeVariant: 'fullstack' | 'agent' = (savedCookie === 'agent' || savedStore === 'agent')
    ? 'agent'
    : (savedCookie === 'fullstack' || savedStore === 'fullstack')
      ? 'fullstack'
      : 'fullstack';
  const path = location.pathname;
  
  if (!hasLock()) {
    if (path === '/Hireme') {
      activeVariant = 'agent';
      setCookie('hire_variant', 'agent');
      setStoredVariant('agent');
    } else if (path === '/hireme') {
      activeVariant = 'fullstack';
      setCookie('hire_variant', 'fullstack');
      setStoredVariant('fullstack');
    }
  }
  
  useEffect(() => {
    if (path === '/Hireme') {
      setLock();
      navigate('/hireme', { replace: true });
    }
  }, [path, navigate]);
  
  const variantCopy: Record<'fullstack' | 'agent', {
    pitch: string;
    brings: string[];
    highlights: string[];
    skills: string[];
    projects: { title: string; description: string; image?: string; liveSite?: string; github?: string; demo?: string; }[];
  }> = {
    fullstack: {
      pitch: "I'm Vividh. I think I would be a great fit for your company as I have experience working across the stack, including my internships and personal projects.",
      brings: [
        'Backend experience with Node.js, Python, PostgreSQL, MongoDB, and SQL',
        'Frontend experience with React, Next and Vite, and Tailwind',
        'Experinece with Cloud Platforms like AWS, GCP, and Azure',
      ],
      highlights: [
        'At my internships, I have shipped production features used by 800+ users daily',
        'I have built end‑to‑end apps: job tracker, dashboards, portfolio site',
        'University of Waterloo — Combinatorics & Optimization',
      ],
      skills: ['TypeScript', 'React', 'Node', 'PostgreSQL', 'Tailwind', 'Docker'],
      projects: allProjects
        .filter(p => ['Tea Tree Chat', 'Personal Portfolio Website'].includes(p.title))
        .map(p => ({
          title: p.title,
          description: p.description,
          image: p.image,
          liveSite: p.liveSite,
          github: p.github,
          demo: p.demo,
        })),
    },
    agent: {
      pitch: "I like to build AI agents (especially ones that solve my own problems) and I think I'd be a great fit because I've worked across the stack, in internships and personal projects.",
      brings: [
        'Strong cross-stack skills: backend logic, vector search, frontend dashboards and cloud deployment',
        'Experince with computer-use, browser and regular agents',
        'Up to date with the latest trends and best practices',
      ],
      highlights: [
        'Deployed multiple agents to production for 800+ users @ Manulife and GOQii',
        'Designed unstructured data ingestion pipeline using Python + regex + schema',
        'Built a desktop agent that could automate tasks like opening applications and searching the web',
      ],
      skills: ['Python', 'TypeScript', "Langchain", "Langgraph", "OpenAI Agents SDK", 'RAG', 'Pinecone', "Chromadb", 'PostgreSQL', "Azure"],
      projects: allProjects
        .filter(p => ['Deep Research Agent', 'Desktop Agent', 'Housing Search Agent', 'Agentic Personal Assistant'].includes(p.title))
        .map(p => ({
          title: p.title,
          description: p.description,
          image: p.image,
          liveSite: p.liveSite,
          github: p.github,
          demo: p.demo,
        })),
    },
  };
  
  const copy = variantCopy[activeVariant];
  
  useEffect(() => {
    const base = 'Hire Vividh Mahajan';
    document.title = activeVariant === 'agent' ? `${base} — AI Agent` : `${base} — Full‑Stack`;
  }, [activeVariant]);

  return (
    <div className="pt-16 pb-8 flex justify-center">
      <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link 
            to="/" 
            className="text-base text-minimal-grey hover:text-minimal-red transition-colors"
          >
            ← Back
          </Link>
        </div>
        
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-medium text-minimal-grey mb-2">
              Hello Potential Employer
            </h1>
            <p className="text-base text-minimal-grey leading-relaxed">
              {copy.pitch}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-medium text-minimal-grey mb-2">What I bring</h2>
              <ul className="space-y-1">
                {copy.brings.map((item, index) => (
                  <li key={index} className="text-base text-minimal-grey-dark">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-medium text-minimal-grey mb-2">Past Experience</h2>
              <ul className="space-y-1">
                {copy.highlights.map((item, index) => (
                  <li key={index} className="text-base text-minimal-grey-dark">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium text-minimal-grey mb-2">Relevant Projects</h2>
            <div className="space-y-2">
              {copy.projects.slice(0, 2).map((p) => (
                <div key={p.title} className="px-2 py-1 rounded hover:bg-minimal-grey-darker/20 transition-colors">
                  <h3 className="text-base font-medium text-minimal-grey mb-1">{p.title}</h3>
                  <p className="text-sm text-minimal-grey-dark mb-2">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-minimal-red hover:text-minimal-red-light transition-colors"
                      >
                        Demo →
                      </a>
                    )}
                    {p.liveSite && (
                      <a
                        href={p.liveSite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-minimal-red hover:text-minimal-red-light transition-colors"
                      >
                        Live Site →
                      </a>
                    )}
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-minimal-red hover:text-minimal-red-light transition-colors"
                      >
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link
                to="/projects"
                className="text-base text-minimal-red hover:text-minimal-red-light transition-colors"
              >
                View More Projects →
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium text-minimal-grey mb-2">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {copy.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2 py-1 bg-minimal-grey-darker text-minimal-grey rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireMe;
