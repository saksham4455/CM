import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EventRevealPage = ({ event, onClose, onNext, onPrevious, hasNext, hasPrevious }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.body.style.overflow = 'hidden';
    
    // Keyboard navigation
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' && hasPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && hasNext) {
        onNext();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [hasNext, hasPrevious, onNext, onPrevious]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 500);
  };

  if (!event) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-50 overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0">
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-br opacity-95"
              style={{
                background: `linear-gradient(135deg, ${event.colorStart} 0%, ${event.colorEnd} 100%)`
              }}
            />
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50 group"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <div className={`absolute inset-0 rounded-full border-2 border-${event.accentColor} 
                            opacity-50 group-hover:opacity-100 transition-all duration-300
                            group-hover:scale-110 group-hover:rotate-90`}
                style={{ borderColor: event.accentColor }}
              />
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-white z-10 group-hover:rotate-90 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </button>

          {/* Main Content Container */}
          <div className="relative h-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 pt-16 sm:pt-20 pb-20 sm:pb-24">
            <div className="w-full max-w-6xl h-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 min-h-0">

              {/* Left Section - Dashboard Style Event Details */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  mass: 1,
                  delay: 0.15
                }}
                className="flex flex-col justify-center space-y-2 sm:space-y-2.5 lg:space-y-3 min-h-0 overflow-hidden"
              >
                {/* Top HUD Bar */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <motion.div
                        className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                        style={{ background: event.accentColor }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-[10px] sm:text-xs font-mono text-cyberpunk-softSilver tracking-wider truncate">
                        MISSION BRIEFING // ID: {event.id.toString().padStart(3, '0')}
                      </span>
                    </div>
                    <div className="px-2 sm:px-3 py-1 rounded border text-[10px] sm:text-xs font-mono flex-shrink-0"
                      style={{
                        borderColor: `${event.accentColor}40`,
                        background: `${event.accentColor}10`,
                        color: event.accentColor
                      }}
                    >
                      ACTIVE
                    </div>
                  </div>

                  {/* HUD Corner Accent */}
                  <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 w-8 h-8 sm:w-12 sm:h-12 border-l-2 border-t-2 opacity-50"
                    style={{ borderColor: event.accentColor }}
                  />

                  {/* Event Category Tag */}
                  <div
                    className="inline-flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg backdrop-blur-md mb-2"
                    style={{
                      background: `rgba(255, 255, 255, 0.05)`,
                      border: `1px solid ${event.accentColor}40`,
                      boxShadow: `0 0 20px ${event.accentColor}40`
                    }}
                  >
                    <span className="text-xl sm:text-2xl">{event.icon}</span>
                    <div>
                      <div className="text-[10px] sm:text-xs font-mono text-cyberpunk-softSilver mb-0.5">CATEGORY</div>
                      <div className="text-xs sm:text-sm font-mono font-semibold tracking-wider"
                        style={{ color: event.accentColor }}
                      >
                        {event.category}
                      </div>
                    </div>
                  </div>

                  {/* Event Title */}
                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight"
                    style={{
                      textShadow: `0 0 30px ${event.accentColor}80`
                    }}
                  >
                    {event.title}
                  </h1>
                </div>

                {/* Event Description Panel */}
                <div className="backdrop-blur-md rounded-lg p-2 sm:p-3 border"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: `${event.accentColor}20`
                  }}
                >
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="w-1 h-3 sm:h-4"
                      style={{ background: event.accentColor }}
                    />
                    <span className="text-[10px] sm:text-xs font-mono text-cyberpunk-softSilver tracking-wider">
                      DESCRIPTION
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm md:text-base text-white leading-snug font-light line-clamp-3 sm:line-clamp-2">
                    {event.description}
                  </p>
                </div>

                {/* Event Stats Dashboard Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {event.details.map((detail, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.35 + index * 0.08,
                        type: "spring",
                        stiffness: 250,
                        damping: 25
                      }}
                      className="backdrop-blur-md rounded-lg p-2 sm:p-3 border relative overflow-hidden group"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderColor: `${event.accentColor}30`
                      }}
                    >
                      {/* Stat Panel Accent Line */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: event.accentColor }}
                      />

                      <div className="flex items-start justify-between mb-1 sm:mb-2">
                        <div className="text-[10px] sm:text-xs font-mono text-cyberpunk-softSilver tracking-wider truncate pr-1">
                          {detail.label.toUpperCase()}
                        </div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full opacity-50 flex-shrink-0"
                          style={{ background: event.accentColor }}
                        />
                      </div>
                      <div className="text-base sm:text-xl md:text-2xl font-bold text-white leading-none"
                        style={{
                          textShadow: `0 0 10px ${event.accentColor}40`
                        }}
                      >
                        {detail.value}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Info Sections */}
                <div className="grid grid-cols-1 gap-2">
                  {/* Prize/Rewards Section */}
                  <div className="backdrop-blur-md rounded-lg p-2 border flex items-center gap-3"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderColor: `${event.accentColor}20`
                    }}
                  >
                    <div className="text-lg">🏆</div>
                    <div className="flex-1">
                      <div className="text-xs font-mono text-cyberpunk-softSilver mb-1">REWARDS</div>
                      <div className="text-sm font-semibold text-white">Certificate + Prizes + Recognition</div>
                    </div>
                  </div>

                  {/* Skill Level Indicator */}
                  <div className="backdrop-blur-md rounded-lg p-2 border"
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderColor: `${event.accentColor}20`
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-cyberpunk-softSilver">SKILL LEVEL</span>
                      <span className="text-sm font-semibold" style={{ color: event.accentColor }}>INTERMEDIATE</span>
                    </div>
                    <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ background: event.accentColor, width: '70%' }}
                      />
                    </div>
                  </div>

                  {/* Student Coordinator Contact */}
                  <div className="backdrop-blur-md rounded-lg p-2 border"
                    style={{
                      background: `linear-gradient(135deg, ${event.accentColor}15, rgba(255, 255, 255, 0.03))`,
                      borderColor: `${event.accentColor}30`
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div 
                        className="w-1 h-3"
                        style={{ background: event.accentColor }}
                      />
                      <span className="text-xs font-mono text-cyberpunk-softSilver tracking-wider">
                        STUDENT COORDINATOR
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="text-lg">👤</div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold text-white">{event.coordinator.name}</div>
                        <div className="text-[10px] text-cyberpunk-softSilver">Event Contact</div>
                      </div>
                    </div>
                    <a 
                      href={`tel:${event.coordinator.phone}`}
                      className="flex items-center justify-center gap-1.5 w-full px-3 py-1.5 rounded-md font-mono text-xs font-semibold transition-all duration-200 hover:scale-105"
                      style={{
                        background: event.accentColor,
                        color: '#000'
                      }}
                    >
                      <span>📞</span>
                      <span>{event.coordinator.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Register Button */}
                <button
                  className="relative group w-full cursor-pointer hover:scale-105 transition-transform duration-200"
                >
                  <div className="absolute inset-0 rounded-lg opacity-50 blur-xl group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: event.accentColor }}
                  />
                  <div className="relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-semibold text-white text-xs sm:text-sm
                                backdrop-blur-sm border-2 overflow-hidden"
                    style={{
                      borderColor: event.accentColor,
                      background: `linear-gradient(135deg, ${event.accentColor}20, ${event.accentColor}10)`
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <span>REGISTER NOW</span>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </button>
              </motion.div>

              {/* Right Section - Large 3D Character */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  mass: 1,
                  delay: 0.3
                }}
                className="relative flex items-center justify-center min-h-0 order-first lg:order-last"
              >
                {/* Character Display Frame */}
                <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 'min(40vh, 300px)' }}>
                  {/* Large Corner Brackets */}
                  <div className="absolute top-0 left-0 w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4"
                    style={{ borderColor: event.accentColor }}
                  />
                  <div className="absolute top-0 right-0 w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 border-r-2 sm:border-r-4 border-t-2 sm:border-t-4"
                    style={{ borderColor: event.accentColor }}
                  />
                  <div className="absolute bottom-0 left-0 w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 border-l-2 sm:border-l-4 border-b-2 sm:border-b-4"
                    style={{ borderColor: event.accentColor }}
                  />
                  <div className="absolute bottom-0 right-0 w-12 sm:w-16 md:w-20 lg:w-24 h-12 sm:h-16 md:h-20 lg:h-24 border-r-2 sm:border-r-4 border-b-2 sm:border-b-4"
                    style={{ borderColor: event.accentColor }}
                  />

                  {/* Holographic Platform Base */}
                  <div
                    className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-96 h-4 rounded-full opacity-30 blur-2xl"
                    style={{ background: event.accentColor }}
                  />

                  {/* Central Glow */}
                  <div
                    className="absolute inset-0 opacity-20 blur-[100px]"
                    style={{ background: `radial-gradient(circle, ${event.accentColor}, transparent 70%)` }}
                  />

                  {/* Large 3D Character */}
                  <motion.div
                    className="relative z-10"
                    animate={{
                      y: [0, -15, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div
                      className="leading-none"
                      style={{
                        fontSize: 'clamp(120px, 20vh, 260px)',
                        filter: `drop-shadow(0 0 60px ${event.accentColor}) 
                                drop-shadow(0 0 120px ${event.accentColor}cc)
                                drop-shadow(0 30px 80px rgba(0, 0, 0, 0.5))`,
                        WebkitTextStroke: `2px ${event.accentColor}40`
                      }}
                    >
                      {event.character || event.icon}
                    </div>
                  </motion.div>

                  {/* Subtle ambient particles - reduced to 4 */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: event.accentColor,
                        boxShadow: `0 0 10px ${event.accentColor}`,
                        left: `${20 + i * 20}%`,
                        top: `${20 + i * 15}%`,
                        opacity: 0.3
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom HUD Elements */}
          <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 flex justify-between items-end pointer-events-none gap-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="font-mono text-xs sm:text-sm text-cyberpunk-softSilver"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse"
                  style={{ background: event.accentColor }}
                />
                <span className="hidden sm:inline">EVENT ACTIVE</span>
                <span className="sm:hidden">ACTIVE</span>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.5,
                type: "spring",
                stiffness: 250,
                damping: 25
              }}
              className="flex items-center gap-2 sm:gap-3 pointer-events-auto"
            >
              {/* Previous Button */}
              {hasPrevious && (
                <button
                  onClick={onPrevious}
                  className="group relative"
                >
                  <div className="absolute inset-0 rounded-full border-2 opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor: event.accentColor }}
                  />
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center backdrop-blur-md rounded-full"
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: `1px solid ${event.accentColor}40`
                    }}
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-x-1 transition-transform" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </button>
              )}

              {/* Next Button */}
              {hasNext && (
                <button
                  onClick={onNext}
                  className="group relative"
                >
                  <div className="absolute inset-0 rounded-full border-2 opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor: event.accentColor }}
                  />
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center backdrop-blur-md rounded-full"
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: `1px solid ${event.accentColor}40`
                    }}
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-1 transition-transform" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="font-mono text-xs sm:text-sm text-cyberpunk-softSilver"
            >
              <span className="hidden sm:inline">ID: {event.id.toString().padStart(3, '0')}</span>
              <span className="sm:hidden">{event.id.toString().padStart(3, '0')}</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventRevealPage;
