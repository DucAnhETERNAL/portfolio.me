# Portfolio Website - Vite + React + Tailwind CSS

Một website portfolio hiện đại và chuyên nghiệp được xây dựng với Vite, React và Tailwind CSS. Dự án được cấu trúc rõ ràng, dễ bảo trì và mở rộng.

## 🚀 Tính năng

- ✨ Giao diện hiện đại, responsive
- 🎨 Sử dụng Tailwind CSS với theme tùy chỉnh
- 🔄 React Router cho navigation mượt mà
- 📱 Mobile-friendly với hamburger menu
- 🎭 Animations và transitions đẹp mắt
- 🧩 Component-based architecture
- 📦 Code được tổ chức rõ ràng, dễ mở rộng

## 📁 Cấu trúc dự án

```
my-react-app/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── Button.jsx     # Button component với nhiều variants
│   │   ├── Card.jsx       # Card component với subcomponents
│   │   ├── Navbar.jsx     # Navigation bar responsive
│   │   ├── Footer.jsx     # Footer với social links
│   │   └── index.js       # Export tất cả components
│   │
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Trang chủ với hero section
│   │   ├── About.jsx      # Trang giới thiệu
│   │   ├── Projects.jsx   # Trang dự án với filter
│   │   ├── Contact.jsx    # Trang liên hệ với form
│   │   └── index.js       # Export tất cả pages
│   │
│   ├── styles/            # Global styles
│   │   └── index.css      # Custom CSS utilities
│   │
│   ├── constants/         # Constants và configuration
│   │   └── index.js       # NAV_LINKS, PROJECTS, SKILLS, etc.
│   │
│   ├── hooks/             # Custom React hooks (để mở rộng)
│   ├── utils/             # Utility functions (để mở rộng)
│   │
│   ├── App.jsx            # Main App với routing
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind imports + base styles
│
├── index.html
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── package.json
```

## 🎨 Components

### Button Component
```jsx
import { Button } from './components';

// Variants: primary, secondary, outline, ghost
// Sizes: sm, md, lg
<Button variant="primary" size="lg" onClick={handleClick}>
  Click me
</Button>
```

### Card Component
```jsx
import { Card } from './components';

<Card>
  <Card.Image src="image.jpg" alt="Description" />
  <Card.Header>
    <h3>Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Content</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

### Navbar & Footer
- **Navbar**: Tự động responsive, có mobile menu
- **Footer**: Hiển thị links và social media

## 🛠️ Cài đặt và chạy

### Yêu cầu
- Node.js >= 14
- npm hoặc yarn

### Cài đặt dependencies
```bash
npm install
```

### Chạy development server
```bash
npm run dev
```

### Build cho production
```bash
npm run build
```

### Preview production build
```bash
npm run preview
```

## 📝 Tùy chỉnh nội dung

### 1. Thông tin cá nhân
Mở file `src/constants/index.js` và cập nhật:
- `ABOUT_INFO`: Tên, title, email, location
- `SOCIAL_LINKS`: Links đến social media
- `SKILLS`: Danh sách kỹ năng và level

### 2. Dự án
Thêm/sửa dự án trong `PROJECTS` array:
```js
{
  id: 1,
  title: 'Tên dự án',
  description: 'Mô tả ngắn',
  image: 'URL hình ảnh',
  tags: ['React', 'Tailwind'],
  github: 'GitHub URL',
  demo: 'Demo URL',
}
```

### 3. Navigation
Sửa navigation links trong `NAV_LINKS` array

### 4. Theme Colors
Tùy chỉnh màu sắc trong `tailwind.config.js`:
```js
colors: {
  primary: { /* ... */ },
  dark: { /* ... */ }
}
```

## 🎯 Mở rộng tính năng

### Thêm trang mới
1. Tạo file component trong `src/pages/`
2. Export từ `src/pages/index.js`
3. Thêm route trong `src/App.jsx`
4. Thêm link trong `src/constants/index.js`

### Thêm component mới
1. Tạo file trong `src/components/`
2. Export từ `src/components/index.js`
3. Import và sử dụng ở bất kỳ đâu

### Thêm custom hook
1. Tạo file trong `src/hooks/`
2. Export và sử dụng trong components

### Thêm utility function
1. Tạo file trong `src/utils/`
2. Export và import khi cần

## 💡 Tips & Best Practices

### 1. Component Organization
- Giữ components nhỏ và tập trung vào một nhiệm vụ
- Sử dụng props để customize
- Export từ index.js để import dễ dàng

### 2. Styling
- Sử dụng Tailwind utility classes
- Tạo custom utilities trong `@layer` khi cần
- Dùng `className` prop để customize

### 3. State Management
- Dùng `useState` cho local state
- Có thể thêm Context API cho global state
- Hoặc integrate Redux/Zustand khi cần

### 4. Performance
- Lazy load pages với `React.lazy()`
- Optimize images (sử dụng WebP, lazy loading)
- Code splitting tự động với Vite

## 🚀 Tích hợp thêm

### Blog đơn giản
- Tạo `src/pages/Blog.jsx`
- Thêm markdown support với `react-markdown`
- Store posts trong `src/constants/` hoặc fetch từ API

### Contact Form Backend
- Tích hợp với EmailJS
- Hoặc tạo API endpoint với Node.js/Express
- Hoặc sử dụng serverless functions (Netlify, Vercel)

### Animations nâng cao
- Cài thêm `framer-motion`: `npm install framer-motion`
- Thay thế animations hiện tại bằng Framer Motion

### Dark Mode
- Thêm state để toggle theme
- Sử dụng `dark:` prefix của Tailwind
- Lưu preference trong localStorage

## 📦 Dependencies chính

- **react** & **react-dom**: UI library
- **react-router-dom**: Routing
- **lucide-react**: Modern icons
- **tailwindcss**: Utility-first CSS framework
- **vite**: Fast build tool

## 🎓 Học thêm

- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Guide](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)

## 📄 License

MIT License - Bạn có thể tự do sử dụng cho dự án cá nhân hoặc thương mại.

## 🤝 Contributing

Nếu bạn muốn đóng góp hoặc báo lỗi, hãy tạo issue hoặc pull request!

---

**Chúc bạn code vui vẻ! 🚀✨**
