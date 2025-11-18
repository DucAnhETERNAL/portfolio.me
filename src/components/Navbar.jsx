import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Code, Sun, Moon } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Navbar Component - Responsive navigation bar with smooth scroll
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, toggleTheme } = useTheme();
  const navRefs = useRef({});
  const containerRef = useRef(null);
  const indicatorRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const isUserClicking = useRef(false);

  // Update indicator position immediately
  const updateIndicatorPosition = (sectionId) => {
    const activeButton = navRefs.current[sectionId];
    const container = containerRef.current;

    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setIndicatorStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    }
  };

  // Update indicator position based on active section
  useEffect(() => {
    // Update immediately without delay
    updateIndicatorPosition(activeSection);

    // Update on window resize
    const handleResize = () => {
      updateIndicatorPosition(activeSection);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeSection]);

  // Handle scroll effect
  useEffect(() => {
    let scrollTimeout;
    let ticking = false;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Skip ALL scroll detection if user just clicked (to prevent conflict)
      if (isUserClicking.current) {
        return;
      }

      // Use requestAnimationFrame for smooth scroll handling
      if (!ticking) {
        requestAnimationFrame(() => {
          // Debounce scroll detection to avoid too many updates
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            // Detect active section
            const sections = ['hero', 'features', 'about', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 100;

            for (let i = sections.length - 1; i >= 0; i--) {
              const section = document.getElementById(sections[i]);
              if (section && section.offsetTop <= scrollPosition) {
                // Only update if different to avoid unnecessary re-renders
                setActiveSection(prev => {
                  if (prev !== sections[i]) {
                    return sections[i];
                  }
                  return prev;
                });
                break;
              }
            }
          }, 100); // Increased debounce time
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(scrollTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    // Mark that user is clicking FIRST to prevent any scroll detection
    isUserClicking.current = true;

    // Update active section immediately
    setActiveSection(sectionId);

    // Update indicator position immediately - use double RAF for guaranteed update
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updateIndicatorPosition(sectionId);
      });
    });

    // Small delay to ensure state updates are processed before scroll
    setTimeout(() => {
      // Scroll to section
      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 10);

    setIsOpen(false);

    // Re-enable scroll detection after scroll animation completes
    // Use longer timeout to ensure scroll is fully complete
    setTimeout(() => {
      isUserClicking.current = false;
    }, 2000); // Increased timeout to ensure scroll completes
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-lg shadow-primary-900/20 dark:shadow-primary-900/20 border-b border-gray-200 dark:border-dark-800 py-4'
          : 'bg-transparent py-6'
        }
      `}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-2xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors z-10"
          >
            <Code className="w-8 h-8" />
            <span className="hidden sm:inline">Portfolio</span>
          </button>

          {/* Desktop Menu - Pill Nav (Centered) */}
          <div className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
            {/* Pill Navigation Container */}
            <div
              ref={containerRef}
              className="relative flex items-center gap-1 p-1 bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl rounded-full border border-gray-200/50 dark:border-dark-700/50 shadow-lg shadow-black/5 dark:shadow-black/20"
            >
              {/* Sliding Indicator */}
              <div
                ref={indicatorRef}
                className="absolute top-1 bottom-1 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-300 ease-out shadow-md"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              />

              {/* Navigation Links */}
              {NAV_LINKS.map((link, index) => (
                <button
                  key={link.section}
                  ref={(el) => {
                    if (el) navRefs.current[link.section] = el;
                  }}
                  onClick={() => scrollToSection(link.section)}
                  className={`
                    relative z-10 px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap flex-1 text-center
                    ${activeSection === link.section
                      ? 'text-white'
                      : 'text-gray-700 dark:text-dark-200 hover:text-primary-600 dark:hover:text-primary-400'
                    }
                  `}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle Button - Right Side */}
          <div className="hidden md:flex items-center z-10">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/80 dark:bg-dark-800/80 backdrop-blur-xl border border-gray-200/50 dark:border-dark-700/50 hover:bg-gray-100 dark:hover:bg-dark-700 transition-all duration-300 shadow-lg shadow-black/5 dark:shadow-black/20"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-dark-200" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-dark-200" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300
            ${isOpen ? 'max-h-64 mt-6' : 'max-h-0'}
          `}
        >
          <div className="flex flex-col gap-4 py-4 bg-white/95 dark:bg-dark-800/95 backdrop-blur-md rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 px-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className={`
                  text-base font-medium py-2 transition-colors text-left
                  ${activeSection === link.section
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-dark-200 hover:text-primary-600 dark:hover:text-primary-400'
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

