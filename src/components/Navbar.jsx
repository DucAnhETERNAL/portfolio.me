import React, { useState, useEffect } from 'react';
import { Menu, X, Code } from 'lucide-react';
import { NAV_LINKS } from '../constants';

/**
 * Navbar Component - Responsive navigation bar with smooth scroll
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section
      const sections = ['hero', 'features', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setIsOpen(false);
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-dark-900/95 backdrop-blur-md shadow-lg shadow-primary-900/20 border-b border-dark-800 py-4'
          : 'bg-transparent py-6'
        }
      `}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-2xl font-bold text-primary-400 hover:text-primary-300 transition-colors"
          >
            <Code className="w-8 h-8" />
            <span>Portfolio</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className={`
                  text-base font-medium transition-all duration-300 relative
                  ${activeSection === link.section
                    ? 'text-primary-400'
                    : 'text-dark-200 hover:text-primary-400'
                  }
                  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 
                  after:w-0 after:h-0.5 after:bg-primary-500 after:transition-all after:duration-300
                  ${activeSection === link.section ? 'after:w-full' : 'hover:after:w-full'}
                `}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-dark-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-dark-200" />
            ) : (
              <Menu className="w-6 h-6 text-dark-200" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300
            ${isOpen ? 'max-h-64 mt-6' : 'max-h-0'}
          `}
        >
          <div className="flex flex-col gap-4 py-4 bg-dark-800/95 backdrop-blur-md rounded-lg shadow-lg border border-dark-700 px-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className={`
                  text-base font-medium py-2 transition-colors text-left
                  ${activeSection === link.section
                    ? 'text-primary-400'
                    : 'text-dark-200 hover:text-primary-400'
                  }
                `}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

