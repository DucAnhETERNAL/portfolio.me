import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { Button, Card } from '../components';
import { ABOUT_INFO, SOCIAL_LINKS } from '../constants';

/**
 * Contact Page - Contact form and information
 */
const Contact = () => {
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
    // TODO: Implement actual form submission logic
    console.log('Form submitted:', formData);
    setIsSubmitted(true);

    // Reset form after 3 seconds
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
    <div className="min-h-screen pt-24 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-dark-900 to-dark-950 py-16 border-b border-dark-800">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="mb-4 animate-slide-up">Liên hệ với tôi</h1>
            <p className="text-lg text-dark-300 max-w-2xl mx-auto animate-fade-in">
              Hãy kết nối với tôi! Tôi luôn sẵn sàng nghe về các cơ hội và dự án mới
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="mb-6">Thông tin liên hệ</h2>
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
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
                      aria-label={social.name}
                    >
                      <span className="text-xl">{social.icon === 'Github' ? '💻' : social.icon === 'Linkedin' ? '💼' : social.icon === 'Twitter' ? '🐦' : '✉️'}</span>
                    </a>
                  ))}
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

      {/* Map Section (Optional - can be replaced with real map) */}
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

export default Contact;

