// Navigation Links - For single page scroll
export const NAV_LINKS = [
    { name: 'Trang chủ', section: 'hero' },
    { name: 'Giới thiệu', section: 'about' },
    { name: 'Dự án', section: 'projects' },
    { name: 'Liên hệ', section: 'contact' },
];

// Social Media Links
export const SOCIAL_LINKS = [
    { name: 'GitHub', url: 'https://github.com/DucAnhETERNAL', icon: 'Github' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
    { name: 'Twitter', url: 'https://twitter.com', icon: 'Twitter' },
    { name: 'Email', url: 'mailto:nganh81084@example.com', icon: 'Mail' },
];

// Skills
export const SKILLS = [
    { name: 'React', level: 60 },
    { name: 'JavaScript', level: 60 },
    { name: '.NET', level: 70 },
    { name: 'Node.js', level: 40 },
    { name: 'Git', level: 65 },
];

// Projects Data
export const PROJECTS = [
    {
        id: 1,
        title: 'Dự án Portfolio',
        description: 'Website portfolio cá nhân được xây dựng với React và Tailwind CSS',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
        tags: ['React', 'Tailwind', 'Vite'],
        github: 'https://github.com',
        demo: 'https://demo.com',
    },
    {
        id: 2,
        title: 'E-commerce App',
        description: 'Ứng dụng thương mại điện tử với giỏ hàng và thanh toán',
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop',
        tags: ['React', 'Redux', 'API'],
        github: 'https://github.com',
        demo: 'https://demo.com',
    },
    {
        id: 3,
        title: 'Task Manager',
        description: 'Ứng dụng quản lý công việc với drag & drop',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
        tags: ['React', 'DnD', 'LocalStorage'],
        github: 'https://github.com',
        demo: 'https://demo.com',
    },
];

// About Info
export const ABOUT_INFO = {
    name: 'Nguyen Duc Anh',
    title: 'Full Stack Developer',
    description: `Xin chào! Tôi là một developer đam mê công nghệ và luôn tìm kiếm những thách thức mới. 
  Với kinh nghiệm trong việc xây dựng các ứng dụng web hiện đại, tôi chuyên về React, Node.js và các công nghệ web mới nhất.`,
    email: 'nganh81084@gmail.com',
    location: 'Việt Nam',
};

// GitHub Configuration
export const GITHUB_CONFIG = {
    username: 'DucAnhETERNAL', // Your GitHub username
    fetchFromGitHub: true, // Set to false to use static PROJECTS data
    reposLimit: 12, // Maximum number of repos to fetch
};

