export interface EducationItem {
  degree: string;
  shortDegree?: string;
  university: string;
  location: string;
  period: string;
  logo: string;
  website?: string;
  description: string;
  achievements?: string[];
  coursework?: string[];
  externalCourses?: string[];
  gpa?: string;
}

export const education: EducationItem[] = [
  {
    degree: "Bachelor of Mathematics in Combinatorics and Optimization, minor in Computer Science",
    shortDegree: "Math and CS",
    university: "University of Waterloo",
    location: "Waterloo, ON",
    period: "Sep. 2023 - Present",
    logo: "/UW.png",
    website: "https://uwaterloo.ca/",
    description: "Pursuing a Bachelor of Mathematics degree with a major in Combinatorics and Optimization and a minor in Computer Science at the University of Waterloo, one of Canada's leading institutions for mathematics, computer science, and engineering. The program combines rigorous mathematical theory with practical computational applications, preparing students for careers in optimization, algorithms, and software development.",
    achievements: [
      "Presidents Scholarship Recipient - Recognized for academic excellence and outstanding academic performance",
      "Computer Science Club Syscom Engineer - Contributed to the technical infrastructure and systems administration of the university's Computer Science Club, helping maintain and improve club services and resources for students",
      "Tech+ Club Backend Engineer - Developed and maintained backend systems for Tech+ Club, supporting club operations and technical initiatives"
    ],
    coursework: [
      "Object-Oriented Software Development - Comprehensive study of OOP principles, design patterns, and software engineering practices",
      "Linear Programming - Advanced optimization techniques, simplex method, duality theory, and applications in operations research",
      "Optimization - Mathematical optimization methods, convex optimization, and algorithmic approaches to solving optimization problems"
    ],
    externalCourses: [
      "Deep Learning Specialization - Deeplearning.ai (125 hours) - Comprehensive course covering neural networks, convolutional networks, sequence models, and deep learning applications"
    ]
  }
];

