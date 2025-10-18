import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { projects as allProjects } from '../shared/projects';

const HireMe: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // No query params used anymore; capitalization decides and cookie persists
  // Cookie helpers to persist selected variant
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
  // One-time lock to avoid overwriting the chosen cookie on immediate redirect
  const hasLock = (): boolean => {
    try { return sessionStorage.getItem('hire_variant_lock') === '1'; } catch { return false; }
  };
  const setLock = () => {
    try { sessionStorage.setItem('hire_variant_lock', '1'); } catch { /* ignore */ }
  };
  useEffect(() => {
    // Clear lock after mount so future navigations behave normally
    try { sessionStorage.removeItem('hire_variant_lock'); } catch { /* ignore */ }
  }, []);
  // Initialize from storage first
  const savedCookie = getCookie('hire_variant');
  const savedStore = getStoredVariant();
  let activeVariant: 'fullstack' | 'agent' = (savedCookie === 'agent' || savedStore === 'agent')
    ? 'agent'
    : (savedCookie === 'fullstack' || savedStore === 'fullstack')
      ? 'fullstack'
      : 'fullstack';
  const path = location.pathname;
  const lower = path.toLowerCase();
  // Apply path/query triggers only when not in locked redirect state
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
  // After setting via capitalization/alias/query, redirect to canonical /hireme with no query
  useEffect(() => {
    if (path === '/Hireme') {
      setLock();
      navigate('/hireme', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, navigate]);
  const variantCopy: Record<'fullstack' | 'agent', {
    pitch: string;
    brings: string[];
    highlights: string[];
    skills: string[];
    projects: { title: string; description: string; image?: string; liveSite?: string; github?: string; demo?: string; }[];
  }> = {
    fullstack: {
      pitch:
        "I'm Vividh. I think I would be a great fit for your company as I have experience working across the stack, including my internships and personal projects.",
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
      pitch:
      "I like to build AI agents (especially ones that solve my own problems) and I think I’d be a great fit because I’ve worked across the stack, in internships and personal projects.",
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
    <div className="pt-20 pb-6 px-4" style={{ minHeight: 'calc(100vh - 64px)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto"
      >
        <div className="bg-white dark:bg-dark-secondary border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-3">
              </div>
              <h1 className="text-5xl sm:text-3xl font-bold text-gray-900 dark:text-dark-text mb-4">
                Hello Potential Employer
              </h1>
              <p className="text-gray-700 dark:text-dark-muted text-xl sm:text-2xl leading-relaxed mb-6">
                {copy.pitch}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-tertiary dark:to-dark-primary border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-3 flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                  What I bring
                </h2>
                <ul className="space-y-2 text-base">
                  {copy.brings.slice(0, 3).map((item, index) => (
                    <li key={item} className="flex items-start">
                      <span className="text-red-500 mr-3 mt-1">•</span>
                      <span className="text-gray-700 dark:text-dark-muted leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-tertiary dark:to-dark-primary border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-3 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                  Past Experience
                </h2>
                <ul className="space-y-2 text-base">
                  {copy.highlights.slice(0, 3).map((item, index) => (
                    <li key={item} className="flex items-start">
                      <span className="text-blue-500 mr-3 mt-1">•</span>
                      <span className="text-gray-700 dark:text-dark-muted leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-4 flex items-center">
                <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                Relevant Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {copy.projects.slice(0, 2).map((p) => (
                  <div key={p.title} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-tertiary dark:to-dark-primary border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-dark-text">{p.title}</h3>
                      <p className="text-base text-gray-700 dark:text-dark-muted leading-relaxed">{p.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {p.demo && (
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors text-sm font-medium"
                          >
                            Demo
                          </a>
                        )}
                        {p.liveSite && (
                          <a
                            href={p.liveSite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            Live Site
                          </a>
                        )}
                        {p.github && (
                          <a
                            href={p.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors text-sm font-medium"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-text mb-4 flex items-center">
                <span className="w-4 h-4 bg-purple-500 rounded-full mr-3"></span>
                Tech Stack Summary
              </h2>
              <div className="flex flex-wrap gap-3">
                {copy.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full text-base font-medium bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 dark:from-purple-900/30 dark:to-purple-800/30 dark:text-purple-300 border border-purple-200 dark:border-purple-700 hover:shadow-md transition-shadow"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HireMe;


