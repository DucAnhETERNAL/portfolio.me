/**
 * Utility functions for GitHub data transformation
 */

/**
 * Transform GitHub repo data to project format
 * @param {Array} repos - Array of GitHub repositories
 * @returns {Array} - Transformed projects array
 */
export const transformGitHubReposToProjects = (repos) => {
    return repos.map((repo, index) => {
        // Extract language/tags from repo
        const tags = [];
        if (repo.language) {
            tags.push(repo.language);
        }

        // Add topics as tags (if available)
        if (repo.topics && repo.topics.length > 0) {
            tags.push(...repo.topics.slice(0, 3));
        }

        // Get image - use GitHub's Open Graph image or default
        // GitHub OG image format: https://opengraph.githubassets.com/{hash}/{owner}/{repo}
        let image = `https://images.unsplash.com/photo-${1460925895917 + (index % 10)}?w=500&h=300&fit=crop`;

        // If repo has homepage, try to use GitHub OG image
        if (repo.homepage) {
            // Try GitHub's OG image service
            image = `https://opengraph.githubassets.com/${Date.now()}/${repo.owner.login}/${repo.name}`;
        } else {
            // Use a themed placeholder based on language
            const imageIds = [
                1460925895917, 1557821552, 1454165804606, 1461749286829, 1504864292467,
                1551650975, 1551288049, 1541467131941, 1551697786, 1553877528
            ];
            image = `https://images.unsplash.com/photo-${imageIds[index % imageIds.length]}?w=500&h=300&fit=crop`;
        }

        return {
            id: repo.id,
            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: repo.description || 'Không có mô tả',
            image: image,
            tags: tags.length > 0 ? tags : ['GitHub'],
            github: repo.html_url,
            demo: repo.homepage || repo.html_url,
            homepage: repo.homepage || null,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            updated: repo.updated_at,
        };
    });
};

/**
 * Get all unique tags from projects
 * @param {Array} projects - Array of projects
 * @returns {Array} - Array of unique tags
 */
export const getAllTagsFromProjects = (projects) => {
    const allTags = new Set();
    projects.forEach(project => {
        project.tags.forEach(tag => allTags.add(tag));
    });
    return ['all', ...Array.from(allTags)];
};

