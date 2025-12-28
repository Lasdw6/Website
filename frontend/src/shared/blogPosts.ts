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
    date: "2024-03-10",
    lastUpdated: "2024-12-08",
    content: `• Started with an interest in mathematics, drawn to the elegance of proofs and solving complex problems

• Realized pure math wasn't quite what I was looking for—I wanted to build things with immediate impact

• Discovered programming, which combined the logical thinking I loved from math with the ability to create something tangible

• Chose University of Waterloo for Math and CS—the perfect combination of theoretical foundation and practical application

• Worked at several companies, each teaching me something different about what it means to be a software engineer

• Learned that the best work happens when solving real problems for real people

• Still finding my way, still learning, still growing—every project and internship brings me closer to understanding what I want to build and why`
  }
];
