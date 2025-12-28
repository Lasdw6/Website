export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  period: string;
  image: string;
  github?: string;
  demo?: string;
  liveSite?: string;
  relatedProjects?: { title: string; github?: string; description?: string }[];
  hideFromHome?: boolean;
}

export const projects: ProjectItem[] = [
  {
    title: "Agentic Personal Assistant",
    period: "Jan. 2025 - Present",
    description: "Multi-agentic system using MCP servers for email and calendar management. Built with FastAPI, Redis, Celery, and specialized agents for inbox, calendar, and scheduling tasks.",
    technologies: ["Python", "FastAPI", "Langchain", "Redis", "Celery", "MCP", "Pinecone", "Docker"],
    github: "https://github.com/Lasdw6/agentic-personal-assistant",
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
    description: "Cross-platform desktop automation assistant built with Tauri (Rust + React) and Python. Features computer vision UI element discovery, OCR, browser automation, and LLM integration.",
    technologies: ["Rust", "Tauri", "Python", "React", "TypeScript", "OpenCV", "OpenAI"],
    github: "https://github.com/Lasdw6/Desktop_Agent",
    image: "image.png"
  },
  {
    title: "Housing Search Agent",
    period: "2024 - Present",
    description: "AI agent for automated housing search using browser automation to filter listings by budget and location.",
    technologies: ["Python", "Playwright", "Browser Automation", "AI Agents"],
    github: "https://github.com/Lasdw6/HousingSearchAgent",
    image: "image.png"
  },
  {
    title: "Discoveriffy",
    period: "2024",
    description: "Music recommendation project experimenting with song similarity and discovery algorithms.",
    technologies: ["Python", "Music Analysis", "Recommendation Systems"],
    github: "https://github.com/Lasdw6/Discoveriffy",
    image: "image.png"
  },
  {
    title: "Deep Research Agent",
    period: "Apr. 2025 - May 2025",
    description: "Research agent integrating multiple tools and ReAct pattern for decision-making.",
    technologies: ["Python", "Langgraph", "Langchain", "Git"],
    liveSite: "https://huggingface.co/spaces/Lasdw/Deep_Research_Agent",
    github: "https://github.com/Lasdw6/Deep_Research_Assisntant",
    image: "Deep_Research_Agent.png"
  },
  {
    title: "Job Application Tracker",
    period: "June 2024 - Sep. 2024",
    description: "Web app for tracking job applications, with LLM email parsing and cloud deployment.",
    technologies: ["Python", "Typescript", "React", "MongoDB", "OAuth2", "LLMs", "Git"],
    github: "https://github.com/Lasdw6",
    image: "JobTracker.png"
  },
  {
    title: "Tea Tree Chat",
    period: "June 2025 - Present",
    description: "Open-source BYOK chat app alternative to ChatGPT, built with FastAPI and AWS.",
    technologies: ["Python", "FastAPI", "Next.js", "Typescript", "Postgres", "Langchain", "Git"],
    liveSite: "https://askteatree.chat",
    github: "https://github.com/Lasdw6/TeaTreeChat",
    image: "Teatree.png"
  },
  {
    title: "Personal Portfolio Website",
    period: "Mar. 2024 - Present",
    description: "Modern, responsive portfolio website with animations and project showcase.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Git"],
    github: "https://github.com/Lasdw6/Website",
    liveSite: "https://vividh.lol",
    image: "image.png",
    hideFromHome: true
  },
  {
    title: "Chess Game with Computer Players",
    period: "June 2024 - Aug. 2024",
    description: "Chess game with computer AI, real-time move generation, and OOP design.",
    technologies: ["C++", "std::vector", "OOP"],
    github: "https://github.com/Lasdw6/chess.exe",
    image: "Chess.jpg",
    hideFromHome: true
  }
];



