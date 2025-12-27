import React from 'react';

interface BlogPost {
  title: string;
  link?: string;
}

const blogPosts: BlogPost[] = [
  // Empty structure - user will add content
];

const Blog: React.FC = () => {
  if (blogPosts.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-medium text-minimal-grey mb-3">Blog</h2>
        <div className="space-y-1.5">
          {/* Blog posts will appear here */}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-medium text-minimal-grey mb-3">Blog</h2>
      <div className="space-y-1.5 flex flex-col items-center">
        {blogPosts.map((post, index) => (
          <div key={index}>
            {post.link ? (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-minimal-grey hover:text-minimal-red transition-colors"
              >
                {post.title}
              </a>
            ) : (
              <span className="text-base text-minimal-grey">{post.title}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

