export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  lastUpdated?: string;
  subtitle?: string;
  content: string;
  mermaidDiagram?: string; // Key to reference a diagram from mermaidDiagrams.ts
  mermaidDiagrams?: Array<{ key: string; insertAfter: string }>; // Multiple diagrams with insertion points
}

export const blogPosts: BlogPost[] = [
  {
    title: "How I learned to code by building",
    slug: "how-i-learned-to-code-by-building",
    date: "2025-12-28",
    lastUpdated: "2025-12-28",
    subtitle: "My coding journey in chronological order top to bottom",
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
  },
  {
    title: "My Favorite Project",
    slug: "my-favorite-project",
    date: "2024-02-20",
    lastUpdated: "2025-12-29",
    mermaidDiagrams: [
      { key: 'evaluator-optimizer-workflow', insertAfter: 'evaluator-optimizer workflow' },
      { key: 'assistant-architecture-2', insertAfter: 'rearchitected' }
    ],
    content: `My favorite project is the [Personal Assistant](/projects/agentic-personal-assistant) I built and actively use.

It started as a small automation script to handle email-related tasks I didn't want to think about, forwarding emails to my parents, keeping track of spending, and managing small bits of information I would otherwise ignore. It wasn't meant to become anything serious. It was simply solve an inconvinience of mine.

That usefulness is what kept pulling me back.

What began as a script quickly turned into a system. I started integrating additional tools like better web search, document ingestion and retrieval, and structured storage to expand the capabilities of the system. Each new capability like google drive and calendar access made the agent be spread thinner across multiple areas.

To manage this growing complexity of the agent, I began exploring different agentic architectures. I experimented with single-agent designs and settled on the [evaluator-optimizer workflow](https://www.anthropic.com/engineering/building-effective-agents#workflow-evaluator-optimizer) for the agent, along with adding retrieval-augmented generation and both short-term and long-term memory. This shifted the assistant from something reactive into something that could accumulate context over time.

To make the assistant accessible outside my machine, I hosted it on a virtual machine on AWS and built a mobile interface using React Native and Expo. That decision added an entirely new world of possibilities to build out the assistant. 

After using this version for a while, it became clear what was still missing. The assistant was capable, but it was still reactive. I had to ask for help explicitly to get value out of it. If it was going to feel like a real personal assistant, it needed a degree of independence.

So, I rearchitected the agent to have a more independent behaviour. The assistant now gets signals like my location (from the mobile app), calendar, and inbox, and infers actions and give suggestions based on changing context rather than explicit instructions. Sub-agents monitor different domains of context and coordinate through shared state rather than direct instructions

For example, the assistant can see my calendar and know that I was planning to go to the gym right now, but my location shows me still at my house, it would then propose a reschedule for the gym session, and adjust the other events in my calendar accordingly.

This project isn't finished, and it probably never will be. It has been the biggest project I have undertaken till date and has been the most rewarding project for me, in terms of building skill and actual day-to-day impact.

That's why this is my favourite project.`
  }
];
