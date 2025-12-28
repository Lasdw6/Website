import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from '../shared/blogPosts';
import { projects } from '../shared/projects';

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

  // Company mapping: blog text -> { logo, slug }
  const companyMap: Record<string, { logo: string; slug: string }> = {
    'The Innovation Story': { logo: '/TIS.png', slug: 'the-innovation-story' },
    'Electron Online': { logo: '/electron.jpg', slug: 'electron-online' },
    'GOQii': { logo: '/GOQii.png', slug: 'goqii' },
    'Manulife': { logo: '/manulife.svg', slug: 'manulife' },
    'Scitara': { logo: '/Scitara.png', slug: 'scitara-technologies' },
  };

  // Helper function to render text with embedded links and company logos
  const renderTextWithLinks = (text: string) => {
    // First, handle markdown-style links: [text](url)
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: Array<{ type: 'text' | 'link'; content: string; url?: string }> = [];
    let lastIndex = 0;
    let match;
    let hasLinks = false;

    while ((match = linkPattern.exec(text)) !== null) {
      hasLinks = true;
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
      }
      // Add the link
      parts.push({ type: 'link', content: match[1], url: match[2] });
      lastIndex = match.index + match[0].length;
    }
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({ type: 'text', content: text.substring(lastIndex) });
    }

    // If no links found, just return the text with company logos
    if (!hasLinks) {
      const companyNames = Object.keys(companyMap).sort((a, b) => b.length - a.length);
      const companyPattern = new RegExp(`(${companyNames.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
      const textParts = text.split(companyPattern);
      
      return textParts.map((part, i) => {
        const companyKey = companyNames.find(name => name.toLowerCase() === part.toLowerCase());
        if (companyKey && companyMap[companyKey]) {
          const company = companyMap[companyKey];
          return (
            <span key={i} className="inline-flex items-center gap-0.5">
              <img 
                src={company.logo} 
                alt={`${companyKey} Logo`} 
                className="w-4 h-4 object-contain inline-block"
              />
              <Link
                to={`/work#${company.slug}`}
                className="underline text-minimal-grey hover:text-minimal-red transition-colors"
              >
                {part}
              </Link>
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      });
    }

    // Render parts with links
    const renderedParts: React.ReactNode[] = [];
    parts.forEach((part, i) => {
      if (part.type === 'link' && part.url) {
        // Check if it's an internal route or external URL
        if (part.url.startsWith('/')) {
          renderedParts.push(
            <Link
              key={i}
              to={part.url}
              className="underline text-minimal-grey hover:text-minimal-red transition-colors"
            >
              {part.content}
            </Link>
          );
        } else {
          renderedParts.push(
            <a
              key={i}
              href={part.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-minimal-grey hover:text-minimal-red transition-colors"
            >
              {part.content}
            </a>
          );
        }
      } else if (part.type === 'text') {
        // For text parts, check for companies
        const companyNames = Object.keys(companyMap).sort((a, b) => b.length - a.length);
        const companyPattern = new RegExp(`(${companyNames.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
        const textParts = part.content.split(companyPattern);
        
        textParts.forEach((textPart, j) => {
          const companyKey = companyNames.find(name => name.toLowerCase() === textPart.toLowerCase());
          if (companyKey && companyMap[companyKey]) {
            const company = companyMap[companyKey];
            renderedParts.push(
              <span key={`${i}-${j}`} className="inline-flex items-center gap-0.5">
                <img 
                  src={company.logo} 
                  alt={`${companyKey} Logo`} 
                  className="w-4 h-4 object-contain inline-block"
                />
                <Link
                  to={`/work#${company.slug}`}
                  className="underline text-minimal-grey hover:text-minimal-red transition-colors"
                >
                  {textPart}
                </Link>
              </span>
            );
          } else if (textPart) {
            renderedParts.push(<span key={`${i}-${j}`}>{textPart}</span>);
          }
        });
      }
    });
    
    return renderedParts;
  };

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
            <div className="text-base text-minimal-grey leading-normal">
              {post.content.split('\n').map((line, index) => {
                const trimmedLine = line.trim();
                // If line is not empty and doesn't start with bullet, it's a section header
                if (trimmedLine && !trimmedLine.startsWith('•')) {
                  return (
                    <h2 key={index} className="text-xl font-medium text-minimal-grey mt-4 mb-2 first:mt-0">
                      {trimmedLine}
                    </h2>
                  );
                }
                // Regular bullet point or empty line
                return (
                  <div key={index} className={trimmedLine ? 'mb-1' : 'mb-0.5'}>
                    {trimmedLine ? renderTextWithLinks(trimmedLine) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
