/**
 * Utility functions for GitHub data transformation
 */

/**
 * Map GitHub language names to display names
 * @param {string} language - GitHub language name
 * @returns {string} - Display name
 */
const mapLanguageToDisplayName = (language) => {
    const languageMap = {
        'JavaScript': 'JavaScript',
        'TypeScript': 'TypeScript',
        'Java': 'Java',
        'C#': 'C#',
        'Python': 'Python',
        'C++': 'C++',
        'C': 'C',
        'PHP': 'PHP',
        'Ruby': 'Ruby',
        'Go': 'Go',
        'Rust': 'Rust',
        'Swift': 'Swift',
        'Kotlin': 'Kotlin',
        'Dart': 'Dart',
        'HTML': 'HTML',
        'CSS': 'CSS',
        'SCSS': 'SCSS',
        'Sass': 'Sass',
        'Less': 'Less',
        'Vue': 'Vue.js',
        'React': 'React',
        'Angular': 'Angular',
        'Node.js': 'Node.js',
        'Express': 'Express',
        'Next.js': 'Next.js',
        'Nuxt': 'Nuxt.js',
        'Svelte': 'Svelte',
        'Tailwind': 'Tailwind CSS',
        'Bootstrap': 'Bootstrap',
        'Material-UI': 'Material UI',
        'Jest': 'Jest',
        'Webpack': 'Webpack',
        'Vite': 'Vite',
        'Docker': 'Docker',
        'Kubernetes': 'Kubernetes',
        'AWS': 'AWS',
        'Azure': 'Azure',
        'GCP': 'Google Cloud',
    };

    return languageMap[language] || language;
};

/**
 * Transform GitHub repo data to project format
 * @param {Array} repos - Array of GitHub repositories
 * @returns {Array} - Transformed projects array
 */
export const transformGitHubReposToProjects = (repos) => {
    return repos.map((repo, index) => {
        // Extract language/tags from repo
        const tags = [];

        // Add language as tag (if available)
        if (repo.language) {
            // Map language to display name
            const displayName = mapLanguageToDisplayName(repo.language);
            // Only add if not already in tags
            if (!tags.includes(displayName)) {
                tags.push(displayName);
            }
        }

        // Add topics as tags (if available) - map them too
        if (repo.topics && repo.topics.length > 0) {
            const mappedTopics = repo.topics
                .slice(0, 5) // Increase to 5 topics
                .map(topic => {
                    // Capitalize topic names and replace hyphens with spaces
                    return topic
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                })
                .filter(topic => !tags.includes(topic)); // Avoid duplicates

            tags.push(...mappedTopics);
        }

        // Filter out unwanted tags (customize this list as needed)
        // Remove generic tags like 'GitHub' if you have more specific tags
        const excludedTags = ['GitHub', 'github']; // Add tags you want to exclude
        const filteredTags = tags.filter(tag =>
            !excludedTags.includes(tag) &&
            tag.trim() !== '' // Remove empty tags
        );

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
            // Use filtered tags or default tag
            // Change 'Project' to any default tag you prefer, or use empty array []
            tags: filteredTags.length > 0 ? filteredTags : ['Project'],
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

