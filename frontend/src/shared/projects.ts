export interface ProjectItem {
  title: string;
  description: string;
  shortDescription?: string;
  technologies: string[];
  period: string;
  image: string;
  github?: string;
  commitRepo?: string;
  demo?: string;
  liveSite?: string;
  relatedProjects?: { title: string; github?: string; description?: string }[];
  hideFromHome?: boolean;
}

export const projects: ProjectItem[] = [
  {
    title: "Agentic Personal Assistant",
    period: "Jan. 2025 - Present",
    shortDescription: "Multi-agentic system for email and calendar management with distributed architecture.",
    description: "Multi-agentic system (APRIL) using MCP servers for email and calendar management. Features distributed architecture with FastAPI, Redis, Celery, and specialized agents. Implements role-based safety model separating read/write operations, RAG for document retrieval, and real-time status streaming via SSE.",
    technologies: ["Python", "FastAPI", "Langchain", "Redis", "Celery", "MCP", "Pinecone", "Docker"],
    github: "https://github.com/Lasdw6/agentic-personal-assistant",
    commitRepo: "https://github.com/Lasdw6/Assistant",
    image: "image.png",
    relatedProjects: [
      {
        title: "Assistant App",
        github: "https://github.com/Lasdw6/AssistantApp",
        description: "React Native mobile application for the Personal Assistant system"
      }
    ]
  },
  {
    title: "Desktop Agent",
    period: "2024 - Present",
    shortDescription: "Cross-platform desktop automation assistant with computer vision and OCR.",
    description: "Cross-platform desktop automation assistant built with Tauri (Rust + React) and Python Flask. Analyzes live desktop screens with computer vision and OCR to discover actionable UI elements. Executes element-aware actions with coordinate fallbacks, includes specialized browser automation for Windows, and integrates GPT for vision-based task completion.",
    technologies: ["Rust", "Tauri", "Python", "React", "TypeScript", "OpenCV", "OpenAI"],
    github: "https://github.com/Lasdw6/Desktop_Agent",
    image: "image.png"
  },
  {
    title: "Housing Search Agent",
    period: "2024 - Present",
    shortDescription: "AI agent for automated housing search using browser automation.",
    description: "AI agent for automated housing search using browser automation to filter listings by budget and location. Helps streamline the apartment hunting process by automating repetitive search tasks.",
    technologies: ["Python", "Playwright", "Browser Automation", "AI Agents"],
    github: "https://github.com/Lasdw6/HousingSearchAgent",
    image: "image.png"
  },
  {
    title: "Discoveriffy",
    period: "2024",
    shortDescription: "Flask web app that analyzes Spotify playlists and provides music recommendations.",
    description: "Flask web application that analyzes Spotify playlists using audio features (danceability, energy, valence, tempo) and provides personalized music recommendations. Features secure OAuth integration, playlist analysis, and smart recommendations based on audio characteristics.",
    technologies: ["Python", "Flask", "Spotify API", "Music Analysis", "OAuth"],
    github: "https://github.com/Lasdw6/Discoveriffy",
    image: "image.png"
  },
  {
    title: "Deep Research Agent",
    period: "Apr. 2025 - May 2025",
    shortDescription: "AI-powered research assistant for web search, image analysis, and multi-modal tasks.",
    description: "AI-powered research assistant (ScholarAI) that helps find answers by searching the web, analyzing images, processing audio, and handling code/data files. Built with LangChain and LangGraph, deployed on Hugging Face Spaces with Gradio interface. Tested on the GAIA benchmark.",
    technologies: ["Python", "Langgraph", "Langchain", "Gradio", "OpenAI"],
    liveSite: "https://huggingface.co/spaces/Lasdw/Deep_Research_Agent",
    github: "https://github.com/Lasdw6/Deep_Research_Assisntant",
    image: "Deep_Research_Agent.png"
  },
  {
    title: "Job Application Tracker",
    period: "June 2024 - Sep. 2024",
    shortDescription: "Web app for tracking job applications with LLM email parsing.",
    description: "Web app for tracking job applications, with LLM email parsing and cloud deployment.",
    technologies: ["Python", "Typescript", "React", "MongoDB", "OAuth2", "LLMs", "Git"],
    github: "https://github.com/Lasdw6",
    image: "JobTracker.png"
  },
  {
    title: "Tea Tree Chat",
    period: "June 2025 - Present",
    shortDescription: "BYOK chat application with multiple AI model support via OpenRouter.",
    description: "Modern BYOK (Bring Your Own Key) chat application built as a T3 Chat clone. Features real-time streaming responses, multiple AI model support via OpenRouter, chat forking and regeneration, encrypted API key storage, and JWT authentication. Built with Next.js frontend and FastAPI backend, deployed on Vercel and Render.",
    technologies: ["Python", "FastAPI", "Next.js", "Typescript", "Postgres", "OpenRouter", "JWT"],
    liveSite: "https://askteatree.chat",
    github: "https://github.com/Lasdw6/TeaTreeChat",
    image: "Teatree.png"
  },
  {
    title: "Personal Portfolio Website",
    period: "Mar. 2024 - Present",
    shortDescription: "Minimalistic personal portfolio website with project showcases and blog.",
    description: "Minimalistic personal portfolio website built with React and TypeScript. Features a clean, single-page design with project showcases, work experience, blog posts, and GitHub integration. Uses Tailwind CSS for styling with a dark navy and blue accent color scheme.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "React Router"],
    github: "https://github.com/Lasdw6/Website",
    liveSite: "https://vividh.lol",
    image: "image.png",
    hideFromHome: true
  },
  {
    title: "Chess Game with Computer Players",
    period: "June 2024 - Aug. 2024",
    shortDescription: "Chess game with computer AI and OOP design.",
    description: "Chess game with computer AI, real-time move generation, and OOP design.",
    technologies: ["C++", "std::vector", "OOP"],
    github: "https://github.com/Lasdw6/chess.exe",
    image: "Chess.jpg",
    hideFromHome: true
  }
];



