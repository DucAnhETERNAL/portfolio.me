import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch GitHub repositories
 * @param {string} username - GitHub username
 * @param {number} limit - Maximum number of repos to fetch
 * @param {boolean} onlyPublic - Only fetch public repos
 */
const useGitHubRepos = (username, limit = 10, onlyPublic = true) => {
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username) {
            setLoading(false);
            return;
        }

        const fetchRepos = async () => {
            try {
                setLoading(true);
                setError(null);

                // GitHub REST API endpoint
                const url = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=${limit}`;

                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }

                const data = await response.json();

                // Filter public repos if needed and exclude forks
                let filteredRepos = data.filter(repo => {
                    if (onlyPublic && repo.private) return false;
                    // Exclude forks (optional - you can remove this if you want to show forks)
                    if (repo.fork) return false;
                    return true;
                });

                // Limit results
                filteredRepos = filteredRepos.slice(0, limit);

                setRepos(filteredRepos);
            } catch (err) {
                console.error('Error fetching GitHub repos:', err);
                setError(err.message);
                setRepos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchRepos();
    }, [username, limit, onlyPublic]);

    return { repos, loading, error };
};

export default useGitHubRepos;

