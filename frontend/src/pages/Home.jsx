import React, { useMemo, memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PongHero from '../components/PongHero';
import Sponsors from '../components/Sponsers';
import CyberMatrixBackground from '../components/CyberMatrixBackground';
import '../css/Home.css';

const STATUS_LABELS = ['ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE'];

const TerminalList = ({ events, onSelect }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [executed, setExecuted] = useState(null);

  useEffect(() => {
    if (visibleCount >= events.length + 2) return;
    const t = setTimeout(() => setVisibleCount(v => v + 1), visibleCount === 0 ? 400 : 180);
    return () => clearTimeout(t);
  }, [visibleCount, events.length]);

  const handleClick = (i) => {
    setExecuted(i);
    setTimeout(() => { setExecuted(null); onSelect(); }, 600);
  };

  const lines = [
    { type: 'cmd',    text: 'ls --events --status=active' },
    { type: 'output', text: `Found ${events.length} events. Displaying...` },
    ...events.map((ev, i) => ({ type: 'event', ev, i })),
    { type: 'prompt', text: '' },
  ];

  return (
    <div className="term-lines">
      {lines.slice(0, visibleCount).map((line, idx) => {
        if (line.type === 'cmd') return (
          <div key={idx} className="term-line">
            <span className="term-ps1">enigma@cynet:~$&nbsp;</span>
            <span className="term-cmd">{line.text}</span>
          </div>
        );
        if (line.type === 'output') return (
          <div key={idx} className="term-line term-line--info">
            <span className="term-info-arrow">&gt;&gt;&nbsp;</span>{line.text}
          </div>
        );
        if (line.type === 'prompt') return (
          <div key={idx} className="term-line">
            <span className="term-ps1">enigma@cynet:~$&nbsp;</span>
            <span className="term-cursor">█</span>
          </div>
        );
        const { ev, i } = line;
        const isHovered = hoveredIdx === i;
        const isExec = executed === i;
        return (
          <div
            key={idx}
            className={`term-line term-event-row${isHovered ? ' term-event-row--hover' : ''}${isExec ? ' term-event-row--exec' : ''}`}
            onClick={() => handleClick(i)}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <span className="term-row-bracket">[</span>
            <span className="term-row-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="term-row-bracket">]&nbsp;</span>
            <span className="term-row-icon">{ev.icon}&nbsp;</span>
            <span className="term-row-name">{ev.name}</span>
            <span className="term-row-dots">
              {'·'.repeat(Math.max(2, 38 - ev.name.length))}
            </span>
            <span className="term-row-status">{isExec ? 'EXECUTING...' : STATUS_LABELS[i]}</span>
            {isHovered && !isExec && <span className="term-row-hint">&nbsp;[ENTER]</span>}
          </div>
        );
      })}
    </div>
  );
};

const Home = memo(() => {
  const navigate = useNavigate();
  
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
      name: 'MIND MATRIX', 
      img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800',
      code: '# 05',
      icon: '🧠'
    },
    { 
      name: 'TECH UNSEEN', 
      img: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=800',
      code: '# 06',
      icon: '❓'
    },
    { 
      name: 'SHADOW CODE', 
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

          <div className="stats-action-wrap">
            <motion.div
              className="stat-card--action"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate('/events')}
            >
              <span className="stat-tag" style={{ color: '#00f3ff', opacity: 1 }}>ENTER THE GRID</span>
            </motion.div>
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
            {/* Body */}
            <div className="term-body">
              <TerminalList events={events} onSelect={() => navigate('/events')} />
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
