import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/Sponsers.css';

const Sponsors = ({ theme = 'blue' }) => {
  const sponsors = useMemo(() => [
    {
      name: 'TSN Securitys',
      logo: '/Logo/Sponser_1.jpeg',
    },
    {
      name: 'Carrer Partner ',
      logo: '/Logo/Sponser_2.png',
    }
  ], []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % sponsors.length);
        setIsFlipping(false);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, [sponsors.length]);

  const handleNavigate = (index) => {
    if (index !== currentIndex && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsFlipping(false);
      }, 600);
    }
  };

  return (
    <section className="sponsors-section">
      <div className="sponsors-shell">
        <motion.div
          className="sponsors-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className={`sponsors-title ${theme}`}>PARTNERS</h3>
          <p className="sponsors-subtitle">Powered by industry leaders</p>
        </motion.div>

        <div className="split-flap-container">
          {/* Main Display Board */}
          <div className="split-flap-board">
            <div className="board-frame">
              <div className="frame-corner tl"></div>
              <div className="frame-corner tr"></div>
              <div className="frame-corner bl"></div>
              <div className="frame-corner br"></div>
              
              <div className={`flap-display ${isFlipping ? 'flipping' : ''}`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ rotateX: -90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: 90, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
                    className="flap-content"
                  >
                    <div className="sponsor-display">
                      <div className="sponsor-logo-container">
                        <img
                          src={sponsors[currentIndex].logo} 
                          alt={sponsors[currentIndex].name}
                          className="sponsor-logo-flip"
                          loading="lazy"
                        />
                      </div>
                      <div className="sponsor-name-flip">
                        {sponsors[currentIndex].name.split('').map((char, idx) => (
                          <div 
                            key={idx} 
                            className="char-flip"
                            style={{ animationDelay: `${idx * 0.05}s` }}
                          >
                            {char}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Mechanical Split Line */}
              <div className="split-line"></div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flap-navigation">
            {sponsors.map((sponsor, index) => (
              <button
                key={index}
                className={`nav-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleNavigate(index)}
                aria-label={`Show ${sponsor.name}`}
              >
                <span className="dot-inner"></span>
                <span className="dot-ring"></span>
              </button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="flap-progress">
            <div 
              className="progress-fill"
              style={{ 
                animation: isFlipping ? 'none' : 'progressBar 5s linear forwards'
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
