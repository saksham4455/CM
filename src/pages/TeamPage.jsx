import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/TeamPage.css";
import { useGlitchText } from "../hooks/useGlitchText";

const GROUP_PHOTO = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop";

// Helper to generate mock names
const generateMembers = (deptName, startId, count) => {
  const positions = ["Director", "Assistant Director", "Manager", "Member"];
  return Array.from({ length: count }).map((_, i) => ({
    id: startId + i,
    name: `${deptName.split(' ')[0]}_OP_${i + 1}`,
    position: positions[Math.min(i, positions.length - 1)],
    department: deptName,
    img: `https://images.unsplash.com/photo-${1472099645785 + startId + i}?w=800&h=800&fit=crop&crop=face`
  }));
};

// VK-1 (Enigma_Team)
const vk1Departments = [
  { name: "CORE", members: generateMembers("CORE", 100, 6), color: "#00ffcc" },
  { name: "DEVELOPER", members: generateMembers("DEVELOPER", 200, 5), color: "#00f3ff" },
  { name: "EVENT", members: generateMembers("EVENT", 300, 5), color: "#b100ff" },
  { name: "MARKETING", members: generateMembers("MARKETING", 400, 5), color: "#ff006e" },
  { name: "SOCIAL MEDIA", members: generateMembers("SOCIAL MEDIA", 500, 5), color: "#00ff66" },
  { name: "STILLS & MOTION", members: generateMembers("STILLS & MOTION", 600, 5), color: "#ff0044" }
];

// VK-2 (BUGSLAYERS)
const vk2Departments = [
  { name: "ANCHORING", members: generateMembers("ANCHORING", 700, 5), color: "#00ffcc" },
  { name: "CREATIVE", members: generateMembers("CREATIVE", 800, 5), color: "#00f3ff" },
  { name: "IT EVENT", members: generateMembers("IT EVENT", 900, 5), color: "#b100ff" },
  { name: "INNOVATION & SPONSOR", members: generateMembers("INNOVATION & SPONSOR", 1000, 5), color: "#ff006e" },
  { name: "PHOTOGRAPHY", members: generateMembers("PHOTOGRAPHY", 1100, 5), color: "#00ff66" },
  { name: "POSTER", members: generateMembers("POSTER", 1200, 5), color: "#ff0044" },
  { name: "SOCIAL MEDIA", members: generateMembers("SOCIAL MEDIA", 1300, 5), color: "#ffaa00" }
];

const TerminalSelector = ({ activeBatch, setActiveBatch }) => {
  const [lines, setLines] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setLines(1), 800);
    const t2 = setTimeout(() => setLines(2), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [activeBatch]);

  return (
    <div className="terminal-selector">
      <div className="terminal-header">CYNET DB_ACCESS_TERMINAL v2.4.1</div>
      <div className="terminal-body">
        <div className="terminal-line typing">
          <span className="prompt">{'>'}</span> INITIALIZING CYNET TEAM DATABASE...
        </div>

        {lines >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="terminal-line"
          >
            <span className="prompt">{'>'}</span> SELECT BATCH TO DISPLAY:
          </motion.div>
        )}

        {lines >= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="terminal-buttons"
          >
            <button
              className={`terminal-btn ${activeBatch === 'VK-1' ? 'active' : ''}`}
              onClick={() => setActiveBatch('VK-1')}
            >
              [ VK-1 (Enigma) ]
            </button>
            <button
              className={`terminal-btn ${activeBatch === 'VK-2' ? 'active' : ''}`}
              onClick={() => setActiveBatch('VK-2')}
            >
              [ VK-2 (Bugslayers) ]
            </button>
          </motion.div>
        )}

        {lines >= 2 && (
          <motion.div
            key={activeBatch}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="terminal-line text-cyan"
          >
            <span className="prompt">{'>'}</span> DISPLAYING {activeBatch} TEAM...
          </motion.div>
        )}
        <span className="terminal-cursor">█</span>
      </div>
    </div>
  );
};

const HoverExpandGallery = ({ members, accentColor }) => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div className="hover-expand-gallery">
      {members.map((member, index) => {
        const isActive = activeItem === index;
        const glitchName = useGlitchText(member.name);

        return (
          <motion.div
            layout
            key={member.id}
            onHoverStart={() => setActiveItem(index)}
            onClick={() => setActiveItem(index)}
            className={`gallery-panel ${isActive ? "active" : ""}`}
            initial={false}
            animate={{ flex: isActive ? 6 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{ borderColor: isActive ? accentColor : "rgba(255,255,255,0.1)" }}
          >
            <div className="panel-image-container">
              <motion.img
                src={member.img}
                alt={member.name}
                animate={{
                  scale: isActive ? 1 : 1.2,
                  filter: isActive ? "grayscale(0%)" : "grayscale(100%) brightness(0.5)"
                }}
                transition={{ duration: 0.5 }}
              />
              <div
                className="panel-overlay"
                style={{
                  background: isActive
                    ? `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)`
                    : "rgba(0,0,0,0.5)"
                }}
              />
            </div>

            <div className="panel-content">
              {isActive ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="active-content"
                >
                  <div className="panel-position-badge" style={{ color: accentColor, borderColor: accentColor }}>
                    {member.position}
                  </div>
                  <h3 className="panel-name" style={{ textShadow: `0 0 10px ${accentColor}` }}>
                    {glitchName}
                  </h3>
                  <div className="panel-dept">{member.department}</div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inactive-content"
                >
                  <span className="rotated-name">{member.name.split('_')[0]}</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const SectionHeader = ({ title, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="section-header-container"
  >
    <h2 className="section-title" style={{ color, textShadow: `0 0 20px ${color}` }}>
      {title}
    </h2>
    <div className="section-line" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
  </motion.div>
);

function TeamPage() {
  const [activeBatch, setActiveBatch] = useState("VK-1");

  const activeDepartments = activeBatch === "VK-1" ? vk1Departments : vk2Departments;

  return (
    <div className="team-page-wrapper">
      <div className="main-container">

        {/* Hero Group Photo Overlay */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hero-photo-section"
        >
          <img src={GROUP_PHOTO} alt="Cynet Team 2025" />
          <div className="hero-overlay" />
          <h1 className="hero-title">CYNET 2025 TEAM</h1>
          <p className="hero-subtitle">THE MINDS BEHIND THE MATRIX</p>
        </motion.div>

        {/* Cyberpunk Terminal Selector */}
        <TerminalSelector activeBatch={activeBatch} setActiveBatch={setActiveBatch} />

        <div className="team-sections-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBatch}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
              className="batch-sections"
            >
              {activeDepartments.map((dept, index) => (
                <section key={dept.name} className={index === 0 ? "pt-2" : "mt-16"}>
                  <SectionHeader title={dept.name} color={dept.color} />
                  <HoverExpandGallery members={dept.members} accentColor={dept.color} />
                </section>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

export default TeamPage;