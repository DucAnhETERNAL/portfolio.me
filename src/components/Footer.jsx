import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart, Code } from 'lucide-react';
import { NAV_LINKS, SOCIAL_LINKS } from '../constants';

/**
 * Footer Component - Site footer with links and social media
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Icon mapping
  const iconMap = {
    Github: Github,
    Linkedin: Linkedin,
    Twitter: Twitter,
    Mail: Mail,
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="bg-dark-900 text-white">
      {/* Main Footer Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Code className="w-8 h-8 text-primary-400" />
              <span className="text-2xl font-bold">Portfolio</span>
            </div>
            <p className="text-dark-300">
              Xây dựng những trải nghiệm web tuyệt vời với đam mê và sự sáng tạo.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.section}>
                  <button
                    onClick={() => scrollToSection(link.section)}
                    className="text-dark-300 hover:text-primary-400 transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kết nối</h3>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => {
                const IconComponent = iconMap[social.icon];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-primary-600 transition-all duration-300 hover:scale-110"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-dark-400">
            <p>
              © {currentYear} Portfolio. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> using React & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

