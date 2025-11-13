# 📚 Hướng dẫn Refactoring - Portfolio Project

## 🎯 Tổng quan

Dự án đã được tái cấu trúc hoàn toàn từ một ứng dụng Vite + React + Tailwind đơn giản thành một portfolio website chuyên nghiệp, có cấu trúc rõ ràng và dễ mở rộng.

## ✨ Những thay đổi chính

### 1. **Cấu trúc thư mục mới**

```
src/
├── components/          # ✅ Components tái sử dụng
│   ├── Button.jsx      # Component button linh hoạt
│   ├── Card.jsx        # Component card với subcomponents
│   ├── Navbar.jsx      # Navigation responsive
│   ├── Footer.jsx      # Footer với social links
│   └── index.js        # Barrel export
│
├── pages/              # ✅ Các trang của website
│   ├── Home.jsx        # Trang chủ với hero section
│   ├── About.jsx       # Trang giới thiệu
│   ├── Projects.jsx    # Trang dự án với filter
│   ├── Contact.jsx     # Trang liên hệ với form
│   └── index.js        # Barrel export
│
├── styles/             # ✅ Global styles
│   └── index.css       # Custom CSS utilities
│
├── constants/          # ✅ Data và configuration
│   └── index.js        # Tất cả constants
│
├── hooks/              # ✅ Custom hooks (sẵn sàng mở rộng)
├── utils/              # ✅ Utility functions (sẵn sàng mở rộng)
│
├── App.jsx             # ✅ Main app với routing
├── main.jsx            # Entry point
└── index.css           # Tailwind + base styles
```

### 2. **Dependencies mới**

```json
{
  "react-router-dom": "Routing giữa các trang",
  "lucide-react": "Modern icon library"
}
```

### 3. **Tailwind Configuration**

**Thêm vào `tailwind.config.js`:**
- 🎨 Custom color palette (primary, dark)
- ✨ Custom animations (fade-in, slide-up, scale-in, etc.)
- 📝 Custom font family (Inter)
- 🔑 Keyframes cho animations

### 4. **Global Styles**

**`src/index.css`:**
- Base styles với Tailwind layers
- Responsive typography
- Utility classes (btn, card, container-custom)
- Custom scrollbar
- Smooth scroll behavior

**`src/styles/index.css`:**
- Glass effect utility
- Gradient text utility
- Shadow glow effect

---

## 🧩 Components Chi tiết

### **Button Component** (`src/components/Button.jsx`)

**Features:**
- 4 variants: primary, secondary, outline, ghost
- 3 sizes: sm, md, lg
- Fully customizable với className
- TypeScript-ready prop types

**Usage:**
```jsx
import { Button } from './components';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

### **Card Component** (`src/components/Card.jsx`)

**Features:**
- Main Card với hover effect
- Subcomponents: Image, Header, Body, Footer
- Flexible và composable

**Usage:**
```jsx
import { Card } from './components';

<Card>
  <Card.Image src="image.jpg" alt="Alt text" />
  <Card.Header>
    <h3>Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Content here</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

### **Navbar Component** (`src/components/Navbar.jsx`)

**Features:**
- Sticky navbar với scroll effect
- Responsive mobile menu
- Active link highlighting
- Smooth animations
- Auto-close menu khi chuyển trang

**Highlights:**
- Desktop: Horizontal menu với underline effect
- Mobile: Hamburger menu với slide animation
- Backdrop blur effect khi scroll

### **Footer Component** (`src/components/Footer.jsx`)

**Features:**
- 3-column layout (Brand, Quick Links, Social)
- Responsive grid
- Social media icons với hover effects
- Copyright và credits section

---

## 📄 Pages Chi tiết

### **Home Page** (`src/pages/Home.jsx`)

**Sections:**
1. **Hero Section**
   - Gradient background với animated blobs
   - Animated greeting badge
   - CTA buttons (Xem dự án, Liên hệ)
   - Social links
   - Scroll indicator

2. **Features Section**
   - 3 feature cards
   - Icon với gradient background
   - Hover effects

**Animations:**
- Fade in
- Slide up với staggered delays
- Blob animation cho background

### **About Page** (`src/pages/About.jsx`)

**Sections:**
1. **Header** - Title và description
2. **Main Content**
   - Left: Profile image + Contact info card
   - Right: Description + Skills với progress bars
