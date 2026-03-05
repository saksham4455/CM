import React, { useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PongHero from '../components/PongHero';
import Sponsors from '../components/Sponsers';
import CyberMatrixBackground from '../components/CyberMatrixBackground';
import '../css/Home.css';


const Home = memo(() => {
  const navigate = useNavigate();
  
  const events = useMemo(() => [
    { name: 'TREASURE HUNT',  icon: '🗺️', category: 'ADVENTURE',     accentColor: '#00F5FF', description: 'Race across JIMS campus cracking encrypted clues and puzzles in a time-bound bounty hunt.' },
    { name: 'INNOVISION 7.0', icon: '💡', category: 'INNOVATION',     accentColor: '#6C63FF', description: 'Ideathon on cybersecurity challenges across AI/ML, Robotics, IoT, Biotech, and Clean Tech.' },
    { name: 'GAMING ARENA',   icon: '🎮', category: 'ESPORTS',        accentColor: '#FF00E5', description: 'Ultimate esports battleground with competitive tournaments across 7 gaming titles.' },
    { name: 'HACKING EVENT',  icon: '🔓', category: 'CYBERSECURITY',  accentColor: '#00ff41', description: 'Elite capture-the-flag competition designed for ethical hackers and security enthusiasts.' },
    { name: 'MIND MATRIX',    icon: '🧠', category: 'STRATEGY',       accentColor: '#00F5FF', description: 'Create digital mind maps using MS Word or AI tools, then present to the judges.' },
    { name: 'TECH UNSEEN',    icon: '❓', category: 'KNOWLEDGE',      accentColor: '#6C63FF', description: 'Two-round IT quiz — timed Q&A in Round 1, then Debug the Innovation for top qualifiers.' },
    { name: 'SHADOW CODE',    icon: '💻', category: 'PROGRAMMING',    accentColor: '#FF00E5', description: 'Two-round coding challenge — MCQs on C & Python, then blind coding in C with monitor off.' },
  ], []);

  return (
    <div className="home-page">
      {/* ── PARTICLE BACKGROUND ── */}
      <div className="home-particle-background">
        <CyberMatrixBackground theme="blue" />
      </div>

      {/* ── INTERACTIVE HERO ── */}
      <PongHero />

      {/* ── MISSION BRIEF ── */}
      <motion.section
        className="home-mission"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
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
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay: 0.2 }}
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


        </div>
      </motion.section>

      {/* ── TERMINAL EVENT LIST ── */}
      <section className="home-event-section">
        <div className="home-shell">
          <motion.div
            className="term-heading-wrap"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="term-heading-tag">&gt; system --events</p>
            <h2 className="term-heading">Pick your challenge. Pick your path.</h2>
            <div className="term-heading-line" />
          </motion.div>
          <div className="term-window">
            {/* Title bar */}
            <div className="term-titlebar">
              <span className="term-dot term-dot--red" />
              <span className="term-dot term-dot--yellow" />
              <span className="term-dot term-dot--green" />
              <span className="term-title">cynet@enigma:~/events</span>
            </div>
            {/* Flip Card Grid */}
            <div className="flip-grid">
              {events.map((ev, i) => (
                <motion.div
                  key={ev.name}
                  className="flip-card"
                  style={{ '--accent': ev.accentColor }}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  onClick={() => navigate('/events')}
                >
                  <div className="flip-card-inner">
                    {/* FRONT */}
                    <div className="flip-card-front">
                      <span className="flip-card-index">{String(i + 1).padStart(2, '0')}</span>
                      <span className="flip-card-icon">{ev.icon}</span>
                      <h3 className="flip-card-name">{ev.name}</h3>
                      <span className="flip-card-category">{ev.category}</span>
                      <div className="flip-card-scanline" />
                      <div className="flip-card-corner flip-card-corner--tl" />
                      <div className="flip-card-corner flip-card-corner--br" />
                    </div>
                    {/* BACK */}
                    <div className="flip-card-back">
                      <span className="flip-card-back-icon">{ev.icon}</span>
                      <h3 className="flip-card-back-name">{ev.name}</h3>
                      <p className="flip-card-desc">{ev.description}</p>
                      <button className="flip-card-cta">VIEW EVENT →</button>
                      <div className="flip-card-corner flip-card-corner--tl" />
                      <div className="flip-card-corner flip-card-corner--br" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <Sponsors />
    </div>
  );
});

export default Home;
