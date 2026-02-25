import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import Loading from './components/loading';
import OptimizedBackground from './components/OptimizedBackground';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import EventsPage from './pages/EventsPage';
import PastEventsPage from './pages/PastEventsPage';
import TeamPage from './pages/TeamPage';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('blue');
  const lenisRef = useRef(null);
  const location = useLocation();

  // Hide loading screen after video ends (with fade animation delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Adjust this based on your video duration

    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    }
  }, [location.pathname, isLoading]);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (!isLoading) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      });

      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Connect Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      return () => {
        lenis.destroy();
      };
    }
  }, [isLoading]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <Loading />}

      {!isLoading && (
        <div className="relative bg-cyber-dark text-white min-h-screen">
          {/* Scroll to Top Button */}
          <ScrollToTop />

          {/* Optimized Background */}
          <OptimizedBackground theme={theme} intensity="low" />

          {/* Navigation */}
          <Navbar theme={theme} onThemeChange={handleThemeChange} />

          {/* Routes with Smooth Transitions */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <Home theme={theme} />
                </motion.div>
              } />
              <Route path="/home" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <Home theme={theme} />
                </motion.div>
              } />
              <Route path="/landing" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <LandingPage theme={theme} />
                </motion.div>
              } />
              <Route path="/events" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <EventsPage theme={theme} />
                </motion.div>
              } />
              <Route path="/past-events" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <PastEventsPage theme={theme} />
                </motion.div>
              } />
              <Route path="/team" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <TeamPage theme={theme} />
                </motion.div>
              } />
              <Route path="/contact" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <Contact theme={theme} />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>

          {/* Footer */}
          <Footer />

          {/* Custom Cursor */}
          <CustomCursor theme={theme} />
        </div>
      )}
    </>
  );
}

export default App;
