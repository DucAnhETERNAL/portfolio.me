import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { Button, MatrixRain } from '../components';
import { SOCIAL_LINKS } from '../constants';

/**
 * Home Page - Landing page with hero section
 */
const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-dark-950 overflow-hidden">
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
              <Link to="/projects">
                <Button variant="primary" size="lg" className="group">
                  Xem dự án
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Liên hệ với tôi
                </Button>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              {SOCIAL_LINKS.map((social) => {
                const iconMap = {
                  Github: Github,
                  Linkedin: Linkedin,
                  Twitter: Mail,
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
      <section className="section-padding bg-dark-900">
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

    </div>
  );
};

export default Home;

