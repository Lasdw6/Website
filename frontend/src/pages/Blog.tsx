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
          <div key={index}>
            {post.link ? (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-2 py-0 rounded hover:bg-minimal-grey-darker/20 transition-colors"
              >
                <div className="text-base text-minimal-grey">
                  {post.title}
                </div>
              </a>
            ) : (
              <div className="px-2 py-0 rounded hover:bg-minimal-grey-darker/20 transition-colors">
                <div className="text-base text-minimal-grey">
                  {post.title}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;

