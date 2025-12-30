import React, { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { blogPosts } from '../shared/blogPosts';
import { mermaidDiagrams } from '../shared/mermaidDiagrams';
import mermaid from 'mermaid';

// Component to render Mermaid diagrams as images
const MermaidDiagram: React.FC<{ id: string; definition: string; description?: string }> = ({ id, definition, description }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isRendering, setIsRendering] = React.useState(true);

  useEffect(() => {
    const renderDiagram = async () => {
      if (!definition) return;

      setError(null);
      setIsRendering(true);

      try {
        // Wait a bit to ensure Mermaid is initialized
        await new Promise(resolve => setTimeout(resolve, 200));

        // Render the diagram - mermaid.render returns { svg, bindFunctions }
        const result = await mermaid.render(id, definition);
        
        if (result && result.svg) {
          setSvgContent(result.svg);
          setIsRendering(false);
        } else {
          throw new Error('No SVG returned from Mermaid');
        }
      } catch (err: any) {
        console.error('Error rendering Mermaid diagram:', err);
        setError(err?.message || 'Failed to render diagram');
        setIsRendering(false);
      }
    };

    renderDiagram();
  }, [id, definition]);

  // Scale the SVG after it's rendered and add borders to arrows for architecture diagram
  useEffect(() => {
    if (containerRef.current && svgContent) {
      const svg = containerRef.current.querySelector('svg');
      if (svg) {
        svg.style.width = '110%';
        svg.style.height = 'auto';
        svg.style.maxWidth = '1210px';
        
        // Add border to arrows for the architecture diagram using drop shadow filter
        if (id.includes('assistant-architecture-2')) {
          // Create filter for border effect if it doesn't exist
          let defs = svg.querySelector('defs');
          if (!defs) {
            defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            svg.insertBefore(defs, svg.firstChild);
          }
          
          if (!defs.querySelector('#arrow-border')) {
            const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
            filter.id = 'arrow-border';
            filter.setAttribute('x', '-50%');
            filter.setAttribute('y', '-50%');
            filter.setAttribute('width', '200%');
            filter.setAttribute('height', '200%');
            
            // Create border using multiple feMorphology and feFlood
            const feMorphology = document.createElementNS('http://www.w3.org/2000/svg', 'feMorphology');
            feMorphology.setAttribute('operator', 'dilate');
            feMorphology.setAttribute('radius', '1.5');
            feMorphology.setAttribute('in', 'SourceAlpha');
            feMorphology.setAttribute('result', 'thicken');
            
            const feFlood = document.createElementNS('http://www.w3.org/2000/svg', 'feFlood');
            feFlood.setAttribute('flood-color', '#000000');
            feFlood.setAttribute('flood-opacity', '0.8');
            feFlood.setAttribute('result', 'border');
            
            const feComposite1 = document.createElementNS('http://www.w3.org/2000/svg', 'feComposite');
            feComposite1.setAttribute('in', 'border');
            feComposite1.setAttribute('in2', 'thicken');
            feComposite1.setAttribute('operator', 'in');
            feComposite1.setAttribute('result', 'borderFill');
            
            const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
            const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
            feMergeNode1.setAttribute('in', 'borderFill');
            const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
            feMergeNode2.setAttribute('in', 'SourceGraphic');
            feMerge.appendChild(feMergeNode1);
            feMerge.appendChild(feMergeNode2);
            
            filter.appendChild(feMorphology);
            filter.appendChild(feFlood);
            filter.appendChild(feComposite1);
            filter.appendChild(feMerge);
            defs.appendChild(filter);
          }
          
          // Apply filter to all arrow paths
          const paths = svg.querySelectorAll('path[marker-end], path.flowchart-link');
          paths.forEach((path) => {
            (path as SVGPathElement).setAttribute('filter', 'url(#arrow-border)');
          });
        }
      }
    }
  }, [svgContent, id]);

  if (error) {
    return (
      <div className="my-6 p-4 bg-red-900/20 border border-red-500 rounded">
        <p className="text-red-500 text-sm">Error rendering diagram: {error}</p>
        <details className="mt-2">
          <summary className="text-xs text-minimal-grey-dark cursor-pointer">Show definition</summary>
          <pre className="text-xs mt-2 text-minimal-grey-dark overflow-auto whitespace-pre-wrap max-h-40">{definition}</pre>
        </details>
      </div>
    );
  }

  if (isRendering) {
    return (
      <div className="my-6 flex justify-center">
        <div className="text-minimal-grey-dark text-sm">Rendering diagram...</div>
      </div>
    );
  }

  if (!svgContent) {
    return null;
  }

  return (
    <div className="my-6">
      <div 
        className="flex justify-center overflow-x-auto w-screen"
        style={{
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          width: '100vw',
          maxWidth: '100vw'
        }}
      >
        <div 
          ref={containerRef}
          className="mermaid-diagram"
          dangerouslySetInnerHTML={{ __html: svgContent || '' }}
          style={{ 
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            maxWidth: '1210px'
          }}
        />
      </div>
      {description && (
        <p className="text-sm text-minimal-grey-dark text-center mt-3 px-4">
          {description}
        </p>
      )}
    </div>
  );
};

