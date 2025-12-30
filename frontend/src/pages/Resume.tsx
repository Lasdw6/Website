import React from 'react';
import { Link } from 'react-router-dom';

const Resume: React.FC = () => {
  return (
    <div className="pt-16 pb-8 flex justify-center">
      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link 
            to="/" 
            className="text-base text-minimal-grey hover:text-minimal-red transition-colors"
          >
            ← Back
          </Link>
        </div>
        <object data="/resume.pdf" type="application/pdf" width="100%" height="900px" className="rounded">
          <p className="text-minimal-grey-dark">
            Your browser does not support PDFs. Download here: <a href="/resume.pdf" download="Vividh_Mahajan_Resume.pdf" className="text-minimal-red hover:text-minimal-red-light transition-colors">Download Resume</a>.
          </p>
        </object>
      </div>
    </div>
  );
};

export default Resume; 