import React, { useState, useEffect } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Twitter, ExternalLink, Search, MapPin, Download, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button, MatrixRain, Card } from '../components';
import { SOCIAL_LINKS, ABOUT_INFO, SKILLS, PROJECTS, GITHUB_CONFIG } from '../constants';
import useGitHubRepos from '../hooks/useGitHubRepos';
import { transformGitHubReposToProjects, getAllTagsFromProjects } from '../utils/githubUtils';

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
      <section id="hero" className="relative min-h-screen flex items-center justify-center bg-dark-950 overflow-hidden">
        {/* Matrix Rain Background */}
        <MatrixRain speed={50} density={0.96} fontSize={14} />

        <div className="container-custom relative z-10">
          <div className="text-center animate-fade-in">
            {/* Greeting */}
            <div className="inline-block mb-4 px-4 py-2 bg-primary-900/30 text-primary-400 border border-primary-800 rounded-full text-sm font-medium animate-slide-down">
              👋 Chào mừng đến với portfolio của tôi
            </div>

            {/* Main Heading */}
            <h1 className="mb-6 animate-slide-up">
              <span className="block text-white mb-2">Xin chào, tôi là</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">
                Full Stack Developer
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-dark-300 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Tôi tạo ra những trải nghiệm web tuyệt vời bằng React, Node.js và các công nghệ hiện đại.
              Đam mê về code sạch và thiết kế đẹp.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <a href="#projects" onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <Button variant="primary" size="lg" className="group">
                  Xem dự án
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#contact" onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                <Button variant="outline" size="lg">
                  Liên hệ với tôi
                </Button>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {SOCIAL_LINKS.map((social) => {
                const iconMap = {
                  Github: Github,
                  Linkedin: Linkedin,
                  Twitter: Twitter,
                  Mail: Mail,
                };
                const IconComponent = iconMap[social.icon];

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-dark-800 border border-dark-700 shadow-lg flex items-center justify-center text-dark-300 hover:text-primary-400 hover:border-primary-600 hover:shadow-xl hover:scale-110 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-dark-400 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-dark-400 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section id="features" className="section-padding bg-dark-900 scroll-mt-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4">Tại sao chọn tôi?</h2>
            <p className="text-dark-300 max-w-2xl mx-auto">
              Tôi mang đến sự kết hợp hoàn hảo giữa kỹ năng kỹ thuật và tư duy sáng tạo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-xl bg-dark-800 border border-dark-700 hover:shadow-lg hover:shadow-primary-900/20 hover:border-primary-800 transition-all duration-300">
              <div className="w-16 h-16 bg-primary-900/30 border border-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-xl mb-3">Hiệu suất cao</h3>
              <p className="text-dark-300">
                Tối ưu hóa code để mang lại trải nghiệm người dùng nhanh và mượt mà
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-xl bg-dark-800 border border-dark-700 hover:shadow-lg hover:shadow-purple-900/20 hover:border-purple-800 transition-all duration-300">
              <div className="w-16 h-16 bg-purple-900/30 border border-purple-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl mb-3">Thiết kế đẹp</h3>
              <p className="text-dark-300">
                Giao diện hiện đại, responsive và thân thiện với người dùng
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-xl bg-dark-800 border border-dark-700 hover:shadow-lg hover:shadow-pink-900/20 hover:border-pink-800 transition-all duration-300">
              <div className="w-16 h-16 bg-pink-900/30 border border-pink-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="text-xl mb-3">Code chất lượng</h3>
              <p className="text-dark-300">
                Viết code sạch, dễ bảo trì và có khả năng mở rộng cao
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gradient-to-br from-dark-900 to-dark-950 py-16 border-y border-dark-800 scroll-mt-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="mb-4 animate-slide-up">Giới thiệu về tôi</h2>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto animate-fade-in">
              Tìm hiểu thêm về hành trình và kỹ năng của tôi
            </p>
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Image and Info */}
            <div className="space-y-6">
              {/* Profile Image */}
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-900/30 to-purple-900/30 border border-dark-700 flex items-center justify-center overflow-hidden">
                  <div className="text-9xl">👨‍💻</div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-900/20 rounded-full -z-10 blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-900/20 rounded-full -z-10 blur-xl"></div>
              </div>

              {/* Contact Info Card */}
              <div className="bg-dark-800 border border-dark-700 rounded-xl shadow-lg p-6 space-y-4">
                <h3 className="text-xl font-bold mb-4">Thông tin liên hệ</h3>
                <div className="flex items-center gap-3 text-dark-300">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span>{ABOUT_INFO.email}</span>
                </div>
                <div className="flex items-center gap-3 text-dark-300">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <span>{ABOUT_INFO.location}</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Download className="w-4 h-4 mr-2" />
                  Tải CV
                </Button>
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
                <p className="text-dark-300 leading-relaxed mb-4">
                  {ABOUT_INFO.description}
                </p>
                <p className="text-dark-300 leading-relaxed">
                  Tôi luôn háo hức học hỏi công nghệ mới và áp dụng chúng vào các dự án thực tế.
                  Mục tiêu của tôi là tạo ra những sản phẩm không chỉ đẹp mắt mà còn mang lại
                  giá trị thực sự cho người dùng.
                </p>
              </div>

              {/* Skills Section */}
              <div>
                <h3 className="text-2xl font-bold mb-6">Kỹ năng</h3>
                <div className="space-y-6">
                  {SKILLS.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-dark-200">{skill.name}</span>
                        <span className="text-dark-400">{skill.level}%</span>
                      </div>
                      <div className="h-3 bg-dark-800 border border-dark-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Experience Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-dark-800 border border-primary-800 rounded-lg">
                  <div className="text-3xl font-bold text-primary-400">1</div>
                  <div className="text-sm text-dark-300">Năm kinh nghiệm</div>
                </div>
                <div className="text-center p-4 bg-dark-800 border border-purple-800 rounded-lg">
                  <div className="text-3xl font-bold text-purple-400">5</div>
                  <div className="text-sm text-dark-300">Dự án hoàn thành</div>
                </div>
                <div className="text-center p-4 bg-dark-800 border border-pink-800 rounded-lg">
                  <div className="text-3xl font-bold text-pink-400">60%</div>
                  <div className="text-sm text-dark-300">Khách hàng hài lòng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-gradient-to-b from-dark-900 via-dark-950 to-dark-900 text-white section-padding relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-900 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Hành trình của tôi
            </h2>
            <p className="text-dark-300 text-lg max-w-2xl mx-auto">
              Từ những dòng code đầu tiên đến hành trình trở thành Full Stack Developer và hướng tới DevOps
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
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-900/50 group-hover:scale-110 transition-transform duration-300 border-4 border-dark-900">
                      <span className="text-xl font-bold text-white">C</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
                  </div>
                </div>
                <div className="md:ml-auto md:w-5/12 pl-20 md:pl-0 pt-2">
                  <div className="bg-dark-800/80 backdrop-blur-sm border border-blue-800/50 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-900/20 transition-all duration-300 group-hover:border-blue-600">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full">Bước 1</span>
                      <span className="text-xs text-dark-400">Khởi đầu</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">Bắt đầu với C</h3>
                    <p className="text-dark-300 leading-relaxed">
                      Khởi đầu hành trình lập trình với ngôn ngữ C - nền tảng vững chắc về cấu trúc dữ liệu, thuật toán và tư duy lập trình hệ thống.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 - Java JSP/Servlet */}
              <div className="relative flex flex-col md:flex-row items-start gap-6 group">
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-900/50 group-hover:scale-110 transition-transform duration-300 border-4 border-dark-900">
                      <span className="text-xl font-bold text-white">J</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-orange-400 animate-ping opacity-20" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
                <div className="md:mr-auto md:w-5/12 pl-20 md:pl-0 pt-2">
                  <div className="bg-dark-800/80 backdrop-blur-sm border border-orange-800/50 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-orange-900/20 transition-all duration-300 group-hover:border-orange-600">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-orange-400 bg-orange-900/30 px-3 py-1 rounded-full">Bước 2</span>
                      <span className="text-xs text-dark-400">Web Development</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">Java JSP/Servlet</h3>
                    <p className="text-dark-300 leading-relaxed">
                      Chuyển sang phát triển web với Java, học JSP và Servlet để xây dựng các ứng dụng web động và hiểu về kiến trúc MVC trong Java EE.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 - C#/.NET */}
              <div className="relative flex flex-col md:flex-row items-start gap-6 group">
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-900/50 group-hover:scale-110 transition-transform duration-300 border-4 border-dark-900">
                      <span className="text-xl font-bold text-white">#</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
                <div className="md:ml-auto md:w-5/12 pl-20 md:pl-0 pt-2">
                  <div className="bg-dark-800/80 backdrop-blur-sm border border-purple-800/50 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-300 group-hover:border-purple-600">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-purple-400 bg-purple-900/30 px-3 py-1 rounded-full">Bước 3</span>
                      <span className="text-xs text-dark-400">Enterprise</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">C# / .NET</h3>
                    <p className="text-dark-300 leading-relaxed">
                      Phát triển chuyên sâu với C# và .NET Framework, xây dựng các ứng dụng enterprise với ASP.NET, Entity Framework và kiến trúc microservices.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 4 - React */}
              <div className="relative flex flex-col md:flex-row items-start gap-6 group">
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-900/50 group-hover:scale-110 transition-transform duration-300 border-4 border-dark-900">
                      <span className="text-xl font-bold text-white">⚛</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-20" style={{ animationDelay: '0.6s' }}></div>
                  </div>
                </div>
                <div className="md:mr-auto md:w-5/12 pl-20 md:pl-0 pt-2">
                  <div className="bg-dark-800/80 backdrop-blur-sm border border-cyan-800/50 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-cyan-900/20 transition-all duration-300 group-hover:border-cyan-600">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-cyan-400 bg-cyan-900/30 px-3 py-1 rounded-full">Bước 4</span>
                      <span className="text-xs text-dark-400">Frontend</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">React</h3>
                    <p className="text-dark-300 leading-relaxed">
                      Chuyển sang frontend hiện đại với React, xây dựng các ứng dụng SPA động với hooks, context, và các thư viện ecosystem phong phú.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 5 - Node.js */}
              <div className="relative flex flex-col md:flex-row items-start gap-6 group">
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-900/50 group-hover:scale-110 transition-transform duration-300 border-4 border-dark-900">
                      <span className="text-xl font-bold text-white">JS</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" style={{ animationDelay: '0.8s' }}></div>
                  </div>
                </div>
                <div className="md:ml-auto md:w-5/12 pl-20 md:pl-0 pt-2">
                  <div className="bg-dark-800/80 backdrop-blur-sm border border-green-800/50 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-green-900/20 transition-all duration-300 group-hover:border-green-600">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-green-400 bg-green-900/30 px-3 py-1 rounded-full">Bước 5</span>
                      <span className="text-xs text-dark-400">Backend</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">Node.js</h3>
                    <p className="text-dark-300 leading-relaxed">
                      Hoàn thiện stack với Node.js, xây dựng RESTful APIs, real-time applications và tích hợp với các database như MongoDB, PostgreSQL.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 6 - DevOps (Mục tiêu) */}
              <div className="relative flex flex-col md:flex-row items-start gap-6 group">
                <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 -translate-y-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-pink-900/50 group-hover:scale-110 transition-transform duration-300 border-4 border-dark-900 animate-pulse">
                      <span className="text-xl font-bold text-white">🚀</span>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-30" style={{ animationDelay: '1s' }}></div>
                  </div>
                </div>
                <div className="md:mr-auto md:w-5/12 pl-20 md:pl-0 pt-2">
                  <div className="bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-blue-900/20 backdrop-blur-sm border-2 border-pink-800/70 rounded-xl p-6 shadow-xl hover:shadow-2xl hover:shadow-pink-900/30 transition-all duration-300 group-hover:border-pink-500 group-hover:scale-105 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-semibold text-pink-400 bg-pink-900/40 px-3 py-1 rounded-full border border-pink-700/50">Mục tiêu</span>
                        <span className="text-xs text-pink-300">Đang hướng tới</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">DevOps Engineer</h3>
                      <p className="text-dark-200 leading-relaxed">
                        Mục tiêu tiếp theo: Trở thành DevOps Engineer với các kỹ năng về CI/CD, Docker, Kubernetes, cloud infrastructure (AWS/Azure), monitoring và automation.
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
      <section id="projects" className="bg-gradient-to-br from-dark-900 to-dark-950 py-16 border-y border-dark-800 scroll-mt-24">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="mb-4 animate-slide-up">Dự án của tôi</h2>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto animate-fade-in">
              Khám phá các dự án tôi đã xây dựng với đam mê và sự cống hiến
            </p>
          </div>
        </div>
      </section>

      {/* Projects Content */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm kiếm dự án..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-800 border-2 border-dark-700 text-white rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
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
                    : 'bg-dark-800 text-dark-200 hover:bg-dark-700 border border-dark-700'
                  }
                `}
              >
                {tag === 'all' ? 'Tất cả' : tag}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {githubLoading && GITHUB_CONFIG.fetchFromGitHub ? (
            <div className="text-center py-16">
              <Loader2 className="w-12 h-12 text-primary-400 animate-spin mx-auto mb-4" />
              <p className="text-dark-300">Đang tải dự án từ GitHub...</p>
            </div>
          ) : githubError && GITHUB_CONFIG.fetchFromGitHub ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl mb-2">Không thể tải dự án từ GitHub</h3>
              <p className="text-dark-300 mb-4">{githubError}</p>
              <p className="text-sm text-dark-400">
                Đang sử dụng dữ liệu mẫu. Kiểm tra GITHUB_CONFIG trong constants/index.js
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
                        <div className="flex items-center gap-1 text-sm text-dark-400">
                          <Github className="w-4 h-4" />
                          <span>{project.stars}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-dark-300 text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </Card.Header>

                  {/* Tags */}
                  <Card.Body>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 5).map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary-900/30 text-primary-400 border border-primary-800 text-xs font-medium rounded-full"
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
              <h3 className="text-2xl mb-2">Không tìm thấy dự án</h3>
              <p className="text-dark-300">
                Thử tìm kiếm với từ khóa khác hoặc chọn tag khác
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Projects CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="mb-4">Có ý tưởng dự án?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Hãy liên hệ với tôi để bàn luận về dự án của bạn.
            Tôi luôn sẵn sàng đón nhận những thách thức mới!
          </p>
          <a href="#contact" onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary-600 hover:bg-dark-50"
            >
              Liên hệ ngay
            </Button>
          </a>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-br from-dark-900 to-dark-950 py-16 border-y border-dark-800 scroll-mt-24">
        <div className="container-custom">
          <div className="text-center">
            <h2 className="mb-4 animate-slide-up">Liên hệ với tôi</h2>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto animate-fade-in">
              Hãy kết nối với tôi! Tôi luôn sẵn sàng nghe về các cơ hội và dự án mới
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-dark-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-6">Thông tin liên hệ</h3>
                <p className="text-dark-300 mb-8">
                  Bạn có câu hỏi hoặc muốn hợp tác? Hãy điền vào form hoặc liên hệ trực tiếp qua các phương thức dưới đây.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                <Card hover={false} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-900/30 border border-primary-800 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <a
                        href={`mailto:${ABOUT_INFO.email}`}
                        className="text-dark-300 hover:text-primary-400 transition-colors"
                      >
                        {ABOUT_INFO.email}
                      </a>
                    </div>
                  </div>
                </Card>

                <Card hover={false} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-900/30 border border-purple-800 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Địa chỉ</h3>
                      <p className="text-dark-300">{ABOUT_INFO.location}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Kết nối qua mạng xã hội</h3>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((social) => {
                    const iconMap = {
                      Github: Github,
                      Linkedin: Linkedin,
                      Twitter: Twitter,
                      Mail: Mail,
                    };
                    const IconComponent = iconMap[social.icon];
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
                        aria-label={social.name}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Illustration */}
              <div className="hidden lg:block mt-12">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-900/30 to-purple-900/30 border border-dark-700 flex items-center justify-center">
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
                      <label htmlFor="name" className="block text-sm font-medium text-dark-200 mb-2">
                        Tên của bạn *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-900 border-2 border-dark-700 text-white rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="Nhập tên của bạn"
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
                        className="w-full px-4 py-3 bg-dark-900 border-2 border-dark-700 text-white rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-dark-200 mb-2">
                        Chủ đề *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-900 border-2 border-dark-700 text-white rounded-lg focus:border-primary-500 focus:outline-none transition-colors"
                        placeholder="Chủ đề của tin nhắn"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-dark-200 mb-2">
                        Tin nhắn *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-dark-900 border-2 border-dark-700 text-white rounded-lg focus:border-primary-500 focus:outline-none transition-colors resize-none"
                        placeholder="Nội dung tin nhắn của bạn..."
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      size="lg"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Gửi tin nhắn
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-12 animate-scale-in">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2 text-green-400">
                      Gửi thành công!
                    </h3>
                    <p className="text-dark-300">
                      Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi sớm nhất có thể!
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="bg-dark-900 py-16">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary-900/20 to-purple-900/20 border border-dark-700 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-dark-300">
                Bạn có thể thêm Google Maps hoặc map tùy chỉnh ở đây
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