// Initialize Mermaid once globally
let mermaidInitialized = false;

const BlogDetail: React.FC = () => {
  const { blogSlug } = useParams<{ blogSlug: string }>();
  
  // Initialize Mermaid (must be before early return)
  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({ 
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#1e3a5f',
          primaryTextColor: '#f5f5f5',
          primaryBorderColor: '#1565c0',
          lineColor: '#424242',
          secondaryColor: '#512da8',
          tertiaryColor: '#d84315'
        }
      });
      mermaidInitialized = true;
    }
  }, []);

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

  // Parse content and insert Mermaid diagrams if specified
  const parseContent = (content: string, diagramConfig?: string | Array<{ key: string; insertAfter: string }>) => {
    const segments: Array<{ type: 'text' | 'mermaid'; content: string; id?: string; description?: string }> = [];
    
    if (!diagramConfig) {
      segments.push({ type: 'text', content });
      return segments;
    }

    const lines = content.split('\n');
    const insertionPoints: Array<{ index: number; diagramKey: string }> = [];
    
    // Handle single diagram (backward compatibility)
    if (typeof diagramConfig === 'string') {
      const keyword = 'rearchitected'; // Default keyword for single diagram
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(keyword)) {
          for (let j = i + 1; j <= lines.length; j++) {
            if (j === lines.length || lines[j].trim() === '') {
              insertionPoints.push({ index: j, diagramKey: diagramConfig });
              break;
            }
          }
          break;
        }
      }
    } else {
      // Handle multiple diagrams
      for (const diagram of diagramConfig) {
        for (let i = 0; i < lines.length; i++) {
          if (lines[i].toLowerCase().includes(diagram.insertAfter.toLowerCase())) {
            // Find the end of this paragraph (next empty line or end of content)
            for (let j = i + 1; j <= lines.length; j++) {
              if (j === lines.length || lines[j].trim() === '') {
                insertionPoints.push({ index: j, diagramKey: diagram.key });
                break;
              }
            }
            break;
          }
        }
      }
    }
    
    // Sort insertion points by index (descending) to insert from end to start
    insertionPoints.sort((a, b) => b.index - a.index);
    
    if (insertionPoints.length > 0) {
      let currentContent = content;
      
      // Insert diagrams from end to start to preserve indices
      for (const point of insertionPoints) {
        const linesArray = currentContent.split('\n');
        const beforeContent = linesArray.slice(0, point.index).join('\n');
        const afterContent = linesArray.slice(point.index).join('\n');
        
        const diagram = mermaidDiagrams[point.diagramKey];
        if (diagram) {
          currentContent = beforeContent + '\n\n[MERMAID:' + point.diagramKey + ']\n\n' + afterContent;
        }
      }
      
      // Now parse the content with markers
      const parts = currentContent.split(/\n\n\[MERMAID:([^\]]+)\]\n\n/);
      
      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
          // Text content
          if (parts[i].trim()) {
            segments.push({ type: 'text', content: parts[i] });
          }
        } else {
          // Diagram marker
          const diagramKey = parts[i];
          if (mermaidDiagrams[diagramKey]) {
            const diagram = mermaidDiagrams[diagramKey];
            segments.push({
              type: 'mermaid',
              content: typeof diagram === 'string' ? diagram : diagram.definition,
              id: `mermaid-${post.slug}-${diagramKey}-${Date.now()}-${i}`,
              description: typeof diagram === 'string' ? undefined : diagram.description
            });
          }
        }
      }
    } else {
      // No insertion points found, just return content as text
      segments.push({ type: 'text', content });
    }

    return segments;
  };

  const contentSegments = parseContent(post.content, post.mermaidDiagrams || post.mermaidDiagram);

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
            {post.subtitle && (
              <p className="text-sm text-minimal-grey-dark mt-2">{post.subtitle}</p>
            )}
          </div>

          <div>
            <div className="text-base text-minimal-grey leading-normal">
              {contentSegments.map((segment, segmentIndex) => {
                if (segment.type === 'mermaid' && segment.id) {
                  return <MermaidDiagram key={segment.id} id={segment.id} definition={segment.content} description={segment.description} />;
                }
                
                // Render text content
                return segment.content.split('\n').map((line, lineIndex) => {
                  const trimmedLine = line.trim();
                  const key = `segment-${segmentIndex}-line-${lineIndex}`;
                  
                  // Empty line
                  if (!trimmedLine) {
                    return <div key={key} className="mb-0.5" />;
                  }
                  
                  // Section header (starts with ##)
                  if (trimmedLine.startsWith('##')) {
                    const headerText = trimmedLine.substring(2).trim();
                    return (
                      <h2 key={key} className="text-xl font-medium text-minimal-grey mt-4 mb-2 first:mt-0">
                        {headerText}
                      </h2>
                    );
                  }
                  
                  // Bullet point
                  if (trimmedLine.startsWith('•')) {
                    return (
                      <div key={key} className="mb-1">
                        {renderTextWithLinks(trimmedLine)}
                      </div>
                    );
                  }
                  
                  // Regular paragraph text
                  return (
                    <p key={key} className="mb-3">
                      {renderTextWithLinks(trimmedLine)}
                    </p>
                  );
                });
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
