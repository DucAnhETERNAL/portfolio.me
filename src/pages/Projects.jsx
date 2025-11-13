import React, { useState } from 'react';
import { ExternalLink, Github, Search } from 'lucide-react';
import { Card, Button } from '../components';
import { PROJECTS } from '../constants';

/**
 * Projects Page - Portfolio projects showcase
 */
const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');

  // Get all unique tags
  const allTags = ['all', ...new Set(PROJECTS.flatMap(project => project.tags))];

  // Filter projects based on search and tag
  const filteredProjects = PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === 'all' || project.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-dark-900 to-dark-950 py-16 border-b border-dark-800">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="mb-4 animate-slide-up">Dự án của tôi</h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto animate-fade-in">
              Khám phá các dự án tôi đã xây dựng với đam mê và sự cống hiến
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="section-padding">
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

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
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
                    <h3 className="text-xl mb-2">{project.title}</h3>
                    <p className="text-dark-300 text-sm">
                      {project.description}
                    </p>
                  </Card.Header>

                  {/* Tags */}
                  <Card.Body>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
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
                        Demo
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

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="mb-4">Có ý tưởng dự án?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Hãy liên hệ với tôi để bàn luận về dự án của bạn.
            Tôi luôn sẵn sàng đón nhận những thách thức mới!
          </p>
          <a href="/contact">
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
    </div>
  );
};

export default Projects;

