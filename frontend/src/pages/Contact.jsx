import React from 'react';
import { motion } from 'framer-motion';
import Blog from '../components/Blog';
import ContactForm from '../components/ContactForm';
import CyberMatrixBackground from '../components/CyberMatrixBackground';
import BoxText from '../components/BoxText';
import Typewriter from '../components/Typewriter';
import '../css/Contact.css';

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /><rect width="20" height="16" x="2" y="4" rx="2" /></svg>
);
const IconInsta = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const IconLinkedin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);
const IconPhone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
);

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const COORDINATORS = [
  { name: 'Harshit Verma', role: 'President', phone: '9810130848', avatar: 'HV' },
  { name: 'Gurnoor Kaur', role: 'Vice President', phone: '9999737357', avatar: 'GK' },
  { name: 'Ayush Dhaiya', role: 'Vice President', phone: '9810480038', avatar: 'AD' },
  { name: 'Sana Jain', role: 'Secretary', phone: '9958688944', avatar: 'SJ' },
];

const FACULTY = {
  name: 'Ms. Puja Mujral',
  role: 'Faculty Advisor — IT Department',
};

const INFO_ITEMS = [
  { icon: <IconMail />, label: 'Email Address', value: 'cynet@jimsd.org', link: 'mailto:cynet@jimsd.org' },
  { icon: <IconInsta />, label: 'Instagram', value: '@enigma.jimsvk', link: 'https://www.instagram.com/enigma.jimsvk/' },
  { icon: <IconLinkedin />, label: 'LinkedIn', value: 'Enigma', link: 'https://www.linkedin.com/company/enigma-it-club-jims-vk/' },
];

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
const Contact = ({ theme = 'blue' }) => (
  <div className="cp-page">
    <CyberMatrixBackground theme={theme} />

    <div className="cp-content">
      {/* ── HERO ── */}
      <section className="cp-hero">
        <motion.div
          className="cp-shell"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div style={{ fontFamily: '"Alloy Ink", cursive' }}>
            <BoxText 
              text="CONTACT" 
              color="#00f3ff"
              size={8}
              gap={1.5}
            />
          </div>
          <p className="cp-hero-sub">CONNECT WITH THE CYNET INFRASTRUCTURE</p>
          <div className="cp-hero-line" />
        </motion.div>
      </section>

      {/* ── INTERFACE ── */}
      <motion.section
        className="cp-section"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
      >
        <div className="cp-shell">
          <div className="cp-main-grid">
            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>

            {/* Info Side */}
            <aside className="cp-aside">
              {/* ── CHANNELS ── */}
              <div className="cp-aside-header">
                <span className="cp-label-tag">&gt; system --channels</span>
              </div>
              <ul className="cp-info-list">
                {INFO_ITEMS.map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="cp-info-item"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                  >
                    <a href={item.link} className="cp-info-link" target={item.link.startsWith('mailto:') ? undefined : '_blank'} rel={item.link.startsWith('mailto:') ? undefined : 'noopener noreferrer'}>
                      <span className="cp-info-icon">{item.icon}</span>
                      <div className="cp-info-text">
                        <span className="cp-info-label">{item.label}</span>
                        <span className="cp-info-value">{item.value}</span>
                      </div>
                    </a>
                  </motion.li>
                ))}
              </ul>

              {/* ── MENTORSHIP (Sidebar) ── */}
              <div className="cp-aside-header cp-aside-header--mt">
                <span className="cp-label-tag">&gt; personnel --mentorship</span>
              </div>
              <motion.div
                className="cp-faculty-sidebar"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="cp-faculty-mini">
                  <div className="cp-faculty-info-mini">
                    <h4 className="cp-faculty-name-mini">
                      <Typewriter text={FACULTY.name} speed={80} delay={500} />
                    </h4>
                    <p className="cp-faculty-role-mini">{FACULTY.role}</p>
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </motion.section>

      {/* ── COORDINATORS ── */}
      <motion.section
        className="cp-section"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
      >
        <div className="cp-shell">
          <div className="cp-block-header">
            <span className="cp-label-tag">&gt; personnel --active</span>
            <h2 className="cp-block-title">CORE TEAM</h2>
          </div>
          <div className="cp-coord-grid">
            {COORDINATORS.map((c, idx) => (
              <motion.div
                key={idx}
                className="cp-coord"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + (idx * 0.1) }}
              >
                <div className="cp-coord-corner cp-cc-tl" />
                <div className="cp-coord-corner cp-cc-tr" />
                <div className="cp-coord-corner cp-cc-bl" />
                <div className="cp-coord-corner cp-cc-br" />

                <div className="cp-coord-avatar">{c.avatar}</div>
                <h4 className="cp-coord-name">
                  <Typewriter text={c.name} speed={60} delay={200 + (idx * 300)} />
                </h4>
                <p className="cp-coord-role">{c.role}</p>
                <div className="cp-coord-footer">
                  <a href={`tel:${c.phone}`} className="cp-coord-phone">
                    <IconPhone /> <span>{c.phone}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── BLOG / LATEST UPDATES ── */}
      <motion.section
        className="cp-section cp-section--dim"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-150px" }}
        transition={{ duration: 1.2 }}
      >
        <Blog theme={theme} compact={true} />
      </motion.section>
    </div>
  </div>
);

export default Contact;