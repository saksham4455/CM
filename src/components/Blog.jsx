import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import blogData from '../data/blogPosts.json';

const Blog = ({ theme, compact = false }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  const getThemeColor = () => {
    const colors = {
      blue: 'text-cyber-blue border-cyber-blue',
      purple: 'text-cyber-purple border-cyber-purple',
      green: 'text-cyber-green border-cyber-green',
      red: 'text-cyber-red border-cyber-red'
    };
    return colors[theme] || 'text-cyber-blue border-cyber-blue';
  };

  const getAccentColor = () => {
    const colors = {
      blue: '#00f3ff',
      purple: '#b829ff',
      green: '#00ff41',
      red: '#ff0055'
    };
    return colors[theme] || '#00f3ff';
  };

  // Duplicate posts for seamless marquee
  const marqueePosts = [...blogData, ...blogData, ...blogData];

  return (
    <section id="blog" className={`${compact ? 'py-0' : 'py-32'} relative overflow-hidden`}>
      {!compact && <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-transparent pointer-events-none" />}

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <h3 className={`font-display text-5xl md:text-6xl font-bold ${getThemeColor()} mb-4`}>
              LATEST UPDATES
            </h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Stay updated with the latest in technology, innovation, and CYNET news
            </p>
          </motion.div>
        </div>

        <div className="cp-blog-marquee-container">
          <motion.div
            className="cp-blog-marquee-inner"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {/* Double the list for seamless looping */}
            {[...blogData, ...blogData].map((post, index) => (
              <motion.div
                key={`${post.id}-${index}`}
                className="cp-blog-card"
                onClick={() => setSelectedPost(post)}
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="cp-blog-card-img">
                  <img src={post.image} alt={post.title} />
                  <div className="cp-blog-card-category" style={{ borderColor: getAccentColor(), color: getAccentColor() }}>
                    {post.category}
                  </div>
                </div>
                <div className="cp-blog-card-content">
                  <div className="cp-blog-card-meta">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>
                  <h4 className="cp-blog-card-title">{post.title}</h4>
                  <p className="cp-blog-card-excerpt">{post.excerpt}</p>
                  <div className="cp-blog-card-footer" style={{ color: getAccentColor() }}>
                    READ LOGS →
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Post Details Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="cp-blog-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              className="cp-blog-modal-content"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="cp-blog-modal-close" onClick={() => setSelectedPost(null)}>×</button>
              <div className="cp-blog-modal-grid">
                <div className="cp-blog-modal-img">
                  <img src={selectedPost.image} alt={selectedPost.title} />
                </div>
                <div className="cp-blog-modal-body">
                  <div className="cp-blog-modal-meta" style={{ color: getAccentColor() }}>
                    <span className="cp-blink">●</span> ACCESSING SECURE LOGS // {selectedPost.category} // {selectedPost.date}
                  </div>
                  <h2 className="cp-blog-modal-title">{selectedPost.title}</h2>
                  <div className="cp-blog-modal-text">
                    <div className="cp-decrypt-prefix" style={{ color: getAccentColor() }}>
                      [DECRYPTING DATA: SUCCESSFUL]
                    </div>
                    <p>{selectedPost.excerpt}</p>
                    <p>This high-level clearance log contains detailed information regarding the {selectedPost.title} initiative. Authorized personnel can proceed with documentation review. All telemetry data suggests optimal performance across the departmental grid.</p>
                  </div>
                  <button
                    className="cp-blog-modal-btn"
                    style={{ borderColor: getAccentColor(), color: getAccentColor() }}
                    onClick={() => setSelectedPost(null)}
                  >
                    CLOSE ACCESS
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Blog;
