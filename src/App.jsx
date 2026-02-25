import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components (Critical - loaded immediately)
import Loading from './components/loading';
import OptimizedBackground from './components/OptimizedBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy-loaded components
const CustomCursor = lazy(() => import('./components/CustomCursor'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const LandingPage = lazy(() => import('./pages/LandingPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const PastEventsPage = lazy(() => import('./pages/PastEventsPage'));
const TeamPage = lazy(() => import('./pages/TeamPage'));
const Contact = lazy(() => import('./pages/Contact'));

gsap.registerPlugin(ScrollTrigger);

// Loading fallback component
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh',
    background: '#06060c'
  }}>
    <div style={{ 
      color: '#00f3ff', 
      fontSize: '1.5rem',
      fontFamily: 'monospace'
    }}>Loading...</div>
  </div>
);

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
          <Suspense fallback={null}>
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
                  <Suspense fallback={<PageLoader />}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <Home theme={theme} />
                    </motion.div>
                  </Suspense>
                } />
                <Route path="/home" element={
                  <Suspense fallback={<PageLoader />}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <Home theme={theme} />
                    </motion.div>
                  </Suspense>
                } />
                <Route path="/landing" element={
                  <Suspense fallback={<PageLoader />}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <LandingPage theme={theme} />
                    </motion.div>
                  </Suspense>
                } />
                <Route path="/events" element={
                  <Suspense fallback={<PageLoader />}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <EventsPage theme={theme} />
                    </motion.div>
                  </Suspense>
                } />
                <Route path="/past-events" element={
                  <Suspense fallback={<PageLoader />}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <PastEventsPage theme={theme} />
                    </motion.div>
                  </Suspense>
                } />
                <Route path="/team" element={
                  <Suspense fallback={<PageLoader />}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <TeamPage theme={theme} />
                    </motion.div>
                  </Suspense>
                } />
                <Route path="/contact" element={
                  <Suspense fallback={<PageLoader />}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <Contact theme={theme} />
                    </motion.div>
                  </Suspense>
                } />
              </Routes>
            </AnimatePresence>

            {/* Footer */}
            <Footer />

            {/* Custom Cursor */}
            <CustomCursor theme={theme} />
          </Suspense>
        </div>
      )}
    </>
  );
}

export default App;