3. **Stats Section** - Experience, Projects, Satisfaction
4. **Timeline Section** - Journey với step-by-step timeline

**Features:**
- Animated skill bars
- Download CV button
- Responsive 2-column layout
- Dark section cho timeline

### **Projects Page** (`src/pages/Projects.jsx`)

**Features:**
- Search bar để tìm kiếm dự án
- Tag filters (all, React, Tailwind, etc.)
- Project grid (responsive 1-3 columns)
- Project cards với:
  - Image với hover zoom
  - Title và description
  - Tags
  - GitHub và Demo buttons
- Empty state khi không có results
- CTA section ở cuối

**Interactive:**
- Real-time search filtering
- Tag-based filtering
- Staggered animation delays

### **Contact Page** (`src/pages/Contact.jsx`)

**Sections:**
1. **Header** - Title và description
2. **Main Content**
   - Left: Contact info cards + Social links + Illustration
   - Right: Contact form

**Form Features:**
- Name, Email, Subject, Message fields
- Form validation (required)
- Success state với animation
- Auto-reset sau submit

**Contact Cards:**
- Email card với mailto link
- Location card
- Social media links với gradient backgrounds

---

## 📊 Constants & Data

**File:** `src/constants/index.js`

### **NAV_LINKS**
Navigation menu items
```js
{ name: 'Trang chủ', path: '/' }
```

### **SOCIAL_LINKS**
Social media links với icons
```js
{ name: 'GitHub', url: '...', icon: 'Github' }
```

### **SKILLS**
Skill list với progress levels
```js
{ name: 'React', level: 90 }
```

### **PROJECTS**
Project portfolio items
```js
{
  id, title, description, image,
  tags, github, demo
}
```

### **ABOUT_INFO**
Personal information
```js
{ name, title, description, email, location }
```

---

## 🎨 Design System

### **Colors**

