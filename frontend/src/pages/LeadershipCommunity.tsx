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
    title: 'Back End Developer',
    organization: 'Tech+UW',
    period: '2025 - Present',
    description: 'Developping a portal for junior students to be mentored by seniors. Working on a matching algorithm for mentors and mentees.',
    logo: 'Techplusuw.jpg',
    website: 'https://www.techplusuw.com/',
    founded: '',
    location: 'Waterloo, ON, Canada',
    orgDescription: 'Tech+UW is a student-run organization that provides resources, events, and a community for students interested in technology.'
  },
];

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
            {/* Logo and Organization Name */}
            <div className="flex items-center justify-center mb-2">
              <img 
                src={process.env.PUBLIC_URL + '/' + item.logo} 
                alt={`${item.organization} Logo`} 
                className="w-8 h-8 mr-2 rounded-full object-cover"
              />
              <Card
                name={item.organization}
                logo={process.env.PUBLIC_URL + '/' + (item.logo || '')}
                description={item.orgDescription || ''}
                location={item.location || ''}
                website={item.website || ''}
                founded={item.founded || ''}
              />
            </div>
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

