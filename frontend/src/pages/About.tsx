import React from 'react';
import { motion } from 'framer-motion';

interface AboutData {
  name: string;
  title: string;
  education: {
    school: string;
    degree: string;
    period: string;
    location: string;
    coursework: string[];
    externalCourses: string[];
  };
  skills: {
    languages: string[];
    tools: string[];
    frameworks: string[];
  };
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
  };
}

const aboutData: AboutData = {
  name: "Vividh Mahajan",
  title: "Computer Science Student at University of Waterloo",
  education: {
    school: "University of Waterloo",
    degree: "Bachelor of Mathematics in Combinatorics and Optimization, minor in Computer Science",
    period: "Sep. 2023 - Present",
    location: "Waterloo, ON",
    coursework: [
      "Tools for Software Development",
      "Algorithm Design and Data Abstraction",
      "Object-Oriented Software Development",
      "Linear Programming",
      "Optimization"
    ],
    externalCourses: [
      "Deep Learning Specialization - Deeplearning.ai (125 Hours - ongoing)"
    ]
  },
  skills: {
    languages: ["Python", "C++", "Typescript", "HTML", "CSS", "SQL", "Git"],
    tools: ["Docker", "AWS", "Google Cloud", "Pinecone", "LinuxCLI", "GitHub", "REST APIs"],
    frameworks: ["Pytorch", "React", "Langchain", "Huggingface", "OpenAI", "Scikit-learn", "Pandas", "Numpy"]
  },
  contact: {
    email: "v7mahaja@uwaterloo.ca",
    phone: "548-922-2600",
    github: "github.com/Lasdw6",
    linkedin: "linkedin.com/in/vividhm"
  }
};

const About: React.FC = () => {
  const skills = [
    'Python',
    'TypeScript',
    'React',
    'Node.js',
    'Machine Learning',
    'Data Analysis',
    'Optimization',
    'Combinatorics',
    'Mathematics',
    'Problem Solving',
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-black mb-8"
      >
        About Me
      </motion.h2>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">Education</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-black">University of Waterloo</h4>
                <p className="text-gray-700">Bachelor of Mathematics in Combinatorics and Optimization</p>
                <p className="text-gray-600">2023 - Present</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-black mb-2">Interests</h3>
            <p className="text-gray-700">
              I'm passionate about applying mathematical optimization and combinatorial
              techniques to solve real-world problems. My interests include machine
              learning, algorithm design, and mathematical modeling. I enjoy working
              on challenging problems that require both analytical thinking and
              practical implementation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 