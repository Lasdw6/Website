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
    // Optional: Add GitHub token from environment variable for higher rate limits
    const token = process.env.REACT_APP_GITHUB_TOKEN;
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    
    // PHASE 1: Fast initial load from events API
    fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, {
      headers
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 403) {
            console.warn('GitHub API rate limit exceeded');
          }
          throw new Error('Failed to fetch events');
        }
        return response.json();
      })
      .then((events: any[]) => {
        // Collect commits from PushEvents
        const eventsCommits: Commit[] = [];
        
        for (const event of events) {
          if (event.type === 'PushEvent' && event.payload && event.payload.commits) {
            const repoName = event.repo.name;
            for (const commit of event.payload.commits) {
              const commitUrl = `https://github.com/${repoName}/commit/${commit.sha}`;
              eventsCommits.push({
                message: commit.message,
                sha: commit.sha,
                url: commitUrl,
                repo: repoName,
                date: event.created_at
              });
            }
          }
        }
        
        // Sort and show top 3 immediately
        if (eventsCommits.length > 0) {
          const sorted = eventsCommits.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          );
          setCommits(sorted.slice(0, 3));
          setLoading(false);
        } else {
          setLoading(false);
        }
        
        // PHASE 2: Background fetch from all repos (lazy load)
        // Fetch all repos to get complete picture
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
          headers
        })
          .then(response => {
            if (!response.ok) {
              return null;
            }
            return response.json();
          })
          .then((repos: any[]) => {
            if (!repos || repos.length === 0) {
              return;
            }
            
            // Get latest commits from all repos in background
            const commitPromises = repos.slice(0, 20).map(repo => 
              fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=5`, {
                headers
              })
              .then(res => {
                if (!res.ok) {
                  return null;
                }
                return res.json().then(commits => ({ commits, repo: repo.full_name }));
              })
              .catch(() => null)
            );
            
            Promise.all(commitPromises).then((results: any[]) => {
              const allCommits: Commit[] = [...eventsCommits];
              
              // Add commits from repos, avoiding duplicates
              results.forEach((result) => {
                if (result && result.commits && result.commits.length > 0) {
                  result.commits.forEach((commitData: any) => {
                    const isDuplicate = allCommits.some(ac => ac.sha === commitData.sha);
                    if (!isDuplicate) {
                      allCommits.push({
                        message: commitData.commit.message,
                        sha: commitData.sha,
                        url: commitData.html_url,
                        repo: result.repo,
                        date: commitData.commit.author.date
                      });
                    }
                  });
                }
              });
              
              // Sort all commits by date (most recent first) and update with top 3
              const sorted = allCommits.sort((a, b) => 
                new Date(b.date).getTime() - new Date(a.date).getTime()
              );
              
              if (sorted.length > 0) {
                setCommits(sorted.slice(0, 3));
              }
            }).catch(() => {
              // Silently fail background update
            });
          })
          .catch(() => {
            // Silently fail background fetch
          });
      })
      .catch((err) => {
        console.error('Error fetching GitHub profile commit:', err);
        // Fallback: try repos directly
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            ...(token ? { 'Authorization': `token ${token}` } : {})
          }
        })
        .then(res => res.ok ? res.json() : null)
        .then((repos: any[]) => {
          if (repos && repos.length > 0) {
            const commitPromises = repos.map(repo => 
              fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=5`, {
                headers: {
                  'Accept': 'application/vnd.github.v3+json',
                  ...(token ? { 'Authorization': `token ${token}` } : {})
                }
              })
              .then(res => res.ok ? res.json() : null)
              .catch(() => null)
            );
            
            Promise.all(commitPromises).then((commitArrays: any[]) => {
              const collectedCommits: Commit[] = [];
              commitArrays.forEach((commits, index) => {
                if (commits && commits.length > 0) {
                  commits.forEach((commitData: any) => {
                    collectedCommits.push({
                      message: commitData.commit.message,
                      sha: commitData.sha,
                      url: commitData.html_url,
                      repo: repos[index].full_name,
                      date: commitData.commit.author.date
                    });
                  });
                }
              });
              
              const sorted = collectedCommits.sort((a, b) => 
                new Date(b.date).getTime() - new Date(a.date).getTime()
              );
              
              if (sorted.length > 0) {
                setCommits(sorted.slice(0, 3));
              }
              setLoading(false);
            });
          } else {
            setError(true);
            setLoading(false);
          }
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
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

  if (error) {
    return null; // Silently fail on error
  }

  if (commits.length === 0) {
    return null; // No commits found
  }

  return (
    <div>
      <h2 className="text-xl font-medium text-minimal-grey mb-0.5">Recent commits</h2>
      <div className="space-y-0.5">
        {commits.map((commit, index) => {
          const commitMessage = commit.message.split('\n')[0]; // Get first line
          
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
