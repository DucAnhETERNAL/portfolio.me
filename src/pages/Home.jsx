import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Search, MapPin, Download, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button, MatrixRain, FloatingLines, LetterGlitch, Card } from '../components';
import { SOCIAL_LINKS, ABOUT_INFO, SKILLS, PROJECTS, GITHUB_CONFIG } from '../constants';
import useGitHubRepos from '../hooks/useGitHubRepos';
import useGitHubLanguages from '../hooks/useGitHubLanguages';
import { transformGitHubReposToProjects, getAllTagsFromProjects } from '../utils/githubUtils';

// Custom X (Twitter) Icon Component
const XIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

/**
 * Home Page - Single page scroll with all sections
 */
const Home = () => {
  // Fetch GitHub repos
  const { repos: githubRepos, loading: githubLoading, error: githubError } = useGitHubRepos(
    GITHUB_CONFIG.username,
    GITHUB_CONFIG.reposLimit,
    true
  );

  // Fetch GitHub languages
  const { languages: githubLanguages, loading: languagesLoading, error: languagesError } = useGitHubLanguages(
    GITHUB_CONFIG.fetchLanguagesFromGitHub ? GITHUB_CONFIG.username : null,
    GITHUB_CONFIG.languagesReposLimit || 100,
    GITHUB_CONFIG.token || null,
    GITHUB_CONFIG.includePrivateRepos || false
  );

  // Projects state
  const [projects, setProjects] = useState(PROJECTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Update projects when GitHub repos are fetched
  useEffect(() => {
    if (GITHUB_CONFIG.fetchFromGitHub && githubRepos.length > 0) {
      const githubProjects = transformGitHubReposToProjects(githubRepos);
      setProjects(githubProjects);
    } else if (!GITHUB_CONFIG.fetchFromGitHub) {
      setProjects(PROJECTS);
    }
  }, [githubRepos, githubLoading]);

  // Get all tags from projects
  const allTags = getAllTagsFromProjects(projects);

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || project.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-white dark:bg-dark-950 overflow-hidden">
        {/* Matrix Rain Background */}
        {/* <MatrixRain speed={50} density={0.96} fontSize={14} /> */}
        {/* FloatingLines Background */}
        {/* <FloatingLines enabledWaves={['top', 'middle', 'bottom']} lineCount={[10, 15, 20]} lineDistance={[8, 6, 4]} bendRadius={5.0} bendStrength={-0.5} interactive={true} parallax={true} /> */}
        {/* LetterGlitch Background */}
        <LetterGlitch glitchSpeed={50} centerVignette={true} outerVignette={false} smooth={true} />
        <div className="container-custom relative z-10">
          <div className="text-center animate-fade-in">

            {/* Main Heading */}
            <h1 className="mb-6 animate-slide-up">
              <span className="block text-gray-900 dark:text-white mb-2">Hi, I'm</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">
                Full Stack Developer
              </span>
            </h1>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <a href="#projects" onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <Button variant="primary" size="lg" className="group">
                  View Projects
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#contact" onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <Button variant="outline" size="lg">
                  Contact Me
                </Button>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {SOCIAL_LINKS.map((social) => {
                const iconMap = {
                  Github: Github,
                  Linkedin: Linkedin,
                  Twitter: XIcon,
                  Mail: Mail,
                };
                const IconComponent = iconMap[social.icon];
                const displayText = social.icon === 'Mail'
                  ? ABOUT_INFO.email
                  : social.url.replace(/^https?:\/\//, '').replace(/^mailto:/, '');

                return (
                  <div
                    key={social.name}
                    className="relative group"
                  >
                    <a
                      href={social.url}
                      target={social.icon === 'Mail' ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 shadow-lg flex items-center justify-center text-gray-700 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-600 hover:shadow-xl hover:scale-110 transition-all duration-300"
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                    {/* Expandable tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                      <div className="bg-gray-900 dark:bg-dark-800 text-white dark:text-dark-100 text-xs px-3 py-2 rounded-lg shadow-xl border border-gray-700 dark:border-dark-600">
                        {displayText}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-dark-800"></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-dark-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-gray-400 dark:bg-dark-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section id="features" className="section-padding bg-gray-50 dark:bg-dark-900 scroll-mt-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why work with me?</h2>
            <p className="text-gray-600 dark:text-dark-300 max-w-2xl mx-auto">
              I bring a balance of technical depth, product sense, and visual craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:shadow-lg hover:shadow-primary-900/20 dark:hover:shadow-primary-900/20 hover:border-primary-600 dark:hover:border-primary-800 transition-all duration-300">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl mb-3">High performance</h3>
              <p className="text-gray-600 dark:text-dark-300">
                I obsess over shipping fast, smooth experiences with thoughtful optimizations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:shadow-lg hover:shadow-purple-900/20 dark:hover:shadow-purple-900/20 hover:border-purple-600 dark:hover:border-purple-800 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl mb-3">Delightful design</h3>
              <p className="text-gray-600 dark:text-dark-300">
                Modern, responsive interfaces crafted for clarity and consistency.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:shadow-lg hover:shadow-pink-900/20 dark:hover:shadow-pink-900/20 hover:border-pink-600 dark:hover:border-pink-800 transition-all duration-300">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 border border-pink-300 dark:border-pink-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl mb-3">Quality code</h3>
              <p className="text-gray-600 dark:text-dark-300">
                Scalable, maintainable codebases built with clean architecture and testing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gradient-to-br from-gray-50 to-white dark:from-dark-900 dark:to-dark-950 py-16 border-y border-gray-200 dark:border-dark-800 scroll-mt-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4 animate-slide-up">About me</h2>
            <p className="text-lg text-gray-600 dark:text-dark-300 max-w-2xl mx-auto animate-fade-in">
              A quick snapshot of my journey, values, and capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="section-padding bg-white dark:bg-dark-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image and Info */}
            <div className="space-y-6">
              {/* Profile Image */}
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 border border-gray-200 dark:border-dark-700 flex items-center justify-center overflow-hidden">
                  <div className="text-9xl">👨‍💻</div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-900/20 rounded-full -z-10 blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-900/20 rounded-full -z-10 blur-xl"></div>
              </div>

            </div>

            {/* Right Column - Description and Skills */}
            <div className="space-y-8">
              {/* About Description */}
              <div>
                <h2 className="mb-4">{ABOUT_INFO.name}</h2>
                <p className="text-xl text-primary-400 font-semibold mb-4">
                  {ABOUT_INFO.title}
                </p>
                <p className="text-gray-600 dark:text-dark-300 leading-relaxed mb-4">
                  {ABOUT_INFO.description}
                </p>
                <p className="text-gray-600 dark:text-dark-300 leading-relaxed">
                  I love experimenting with new technologies and bringing them into production when they
                  make sense. My goal is to build experiences that feel beautiful, purposeful, and genuinely
                  useful for people.
                </p>
              </div>

              {/* Skills Section */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Most Used Languages</h3>
                {languagesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 text-primary-400 animate-spin mr-2" />
                    <span className="text-gray-600 dark:text-dark-300">Loading language data from GitHub...</span>
                  </div>
                ) : languagesError ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-dark-300 mb-4">
                      Unable to fetch data from GitHub. Falling back to sample data.
                    </p>
                    <div className="space-y-6">
                      {SKILLS.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between mb-2">
                            <span className="font-medium text-gray-700 dark:text-dark-200">{skill.name}</span>
                            <span className="text-gray-500 dark:text-dark-400">{skill.level}%</span>
                          </div>
                          <div className="h-3 bg-gray-200 dark:bg-dark-800 border border-gray-300 dark:border-dark-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : GITHUB_CONFIG.fetchLanguagesFromGitHub && githubLanguages.length > 0 ? (
                  <div className="space-y-6">
                    {githubLanguages.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-700 dark:text-dark-200">{skill.name}</span>
                          <span className="text-gray-500 dark:text-dark-400">{skill.percentage}%</span>
                        </div>
                        <div className="h-3 bg-gray-200 dark:bg-dark-800 border border-gray-300 dark:border-dark-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {SKILLS.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-700 dark:text-dark-200">{skill.name}</span>
                          <span className="text-gray-500 dark:text-dark-400">{skill.level}%</span>
                        </div>
                        <div className="h-3 bg-gray-200 dark:bg-dark-800 border border-gray-300 dark:border-dark-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-dark-900 dark:via-dark-950 dark:to-dark-900 text-gray-900 dark:text-white section-padding relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-900 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Career milestones
            </h2>
            <p className="text-gray-600 dark:text-dark-300 text-lg max-w-2xl mx-auto">
              From the first lines of C to full-stack product builds and a DevOps-focused future.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 via-orange-600 via-purple-600 via-cyan-600 via-green-600 to-pink-600 opacity-30 rounded-full"></div>
            <div className="md:hidden absolute left-8 w-1 h-full bg-gradient-to-b from-blue-600 via-orange-600 via-purple-600 via-cyan-600 via-green-600 to-pink-600 opacity-30 rounded-full"></div>

            <div className="space-y-12 relative z-10">
              {/* Timeline Item 1 - C */}
              <div className="relative flex flex-col md:flex-row items-start gap-6 group">
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/50 group-hover:scale-110 transition-transform duration-300 border-4 border-white dark:border-dark-900">
                      <span className="text-xl font-bold text-white">C</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
                  </div>
                </div>
                <div className="md:ml-auto md:w-5/12 pl-20 md:pl-0 pt-2">
                  <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border border-blue-300 dark:border-blue-800/50 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 group-hover:border-blue-600">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full">Phase 1</span>
                      <span className="text-xs text-gray-500 dark:text-dark-400">Foundations</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Starting with C</h3>
                    <p className="text-gray-600 dark:text-dark-300 leading-relaxed">
                      Learned low-level thinking with C, data structures, and algorithms—building the mental model for everything after.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 - Java JSP/Servlet */}
              <div className="relative flex flex-col md:flex-row items-start gap-6 group">
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-900/50 group-hover:scale-110 transition-transform duration-300 border-4 border-white dark:border-dark-900">
                      <span className="text-xl font-bold text-white">J</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-20" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
                <div className="md:mr-auto md:w-5/12 pl-20 md:pl-0 pt-2">
                  <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border border-orange-300 dark:border-orange-800/50 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-orange-900/20 transition-all duration-300 group-hover:border-orange-600">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full">Phase 2</span>
                      <span className="text-xs text-gray-500 dark:text-dark-400">Web development</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Java JSP/Servlet</h3>
                    <p className="text-gray-600 dark:text-dark-300 leading-relaxed">
                      Built dynamic applications with Java, JSP, and Servlets, understanding MVC patterns inside the Java EE ecosystem.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 - C#/.NET */}
              <div className="relative flex flex-col md:flex-row items-start gap-6 group">
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-900/50 group-hover:scale-110 transition-transform duration-300 border-4 border-white dark:border-dark-900">
                      <span className="text-xl font-bold text-white">#</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
                <div className="md:ml-auto md:w-5/12 pl-20 md:pl-0 pt-2">
                  <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border border-purple-300 dark:border-purple-800/50 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 group-hover:border-purple-600">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">Phase 3</span>
                      <span className="text-xs text-gray-500 dark:text-dark-400">Enterprise</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">C# / .NET</h3>
                    <p className="text-gray-600 dark:text-dark-300 leading-relaxed">
                      Dived deep into C#/.NET for enterprise apps, from ASP.NET to service-oriented and microservice architectures.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 4 - React */}
              <div className="relative flex flex-col md:flex-row items-start gap-6 group">
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-900/50 group-hover:scale-110 transition-transform duration-300 border-4 border-white dark:border-dark-900">
                      <span className="text-xl font-bold text-white">⚛</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-20" style={{ animationDelay: '0.6s' }}></div>
                  </div>
                </div>
                <div className="md:mr-auto md:w-5/12 pl-20 md:pl-0 pt-2">
                  <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border border-cyan-300 dark:border-cyan-800/50 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-cyan-900/20 transition-all duration-300 group-hover:border-cyan-600">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/30 px-3 py-1 rounded-full">Phase 4</span>
                      <span className="text-xs text-gray-500 dark:text-dark-400">Frontend</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">React</h3>
                    <p className="text-gray-600 dark:text-dark-300 leading-relaxed">
                      Switched to modern frontend with React—building SPAs with hooks, context, and a rich ecosystem of tooling.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 5 - Node.js */}
              <div className="relative flex flex-col md:flex-row items-start gap-6 group">
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-900/50 group-hover:scale-110 transition-transform duration-300 border-4 border-white dark:border-dark-900">
                      <span className="text-xl font-bold text-white">JS</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" style={{ animationDelay: '0.8s' }}></div>
                  </div>
                </div>
                <div className="md:ml-auto md:w-5/12 pl-20 md:pl-0 pt-2">
                  <div className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border border-green-300 dark:border-green-800/50 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-green-900/20 transition-all duration-300 group-hover:border-green-600">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">Phase 5</span>
                      <span className="text-xs text-gray-500 dark:text-dark-400">Backend</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Node.js</h3>
                    <p className="text-gray-600 dark:text-dark-300 leading-relaxed">
                      Completed the stack with Node.js, building REST APIs, real-time services, and integrations with MongoDB/PostgreSQL.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 6 - DevOps (Goal) */}
              <div className="relative flex flex-col md:flex-row items-start gap-6 group">
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-900/50 group-hover:scale-110 transition-transform duration-300 border-4 border-white dark:border-dark-900 animate-pulse">
                      <span className="text-xl font-bold text-white">🚀</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-30" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
                <div className="md:mr-auto md:w-5/12 pl-20 md:pl-0 pt-2">
                  <div className="bg-gradient-to-br from-pink-100/80 via-purple-100/80 to-blue-100/80 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-blue-900/20 backdrop-blur-sm border-2 border-pink-300 dark:border-pink-800/70 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-pink-900/30 transition-all duration-300 group-hover:border-pink-500 group-hover:scale-105 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-pink-600 dark:text-pink-400 bg-pink-200 dark:bg-pink-900/40 px-3 py-1 rounded-full border border-pink-400 dark:border-pink-700/50">Next</span>
                        <span className="text-xs text-pink-600 dark:text-pink-300">In progress</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">DevOps Engineer</h3>
                      <p className="text-gray-700 dark:text-dark-200 leading-relaxed">
                        Current focus: leveling up in DevOps—CI/CD, Docker, Kubernetes, cloud infrastructure, monitoring, and automation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-gradient-to-br from-gray-50 to-white dark:from-dark-900 dark:to-dark-950 py-16 border-y border-gray-200 dark:border-dark-800 scroll-mt-24">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="mb-4 animate-slide-up">Selected work</h2>
            <p className="text-lg text-gray-600 dark:text-dark-300 max-w-2xl mx-auto animate-fade-in">
              A mix of personal experiments and production projects built with care.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Content */}
      <section className="section-padding bg-white dark:bg-dark-900">
        <div className="container-custom">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-dark-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-800 border-2 border-gray-300 dark:border-dark-700 text-gray-900 dark:text-white rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`
                  px-6 py-2 rounded-full font-medium transition-all duration-300
                  ${selectedTag === tag
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-900/50 scale-105'
                    : 'bg-white dark:bg-dark-800 text-gray-700 dark:text-dark-200 hover:bg-gray-100 dark:hover:bg-dark-700 border border-gray-300 dark:border-dark-700'
                  }
                `}
              >
                {tag === 'all' ? 'All' : tag}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {githubLoading && GITHUB_CONFIG.fetchFromGitHub ? (
            <div className="text-center py-16">
              <Loader2 className="w-12 h-12 text-primary-400 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-dark-300">Loading repositories from GitHub...</p>
            </div>
          ) : githubError && GITHUB_CONFIG.fetchFromGitHub ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl mb-2">Unable to load GitHub projects</h3>
              <p className="text-gray-600 dark:text-dark-300 mb-4">{githubError}</p>
              <p className="text-sm text-gray-500 dark:text-dark-400">
                Showing fallback data instead. Check GITHUB_CONFIG inside constants/index.js.
              </p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <Card
                  key={project.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Project Image */}
                  <Card.Image
                    src={project.image}
                    alt={project.title}
                    className="h-48"
                  />

                  {/* Project Content */}
                  <Card.Header>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      {project.stars !== undefined && (
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-dark-400">
                          <Github className="w-4 h-4" />
                          <span>{project.stars}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-dark-300 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </Card.Header>

                  {/* Tags */}
                  <Card.Body>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 5).map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 border border-primary-300 dark:border-primary-800 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card.Body>

                  {/* Action Buttons */}
                  <Card.Footer>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" className="w-full" size="sm">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="primary" className="w-full" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        {project.homepage ? 'Demo' : 'View'}
                      </Button>
                    </a>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl mb-2">No projects matched</h3>
              <p className="text-gray-600 dark:text-dark-300">
                Try a different keyword or filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Projects CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-purple-600 text-white dark:text-white py-16">
        <div className="container-custom text-center">
          <h2 className="mb-4">Have an idea in mind?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            I'd love to hear about your product goals and explore how we can bring them to life.
          </p>
          <a href="#contact" onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-50 dark:hover:bg-dark-50"
            >
              Let's talk
            </Button>
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-br from-gray-50 to-white dark:from-dark-900 dark:to-dark-950 py-16 border-y border-gray-200 dark:border-dark-800 scroll-mt-24">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="mb-4 animate-slide-up">Get in touch</h2>
            <p className="text-lg text-gray-600 dark:text-dark-300 max-w-2xl mx-auto animate-fade-in">
              Whether it's a project, collaboration, or just a hello—I'd love to connect.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-white dark:bg-dark-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-6">Contact details</h3>
                <p className="text-gray-600 dark:text-dark-300 mb-8">
                  Need a hand or want to collaborate? Send a note or reach out through any of the channels below.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card hover={false} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-800 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <a
                        href={`mailto:${ABOUT_INFO.email}`}
                        className="text-gray-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {ABOUT_INFO.email}
                      </a>
                    </div>
                  </div>
                </Card>

                <Card hover={false} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-300 dark:border-purple-800 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Location</h3>
                      <p className="text-gray-600 dark:text-dark-300">{ABOUT_INFO.location}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect on social</h3>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((social) => {
                    const iconMap = {
                      Github: Github,
                      Linkedin: Linkedin,
                      Twitter: XIcon,
                      Mail: Mail,
                    };
                    const IconComponent = iconMap[social.icon];
                    const displayText = social.icon === 'Mail'
                      ? ABOUT_INFO.email
                      : social.url.replace(/^https?:\/\//, '').replace(/^mailto:/, '');

                    return (
                      <div
                        key={social.name}
                        className="relative group"
                      >
                        <a
                          href={social.url}
                          target={social.icon === 'Mail' ? '_self' : '_blank'}
                          rel="noopener noreferrer"
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
                          aria-label={social.name}
                        >
                          <IconComponent className="w-5 h-5" />
                        </a>
                        {/* Expandable tooltip */}
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                          <div className="bg-gray-900 dark:bg-dark-800 text-white dark:text-dark-100 text-xs px-3 py-2 rounded-lg shadow-xl border border-gray-700 dark:border-dark-600">
                            {displayText}
                            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-dark-800"></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Illustration */}
              <div className="hidden lg:block mt-12">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/30 dark:to-purple-900/30 border border-gray-200 dark:border-dark-700 flex items-center justify-center">
                  <div className="text-9xl">📮</div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <Card hover={false} className="p-8">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dark-200 mb-2">
                        Your name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-dark-900 border-2 border-gray-300 dark:border-dark-700 text-gray-900 dark:text-white rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-dark-900 border-2 border-gray-300 dark:border-dark-700 text-gray-900 dark:text-white rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-dark-200 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white dark:bg-dark-900 border-2 border-gray-300 dark:border-dark-700 text-gray-900 dark:text-white rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="What is this about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-dark-200 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white dark:bg-dark-900 border-2 border-gray-300 dark:border-dark-700 text-gray-900 dark:text-white rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
                        placeholder="Let me know how I can help..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      size="lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send message
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-12 animate-scale-in">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2 text-green-400">
                      Message sent!
                    </h3>
                    <p className="text-gray-600 dark:text-dark-300">
                      Thanks for reaching out—I’ll reply as soon as possible.
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="bg-white dark:bg-dark-900 py-16">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/20 dark:to-purple-900/20 border border-gray-200 dark:border-dark-700 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-gray-600 dark:text-dark-300">
                You can embed Google Maps or your preferred map component here.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

