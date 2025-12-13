export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  period: string;
  image: string;
  github?: string;
  demo?: string;
  liveSite?: string;
}

export const projects: ProjectItem[] = [
  {
    title: "Agentic Personal Assistant",
    period: "Jan. 2025 - Present",
    description: "AI-powered personal assistant that consumes contextual signals to infer user intent and proactively trigger actions.",
    technologies: ["Python", "Langchain", "Pinecone", "AWS", "Docker", "Google APIs"],
    github: "https://github.com/Lasdw6",
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
    image: "image.png"
  },
  {
    title: "Chess Game with Computer Players",
    period: "June 2024 - Aug. 2024",
    description: "Chess game with computer AI, real-time move generation, and OOP design.",
    technologies: ["C++", "std::vector", "OOP"],
    github: "https://github.com/Lasdw6/chess.exe",
    image: "Chess.jpg"
  }
];



