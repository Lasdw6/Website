export interface ExperienceItem {
  title: string;
  company: string;
  logo: string;
  period: string;
  location: string;
  website?: string;
  description: string;
  achievements: string[];
  technologies: string[];
  skills?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    title: "Software Engineering Intern",
    company: "Manulife",
    logo: "/manulife.svg",
    period: "Sept. 2025 - Dec. 2025",
    location: "Toronto, Canada",
    website: "https://www.manulife.com/",
    description: "Worked on the GenAI Team at Manulife, a leading international financial services group. Focused on building secure, compliant AI agent systems for customer and operational use cases, with a particular emphasis on production reliability and scalability.",
    achievements: [
      "Owned backend orchestration and reliability for a production AI-driven incident triage system used by 1,000+ employees, reducing average triage time from 2 hours to 5 minutes. This system leveraged advanced LLM capabilities to automatically categorize, prioritize, and route incidents, significantly improving operational efficiency.",
      "Re-architected backend infrastructure after identifying critical scaling bottlenecks. Introduced Redis caching for frequently accessed data, implemented connection pooling to optimize database interactions, and migrated infrastructure to Terraform-managed deployments. These changes enabled the system to reliably support 10k+ daily requests with improved response times and reduced infrastructure costs.",
      "Served as on-call engineer during production deployments, diagnosing live failures and implementing immediate fixes. Drove the design and implementation of a comprehensive observability layer including latency metrics, structured logging, and execution metadata. This observability infrastructure dramatically improved agent debugging capabilities, reducing mean time to resolution (MTTR) for production issues."
    ],
    technologies: ["Python", "FastAPI", "React.js", "Azure", "Redis", "Terraform", "LLM APIs"],
    skills: ["Backend Orchestration", "System Reliability", "Infrastructure Scaling", "Observability", "Production Debugging", "AI Agent Systems"]
  },
  {
    title: "Software Engineering Intern",
    company: "GOQii",
    logo: "/GOQii.png",
    period: "May 2025 - Aug. 2025",
    location: "Mumbai, India",
    website: "https://www.goqii.com/",
    description: "Worked at GOQii, a global preventive healthcare platform that combines advanced wearable technology, expert coaching, and a holistic ecosystem to help users achieve healthier lifestyles. Focused on building AI-powered solutions to improve healthcare workflows and data processing.",
    achievements: [
      "Owned the design and development of a medical assistant application enabling doctors to query 50k+ patient records efficiently. The system utilized advanced RAG (Retrieval-Augmented Generation) techniques to provide contextual, accurate responses to medical queries. This innovation reduced information lookup time from 5 minutes to 30 seconds, allowing healthcare professionals to spend more time with patients and make faster, more informed decisions.",
      "Redesigned the unstructured data ingestion pipeline for medical reports, addressing critical data quality issues. Implemented robust parsing logic, error handling, and validation mechanisms that reduced parsing errors by 40% and significantly improved data reliability. The new pipeline handled diverse medical document formats including PDFs, scanned images, and structured text, ensuring consistent data extraction across all sources."
    ],
    technologies: ["Python", "Langchain", "RAG", "Vector Databases", "Data Processing", "AWS"],
    skills: ["RAG Systems", "Medical Data Processing", "Data Pipeline Design", "Vector Databases", "AWS Cloud Services"]
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "The Innovation Story",
    logo: "/TIS.png",
    period: "Dec. 2024 - Feb. 2025",
    location: "Remote, Canada",
    website: "https://theinnovationstory.com/",
    description: "Worked at The Innovation Story, a data-driven innovation company specializing in artificial intelligence, machine learning, and digital transformation solutions. Focused on developing lightweight, efficient ML models optimized for mobile and edge deployment.",
    achievements: [
      "Designed and implemented a lightweight, graph-based recommendation algorithm optimized for deployment in a mobile education application. The algorithm leveraged graph neural networks to model user-item interactions and learning patterns, providing personalized recommendations while maintaining low computational overhead. The solution was specifically engineered to run efficiently on mobile devices with limited processing power.",
      "Owned model development and evaluation for a custom computer vision system, achieving 94.3% mAP@0.5 with 206 ms CPU inference time. The model was designed to automate lab setup processes, reducing manual configuration time by 67%. This involved extensive hyperparameter tuning, data augmentation strategies, and model compression techniques to balance accuracy with inference speed. The system successfully identified and classified laboratory equipment and configurations, streamlining research workflows."
    ],
    technologies: ["PyTorch", "Computer Vision", "Graph Algorithms"],
    skills: ["Model Development", "Computer Vision", "Graph Neural Networks", "Model Optimization", "Mobile ML Deployment"]
  },
  {
    title: "Software Engineering Intern",
    company: "Electron Online",
    logo: "/electron.jpg",
    period: "Sep. 2024 - Dec. 2024",
    location: "Mumbai, India",
    website: "https://electrongroup.com/",
    description: "Worked at Electron Online, a technology startup focused on building scalable web and cloud solutions, integrating modern AI and automation for businesses. Contributed to building analytics platforms and large-scale data processing systems.",
    achievements: [
      "Owned backend development for an analytics platform processing 10,000+ social media posts per month. The platform enabled automated sentiment analysis and performance reporting for client businesses, providing actionable insights into social media engagement and brand perception. Built RESTful APIs, data aggregation services, and reporting dashboards that transformed raw social media data into meaningful business intelligence.",
      "Designed and built a large-scale data ingestion and processing pipeline handling 100GB+ of data per week. The pipeline integrated multiple social media APIs, implemented rate limiting and error handling, and processed data through various NLP models for sentiment analysis. Through optimization of data processing workflows and model fine-tuning, improved sentiment analysis accuracy by 15% and increased reliability of downstream reports. The system featured real-time processing capabilities and robust error recovery mechanisms."
    ],
    technologies: ["Python", "React.js", "Google Cloud", "LLM APIs"],
    skills: ["Backend Development", "Data Pipeline Engineering", "Sentiment Analysis", "Large-Scale Data Processing", "Cloud Infrastructure"]
  },
  {
    title: "Software Engineering Intern",
    company: "SciTara Technologies",
    logo: "/Scitara.png",
    period: "May 2022 - June 2022",
    location: "Marlborough, MA, USA",
    website: "https://scitara.com/",
    description: "Worked at SciTara Technologies, a scientific software company focused on laboratory automation and data integration for clinical and research environments. Contributed to developing solutions that streamline laboratory workflows and improve data collection processes.",
    achievements: [
      "Developed device automation solutions to streamline laboratory equipment operations, reducing manual intervention and improving efficiency in clinical data collection processes.",
      "Optimized data collection workflows and developed Excel macro solutions for processing and analyzing clinical data, enabling faster data processing and improved accuracy in research environments."
    ],
    technologies: ["Python", "NodeJS", "Excel"],
    skills: ["Device Automation", "Data Collection Optimization", "Excel Macro Development", "Clinical Data Processing"]
  }
];

