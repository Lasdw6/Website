export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  lastUpdated?: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Why I Code (and What I Avoid Building)",
    slug: "why-i-code-and-what-i-avoid-building",
    date: "2024-01-15",
    lastUpdated: "2024-12-10",
    content: `I've been coding for several years now, and I've learned that not every problem needs a technical solution. Some of the best code I've written is the code I didn't write at all.

When I first started programming, I wanted to build everything. Every idea seemed like a potential project. But over time, I've developed a clearer sense of what's worth building and what isn't.

The projects that excite me most are the ones that solve real problems I face daily. They're the tools that make my workflow smoother, the scripts that automate repetitive tasks, and the applications that genuinely improve how I work or learn.

I avoid building things just because I can. I avoid building things that already exist and work well. I avoid building things that don't solve a problem I actually have.

This approach has led me to focus on AI agents and automation tools—things that genuinely make a difference in how I approach problems. It's not about the technology for its own sake; it's about what the technology enables.

The best code is often the simplest code that solves the problem. And sometimes, the best solution is recognizing that code isn't the solution at all.`
  },
  {
    title: "My Favorite Project (and Why It Kept Growing)",
    slug: "my-favorite-project-and-why-it-kept-growing",
    date: "2024-02-20",
    lastUpdated: "2024-12-05",
    content: `Every developer has that one project—the one that started small but kept growing, the one that taught you more than you expected, the one you're still excited about months later.

For me, that project is my personal assistant agent. It started as a simple script to help me manage my daily tasks, but it's evolved into something much more comprehensive.

What began as a basic task organizer has grown to include email management, calendar integration, research capabilities, and even some light automation for my development workflow. Each new feature came from a real need I encountered while using it.

The project kept growing because I kept using it. Every time I thought "I wish this could do X," I had the opportunity to build that feature. It became a living project, constantly evolving based on my actual usage patterns.

This taught me something important about software development: the best projects are the ones you actually use. When you're your own user, you have immediate feedback on what works and what doesn't. You understand the pain points because you experience them yourself.

The project is still growing. I'm still adding features, still refining the experience, still learning from how I use it. And that's what makes it my favorite—it's not finished, and that's okay. It's a tool that grows with me.`
  },
  {
    title: "How I Found My Way Here",
    slug: "how-i-found-my-way-here",
    date: "2025-12-28",
    lastUpdated: "2025-12-28",
    content: `• Participated in a Google-hosted Scratch game making competition

• Tried making games on Roblox and learned a little bit of Lua

• Learned Java in highschool for core programming concepts

• Watched tutorials on Android development using Android Studio

• Built an MP3 player app in Kotlin with playback controls and background state

• Interned at Scitara and learned about the basics of software development

• Built multiple websites for my school's annual events

• Learnt Racket in university for functional programming concepts

• Completed Harvard CS50, a course on computer science fundamentals

• Participated in my first hackathon, nwHacks

• Built ByteBites in 48hours at nwHacks

• Made the first version of my [personal website](/projects/personal-portfolio-website)

• Built [Discoverify](/projects/discoveriffy), a music recommendation project

• Learned C and C++ programming

• Built a [chess project](/projects/chess-game-with-computer-players) with computer players in C++

• Interned at Electron Online, working with web scraping systems and LLMs

• Built the first version of a [Job Application Tracker](/projects/job-application-tracker)

• Interned at The Innovation Story, working on ML and computer vision projects

• Worked with YOLOv11 for the first time

• Started learning about AI agents and orchestration with Langchain and Langgraph

• Began building my [Personal Assistant](/projects/agentic-personal-assistant) project

• Rebuilt the [Job Application Tracker](/projects/job-application-tracker) with a new UI and auth

• Got my first users for the [Job Application Tracker](/projects/job-application-tracker)

• Interned at GOQii, working on RAG system for doctors to search patient data

• Rebuilt the document parsing pipeline for structured retrieval

• Completed the Hugging Face Agents Course

• Built a [Deep Research Agent](/projects/deep-research-agent) tested on the GAIA benchmark

• Participated in a T3 Chat clone-athon and built [TeaTreeChat](/projects/tea-tree-chat)

• Completed the [Deep Learning Specialization](https://coursera.org/share/b722169277c094f23e8acc25495ffdbd) by DeepLearning.AI

• Built a [desktop agent](/projects/desktop-agent) using Tauri capable of controlling the screen

• Built a React Native mobile app for my [Personal Assistant](/projects/agentic-personal-assistant)

• Built a [housing search agent](/projects/housing-search-agent) to help me find a place to live

• Interned at Manulife, building an agentic incident-management system

• Worked with Terraform for the first time

• Joined [UW Tech+ club](https://www.techplusuw.com/) and built internal automation for hiring processes

• Updated [TeaTreeChat](/projects/tea-tree-chat) with new models and features

• Rebuilt my [Personal Assistant](/projects/agentic-personal-assistant) with a proactive, event-driven architecture

• Rebranded and refined my [personal website](/projects/personal-portfolio-website) to reflect current focus`
  }
];
