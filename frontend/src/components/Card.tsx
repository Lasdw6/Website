import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CardProps {
  name: React.ReactNode;
  logo: string;
  description: string;
  location?: string;
  website?: string;
  founded?: string;
  
}

export default function Card({
  name,
  logo,
  description,
  location,
  website,
  founded,
}: CardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  // Only run on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCardPosition({
        top: rect.height + 10, // 10px below the trigger
        left: rect.width / 2, // Center it relative to trigger
      });
    }
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300); // Small delay to allow mouse to move onto the card
  };

  if (!mounted) {
    return null; // Render nothing on the server side
  }

  return (
    <span
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block cursor-pointer text-red-600 dark:text-red-400 underline decoration-dotted decoration-gray-300 underline-offset-2"
    >
      {name}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: cardPosition.top,
              left: 0,
              zIndex: 1000,
              width: '320px', // Fixed width for the card
            }}
            className="bg-white dark:bg-dark-secondary p-4 rounded-lg shadow-lg border border-gray-400 dark:border-gray-500 flex flex-col"
          >
            {/* Header: Title */}
            <div className="flex items-center mb-3 border-b border-gray-400 dark:border-gray-500 pb-2">
              <h3 className="text-lg font-bold text-black dark:text-dark-text w-full text-center">{name}</h3>
            </div>
            {/* Middle: Logo, Description, Details */}
            <div className="flex flex-col items-center mb-4">
              <img src={logo} alt={`${name} Logo`} className="w-10 h-10 mb-2 rounded-full" />
              <p className="text-gray-700 dark:text-dark-muted text-sm mb-2 text-center">{description}</p>
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 text-center">{location}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 text-center">Founded: {founded}</div>
            </div>
            {/* Bottom: Visit Website */}
            <div className="mt-auto pt-2 border-t border-gray-400 dark:border-gray-500 text-center">
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-600 dark:bg-red-700 text-white px-3 py-1 rounded-md hover:bg-red-700 dark:hover:bg-red-600 transition-colors text-xs mt-2"
              >
                Visit Website
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
