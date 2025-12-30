import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HoverCardProps {
  children: React.ReactNode;
  content: {
    title?: string;
    description?: string;
    technologies?: string[];
    period?: string;
    location?: string;
    website?: string;
  };
}

const HoverCard: React.FC<HoverCardProps> = ({ children, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [cardPosition, setCardPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCardPosition({
        top: rect.height + 10,
        left: 0,
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
    }, 200);
  };

  return (
    <span
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block cursor-pointer"
    >
      {children}
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
              left: cardPosition.left,
              zIndex: 1000,
              width: '300px',
            }}
            className="bg-minimal-black-alt border border-minimal-grey-darker p-4 rounded-lg shadow-lg"
          >
            {content.title && (
              <h3 className="text-base font-medium text-minimal-grey mb-2">{content.title}</h3>
            )}
            {content.description && (
              <p className="text-xs text-minimal-grey mb-2">{content.description}</p>
            )}
            {content.technologies && content.technologies.length > 0 && (
              <div className="mb-2">
                <div className="flex flex-wrap gap-1">
                  {content.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-1.5 py-0.5 bg-minimal-grey-darker text-minimal-grey rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {content.period && (
              <p className="text-xs text-minimal-grey-dark mb-1">{content.period}</p>
            )}
            {content.location && (
              <p className="text-xs text-minimal-grey-dark mb-1">{content.location}</p>
            )}
            {content.website && (
              <a
                href={content.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-minimal-red hover:underline"
              >
                Visit Website
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default HoverCard;

