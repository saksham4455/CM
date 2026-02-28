import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = ({ theme = 'blue' }) => {
  const navigate = useNavigate();

  const themeColors = {
    blue: '#00f3ff',
    purple: '#b829ff',
    green: '#00ff41',
    red: '#ff0055'
  };

  return (
    <div style={{ position: 'relative', zIndex: 0, isolation: 'isolate' }}>
      {/* Navbar protection mask */}
      <div style={{
        content: '',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: '#000000',
        zIndex: 998,
        pointerEvents: 'none'
      }} />
      
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-cyber opacity-10" />
      
      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {/* CYNET Logo */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 
            className="font-display text-[12rem] md:text-[16rem] lg:text-[20rem] font-black leading-none tracking-tighter"
            style={{
              color: themeColors[theme],
              textShadow: `
                0 0 10px ${themeColors[theme]}40,
                0 0 20px ${themeColors[theme]}30,
                0 0 40px ${themeColors[theme]}20,
                0 0 80px ${themeColors[theme]}10
              `,
              WebkitTextStroke: `2px ${themeColors[theme]}80`
            }}
          >
            CYNET
          </h1>
        </motion.div>

        {/* Tech Fest Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="mt-8 mb-8"
        >
          <p className="text-3xl md:text-5xl font-bold text-white/80 tracking-[0.3em] uppercase">
            Tech Fest
          </p>
          <div 
            className="h-1 w-64 mx-auto mt-4 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, ${themeColors[theme]}, transparent)`,
              boxShadow: `0 0 20px ${themeColors[theme]}`
            }}
          />
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          className="mb-8 max-w-3xl mx-auto"
        >
          <p className="text-lg md:text-xl text-white/70 leading-relaxed">
            Where Innovation Meets Excellence. Join us for an extraordinary journey through 
            cutting-edge technology, competitive challenges, and game-changing ideas.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
        >
          {[
            { number: '8+', label: 'Events' },
            { number: '500+', label: 'Participants' },
            { number: '50L+', label: 'Prize Pool' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
            >
              <div 
                className="text-4xl md:text-5xl font-black font-display mb-2"
                style={{ 
                  color: themeColors[theme],
                  textShadow: `0 0 20px ${themeColors[theme]}50`
                }}
              >
                {stat.number}
              </div>
              <div className="text-sm text-white/60 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enter Button */}
        <motion.button
          onClick={() => navigate('/events')}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-12 py-4 text-xl font-bold text-white overflow-hidden"
          style={{
            border: `2px solid ${themeColors[theme]}`,
            boxShadow: `0 0 20px ${themeColors[theme]}40`
          }}
        >
          <span className="relative z-10 tracking-wider">ENTER THE GRID</span>
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: themeColors[theme] + '20' }}
          />
        </motion.button>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: themeColors[theme],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                boxShadow: `0 0 10px ${themeColors[theme]}`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 opacity-30" style={{ borderColor: themeColors[theme] }} />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 opacity-30" style={{ borderColor: themeColors[theme] }} />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 opacity-30" style={{ borderColor: themeColors[theme] }} />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 opacity-30" style={{ borderColor: themeColors[theme] }} />
      </div>
    </div>
  );
};

export default LandingPage;
