import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import '../css/Sponsers.css';

const Sponsors = ({ theme = 'blue' }) => {
  const sponsors = [
    {
      name: 'TSN Securitys',
      logo: 'public/Logo/Sponser_1.jpeg'
    },
    {
      name: 'Fresca',
      logo: 'public/Logo/Sponser_2.png'
    }
  ];

  return (
    <section className="sponsors-section">
      <div className="sponsors-shell">
        <h3 className={`sponsors-title ${theme}`}>PARTNERS</h3>
        <div className="sponsors-minimal-grid">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="sponsor-circle-box"
            >
              <img src={sponsor.logo} alt={sponsor.name} className="partner-logo-img" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
