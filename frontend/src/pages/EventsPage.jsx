import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import EventRevealPage from '../components/EventRevealPage';
import BoxText from '../components/BoxText';
import CyberMatrixBackground from '../components/CyberMatrixBackground';
import '../css/events.css';

const EventsPage = ({ theme = 'blue' }) => {
  const navigate = useNavigate();
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
      description: 'Race across JIMS campus cracking encrypted clues and puzzles in a time-bound bounty hunt.',
      icon: '🗺️',
      accentColor: '#00F5FF',
      colorStart: '#0B0F1A',
      colorEnd: '#1a3a52',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-world-map-with-connection-lines-4413-large.mp4',
      character: '🗺️',
      coordinator: { name: 'Puru Gupta', phone: '+91 9873661927' },
      studentCoordinators: ['Ishaan', 'Harassis Singh', 'Priyanka Gulati', 'Tanishka Sangwan', 'Shubhu Husain'],
      rulesFile: '/Rules/Tressure Hunt.pdf',
      details: [
        { label: 'Team Size', value: 'Exactly 2' },
        { label: 'Rounds', value: '3' },
        { label: 'Price', value: '₹200' },
        { label: 'Venue', value: 'JIMS Campus' }
      ]
    },
    {
      id: 2,
      title: 'Innovision 7.0',
      category: 'INNOVATION',
      description: 'Ideathon on cybersecurity challenges across AI/ML, Robotics, IoT, Biotech, and Clean Tech domains.',
      icon: '💡',
      accentColor: '#6C63FF',
      colorStart: '#0B0F1A',
      colorEnd: '#2d1b52',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-brain-hologram-in-futuristic-interface-44623-large.mp4',
      character: '💡',
      coordinator: { name: 'Lavya Jain', phone: '+91 9868165618' },
      studentCoordinators: ['Arsh', 'Avnish', 'Kavya', 'Jeevansh Wadhwa'],
      rulesFile: '/Rules/Innovation7.0.pdf',
      details: [
        { label: 'Duration', value: '4+ Hours' },
        { label: 'Team Size', value: 'Up to 3' },
        { label: 'Presentation', value: '8-10 min + Q&A' },
        { label: 'Domains', value: 'AI, IoT, Robotics & More' }
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
      studentCoordinators: ['Dev Anand', 'Riya Shah', 'Manav Gupta'],
      rulesFile: '/Rules/Gaming Arena.pdf',
      gameCards: [
        { title: 'Valorant', icon: '🎯', prize: '₹250', players: '5v5' },
        { title: 'Tekken 7', icon: '🥊', prize: '₹30', players: '1v1' },
        { title: 'BGMI', icon: '🔫', prize: '₹200', players: '4-Squad' },
        { title: 'Stumble Guys', icon: '🏃', prize: '₹30', players: '1v1' },
        { title: 'SmashKarts', icon: '🏎️', prize: '₹30', players: '1v1' },
      ],
      details: [
        { label: 'Duration', value: '2 Days' },
        { label: 'Games', value: '5 Titles' },
        { label: 'Format', value: 'Elimination' },
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
      studentCoordinators: ['Harshit Malhotra', 'Divya Pillai', 'Aditya Roy'],
      rulesFile: '/Rules/hacking-event.pdf',
      details: [
        { label: 'Duration', value: '6 Hours' },
        { label: 'Challenges', value: '25+ Flags' },
        { label: 'Prize Pool', value: '$6000' },
        { label: 'Level', value: 'Advanced' }
      ]
    },
    {
      id: 5,
      title: 'Mind Matrix',
      category: 'STRATEGY',
      description: 'Create digital mind maps using MS Word or AI tools, then present your work to the judges.',
      icon: '🧠',
      accentColor: '#00F5FF',
      colorStart: '#0B0F1A',
      colorEnd: '#1a2a3d',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-brain-neural-network-44625-large.mp4',
      character: '🧠',
      coordinator: { name: 'Aditya Nath', phone: '+91 9354510794' },
      studentCoordinators: ['Anirban'],
      rulesFile: '/Rules/MINDMATRIX.pdf',
      details: [
        { label: 'Duration', value: '1 Hour' },
        { label: 'Team Size', value: 'Exactly 2' },
        { label: 'Rounds', value: '1' },
        { label: 'Format', value: 'Digital Mind Map' }
      ]
    },
    {
      id: 6,
      title: 'Tech Unseen',
      category: 'KNOWLEDGE',
      description: 'Two-round IT quiz — timed Q&A in Round 1, then Debug the Innovation for top qualifiers.',
      icon: '❓',
      accentColor: '#6C63FF',
      colorStart: '#0B0F1A',
      colorEnd: '#2a1a3d',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-quiz-questions-on-a-screen-44628-large.mp4',
      character: '❓',
      coordinator: { name: 'Ms. Hanisha Kukreja', phone: '+91 93155977964' },
      studentCoordinators: ['Mr. Krishank'],
      rulesFile: '/Rules/TECH UNSEEN (IT Quiz).pdf',
      details: [
        { label: 'Team Size', value: 'Exactly 2' },
        { label: 'Rounds', value: '2' },
        { label: 'R1 Format', value: 'Timed Q&A' },
        { label: 'R2 Qualifiers', value: 'Top 15 Teams' }
      ]
    },
    {
      id: 7,
      title: 'Shadow Code',
      category: 'PROGRAMMING',
      description: 'Two-round coding challenge — MCQs on C & Python, then blind coding in C with the monitor off.',
      icon: '💻',
      accentColor: '#FF00E5',
      colorStart: '#0B0F1A',
      colorEnd: '#3d1a2a',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-programmer-typing-code-60-large.mp4',
      character: '💻',
      coordinator: { name: 'Ms. Shreya Malhotra', phone: '+91 9873320986' },
      studentCoordinators: ['Ms. Preeti'],
      rulesFile: '/Rules/ShadowCode.pdf',
      details: [
        { label: 'Team Size', value: 'Exactly 2' },
        { label: 'Rounds', value: '2' },
        { label: 'R1 Format', value: '30 MCQs, 15 min' },
        { label: 'R2 Format', value: 'Blind Coding in C' }
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
      {/* Particle Background */}
      <div className="events-particle-background">
        <CyberMatrixBackground theme={theme} />
      </div>

      {/* Main Content */}
      <div
        className="relative z-10 px-4 sm:px-6 lg:px-10 pb-20 w-full max-w-[1400px] mx-auto"
        style={{ paddingTop: 'calc(var(--navbar-height) + var(--events-page-extra, 0px))' }}
      >
        {/* Interactive Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-2 sm:mb-5 lg:mb-8 relative events-page-hero"
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
            className="relative mt-1 sm:mt-4 lg:mt-7"
          >
            <BoxText
              text="CYNET  EVENTS"
              color={currentTheme.primary}
              size={8}
              gap={1.5}
            />
          </motion.div>

          <div className="h-3 sm:h-4 lg:h-6" aria-hidden="true" />

          {/* Subtitle with animated typing effect */}
          <motion.p
            className="text-xs sm:text-base lg:text-xl text-gray-400 mt-2 sm:mt-5 lg:mt-10 max-w-2xl mx-auto font-light px-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Explore our flagship events • Compete • Innovate • Win
          </motion.p>

          <div className="h-4 sm:h-6 lg:h-8" aria-hidden="true" />

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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
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
                className="relative rounded-2xl overflow-visible"
                style={{
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{
                  scale: 1.03,
                  rotateY: 2,
                  rotateX: -2,
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
                  className="relative backdrop-blur-xl rounded-2xl border pt-5 pb-6 px-5 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${event.accentColor}15, rgba(11, 15, 26, 0.9))`,
                    borderColor: `${event.accentColor}60`,
                    boxShadow: `0 10px 40px rgba(0,0,0,0.5), 0 0 20px ${event.accentColor}15`,
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
                      className="text-4xl mb-2 flex-shrink-0"
                      style={{
                        filter: `drop-shadow(0 0 12px ${event.accentColor}80)`,
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
                      className="text-[10px] font-mono mb-2 inline-block px-2 py-0.5 rounded-full self-start"
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
                      className="text-xl font-bold text-white mb-2 group-hover:translate-x-1 transition-transform duration-300 leading-tight"
                      style={{
                        textShadow: `0 2px 10px ${event.accentColor}40`,
                      }}
                    >
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-gray-300 mb-3 leading-relaxed flex-grow">
                      {event.description}
                    </p>

                    {/* Event Details Grid */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-3 pb-2.5 border-b"
                      style={{ borderColor: `${event.accentColor}30` }}
                    >
                      {event.details.slice(0, 4).map((detail, idx) => (
                        <div key={idx} className="text-[10px]">
                          <div className="text-gray-500 font-mono tracking-wide mb-0.5">{detail.label}</div>
                          <div className="text-white font-semibold leading-tight">{detail.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Info Row: Coordinator + Student Coordinators */}
                    <div className="flex flex-col gap-1.5 mb-3">
                      {/* Coordinator Box */}
                      <div
                        className="rounded-lg px-2.5 py-2 flex items-center gap-2"
                        style={{
                          background: `${event.accentColor}15`,
                          border: `1px solid ${event.accentColor}45`,
                        }}
                      >
                        <span className="text-base flex-shrink-0">📞</span>
                        <div className="min-w-0 flex-1">
                          <div className="text-[8px] font-mono text-gray-500 leading-tight">COORDINATOR</div>
                          <div className="text-[10px] text-white font-semibold truncate leading-tight">{event.coordinator.name}</div>
                        </div>
                        <div className="text-[9px] font-mono flex-shrink-0" style={{ color: event.accentColor }}>{event.coordinator.phone}</div>
                      </div>

                      {/* Student Coordinators */}
                      {event.studentCoordinators && (
                        <div
                          className="rounded-lg px-2.5 py-2"
                          style={{
                            background: `${event.accentColor}08`,
                            border: `1px solid ${event.accentColor}30`,
                          }}
                        >
                          <div className="text-[8px] font-mono text-gray-500 mb-1 leading-tight tracking-wider">STUDENT COORDINATORS</div>
                          <div className="flex flex-wrap gap-1">
                            {event.studentCoordinators.map((name, si) => (
                              <span
                                key={si}
                                className="text-[9px] text-gray-300 px-1.5 py-0.5 rounded-full"
                                style={{
                                  background: `${event.accentColor}12`,
                                  border: `1px solid ${event.accentColor}25`,
                                }}
                              >
                                {name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Buttons – Explore + Register + Rules */}
                    <div className="flex gap-1.5">
                      {/* Explore Button */}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEventSelect(event);
                        }}
                        className="flex-1 px-2 py-2 rounded-lg text-[10px] font-bold relative overflow-hidden group/btn"
                        style={{
                          background: `linear-gradient(135deg, ${event.accentColor}, ${event.accentColor}cc)`,
                          color: '#000',
                          boxShadow: `0 4px 16px ${event.accentColor}40`,
                        }}
                        whileHover={{ boxShadow: `0 8px 24px ${event.accentColor}60`, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-1">
                          <span>EXPLORE</span>
                          <motion.span
                            animate={{ x: [0, 3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          >→</motion.span>
                        </span>
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover/btn:opacity-100"
                          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }}
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                        />
                      </motion.button>

                      {/* Register Button */}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/register?event=${encodeURIComponent(event.title.toUpperCase())}`);
                        }}
                        className="flex-1 px-2 py-2 rounded-lg text-[10px] font-bold"
                        style={{
                          background: 'transparent',
                          color: event.accentColor,
                          border: `1px solid ${event.accentColor}`,
                          boxShadow: `0 0 10px ${event.accentColor}15`,
                        }}
                        whileHover={{
                          background: `${event.accentColor}18`,
                          boxShadow: `0 0 18px ${event.accentColor}40`,
                          y: -1,
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="flex items-center justify-center gap-1">
                          <span>✦</span>
                          <span>REGISTER</span>
                        </span>
                      </motion.button>

                      {/* Rules Button – opens PDF */}
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (event.rulesFile) {
                            window.open(event.rulesFile, '_blank');
                          }
                        }}
                        className="px-2 py-2 rounded-lg text-[10px] font-bold"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          color: '#fff',
                          border: `1px solid rgba(255,255,255,0.18)`,
                        }}
                        whileHover={{
                          background: 'rgba(255,255,255,0.12)',
                          border: `1px solid ${event.accentColor}80`,
                          color: event.accentColor,
                          y: -1,
                        }}
                        whileTap={{ scale: 0.97 }}
                        title="View Event Rules PDF"
                      >
                        <span className="flex items-center justify-center gap-1">
                          <span>📋</span>
                          <span>RULES</span>
                        </span>
                      </motion.button>
                    </div>
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
  );
};

export default EventsPage;
