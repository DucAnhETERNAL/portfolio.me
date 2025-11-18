import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch and aggregate GitHub repository languages
 * @param {string} username - GitHub username
 * @param {number} reposLimit - Maximum number of repos to analyze
 * @param {string} token - GitHub Personal Access Token (optional, required for private repos)
 * @param {boolean} includePrivate - Whether to include private repos
 */
const useGitHubLanguages = (username, reposLimit = 100, token = null, includePrivate = false) => {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username) {
            setLoading(false);
            return;
        }

        const fetchLanguages = async () => {
            try {
                setLoading(true);
                setError(null);

                // Validate token if provided
                const isClassicToken = token && token.startsWith('ghp_');
                const isFineGrainedToken = token && (token.startsWith('github_pat_') || token.startsWith('github_'));

                // First, get ALL repositories (fetch all pages)
                // GitHub Stats API counts ALL repos, not just recent ones
                let allRepos = [];
                let page = 1;
                let hasMore = true;

                // Prepare headers for API requests
                const headers = {
                    'Accept': 'application/vnd.github.v3+json',
                };
                if (token) {
                    // GitHub API accepts different formats:
                    // - Classic tokens (ghp_...): Use 'token' or 'Bearer'
                    // - Fine-grained tokens (github_pat_... or github_...): Use 'Bearer'
                    // For fine-grained tokens, must use Bearer format
                    if (isClassicToken) {
                        // Classic token - try 'token' format first (more compatible)
                        headers['Authorization'] = `token ${token}`;
                    } else if (isFineGrainedToken) {
                        // Fine-grained token - must use Bearer format
                        headers['Authorization'] = `Bearer ${token}`;
                    } else {
                        // Unknown format, try Bearer first
                        headers['Authorization'] = `Bearer ${token}`;
                    }
                }

                // Fetch all pages to get complete data like GitHub Stats API
                while (hasMore) {
                    // Use different endpoint for authenticated requests to get private repos
                    const reposUrl = token && includePrivate
                        ? `https://api.github.com/user/repos?per_page=100&page=${page}&affiliation=owner`
                        : `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`;

                    const reposResponse = await fetch(reposUrl, {
                        headers
                    });

                    if (!reposResponse.ok) {
                        // If 401 and we're using Bearer, try 'token' format as fallback
                        if (reposResponse.status === 401 && token && headers['Authorization'].startsWith('Bearer')) {
                            headers['Authorization'] = `token ${token}`;
                            // Retry the request with token format
                            const retryResponse = await fetch(reposUrl, { headers });
                            if (retryResponse.ok) {
                                const repos = await retryResponse.json();
                                if (repos.length === 0) {
                                    hasMore = false;
                                } else {
                                    allRepos = [...allRepos, ...repos];
                                    page++;
                                    if (repos.length < 100) {
                                        hasMore = false;
                                    }
                                }
                                continue; // Skip to next iteration
                            }
                        }

                        // Try to get error details from response body
                        let errorMessage = `GitHub API error: ${reposResponse.status} - ${reposResponse.statusText}`;
                        try {
                            const errorBody = await reposResponse.json();
                            if (errorBody.message) {
                                errorMessage = `${errorMessage}\nDetails: ${errorBody.message}`;
                            }
                        } catch (e) {
                            // If we can't parse error body, use status text
                        }

                        // Provide helpful error messages
                        if (reposResponse.status === 401) {
                            errorMessage = `Authentication failed. Please check your GitHub token.\n${errorMessage}\n\nTroubleshooting:\n1. Verify token is correct and not expired\n2. Check token has 'repo' scope (for private repos)\n3. For fine-grained tokens, ensure 'Repository access' includes your repos`;
                        } else if (reposResponse.status === 403) {
                            errorMessage = `Access forbidden. Check token permissions (need 'repo' scope for private repos) or rate limit.\n${errorMessage}`;
                        } else if (reposResponse.status === 404) {
                            errorMessage = `User not found or endpoint not available. Check username: ${username}\n${errorMessage}`;
                        }

                        throw new Error(errorMessage);
                    }

                    const repos = await reposResponse.json();

                    if (repos.length === 0) {
                        hasMore = false;
                    } else {
                        allRepos = [...allRepos, ...repos];
                        page++;
                        // Stop if we got less than 100 repos (last page)
                        if (repos.length < 100) {
                            hasMore = false;
                        }
                    }
                }

                // Filter out forks, optionally include private repos
                // If includePrivate is true and we have token, include private repos
                let reposToAnalyze = allRepos.filter(repo => !repo.fork);

                // If not including private or no token, filter out private repos
                if (!includePrivate || !token) {
                    reposToAnalyze = reposToAnalyze.filter(repo => !repo.private);
                }

                // Fetch languages for each repository
                const languagePromises = reposToAnalyze.map(async (repo) => {
                    try {
                        const langResponse = await fetch(repo.languages_url, {
                            headers
                        });
                        if (langResponse.ok) {
                            const langs = await langResponse.json();
                            return langs;
                        }
                        return {};
                    } catch (err) {
                        return {};
                    }
                });

                const languagesData = await Promise.all(languagePromises);

                // Aggregate languages across all repositories
                // Use normalized names to group similar languages (e.g., JSX/TSX -> React)
                const languageTotals = {};
                const languageTotalsRaw = {}; // Keep raw data before normalization
                let totalBytes = 0;

                languagesData.forEach(repoLanguages => {
                    Object.entries(repoLanguages).forEach(([lang, bytes]) => {
                        // Keep raw data
                        if (!languageTotalsRaw[lang]) {
                            languageTotalsRaw[lang] = 0;
                        }
                        languageTotalsRaw[lang] += bytes;

                        // Normalize and aggregate
                        const normalizedName = normalizeLanguageName(lang);
                        if (!languageTotals[normalizedName]) {
                            languageTotals[normalizedName] = 0;
                        }
                        languageTotals[normalizedName] += bytes;
                        totalBytes += bytes;
                    });
                });

                // Calculate programming languages only (exclude HTML, CSS, etc.)
                const programmingLanguagesTotals = {};
                let programmingTotalBytes = 0;

                Object.entries(languageTotals).forEach(([name, bytes]) => {
                    if (isProgrammingLanguage(name)) {
                        programmingLanguagesTotals[name] = bytes;
                        programmingTotalBytes += bytes;
                    }
                });

                // Convert to array and calculate percentages
                // Use programming languages only (closer to GitHub Stats behavior)
                const languagesArray = Object.entries(programmingLanguagesTotals)
                    .map(([name, bytes]) => ({
                        name,
                        bytes,
                        percentage: programmingTotalBytes > 0 ? Math.round((bytes / programmingTotalBytes) * 100) : 0,
                    }))
                    .sort((a, b) => b.bytes - a.bytes)
                    .slice(0, 10);

                setLanguages(languagesArray);
            } catch (err) {
                console.error('Error fetching GitHub languages:', err);
                setError(err.message);
                setLanguages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLanguages();
    }, [username, reposLimit, token, includePrivate]);

    return { languages, loading, error };
};

