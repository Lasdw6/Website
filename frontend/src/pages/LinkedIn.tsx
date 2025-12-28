import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LinkedIn: React.FC = () => {
  useEffect(() => {
    // Redirect to LinkedIn profile after a short delay
    const timer = setTimeout(() => {
      window.location.href = 'https://linkedin.com/in/vividhm';
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-16 pb-8 flex justify-center">
      <div className="max-w-lg w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link 
            to="/" 
            className="text-base text-minimal-grey hover:text-minimal-red transition-colors"
          >
            ← Back
          </Link>
        </div>
        <div className="text-center space-y-4">
          <svg
            className="h-16 w-16 mx-auto text-minimal-grey"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
          <h2 className="text-xl font-medium text-minimal-grey">
            Redirecting to LinkedIn...
          </h2>
          <a
            href="https://linkedin.com/in/vividhm"
            className="inline-block text-base text-minimal-red hover:text-minimal-red-light transition-colors"
          >
            Go to LinkedIn Profile →
          </a>
        </div>
      </div>
    </div>
  );
};

export default LinkedIn;

