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
    
    // Fetch latest push event from user's public activity
    // Try events first, if that fails or returns nothing, try getting repos and their latest commits
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
        const collectedCommits: Commit[] = [];
        
        for (const event of events) {
          if (event.type === 'PushEvent' && event.payload && event.payload.commits) {
            const repoName = event.repo.name;
            for (const commit of event.payload.commits) {
              collectedCommits.push({
                message: commit.message,
                sha: commit.sha,
                url: commit.url || `https://github.com/${repoName}/commit/${commit.sha}`,
                repo: repoName,
                date: event.created_at
              });
              if (collectedCommits.length >= 3) break;
            }
            if (collectedCommits.length >= 3) break;
          }
        }
        
        if (collectedCommits.length >= 3) {
          setCommits(collectedCommits.slice(0, 3));
          setLoading(false);
          return;
        }
        
        // If not enough commits from events, try fetching repos and getting latest commits
        return fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`, {
          headers
        });
      })
      .then((response) => {
        if (!response || !response.ok) {
          setLoading(false);
          return;
        }
        return response.json();
      })
      .then((repos: any[]) => {
        if (!repos || repos.length === 0) {
          setLoading(false);
          return;
        }
        
        // Get latest commits from the most recently updated repos
        const commitPromises = repos.slice(0, 3).map(repo => 
          fetch(`https://api.github.com/repos/${repo.full_name}/commits?per_page=1`, {
            headers
          }).then(res => res.ok ? res.json() : null)
        );
        
        return Promise.all(commitPromises).then((commitArrays: any[]) => {
          const collectedCommits: Commit[] = [];
          
          commitArrays.forEach((commits, index) => {
            if (commits && commits.length > 0 && collectedCommits.length < 3) {
              const commitData = commits[0];
              collectedCommits.push({
                message: commitData.commit.message,
                sha: commitData.sha,
                url: commitData.html_url,
                repo: repos[index].full_name,
                date: commitData.commit.author.date
              });
            }
          });
          
          if (collectedCommits.length > 0) {
            setCommits(collectedCommits.slice(0, 3));
          }
          setLoading(false);
        });
      })
      .catch((err) => {
        console.error('Error fetching GitHub profile commit:', err);
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