**Primary (Sky Blue):**
- 50-900 shades
- Main: 600 (#0284c7)

**Dark (Slate):**
- 50-900 shades
- Text: 900, 700, 600

### **Typography**

**Headings:**
- H1: 4xl-6xl (responsive)
- H2: 3xl-5xl
- H3: 2xl-3xl

**Body:** Base với leading-relaxed

### **Spacing**

- `section-padding`: py-16 md:py-24
- `container-custom`: max-w-7xl với responsive padding

### **Effects**

- Shadows: lg, xl, 2xl
- Transitions: 300ms duration
- Hover: scale, shadow, color changes
- Animations: fade, slide, scale

---

## 🚀 Routing Structure

**React Router Setup:**

```
/           → Home Page
/about      → About Page
/projects   → Projects Page
/contact    → Contact Page
```

**Layout:**
```
<Navbar />
<main>
  <Routes>...</Routes>
</main>
<Footer />
```

---

## 📝 Customization Guide

### **1. Thay đổi thông tin cá nhân**

```js
// src/constants/index.js
export const ABOUT_INFO = {
  name: 'TÊN CỦA BẠN',
  title: 'POSITION',
  description: 'MÔ TẢ',
  email: 'YOUR_EMAIL',
  location: 'ĐỊA CHỈ',
};
```

### **2. Thêm/sửa dự án**

```js
// src/constants/index.js
export const PROJECTS = [
  {
    id: 1,
    title: 'DỰ ÁN MỚI',
    description: 'Mô tả ngắn',
    image: 'https://...',
    tags: ['React', 'Tailwind'],
    github: 'https://github.com/...',
    demo: 'https://demo.com',
  },
  // Thêm dự án khác...
];
```

### **3. Cập nhật kỹ năng**

```js
// src/constants/index.js
export const SKILLS = [
  { name: 'React', level: 90 },
  { name: 'NEW SKILL', level: 75 },
  // Thêm kỹ năng khác...
];
```

### **4. Thay đổi màu chủ đạo**

```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        // Thay đổi color palette
        500: '#YOUR_COLOR',
        600: '#YOUR_COLOR',
        // ...
      }
    }
  }
}
```

### **5. Thêm trang mới**

**Bước 1:** Tạo file page
```jsx
// src/pages/NewPage.jsx
const NewPage = () => {
  return <div>New Page Content</div>;
};
export default NewPage;
```

**Bước 2:** Export từ index
```js
// src/pages/index.js
export { default as NewPage } from './NewPage';
```

**Bước 3:** Thêm route
```jsx
// src/App.jsx
import { NewPage } from './pages';

<Route path="/new-page" element={<NewPage />} />
```

**Bước 4:** Thêm vào navigation
```js
// src/constants/index.js
export const NAV_LINKS = [
  // ...
  { name: 'New Page', path: '/new-page' },
];
```

---

## 🎯 Next Steps - Mở rộng thêm

### **1. Blog đơn giản**

```bash
npm install react-markdown gray-matter
```

- Tạo `src/pages/Blog.jsx`
- Store markdown files trong `public/posts/`
- Fetch và render với `react-markdown`

### **2. Contact Form Backend**

**Option A: EmailJS**
```bash
npm install @emailjs/browser
```

**Option B: Custom API**
- Tạo Express server
- Hoặc serverless function (Vercel, Netlify)

### **3. Dark Mode**

```jsx
// src/hooks/useDarkMode.js
const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);
  // Logic here...
  return [isDark, setIsDark];
};
```

Update `tailwind.config.js`:
```js
module.exports = {
  darkMode: 'class',
  // ...
}
```

### **4. Animations nâng cao**

```bash
npm install framer-motion
```

Replace Tailwind animations với Framer Motion:
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### **5. SEO Optimization**

```bash
npm install react-helmet-async
```

Thêm meta tags cho mỗi page:
```jsx
<Helmet>
  <title>Page Title</title>
  <meta name="description" content="..." />
</Helmet>
```

### **6. Loading States**

```jsx
// src/components/Loading.jsx
const Loading = () => (
  <div className="loading-spinner">...</div>
);
```

### **7. Error Boundaries**

```jsx
// src/components/ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  // Handle errors gracefully
}
```

### **8. Analytics**

```bash
npm install react-ga4
```

Track page views và events.

### **9. Progressive Web App (PWA)**

```bash
npm install vite-plugin-pwa -D
```

Add to `vite.config.js` để có offline support.

### **10. Testing**

```bash
npm install -D vitest @testing-library/react jsdom
```

Write unit tests cho components.

---

## 🐛 Troubleshooting

### **Issue: Tailwind classes không work**

**Fix:**
1. Check `tailwind.config.js` content paths
2. Restart dev server
3. Clear cache: `npm run dev -- --force`

### **Issue: React Router không work**

**Fix:**
1. Check import: `BrowserRouter`
2. Verify routes structure
3. For deployment, add redirects config

### **Issue: Icons không hiển thị**

**Fix:**
1. Check `lucide-react` installed
2. Import đúng icon name
3. Case-sensitive!

### **Issue: Animations không smooth**

**Fix:**
1. Add `will-change` CSS property
2. Use `transform` instead of position changes
3. Check browser hardware acceleration

---

## 📚 Resources & References

### **Design Inspiration:**
- [Dribbble](https://dribbble.com/)
- [Awwwards](https://www.awwwards.com/)
- [Behance](https://www.behance.net/)

### **Components:**
- [Tailwind UI](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)
- [Radix UI](https://www.radix-ui.com/)

### **Icons:**
- [Lucide Icons](https://lucide.dev/)
- [Hero Icons](https://heroicons.com/)
- [Font Awesome](https://fontawesome.com/)

### **Images:**
- [Unsplash](https://unsplash.com/)
- [Pexels](https://www.pexels.com/)
- [Illustrations.co](https://illlustrations.co/)

### **Learning:**
- [React Docs](https://react.dev/)
- [Tailwind Docs](https://tailwindcss.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## ✅ Checklist trước khi deploy

- [ ] Cập nhật tất cả personal info trong `constants/index.js`
- [ ] Thay đổi images thành ảnh thật
- [ ] Test tất cả links (social, projects)
- [ ] Kiểm tra responsive trên mobile
- [ ] Test form submission
- [ ] Optimize images (compress, convert to WebP)
- [ ] Add favicon
- [ ] Update meta tags (title, description)
- [ ] Test trên nhiều browsers
- [ ] Run `npm run build` successfully
- [ ] Setup analytics (optional)
- [ ] Setup domain (optional)

---

## 📞 Support

Nếu bạn gặp vấn đề hoặc cần thêm tính năng, hãy:
1. Check documentation này
2. Đọc comments trong code
3. Search trên Google/StackOverflow
4. Tạo issue trên GitHub

---

**Happy Coding! 🚀✨**

*Last updated: November 2025*

