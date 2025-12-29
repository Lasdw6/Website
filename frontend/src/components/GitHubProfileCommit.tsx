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
    // Check cache first
    const cacheKey = `github_commits_${username}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        const cacheAge = Date.now() - timestamp;
        const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
        
        if (cacheAge < CACHE_DURATION && data && data.length > 0) {
          setCommits(data);
          setLoading(false);
          return;
        }
      } catch (e) {
        // Invalid cache, continue to fetch
      }
    }
    
    const token = process.env.REACT_APP_GITHUB_TOKEN;
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    
    // Try authenticated endpoint first if token exists, fallback to public
    const tryAuthenticated = token ? true : false;
    const eventsUrl = tryAuthenticated
      ? `https://api.github.com/user/events?per_page=30`
      : `https://api.github.com/users/${username}/events/public?per_page=30`;
    
    // Simple approach: fetch events first, then repos if needed
    fetch(eventsUrl, {
      headers,
      mode: 'cors'
    })
      .then(response => {
        if (!response.ok) {
          // If authenticated endpoint fails (404/401), try public endpoint
          if (tryAuthenticated && (response.status === 404 || response.status === 401)) {
            // Fallback to public endpoint
            return fetch(`https://api.github.com/users/${username}/events/public?per_page=30`, {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
              },
              mode: 'cors'
            }).then(res => {
              if (!res.ok) {
                if (res.status === 403) {
                  setLoading(false);
                  setError(true);
                  return null;
                }
                throw new Error('Failed to fetch events');
              }
              return res.json();
            });
          }
          // Handle rate limit gracefully
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
          const finalCommits = sorted.slice(0, 3);
          setCommits(finalCommits);
          // Cache the results
          localStorage.setItem(cacheKey, JSON.stringify({
            data: finalCommits,
            timestamp: Date.now()
          }));
          setLoading(false);
          return;
        } else if (sorted.length > 0) {
          // If we have some commits, show them but also try to get more from repos
          setCommits(sorted.slice(0, sorted.length));
          setLoading(false);
          // Continue to fetch from repos to potentially get more commits
        }
        
        // No commits from events or need more, try repos (including private if token exists)
        const tryAuthRepos = token ? true : false;
        const reposUrl = tryAuthRepos
          ? `https://api.github.com/user/repos?sort=updated&per_page=10&affiliation=owner`
          : `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`;
        
        return fetch(reposUrl, {
          headers,
          mode: 'cors'
        })
          .then(response => {
            if (!response.ok) {
              // If authenticated endpoint fails, try public
              if (tryAuthRepos && (response.status === 404 || response.status === 401)) {
                return fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
                  headers: {
                    'Accept': 'application/vnd.github.v3+json',
                  },
                  mode: 'cors'
                }).then(res => {
                  if (!res.ok) {
                    setLoading(false);
                    setError(true);
                    return null;
                  }
                  return res.json();
                });
              }
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
            
            // Get latest commit from each repo (fetch from more repos to get better results)
            const commitPromises = repos.slice(0, 10).map(repo => 
              fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=1`, {
                headers,
                mode: 'cors'
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
              const allCommits: Commit[] = sorted.length > 0 ? [...sorted] : [];
              
              commitArrays.forEach((commits, index) => {
                if (commits && commits.length > 0) {
                  const commitData = commits[0];
                  // Check for duplicates
                  if (!allCommits.some(c => c.sha === commitData.sha)) {
                    allCommits.push({
                      message: commitData.commit.message,
                      sha: commitData.sha,
                      url: commitData.html_url,
                      repo: repos[index].full_name,
                      date: commitData.commit.author.date
                    });
                  }
                }
              });
              
              if (allCommits.length > 0) {
                // Sort and take top 3
                const finalSorted = allCommits.sort((a, b) => 
                  new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                const finalCommits = finalSorted.slice(0, 3);
                setCommits(finalCommits);
                // Cache the results
                localStorage.setItem(cacheKey, JSON.stringify({
                  data: finalCommits,
                  timestamp: Date.now()
                }));
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
