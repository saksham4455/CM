import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components (Critical - loaded immediately)
import Loading from './components/loading';
import OptimizedBackground from './components/OptimizedBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ContactForm from './components/ContactForm';

// Lazy-loaded components
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
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
    background: '#0a0a0f',
    color: '#00f3ff'
  }}>
    <div style={{ 
      fontSize: '1.5rem',
      fontFamily: 'monospace',
      textAlign: 'center'
    }}>
      <div style={{ marginBottom: '10px' }}>⚡ Loading...</div>
      <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Initializing components</div>
    </div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(false); // Temporarily disabled for debugging
  const [theme, setTheme] = useState('blue');
  const lenisRef = useRef(null);
  const location = useLocation();

  // Hide loading screen after video ends (with fade animation delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Reduced loading time for better UX

    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (!isLoading) {
      // Always ensure Lenis is running when navigating to any page
      if (lenisRef.current) {
        lenisRef.current.start();
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [location.pathname, isLoading]);


  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (!isLoading) {
      const lenis = new Lenis({
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
      });

      lenisRef.current = lenis;
      window.__lenis = lenis;

      // Sync Lenis scroll position with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Drive Lenis via GSAP ticker (time is in seconds → convert to ms)
      const onTick = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(onTick);
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
          <Suspense fallback={<PageLoader />}>
            {/* Scroll to Top Button */}
            <ScrollToTop />

            {/* Optimized Background with Error Boundary */}
            <ErrorBoundary silent={true}>
              <OptimizedBackground theme={theme} intensity="low" />
            </ErrorBoundary>

            {/* Navigation */}
            {location.pathname !== '/admin' && location.pathname !== '/admin-login' && <Navbar />}

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
                {/* ── Temporarily disconnected routes ── */}
                {<Route path="/landing" element={
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
                } /> }
                { <Route path="/events" element={
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
                } /> }
                { <Route path="/past-events" element={
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
                } /> }
                { <Route path="/team" element={
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
                } />}
                { <Route path="/contact" element={
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
                } /> }
                <Route path="/form" element={
                  <Suspense fallback={<PageLoader />}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <ContactForm theme={theme} />
                    </motion.div>
                  </Suspense>
                } />

                {/* ── Registration ── */}
                <Route path="/register" element={
                  <Suspense fallback={<PageLoader />}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <RegistrationPage theme={theme} />
                    </motion.div>
                  </Suspense>
                } />

                {/* ── Admin Login ── */}
                <Route path="/admin-login" element={
                  <Suspense fallback={<PageLoader />}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                    <AdminLogin/>
                  </motion.div>
                  </Suspense>
                } />

                {/* ── Admin Panel ── */}
                <Route path="/admin" element={
                  <Suspense fallback={<PageLoader />}>
                    <AdminPanel />
                  </Suspense>
                } />

                {/* Redirect all other paths to home */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>

            {/* Footer */}
            {location.pathname !== '/admin' && location.pathname !== '/admin-login' && location.pathname !== '/register' && <Footer />}

          </Suspense>
        </div>
      )}
    </>
  );
}

export default App;
