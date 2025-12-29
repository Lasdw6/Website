import React, { useState, useEffect } from 'react';
import { formatRelativeTime } from '../utils/dateUtils';

interface GitHubProfileCommitProps {
  username: string;
}

interface Commit {
  message: string;
  sha: string;
  url: string;
  repo: string;
  date: string;
}

const GitHubProfileCommit: React.FC<GitHubProfileCommitProps> = ({ username }) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const token = process.env.REACT_APP_GITHUB_TOKEN;
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    
    // Simple approach: fetch events first, then repos if needed
    fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, {
      headers
    })
      .then(response => {
        if (!response.ok) {
          // Handle rate limit gracefully - just hide the component
          if (response.status === 403) {
            setLoading(false);
            setError(true);
            return null;
          }
          throw new Error('Failed to fetch events');
        }
        return response.json();
      })
      .then((events: any[]) => {
        // If rate limited, events will be null
        if (!events) {
          return;
        }
        
        const eventsCommits: Commit[] = [];
        
        for (const event of events) {
          if (event.type === 'PushEvent' && event.payload && event.payload.commits) {
            const repoName = event.repo.name;
            for (const commit of event.payload.commits) {
              eventsCommits.push({
                message: commit.message,
                sha: commit.sha,
                url: `https://github.com/${repoName}/commit/${commit.sha}`,
                repo: repoName,
                date: event.created_at
              });
            }
          }
        }
        
        // Sort by date and take top 3
        const sorted = eventsCommits.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        
        if (sorted.length >= 3) {
          setCommits(sorted.slice(0, 3));
          setLoading(false);
        } else if (sorted.length > 0) {
          // If we have some commits, show them
          setCommits(sorted.slice(0, sorted.length));
          setLoading(false);
        } else {
          // No commits from events, try repos (but be careful about rate limits)
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`, {
            headers
          })
            .then(response => {
              if (!response.ok) {
                // If rate limited or error, just hide component
                setLoading(false);
                setError(true);
                return null;
              }
              return response.json();
            })
            .then((repos: any[]) => {
              if (!repos || repos.length === 0) {
                setLoading(false);
                setError(true);
                return;
              }
              
              // Get latest commit from each repo (only 3 repos to minimize requests)
              const commitPromises = repos.map(repo => 
                fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=1`, {
                  headers
                })
                  .then(res => {
                    if (!res.ok) {
                      return null;
                    }
                    return res.json();
                  })
                  .catch(() => null)
              );
              
              Promise.all(commitPromises).then((commitArrays: any[]) => {
                const allCommits: Commit[] = [];
                
                commitArrays.forEach((commits, index) => {
                  if (commits && commits.length > 0) {
                    const commitData = commits[0];
                    allCommits.push({
                      message: commitData.commit.message,
                      sha: commitData.sha,
                      url: commitData.html_url,
                      repo: repos[index].full_name,
                      date: commitData.commit.author.date
                    });
                  }
                });
                
                if (allCommits.length > 0) {
                  // Sort and take top 3
                  const finalSorted = allCommits.sort((a, b) => 
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                  );
                  setCommits(finalSorted.slice(0, 3));
                }
                setLoading(false);
              }).catch(() => {
                setLoading(false);
                setError(true);
              });
            })
            .catch(() => {
              setLoading(false);
              setError(true);
            });
        }
      })
      .catch((err) => {
        // Silently handle errors - just hide the component
        setError(true);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-medium text-minimal-grey mb-0.5">Recent commits</h2>
        <p className="text-xs text-minimal-grey-dark">Loading...</p>
      </div>
    );
  }

  if (error || commits.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl font-medium text-minimal-grey mb-0.5">Recent commits</h2>
      <div className="space-y-0.5">
        {commits.map((commit, index) => {
          const commitMessage = commit.message.split('\n')[0];
          
          return (
            <a
              key={index}
              href={commit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-2 py-0 rounded hover:bg-minimal-grey-darker/20 transition-colors"
            >
              <div className="text-base text-minimal-grey leading-tight">
                {commitMessage}
              </div>
              <div className="text-xs text-minimal-grey-dark leading-tight -mt-0.5">
                {commit.repo} · {formatRelativeTime(commit.date)}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default GitHubProfileCommit;
