import React, { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PongHero from '../components/PongHero';
import Sponsors from '../components/Sponsers';
import EventCarousel from '../components/EventCarousel';
import CyberMatrixBackground from '../components/CyberMatrixBackground';
import '../css/Home.css';

const Home = memo(() => {
  const [isScanned, setIsScanned] = useState(false);
  
  const events = useMemo(() => [
    { 
      name: 'TREASURE HUNT', 
      img: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&q=80&w=800',
      code: '# 01',
      icon: '🗺️'
    },
    { 
      name: 'INNOVISION 7.0', 
      img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      code: '# 02',
      icon: '💡'
    },
    { 
      name: 'GAMING ARENA', 
      img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
      code: '# 03',
      icon: '🎮'
    },
    { 
      name: 'HACKING EVENT', 
      img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      code: '# 04',
      icon: '🔓'
    },
    { 
      name: 'MIND MAP', 
      img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800',
      code: '# 05',
      icon: '🧠'
    },
    { 
      name: 'IT QUIZ', 
      img: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800',
      code: '# 06',
      icon: '❓'
    },
    { 
      name: 'CODING SPRINT', 
      img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
      code: '# 07',
      icon: '💻'
    },
  ], []);

  return (
    <div className="home-page">
      {/* ── PARTICLE BACKGROUND ── */}
      <div className="home-particle-background">
        <CyberMatrixBackground theme="blue" />
      </div>

      {/* ── INTERACTIVE HERO ── */}
      <motion.div
        onViewportEnter={() => setIsScanned(true)}
      >
        <PongHero />
      </motion.div>

      {/* ── MISSION BRIEF ── */}
      <motion.section
        className="home-mission"
        initial={{ opacity: 0, y: 50 }}
        animate={isScanned ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="home-shell">
          <motion.div
            className="mission-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mission-title">TECH FEST</h2>
            <p className="mission-text">
              Where Innovation Meets Excellence. Join us for an extraordinary journey through
              cutting-edge technology, competitive challenges, and game-changing ideas.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ── STATUS NODES ── */}
      <motion.section
        className="home-stats-section"
        initial={{ opacity: 0 }}
        animate={isScanned ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="home-shell">
          <div className="stats-container">
            {[
              { val: '5+', label: 'EVENTS', glow: '#00f3ff' },
              { val: '100+', label: 'PARTICIPANTS', glow: '#b829ff' },
              { val: '15k', label: 'PRIZE POOL', glow: '#00ff88' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, borderColor: stat.glow }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ color: stat.glow }}
              >
                <span className="stat-num">{stat.val}</span>
                <span className="stat-tag">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="stats-action-wrap">
            <motion.div
              className="stat-card--action"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              onClick={() => window.location.href = '/contact'}
            >
              <span className="stat-tag" style={{ color: '#00f3ff', opacity: 1 }}>ENTER THE GRID</span>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ── EVENT CAROUSEL ── */}
      <section className="home-event-section">
        <motion.div
          className="event-section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="event-section-title">Pick your challenge. Pick your path.</h2>
          <p className="event-section-sub">Scroll through our diverse range of competitions and challenges</p>
        </motion.div>

        <EventCarousel events={events} />
      </section>

      {/* ── PARTNERS ── */}
      <Sponsors />
    </div>
  );
});

export default Home;
