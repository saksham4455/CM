import React from 'react';
import { motion } from 'framer-motion';
import '../css/Sponsers.css';

const Sponsors = ({ theme = 'blue' }) => {
  const sponsors = [
    {
      name: 'TSN Securitys',
      logo: '/Logo/Sponser_1.jpeg',
    },
    {
      name: 'Carrer Partner',
      logo: '/Logo/Sponser_2.png',
    }
  ];

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

        <div className="sponsors-grid">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              className="sponsor-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="sponsor-logo-wrapper">
                <img
                  src={sponsor.logo} 
                  alt={sponsor.name}
                  className="sponsor-logo"
                  loading="lazy"
                />
              </div>
              <h4 className="sponsor-name">{sponsor.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