/**
 * Normalize language names for better display
 * Merges related languages (e.g., ASP.NET -> C#)
 */
const normalizeLanguageName = (name) => {
    const nameMap = {
        'C#': 'C#',
        'ASP.NET': 'C#', // Merge ASP.NET into C# (it's C# code)
        'C++': 'C++',
        'C': 'C',
        'TypeScript': 'TypeScript',
        'JavaScript': 'JavaScript',
        'JSX': 'React',
        'TSX': 'React',
        'Java': 'Java',
        'Python': 'Python',
        'Go': 'Go',
        'Rust': 'Rust',
        'PHP': 'PHP',
        'Ruby': 'Ruby',
        'Swift': 'Swift',
        'Kotlin': 'Kotlin',
        'Dart': 'Dart',
        'HTML': 'HTML',
        'CSS': 'CSS',
        'SCSS': 'SCSS',
        'Sass': 'Sass',
        'Less': 'Less',
        'Vue': 'Vue.js',
        'Angular': 'Angular',
        'Shell': 'Shell',
        'PowerShell': 'PowerShell',
        'Dockerfile': 'Docker',
        'Makefile': 'Make',
        'YAML': 'YAML',
        'JSON': 'JSON',
        'Markdown': 'Markdown',
    };

    // If exact match found, return mapped name
    if (nameMap[name]) {
        return nameMap[name];
    }

    // For JSX/TSX, return React
    if (name === 'JSX' || name === 'TSX') {
        return 'React';
    }

    // Return original name if no mapping found
    return name;
};

/**
 * Check if a language is a programming language (not markup/styling)
 */
const isProgrammingLanguage = (name) => {
    const nonProgrammingLanguages = [
        'HTML', 'CSS', 'SCSS', 'Sass', 'Less', 'Markdown',
        'YAML', 'JSON', 'Dockerfile', 'Makefile'
    ];
    return !nonProgrammingLanguages.includes(name);
};

export default useGitHubLanguages;

