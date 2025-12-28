import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../shared/blogPosts';

const Blog: React.FC = () => {
  if (blogPosts.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-medium text-minimal-grey mb-0.5">Writing</h2>
        <div className="space-y-0.5">
          {/* Blog posts will appear here */}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-medium text-minimal-grey mb-0.5">Writing</h2>
      <div className="space-y-0.5">
        {blogPosts.map((post, index) => (
          <Link
            key={index}
            to={`/writing/${post.slug}`}
            className="block px-2 py-0 rounded hover:bg-minimal-grey-darker/20 transition-colors"
          >
            <div className="text-base text-minimal-grey">
              {post.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;

