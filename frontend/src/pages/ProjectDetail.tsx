import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../shared/projects';
import GitHubCommit from '../components/GitHubCommit';

const ProjectDetail: React.FC = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();

  // Create slug from title: lowercase, replace spaces with hyphens
  const project = projects.find(p =>
    p.title.toLowerCase().replace(/\s+/g, '-') === projectSlug
  );

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const primaryLink = project.demo || project.liveSite || project.github;

  // Function to render text with markdown-style links
  const renderTextWithLinks = (text: string) => {
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

    // If no links found, just return the text
    if (!hasLinks) {
      return <>{text}</>;
    }

    // Render parts with links
    return (
      <>
        {parts.map((part, index) => {
          if (part.type === 'link') {
            // Check if it's an internal route (starts with /) or external URL
            if (part.url?.startsWith('/')) {
              return (
                <Link
                  key={index}
                  to={part.url}
                  className="text-minimal-red hover:underline"
                >
                  {part.content}
                </Link>
              );
            } else {
              return (
                <a
                  key={index}
                  href={part.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-minimal-red hover:underline"
                >
                  {part.content}
                </a>
              );
            }
          }
          return <span key={index}>{part.content}</span>;
        })}
      </>
    );
  };

  return (
    <div className="pt-16 pb-8 flex justify-center">
      <div className="max-w-2xl w-full px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="mb-8">
            <Link
              to="/"
              className="text-base text-minimal-grey hover:text-minimal-red transition-colors"
            >
              ← Back
            </Link>
            <h1 className="text-4xl font-medium text-minimal-grey mt-4 mb-2">
              {project.title}
            </h1>
            <p className="text-sm text-minimal-grey-dark">{project.period}</p>
          </div>

          <div className="space-y-6">
            <div className="text-base text-minimal-grey leading-relaxed">
              {project.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className={index > 0 ? 'mt-4' : ''}>
                  {renderTextWithLinks(paragraph)}
                </p>
              ))}
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-medium text-minimal-grey">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs px-2 py-1 bg-minimal-grey-darker text-minimal-grey rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {(project.commitRepo || project.github) && /github\.com\/[^/]+\/[^/]+/.test(project.commitRepo || project.github || '') && (
              <GitHubCommit githubUrl={project.commitRepo || project.github || ''} />
            )}

            {primaryLink && (
              <div className="space-y-3">
                <h2 className="text-xl font-medium text-minimal-grey">Links</h2>
                <div className="flex flex-wrap gap-4">
                  {project.liveSite && (
                    <a
                      href={project.liveSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-minimal-red hover:underline"
                    >
                      Live Site →
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-minimal-red hover:underline"
                    >
                      GitHub →
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-minimal-red hover:underline"
                    >
                      Demo →
                    </a>
                  )}
                </div>
              </div>
            )}

            {project.relatedProjects && project.relatedProjects.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-xl font-medium text-minimal-grey">Related Projects</h2>
                <div className="space-y-2">
                  {project.relatedProjects.map((related, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base text-minimal-grey">{related.title}</span>
                        {related.github && (
                          <a
                            href={related.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-minimal-red hover:underline"
                          >
                            GitHub →
                          </a>
                        )}
                      </div>
                      {related.description && (
                        <p className="text-sm text-minimal-grey-dark">{related.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

