import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from '../shared/blogPosts';

const BlogDetail: React.FC = () => {
  const { blogSlug } = useParams<{ blogSlug: string }>();
  
  const post = blogPosts.find(p => p.slug === blogSlug);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const calculateReadTime = (content: string): number => {
    // Average reading speed is about 200-250 words per minute, using 225 as average
    const words = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(words / 225);
    return readTime;
  };

  const readTime = calculateReadTime(post.content);

  return (
    <div className="pt-16 pb-8 flex justify-center">
      <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <div>
            <Link 
              to="/" 
              className="text-base text-minimal-grey hover:text-minimal-red transition-colors"
            >
              ← Back
            </Link>
            <h1 className="text-4xl font-medium text-minimal-grey mt-2 mb-1">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-minimal-grey-dark">
              <span>Updated {formatDate(post.lastUpdated || post.date)}</span>
              <span>·</span>
              <span>{readTime} min read</span>
            </div>
          </div>

          <div>
            <div className="text-base text-minimal-grey leading-normal whitespace-pre-line">
              {post.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
