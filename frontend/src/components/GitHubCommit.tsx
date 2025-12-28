import React, { useState, useEffect } from 'react';
import { formatRelativeTime } from '../utils/dateUtils';

interface GitHubCommitProps {
  githubUrl: string;
}

interface CommitData {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  html_url: string;
}

const GitHubCommit: React.FC<GitHubCommitProps> = ({ githubUrl }) => {
  const [commit, setCommit] = useState<CommitData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Extract owner and repo from GitHub URL
    // Handle URLs like: https://github.com/owner/repo or github.com/owner/repo
    const url = githubUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const parts = url.split('/');
    
    // Need at least github.com, owner, and repo
    if (parts.length < 3 || parts[0] !== 'github.com') {
      setLoading(false);
      setError(true);
      return;
    }

    const owner = parts[1];
    const repo = parts[2];
    
    if (!owner || !repo) {
      setLoading(false);
      setError(true);
      return;
    }
    
    // Optional: Add GitHub token from environment variable for higher rate limits
    // Create .env file with: REACT_APP_GITHUB_TOKEN=your_token_here
    const token = process.env.REACT_APP_GITHUB_TOKEN;
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };
    
    if (token) {
      headers['Authorization'] = `token ${token}`;
    }
    
    // Fetch latest commit
    fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
      headers
    })
      .then(response => {
        if (!response.ok) {
          // Handle rate limiting
          if (response.status === 403) {
            console.warn('GitHub API rate limit exceeded');
          }
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then((data: CommitData[]) => {
        if (data && data.length > 0) {
          setCommit(data[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching GitHub commit:', err);
        setError(true);
        setLoading(false);
      });
  }, [githubUrl]);

  if (loading) {
    return (
      <div className="space-y-2">
        <h2 className="text-xl font-medium text-minimal-grey">Latest Commit</h2>
        <p className="text-sm text-minimal-grey-dark">Loading...</p>
      </div>
    );
  }

  if (error || !commit) {
    return null;
  }

  const commitMessage = commit.commit.message.split('\n')[0]; // Get first line of commit message

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-medium text-minimal-grey">Latest Commit</h2>
      <div className="text-sm text-minimal-grey">
        <a
          href={commit.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-minimal-red hover:text-minimal-red transition-colors"
        >
          {commitMessage}
        </a>
        <p className="text-xs text-minimal-grey-dark mt-1">
          {formatRelativeTime(commit.commit.author.date)}
        </p>
      </div>
    </div>
  );
};

export default GitHubCommit;
