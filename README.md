# CYNET 2026 - Tech Fest Website

An elite, cinematic tech fest website built with React, Three.js, GSAP, and premium animations, fully optimized for performance and responsive across all devices.

## 🎬 Features

- **Intro Loading Screen**: Red scanning animation with terminal-style authentication
- **Neural Network Background**: Three.js animated neural network with dynamic particles
- **Glass Morphism Navbar**: Smooth scroll-responsive navigation with theme toggle
- **Cinematic Hero Section**: Interactive Pong-style hero with canvas animations
- **Event Highlights**: Glass cards with 3D tilt and glow effects
- **Terminal Key Points**: Live typing animation with command center aesthetics
- **Horizontal Scroll Past Events**: GSAP ScrollTrigger powered horizontal section
- **Dynamic Blog Section**: JSON-powered blog cards with hover animations
- **Holographic Sponsors**: Spotlight sweep and floating animations
- **Team ID Scanning**: Red scanning line verification effect
- **Terminal Contact Form**: Encrypted transmission UI with success animations
- **Cyber Footer**: Heavy grid background with animated neural dots
- **Theme Toggle**: Blue, Purple, Green, and Red theme options with smooth transitions
- **Smooth Scroll**: Lenis smooth scrolling integration
- **Custom Cursor**: Dynamic cursor glow effect that follows mouse
- **Lazy Loading**: Optimized image loading for better performance
- **Responsive Design**: Fully responsive from 320px to 4K displays

## 🚀 Performance Optimizations

### Build Optimizations
- ✅ **Code Splitting**: Routes and components are lazy-loaded
- ✅ **Bundle Optimization**: Manual chunks for vendor libraries (React, Three.js, animations)
- ✅ **Tree Shaking**: Unused code is automatically removed
- ✅ **Minification**: ESBuild for fast, efficient code minification

### Runtime Optimizations
- ✅ **Lazy Loading**: Components and routes load on-demand
- ✅ **Image Optimization**: Custom LazyImage component with IntersectionObserver
- ✅ **Canvas Performance**: Throttled animations at 30 FPS for backgrounds
- ✅ **GPU Acceleration**: Transform3D and will-change for smooth animations
- ✅ **Debounced/Throttled Events**: Resize and scroll events are optimized
- ✅ **React.memo**: Components are memoized to prevent unnecessary re-renders
- ✅ **useMemo Hooks**: Expensive calculations are cached

### Responsive Optimizations
- ✅ **Mobile-First**: Reduced particle counts on mobile devices
- ✅ **Adaptive Quality**: Lower visual effects on smaller screens
- ✅ **Breakpoints**: Comprehensive media queries from 320px to 2560px+
  - 320px (Small phones)
  - 375px (iPhone SE)
  - 480px (Older phones)
  - 640px (Phones landscape)
  - 768px (Tablets portrait)
  - 900px (Tablets landscape)
  - 1024px (Small laptops)
  - 1200px (Laptops)
  - 1400px (Desktops)
  - 1920px+ (Large displays)

### Memory Management
- ✅ **Proper Cleanup**: All event listeners and animation frames are cleaned up
- ✅ **WebGL Context Management**: Three.js renderers properly disposed
- ✅ **Animation Frame Control**: RequestAnimationFrame properly cancelled

## 🛠️ Tech Stack

- **React 18** - UI Framework with concurrent features
- **Vite 7** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Three.js** - 3D Neural Network and particles
- **GSAP + ScrollTrigger** - Advanced scroll-based animations
- **Lenis** - Smooth scrolling library
- **Framer Motion** - React animation library

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🎨 Theme Options

The website supports three theme colors:
- **Blue** (#00f3ff) - Default cyber blue
- **Purple** (#b829ff) - Neon purple
- **Green** (#00ff41) - Matrix green

Toggle between themes using the color switcher in the navbar.

## 📂 Project Structure

```
src/
├── components/
│   ├── IntroScreen.jsx      # Loading screen with scanning animation
│   ├── NeuralBackground.jsx # Three.js neural network
│   ├── Navbar.jsx           # Glass morphism navigation
│   ├── Hero.jsx             # Hero section with 3D poster
│   ├── EventHighlights.jsx  # Event cards section
│   ├── KeyPoints.jsx        # Terminal-style features
│   ├── PastEvents.jsx       # Horizontal scroll section
│   ├── Blog.jsx             # Dynamic blog cards
│   ├── Sponsors.jsx         # Holographic sponsor panels
│   ├── Team.jsx             # ID scan team cards
│   ├── Contact.jsx          # Terminal contact form
│   └── Footer.jsx           # Cyber grid footer
├── data/
│   └── blogPosts.json       # Blog post data
├── App.jsx                  # Main app component
├── main.jsx                 # App entry point
└── index.css                # Global styles

## 🚀 Deployment

Build the project for production:
```bash
npm run build
```

The optimized files will be in the `dist/` folder, ready for deployment to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 📱 Mobile Responsive

The website is fully responsive with optimized animations for all screen sizes:
- **Mobile devices**: Simplified animations and reduced particle effects for performance
- **Tablets**: Balanced visual quality and performance
- **Desktop**: Full visual effects with all optimizations
- **4K+ displays**: Enhanced quality with optimal performance

### Responsive Features
- Adaptive canvas resolution based on device
- Mobile-optimized navigation menu
- Touch-friendly interactions
- Optimized image loading per viewport
- Reduced motion support for accessibility

## ⚡ Performance Tips

1. **Clear Browser Cache**: For best performance on updates
2. **Use Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
3. **Hardware Acceleration**: Ensure it's enabled in your browser
4. **Optimal Viewport**: Best experienced on screens 375px and above

## 📊 Performance Metrics

Target metrics achieved:
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1
- Total Blocking Time (TBT): < 300ms

## 🎨 Theme Options

The website supports four theme colors:
- **Blue** (#00f3ff) - Default cyber blue
- **Purple** (#b829ff) - Neon purple
- **Green** (#00ff41) - Matrix green
- **Red** (#ff0055) - Alert red

Toggle between themes using the color switcher in the navbar.
- Vertical stack instead of horizontal scroll
- Reduced glow intensity
- Touch-optimized interactions

## 🎯 Performance

- Lazy loading for images
- Optimized Three.js rendering
- GSAP performance optimization
- Smooth 60fps animations
- Code splitting with Vite

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js` to customize the cyber color palette.

### Add Blog Posts
Edit `src/data/blogPosts.json` to add or modify blog content.

### Modify Team Members
Edit the `teamMembers` array in `src/components/Team.jsx`.

### Update Sponsors
Modify the `sponsors` array in `src/components/Sponsors.jsx`.

## 📄 License

MIT License - Feel free to use this for your own tech fest!

## 👥 Credits

Designed and developed for CYNET 2026 Tech Fest
IT Department

---

**Built with 💙 for innovation and technology**
