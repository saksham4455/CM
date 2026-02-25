import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = ({ theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getThemeColor = () => {
    const colors = {
      blue: 'text-cyber-blue border-cyber-blue',
      purple: 'text-cyber-purple border-cyber-purple',
      green: 'text-cyber-green border-cyber-green'
    };
    return colors[theme] || 'text-cyber-blue border-cyber-blue';
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-mono text-lg text-gray-400 mb-2">$ initiate --transmission</h2>
          <h3 className={`font-display text-5xl md:text-6xl font-bold ${getThemeColor()}`}>
            ESTABLISH CONTACT
          </h3>
          <p className="text-gray-400 text-lg mt-4">
            Secure channel ready for transmission
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-dark rounded-2xl p-8 md:p-12 border border-white/10 relative overflow-hidden"
        >
          {/* Success Overlay */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-30"
            >
              <div className={`text-6xl mb-4 ${getThemeColor()}`}>✓</div>
              <p className={`text-2xl font-bold ${getThemeColor()} mb-2`}>TRANSMISSION ENCRYPTED</p>
              <p className="text-gray-400">MESSAGE SENT SUCCESSFULLY</p>
            </motion.div>
          )}

          {/* Scanning overlay during submission */}
          {isSubmitting && (
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-cyber-red shadow-[0_0_20px_#ff0055]"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className={`block text-sm font-mono ${getThemeColor()} mb-2`}>
                &gt; IDENTIFICATION_
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white font-mono focus:border-current focus:outline-none transition-colors"
                placeholder="Enter your name..."
              />
            </div>

            {/* Email Input */}
            <div>
              <label className={`block text-sm font-mono ${getThemeColor()} mb-2`}>
                &gt; TRANSMISSION_ADDRESS_
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white font-mono focus:border-current focus:outline-none transition-colors"
                placeholder="your.email@domain.com"
              />
            </div>

            {/* Message Input */}
            <div>
              <label className={`block text-sm font-mono ${getThemeColor()} mb-2`}>
                &gt; MESSAGE_PAYLOAD_
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white font-mono focus:border-current focus:outline-none transition-colors resize-none"
                placeholder="Type your message here..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg ${getThemeColor()} neon-border hover-glow font-semibold text-lg font-mono transition-all ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? '[ ENCRYPTING... ]' : '[ ENCRYPT & SEND ]'}
            </button>
          </form>

          {/* Terminal footer */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500 font-mono">
              <span>&gt; Secured by CYNET protocol</span>
              <span className="flex items-center">
                <div className={`w-2 h-2 rounded-full bg-current ${getThemeColor()} animate-pulse mr-2`} />
                ACTIVE
              </span>
            </div>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          <div className="glass-dark rounded-lg p-6 text-center border border-white/10">
            <div className="text-3xl mb-3">📧</div>
            <p className="text-gray-400 text-sm mb-1">Email</p>
            <p className={`font-mono ${getThemeColor()}`}>cynet@college.edu</p>
          </div>
          <div className="glass-dark rounded-lg p-6 text-center border border-white/10">
            <div className="text-3xl mb-3">📱</div>
            <p className="text-gray-400 text-sm mb-1">Phone</p>
            <p className={`font-mono ${getThemeColor()}`}>+1 (555) 123-4567</p>
          </div>
          <div className="glass-dark rounded-lg p-6 text-center border border-white/10">
            <div className="text-3xl mb-3">📍</div>
            <p className="text-gray-400 text-sm mb-1">Location</p>
            <p className={`font-mono ${getThemeColor()}`}>IT Department</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
