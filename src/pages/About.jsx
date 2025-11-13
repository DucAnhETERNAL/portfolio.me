import React from 'react';
import { Mail, MapPin, Download } from 'lucide-react';
import { Button } from '../components';
import { ABOUT_INFO, SKILLS } from '../constants';

/**
 * About Page - Personal information and skills
 */
const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-dark-900 to-dark-950 py-16 border-b border-dark-800">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="mb-4 animate-slide-up">Giới thiệu về tôi</h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto animate-fade-in">
              Tìm hiểu thêm về hành trình và kỹ năng của tôi
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
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

      {/* Background Section */}
      <section className="bg-dark-900 text-white section-padding">
        <div className="container-custom">
          <h2 className="text-center mb-12">Hành trình của tôi</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Timeline Item 1 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold">1</span>
                </div>
                <div className="w-0.5 h-full bg-dark-700 mt-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl mb-2">Bắt đầu với Web Development</h3>
                <p className="text-dark-300">
                  Khám phá thế giới lập trình web, học HTML, CSS và JavaScript cơ bản
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold">2</span>
                </div>
                <div className="w-0.5 h-full bg-dark-700 mt-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl mb-2">Chuyên sâu React & Node.js</h3>
                <p className="text-dark-300">
                  Tập trung vào React để xây dựng UI và Node.js cho backend development
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold">3</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl mb-2">Full Stack Developer</h3>
                <p className="text-dark-300">
                  Hiện tại làm việc với các dự án full-stack, từ thiết kế đến triển khai
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

