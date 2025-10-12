import React from 'react';
import { motion, Variants } from 'framer-motion';
import Card from '../components/Card';

interface LeadershipItem {
  title: string;
  organization: string;
  period: string;
  description: string;
  logo: string;
  website?: string;
  founded?: string;
  location?: string;
  orgDescription?: string;
}

const leadershipItems: LeadershipItem[] = [
  {
    title: 'Syscom Engineer',
    organization: 'UW Computer Science Club',
    period: '2025 - Present',
    description: 'Managed and maintained club systems, contributed to technical infrastructure, and supported club events.',
    logo: 'UW.png',
    website: 'https://csclub.uwaterloo.ca/',
    founded: '1967',
    location: 'Waterloo, ON, Canada',
    orgDescription: 'The Computer Science Club at the University of Waterloo is a student-run organization that provides resources, events, and a community for students interested in computer science and technology.'
  },
  {
    title: 'Back End Developer',
    organization: 'Tech+UW',
    period: '2025 - Present',
    description: 'Developping a portal for junior students to be mentored by seniors. Working on a matching algorithm for mentors and mentees.',
    logo: 'techplusuw.jpg',
    website: 'https://www.techplusuw.com/',
    founded: '',
    location: 'Waterloo, ON, Canada',
    orgDescription: 'Tech+UW is a student-run organization that provides resources, events, and a community for students interested in technology.'
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 12, mass: 1 } }
};

const LeadershipCommunity: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-3xl font-bold text-black dark:text-dark-text mb-2">Clubs and Activities</h1>
        <p className="text-lg text-gray-700 dark:text-dark-muted">
          My clubs and activities outside of school
        </p>
      </motion.div>
      {/* Gallery Grid */}
      <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
        {leadershipItems.map((item, idx) => (
          <div key={idx} className="w-full bg-white dark:bg-dark-secondary p-4 md:p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col items-center transition-colors text-center">
            {/* Role/Title above the Card */}
            <h3 className="text-lg md:text-xl font-semibold text-black dark:text-dark-text mb-2 text-center">{item.title}</h3>
            {/* Always-visible Card for organization info */}
            <Card
              name={item.organization}
              logo={process.env.PUBLIC_URL + '/' + (item.logo || '')}
              description={item.orgDescription || ''}
              location={item.location || ''}
              website={item.website || ''}
              founded={item.founded || ''}
            />
            {/* Divider */}
            <div className="w-full border-t border-gray-200 dark:border-gray-600 my-3" />
            {/* Period and Description */}
            <div className="w-full text-center">
              <p className="text-xs md:text-sm text-gray-600 dark:text-dark-muted mb-2 text-center">{item.period}</p>
              <p className="text-gray-700 dark:text-dark-muted text-sm md:text-base text-center">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadershipCommunity; 