import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PROFILE_URL = 'https://x.com/Lasdvv';

const Twitter: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = PROFILE_URL;
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
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <h2 className="text-xl font-medium text-minimal-grey">
            Redirecting to X...
          </h2>
          <a
            href={PROFILE_URL}
            className="inline-block text-base text-minimal-red hover:text-minimal-red-light transition-colors"
          >
            Go to profile →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Twitter;
