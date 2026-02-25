import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EventRevealPage from '../components/EventRevealPage';
import BoxText from '../components/BoxText';
import '../css/events.css';

const EventsPage = ({ theme = 'blue' }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);

  // Memoize theme colors to prevent re-calculations
  const themeColors = useMemo(() => ({
    blue: {
      primary: '#00f3ff',
      secondary: '#0099ff',
      gradient: 'from-blue-900/20 via-cyan-900/10',
      glow: 'rgba(0, 243, 255, 0.8)',
      particle: '#00f3ff',
    },
    purple: {
      primary: '#b829ff',
      secondary: '#8b19cc',
      gradient: 'from-purple-900/20 via-violet-900/10',
      glow: 'rgba(184, 41, 255, 0.8)',
      particle: '#b829ff',
    },
    green: {
      primary: '#00ff41',
      secondary: '#00cc34',
      gradient: 'from-green-900/20 via-emerald-900/10',
      glow: 'rgba(0, 255, 65, 0.8)',
      particle: '#00ff41',
    },
    red: {
      primary: '#ff0055',
      secondary: '#cc0044',
      gradient: 'from-red-900/20 via-rose-900/10',
      glow: 'rgba(255, 0, 85, 0.8)',
      particle: '#ff0055',
    }
  }), []);

  const currentTheme = themeColors[theme] || themeColors.blue;

  const events = [
    {
      id: 1,
      title: 'Treasure Hunt',
      category: 'ADVENTURE',
      description: 'Embark on an epic digital treasure hunt through layers of encrypted clues, hidden codes, and cybernetic puzzles.',
      icon: '🗺️',
      accentColor: '#00F5FF',
      colorStart: '#0B0F1A',
      colorEnd: '#1a3a52',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-world-map-with-connection-lines-4413-large.mp4',
      character: '🗺️',
      coordinator: { name: 'Rahul Kumar', phone: '+91 98765 43210' },
      details: [
        { label: 'Duration', value: '4 Hours' },
        { label: 'Team Size', value: '2-4 Members' },
        { label: 'Prize Pool', value: '$5000' },
        { label: 'Difficulty', value: 'Expert' }
      ]
    },
    {
      id: 2,
      title: 'Innovision 7.0',
      category: 'INNOVATION',
      description: 'The flagship innovation showcase where groundbreaking ideas meet cutting-edge technology.',
      icon: '💡',
      accentColor: '#6C63FF',
      colorStart: '#0B0F1A',
      colorEnd: '#2d1b52',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-brain-hologram-in-futuristic-interface-44623-large.mp4',
      character: '💡',
      coordinator: { name: 'Priya Sharma', phone: '+91 98765 43211' },
      details: [
        { label: 'Duration', value: 'Full Day' },
        { label: 'Categories', value: '8 Domains' },
        { label: 'Prize Pool', value: '$15000' },
        { label: 'Judges', value: '12 Experts' }
      ]
    },
    {
      id: 3,
      title: 'Gaming Arena',
      category: 'ESPORTS',
      description: 'Step into the ultimate esports battleground featuring competitive tournaments across multiple gaming platforms.',
      icon: '🎮',
      accentColor: '#FF00E5',
      colorStart: '#0B0F1A',
      colorEnd: '#3d1a3d',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-gaming-gamer-playing-video-game-4226-large.mp4',
      character: '🎮',
      coordinator: { name: 'Arjun Patel', phone: '+91 98765 43212' },
      details: [
        { label: 'Duration', value: '2 Days' },
        { label: 'Games', value: '6 Titles' },
        { label: 'Prize Pool', value: '$8000' },
        { label: 'Participants', value: '200+' }
      ]
    },
    {
      id: 4,
      title: 'Hacking Event',
      category: 'CYBERSECURITY',
      description: 'Elite capture-the-flag competition designed for ethical hackers and security enthusiasts.',
      icon: '🔓',
      accentColor: '#00ff41',
      colorStart: '#0B0F1A',
      colorEnd: '#1a3d1a',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-computer-hacking-in-a-dark-room-28347-large.mp4',
      character: '🔓',
      coordinator: { name: 'Vikram Singh', phone: '+91 98765 43213' },
      details: [
        { label: 'Duration', value: '6 Hours' },
        { label: 'Challenges', value: '25+ Flags' },
        { label: 'Prize Pool', value: '$6000' },
        { label: 'Level', value: 'Advanced' }
      ]
    },
    {
      id: 5,
      title: 'Mind Map',
      category: 'STRATEGY',
      description: 'A cognitive challenge combining logic puzzles, pattern recognition, and strategic thinking.',
      icon: '🧠',
      accentColor: '#00F5FF',
      colorStart: '#0B0F1A',
      colorEnd: '#1a2a3d',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-brain-neural-network-44625-large.mp4',
      character: '🧠',
      coordinator: { name: 'Sneha Reddy', phone: '+91 98765 43214' },
      details: [
        { label: 'Duration', value: '3 Hours' },
        { label: 'Rounds', value: '5 Stages' },
        { label: 'Prize Pool', value: '$3000' },
        { label: 'Team Size', value: 'Individual' }
      ]
    },
    {
      id: 6,
      title: 'IT Quiz',
      category: 'KNOWLEDGE',
      description: 'Test your technology knowledge across programming, networking, AI, cybersecurity, and emerging tech trends.',
      icon: '❓',
      accentColor: '#6C63FF',
      colorStart: '#0B0F1A',
      colorEnd: '#2a1a3d',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-quiz-questions-on-a-screen-44628-large.mp4',
      character: '❓',
      coordinator: { name: 'Amit Gupta', phone: '+91 98765 43215' },
      details: [
        { label: 'Duration', value: '2 Hours' },
        { label: 'Questions', value: '100+' },
        { label: 'Prize Pool', value: '$2500' },
        { label: 'Format', value: 'Buzzer Round' }
      ]
    },
    {
      id: 7,
      title: 'Coding Sprint',
      category: 'PROGRAMMING',
      description: 'Intensive coding marathon featuring algorithmic challenges, data structure optimization, and real-world problem solving.',
      icon: '💻',
      accentColor: '#FF00E5',
      colorStart: '#0B0F1A',
      colorEnd: '#3d1a2a',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-programmer-typing-code-60-large.mp4',
      character: '💻',
      coordinator: { name: 'Karan Joshi', phone: '+91 98765 43216' },
      details: [
        { label: 'Duration', value: '5 Hours' },
        { label: 'Problems', value: '10-15' },
        { label: 'Prize Pool', value: '$7000' },
        { label: 'Languages', value: 'All Major' }
      ]
    }
  ];


  const handleEventSelect = (event) => {
    const index = events.findIndex(e => e.id === event.id);
    setSelectedEvent(event);
    setSelectedEventIndex(index);
  };

  const handleNextEvent = () => {
    if (selectedEventIndex < events.length - 1) {
      const nextIndex = selectedEventIndex + 1;
      setSelectedEvent(events[nextIndex]);
      setSelectedEventIndex(nextIndex);
    }
  };

  const handlePreviousEvent = () => {
    if (selectedEventIndex > 0) {
      const prevIndex = selectedEventIndex - 1;
      setSelectedEvent(events[prevIndex]);
      setSelectedEventIndex(prevIndex);
    }
  };

  const handleCloseEvent = () => {
    setSelectedEvent(null);
    setSelectedEventIndex(null);
  };

  return (
    <div className="events-page-wrapper">
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 relative pt-20 overflow-hidden">
      {/* 3D Layered Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep space layer 1 */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, ${currentTheme.primary}15 0%, transparent 50%),
                             radial-gradient(circle at 80% 70%, ${currentTheme.secondary}15 0%, transparent 50%)`,
          }}
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "linear"
          }}
        />

        {/* Depth layer 2 - Floating geometric shapes */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-lg opacity-5"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
                background: `linear-gradient(135deg, ${currentTheme.primary}40, ${currentTheme.secondary}40)`,
                border: `1px solid ${currentTheme.primary}30`,
                willChange: 'transform'
              }}
              animate={{
                y: [0, -30, 0],
                rotateZ: [0, 5, 0],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            />
          ))}
        </div>

        {/* Depth layer 3 - Subtle grid */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(${currentTheme.primary}40 1px, transparent 1px), 
                             linear-gradient(90deg, ${currentTheme.primary}40 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto">
        {/* Interactive Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 relative"
        >
          {/* Floating accent elements around title */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full opacity-50"
            style={{ background: `linear-gradient(90deg, transparent, ${currentTheme.primary}, transparent)` }}
            animate={{ scaleX: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <BoxText 
              text="CYNET EVENTS" 
              color={currentTheme.primary}
              size={8}
              gap={1.5}
            />
          </motion.div>

          {/* Subtitle with animated typing effect */}
          <motion.p 
            className="text-lg sm:text-xl text-gray-400 mt-6 max-w-2xl mx-auto font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Explore our flagship events • Compete • Innovate • Win
          </motion.p>

          {/* Floating accent elements below title */}
          <motion.div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full opacity-50"
            style={{ background: `linear-gradient(90deg, transparent, ${currentTheme.primary}, transparent)` }}
            animate={{ scaleX: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          />
        </motion.div>

        {/* Events Grid with 3D Effects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.6 + index * 0.1,
                ease: "easeOut" 
              }}
              onClick={() => handleEventSelect(event)}
              className="group relative cursor-pointer"
              style={{
                perspective: '1000px',
              }}
            >
              {/* 3D Card with depth and shadow layers */}
              <motion.div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: -5,
                  z: 50,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                {/* Shadow layer (depth effect) */}
                <motion.div
                  className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-70"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${event.accentColor}, transparent)`,
                    transform: 'translateZ(-20px)',
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Main card backdrop */}
                <div
                  className="relative backdrop-blur-xl rounded-2xl border-2 p-6 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${event.accentColor}15, rgba(11, 15, 26, 0.9))`,
                    borderColor: `${event.accentColor}60`,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${event.accentColor}20`,
                    minHeight: '400px',
                    transform: 'translateZ(0)',
                  }}
                >
                  {/* Subtle animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20"
                    style={{
                      background: `linear-gradient(135deg, ${event.accentColor}, transparent, ${event.accentColor})`,
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear"
                    }}
                  />

                  {/* Corner accent decorations */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-20"
                    style={{
                      background: `radial-gradient(circle at top right, ${event.accentColor}, transparent)`,
                    }}
                  />
                  <div className="absolute bottom-0 left-0 w-20 h-20 opacity-20"
                    style={{
                      background: `radial-gradient(circle at bottom left, ${event.accentColor}, transparent)`,
                    }}
                  />

                  {/* Card content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Event Icon with 3D lift */}
                    <motion.div 
                      className="text-6xl mb-4 flex-shrink-0"
                      style={{
                        filter: `drop-shadow(0 0 20px ${event.accentColor}80)`,
                      }}
                      whileHover={{
                        scale: 1.2,
                        rotateZ: 10,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                    >
                      {event.icon}
                    </motion.div>

                    {/* Category badge */}
                    <div 
                      className="text-xs font-mono mb-3 inline-block px-3 py-1 rounded-full self-start" 
                      style={{ 
                        color: event.accentColor,
                        background: `${event.accentColor}20`,
                        border: `1px solid ${event.accentColor}40`,
                      }}
                    >
                      {event.category}
                    </div>
                    
                    {/* Event Title */}
                    <h3 
                      className="text-3xl font-bold text-white mb-3 group-hover:translate-x-1 transition-transform duration-300"
                      style={{
                        textShadow: `0 2px 10px ${event.accentColor}40`,
                      }}
                    >
                      {event.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-300 mb-6 leading-relaxed flex-grow">
                      {event.description}
                    </p>

                    {/* Event Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-6 pb-4 border-b"
                      style={{ borderColor: `${event.accentColor}30` }}
                    >
                      {event.details.slice(0, 4).map((detail, idx) => (
                        <div key={idx} className="text-xs">
                          <div className="text-gray-500 mb-1">{detail.label}</div>
                          <div className="text-white font-semibold">{detail.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Call to action button */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEventSelect(event);
                      }}
                      className="w-full px-6 py-3 rounded-xl text-sm font-bold relative overflow-hidden group/btn"
                      style={{
                        background: `linear-gradient(135deg, ${event.accentColor}, ${event.accentColor}dd)`,
                        color: '#000',
                        boxShadow: `0 10px 30px ${event.accentColor}40`,
                      }}
                      whileHover={{
                        boxShadow: `0 15px 40px ${event.accentColor}60`,
                        y: -2,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span>EXPLORE EVENT</span>
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          →
                        </motion.span>
                      </span>
                      
                      {/* Shine effect on hover */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover/btn:opacity-100"
                        style={{
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        }}
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear",
                          repeatDelay: 0.5
                        }}
                      />
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* 3D depth layer behind card */}
              <motion.div
                className="absolute inset-0 rounded-2xl -z-10 opacity-0 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(135deg, ${event.accentColor}20, transparent)`,
                  transform: 'translateZ(-30px) scale(0.95)',
                  filter: 'blur(10px)',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Event Reveal Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <EventRevealPage
            event={selectedEvent}
            onClose={handleCloseEvent}
            onNext={handleNextEvent}
            onPrevious={handlePreviousEvent}
            hasNext={selectedEventIndex < events.length - 1}
            hasPrevious={selectedEventIndex > 0}
          />
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default EventsPage;
