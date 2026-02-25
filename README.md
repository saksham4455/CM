# CYNET 2026 - Tech Fest Website

An elite, cinematic tech fest website built with React, Three.js, GSAP, and premium animations.

## 🎬 Features

- **Intro Loading Screen**: Red scanning animation with terminal-style authentication
- **Neural Network Background**: Three.js animated neural network with dynamic particles
- **Glass Morphism Navbar**: Smooth scroll-responsive navigation with theme toggle
- **Cinematic Hero Section**: Parallax effects, 3D tilt poster, mask text animations
- **Event Highlights**: Glass cards with 3D tilt and glow effects
- **Terminal Key Points**: Live typing animation with command center aesthetics
- **Horizontal Scroll Past Events**: GSAP ScrollTrigger powered horizontal section
- **Dynamic Blog Section**: JSON-powered blog cards with hover animations
- **Holographic Sponsors**: Spotlight sweep and floating animations
- **Team ID Scanning**: Red scanning line verification effect
- **Terminal Contact Form**: Encrypted transmission UI with success animations
- **Cyber Footer**: Heavy grid background with animated neural dots
- **Theme Toggle**: Blue, Purple, and Green theme options with smooth transitions
- **Smooth Scroll**: Lenis smooth scrolling integration
- **Cursor Glow**: Dynamic cursor glow effect that follows mouse

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Three.js** - 3D Neural Network
- **GSAP** - Advanced Animations
- **ScrollTrigger** - Scroll Animations
- **Lenis** - Smooth Scrolling
- **Framer Motion** - React Animations

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

The website is fully responsive with optimized animations for mobile devices:
- Simplified neural network for performance
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
