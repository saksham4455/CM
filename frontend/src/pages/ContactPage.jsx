import React from 'react';
import { motion } from 'framer-motion';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Sponsors from '../components/Sponsors';
import Footer from '../components/Footer';
import CyberMatrixBackground from '../components/CyberMatrixBackground';

const ContactPage = ({ theme = 'blue' }) => {
  return (
    <div className="min-h-screen bg-cyber-dark text-white relative overflow-hidden">
      {/* Interactive Cyber Matrix Background */}
      <CyberMatrixBackground theme={theme} />
      
      {/* Content Layer */}
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center pt-24 pb-16 px-4"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display text-7xl md:text-9xl font-black mb-4 text-glow">
            CONNECT
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Get in touch with the CYNET team
          </p>
        </motion.div>

        <Contact theme={theme} />
        
        <div className="py-12">
          <h2 className="text-4xl font-display font-black text-center mb-8 text-glow">
            OUR SPONSORS
          </h2>
          <Sponsors theme={theme} />
        </div>

        <div className="py-8 pb-16">
          <h2 className="text-3xl font-display font-black text-center mb-6 text-glow">
            LATEST UPDATES
          </h2>
          <div className="max-w-6xl mx-auto px-4">
            <Blog theme={theme} compact={true} />
          </div>
        </div>

        <Footer theme={theme} />
      </div>
    </div>
  );
};

export default ContactPage;
