import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../css/TeamPage.css";
import { useGlitchText } from "../hooks/useGlitchText";

const GROUP_PHOTO_VK1 = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop";
const GROUP_PHOTO_VK2 = "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1200&h=600&fit=crop";

// Helper to generate member objects with custom image paths
const generateMembers = (deptName, batch, count) => {
  const positions = ["Director", "Assistant Director", "Manager", "Member"];
  return Array.from({ length: count }).map((_, i) => ({
    id: `${batch}_${deptName}_${i + 1}`,
    name: `${deptName.split(' ')[0]}_OP_${i + 1}`,
    position: positions[Math.min(i, positions.length - 1)],
    department: deptName,
    img:
      batch === "VK-1"
        ? `/Enigma_Team/${deptName.replace(/ & | |_/g, '')}/member${i + 1}.jpg`
        : `/BUGSLAYERS/${deptName.replace(/ & | |_/g, '')}/member${i + 1}.jpg`
  }));
};

// VK-1 (Enigma_Team)
const vk1Departments = [
  {
    name: "CORE",
    members: [
      { id: "VK-1_CORE_1", name: "Harshit Verma ", position: "President", department: "CORE", img: "/Enigma_Team/Core/president.jpg" },
      { id: "VK-1_CORE_2", name: "Gurnoor Kaur Pawan", position: "Vice President", department: "CORE", img: "/Enigma_Team/Core/vp1.jpg" },
      { id: "VK-1_CORE_3", name: "Ayush Dahiya", position: "Vice President", department: "CORE", img: "/Enigma_Team/Core/Ayush Dahiya 00914202024.jpeg" },
      { id: "VK-1_CORE_4", name: "Sana Jain", position: "Secretary", department: "CORE", img: "/Enigma_Team/Core/secretary.jpg" }
    ],
    color: "#00ffcc"
  },
  {
    name: "DEVELOPER",
    members: [
      { id: "VK-1_DEVELOPER_1", name: "Kanika Bhandari", position: "Directorr", department: "DEVELOPER", img: "/Enigma_Team/Developer/lead.jpg" },
      { id: "VK-1_DEVELOPER_2", name: "Aditya Kumar", position: "Assistant Director", department: "DEVELOPER", img: "/Enigma_Team/Developer/frontend.jpg" },
      { id: "VK-1_DEVELOPER_3", name: "Saksham Bansal", position: "Assistant Director", department: "DEVELOPER", img: "/Enigma_Team/Developer/backend.jpg" },
      { id: "VK-1_DEVELOPER_4", name: "Ananya Vig", position: "Manager", department: "DEVELOPER", img: "/Enigma_Team/Developer/uiux.jpg" },
      { id: "VK-1_DEVELOPER_5", name: "Daksh Baweja", position: "Manager", department: "DEVELOPER", img: "/Enigma_Team/Developer/fullstack.jpg" },
      { id: "VK-1_DEVELOPER_1", name: "Avnish Aryan", position: "Member", department: "DEVELOPER", img: "/Enigma_Team/Developer/lead.jpg" },
      { id: "VK-1_DEVELOPER_2", name: "Shubbu Husain", position: "Member", department: "DEVELOPER", img: "/Enigma_Team/Developer/frontend.jpg" },
      { id: "VK-1_DEVELOPER_3", name: "Jia Sharma", position: "Member", department: "DEVELOPER", img: "/Enigma_Team/Developer/backend.jpg" },
      { id: "VK-1_DEVELOPER_4", name: "Harshit Sharma", position: "Member", department: "DEVELOPER", img: "/Enigma_Team/Developer/uiux.jpg" }
    ],
      color: "#00f3ff"
  },
  {
    name: "EVENT MANAGEMENT",
    members: [
      { id: "VK-1_EVENT_1", name: "Event Head", position: "Director", department: "EVENT MANAGEMENT", img: "/Enigma_Team/Event/head.jpg" },
      { id: "VK-1_EVENT_2", name: "Kartik Arora", position: "Assistant Director", department: "EVENT MANAGEMENT", img: "/Enigma_Team/Event/coordinator.jpg" },
      { id: "VK-1_EVENT_3", name: "Sidhant Mehta", position: "Assistant Director", department: "EVENT MANAGEMENT", img: "/Enigma_Team/Event/manager.jpg" },
      { id: "VK-1_EVENT_4", name: "Puru Gupta", position: "Manager", department: "EVENT MANAGEMENT", img: "/Enigma_Team/Event/volunteer.jpg" },
      { id: "VK-1_EVENT_5", name: "Nysa Katyal", position: "Manager", department: "EVENT MANAGEMENT", img: "/Enigma_Team/Event/volunteer.jpg" },
      { id: "VK-1_EVENT_6", name: "Kavya Datta", position: "Member", department: "EVENT MANAGEMENT", img: "/Enigma_Team/Event/volunteer.jpg" },
      { id: "VK-1_EVENT_7", name: "Jiyaa Arora", position: "Member", department: "EVENT MANAGEMENT", img: "/Enigma_Team/Event/volunteer.jpg" },
      { id: "VK-1_EVENT_8", name: "Shrishti Saklani", position: "Member", department: "EVENT MANAGEMENT", img: "/Enigma_Team/Event/volunteer.jpg" },
      { id: "VK-1_EVENT_9", name: "Harassis Singh", position: "Member", department: "EVENT MANAGEMENT", img: "/Enigma_Team/Event/volunteer.jpg" },
      { id: "VK-1_EVENT_10", name: "Ishaan", position: "Member", department: "EVENT MANAGEMENT", img: "/Enigma_Team/Event/volunteer.jpg" },
      { id: "VK-1_EVENT_11", name: "Harsh Dull", position: "Member", department: "EVENT MANAGEMENT", img: "/Enigma_Team/Event/volunteer.jpg" }
    ],
    color: "#b100ff"
  },
  {
    name: "MARKETING AND PR",
    members: [
      { id: "VK-1_MARKETING_1", name: "Marketing Head", position: "Director", department: "MARKETING", img: "/Enigma_Team/Marketing/head.jpg" },
      { id: "VK-1_MARKETING_2", name: "Aditya Kapoor", position: "Assistant Director", department: "MARKETING", img: "/Enigma_Team/Marketing/social.jpg" },
      { id: "VK-1_MARKETING_3", name: "Pushkar Sharma", position: "Assistant Director", department: "MARKETING", img: "/Enigma_Team/Marketing/content.jpg" },
      { id: "VK-1_MARKETING_4", name: "Shyna Chaurasia", position: "Manager", department: "MARKETING", img: "/Enigma_Team/Marketing/designer.jpg" },
      { id: "VK-1_MARKETING_3", name: "Prachi Bjaj", position: "Manager", department: "MARKETING", img: "/Enigma_Team/Marketing/content.jpg" },
      { id: "VK-1_MARKETING_3", name: "Mayank Raii", position: "Member", department: "MARKETING", img: "/Enigma_Team/Marketing/content.jpg" },
      { id: "VK-1_MARKETING_3", name: "Vanita Dua", position: "Member", department: "MARKETING", img: "/Enigma_Team/Marketing/content.jpg" },
      { id: "VK-1_MARKETING_3", name: "Jay Bhardwaj", position: "Member", department: "MARKETING", img: "/Enigma_Team/Marketing/content.jpg" },
      { id: "VK-1_MARKETING_3", name: "Bhavik Khanna", position: "Member", department: "MARKETING", img: "/Enigma_Team/Marketing/content.jpg" },
      { id: "VK-1_MARKETING_3", name: "Jay Bhardwaj", position: "Member", department: "MARKETING", img: "/Enigma_Team/Marketing/content.jpg" },
      { id: "VK-1_MARKETING_3", name: "Jeevansh Wadhwa", position: "Member", department: "MARKETING", img: "/Enigma_Team/Marketing/content.jpg" }
    ],
    
    color: "#ff006e"
  },
  {
    name: "SOCIAL MEDIA AND CONTENT",
    members: [
      { id: "VK-1_SOCIALMEDIA_1", name: "Srijan Jha", position: "Director", department: "SOCIAL MEDIA", img: "/Enigma_Team/SocialMedia/head.jpg" },
      { id: "VK-1_SOCIALMEDIA_2", name: "Rashi Nagar", position: "Assistant Director", department: "SOCIAL MEDIA", img: "/Enigma_Team/SocialMedia/content.jpg" },
      { id: "VK-1_SOCIALMEDIA_3", name: "Jasreet Kaur", position: "Manager", department: "SOCIAL MEDIA", img: "/Enigma_Team/SocialMedia/designer.jpg" },
      { id: "VK-1_SOCIALMEDIA_4", name: "Jahanvi Sachdeva", position: "Manager", department: "SOCIAL MEDIA", img: "/Enigma_Team/SocialMedia/analyst.jpg" },
      { id: "VK-1_SOCIALMEDIA_5", name: "Gurmeet Singh", position: "Manager", department: "SOCIAL MEDIA", img: "/Enigma_Team/SocialMedia/content.jpg" },
      { id: "VK-1_SOCIALMEDIA_6", name: "Yash Kankran", position: "Member", department: "SOCIAL MEDIA", img: "/Enigma_Team/SocialMedia/designer.jpg" },
      { id: "VK-1_SOCIALMEDIA_7", name: "Tanishka Sangwan", position: "Member", department: "SOCIAL MEDIA", img: "/Enigma_Team/SocialMedia/analyst.jpg" },
      { id: "VK-1_SOCIALMEDIA_8", name: "Sompal Singh Rawat", position: "Member", department: "SOCIAL MEDIA", img: "/Enigma_Team/SocialMedia/content.jpg" },
      { id: "VK-1_SOCIALMEDIA_9", name: "Devanshi", position: "Member", department: "SOCIAL MEDIA", img: "/Enigma_Team/SocialMedia/designer.jpg" },
    ],
    color: "#00ff66"
  },
  {
    name: "STILLS & MOTION",
    members: [
      { id: "VK-1_STILLSMOTION_1", name: "Avijot Singh Anand", position: "Director", department: "STILLS & MOTION", img: "/Enigma_Team/StillsMotion/head.jpg" },
      { id: "VK-1_STILLSMOTION_2", name: "Ishneet Kaur", position: "Assistant Director", department: "STILLS & MOTION", img: "/Enigma_Team/StillsMotion/video.jpg" },
      { id: "VK-1_STILLSMOTION_3", name: "Roshan Kumar", position: "Manager", department: "STILLS & MOTION", img: "/Enigma_Team/StillsMotion/editor.jpg" },
      { id: "VK-1_STILLSMOTION_4", name: "Sanchit Nair", position: "Manager", department: "STILLS & MOTION", img: "/Enigma_Team/StillsMotion/assistant.jpg" },
      { id: "VK-1_STILLSMOTION_5", name: "Bhuvesh", position: "Member", department: "STILLS & MOTION", img: "/Enigma_Team/StillsMotion/video.jpg" },
      { id: "VK-1_STILLSMOTION_6", name: "Srijan Jha", position: "Member", department: "STILLS & MOTION", img: "/Enigma_Team/StillsMotion/editor.jpg" },
      { id: "VK-1_STILLSMOTION_7", name: "Mehar Mukker", position: "Member", department: "STILLS & MOTION", img: "/Enigma_Team/StillsMotion/assistant.jpg" },
      { id: "VK-1_STILLSMOTION_8", name: "Suryansh Walia", position: "Member", department: "STILLS & MOTION", img: "/Enigma_Team/StillsMotion/video.jpg" }
    ],
    color: "#ff0044"
  }
];

// VK-2 (BUGSLAYERS)
const vk2Departments = [
  {
    name: "ANCHORING",
    members: [
      { id: "VK-2_ANCHORING_1", name: "Anchor Head", position: "Head", department: "ANCHORING", img: "/BUGSLAYERS/Anchoring/head.jpg" },
      { id: "VK-2_ANCHORING_2", name: "Anchor", position: "Anchor", department: "ANCHORING", img: "/BUGSLAYERS/Anchoring/anchor1.jpg" },
      { id: "VK-2_ANCHORING_3", name: "Anchor", position: "Anchor", department: "ANCHORING", img: "/BUGSLAYERS/Anchoring/anchor2.jpg" },
      { id: "VK-2_ANCHORING_4", name: "Secretary", position: "Secretary", department: "ANCHORING", img: "/BUGSLAYERS/Anchoring/secretary.jpg" }
    ],
    color: "#00ffcc"
  },
  {
    name: "CREATIVE",
    members: [
      { id: "VK-2_CREATIVE_1", name: "Creative Head", position: "Head", department: "CREATIVE", img: "/BUGSLAYERS/Creative/head.jpg" },
      { id: "VK-2_CREATIVE_2", name: "Designer", position: "Designer", department: "CREATIVE", img: "/BUGSLAYERS/Creative/designer1.jpg" },
      { id: "VK-2_CREATIVE_3", name: "Designer", position: "Designer", department: "CREATIVE", img: "/BUGSLAYERS/Creative/designer2.jpg" },
      { id: "VK-2_CREATIVE_4", name: "Artist", position: "Artist", department: "CREATIVE", img: "/BUGSLAYERS/Creative/artist.jpg" }
    ],
    color: "#00f3ff"
  },
  {
    name: "IT EVENT",
    members: [
      { id: "VK-2_ITEVENT_1", name: "IT Head", position: "Head", department: "IT EVENT", img: "/BUGSLAYERS/ITEvent/head.jpg" },
      { id: "VK-2_ITEVENT_2", name: "Developer", position: "Developer", department: "IT EVENT", img: "/BUGSLAYERS/ITEvent/dev1.jpg" },
      { id: "VK-2_ITEVENT_3", name: "Developer", position: "Developer", department: "IT EVENT", img: "/BUGSLAYERS/ITEvent/dev2.jpg" },
      { id: "VK-2_ITEVENT_4", name: "Volunteer", position: "Volunteer", department: "IT EVENT", img: "/BUGSLAYERS/ITEvent/volunteer.jpg" }
    ],
    color: "#b100ff"
  },
  {
    name: "INNOVATION & SPONSOR",
    members: [
      { id: "VK-2_INNOVATIONSPONSOR_1", name: "Innovation Head", position: "Head", department: "INNOVATION & SPONSOR", img: "/BUGSLAYERS/Inivation and sponser/head.jpg" },
      { id: "VK-2_INNOVATIONSPONSOR_2", name: "Sponsor Lead", position: "Sponsor Lead", department: "INNOVATION & SPONSOR", img: "/BUGSLAYERS/Inivation and sponser/sponsor1.jpg" },
      { id: "VK-2_INNOVATIONSPONSOR_3", name: "Sponsor", position: "Sponsor", department: "INNOVATION & SPONSOR", img: "/BUGSLAYERS/Inivation and sponser/sponsor2.jpg" },
      { id: "VK-2_INNOVATIONSPONSOR_4", name: "Secretary", position: "Secretary", department: "INNOVATION & SPONSOR", img: "/BUGSLAYERS/Inivation and sponser/secretary.jpg" }
    ],
    color: "#ff006e"
  },
  {
    name: "PHOTOGRAPHY",
    members: [
      { id: "VK-2_PHOTOGRAPHY_1", name: "Photo Head", position: "Head", department: "PHOTOGRAPHY", img: "/BUGSLAYERS/Photography/head.jpg" },
      { id: "VK-2_PHOTOGRAPHY_2", name: "Photographer", position: "Photographer", department: "PHOTOGRAPHY", img: "/BUGSLAYERS/Photography/photo1.jpg" },
      { id: "VK-2_PHOTOGRAPHY_3", name: "Photographer", position: "Photographer", department: "PHOTOGRAPHY", img: "/BUGSLAYERS/Photography/photo2.jpg" },
      { id: "VK-2_PHOTOGRAPHY_4", name: "Editor", position: "Editor", department: "PHOTOGRAPHY", img: "/BUGSLAYERS/Photography/editor.jpg" }
    ],
    color: "#00ff66"
  },
  {
    name: "POSTER",
    members: [
      { id: "VK-2_POSTER_1", name: "Poster Head", position: "Head", department: "POSTER", img: "/BUGSLAYERS/Poster/head.jpg" },
      { id: "VK-2_POSTER_2", name: "Designer", position: "Designer", department: "POSTER", img: "/BUGSLAYERS/Poster/designer1.jpg" },
      { id: "VK-2_POSTER_3", name: "Designer", position: "Designer", department: "POSTER", img: "/BUGSLAYERS/Poster/designer2.jpg" },
      { id: "VK-2_POSTER_4", name: "Editor", position: "Editor", department: "POSTER", img: "/BUGSLAYERS/Poster/editor.jpg" }
    ],
    color: "#ff0044"
  },
  {
    name: "SOCIAL MEDIA",
    members: [
      { id: "VK-2_SOCIALMEDIA_1", name: "SM Head", position: "Head", department: "SOCIAL MEDIA", img: "/BUGSLAYERS/Social Media/head.jpg" },
      { id: "VK-2_SOCIALMEDIA_2", name: "Content Creator", position: "Content Creator", department: "SOCIAL MEDIA", img: "/BUGSLAYERS/Social Media/content.jpg" },
      { id: "VK-2_SOCIALMEDIA_3", name: "Designer", position: "Designer", department: "SOCIAL MEDIA", img: "/BUGSLAYERS/Social Media/designer.jpg" },
      { id: "VK-2_SOCIALMEDIA_4", name: "Analyst", position: "Analyst", department: "SOCIAL MEDIA", img: "/BUGSLAYERS/Social Media/analyst.jpg" }
    ],
    color: "#ffaa00"
  }
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
  const glitchName = useGlitchText(members[activeItem]?.name);

  return (
    <div className="hover-expand-gallery">
      {members.map((member, index) => {
        const isActive = activeItem === index;
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
  const groupPhoto = activeBatch === "VK-1" ? GROUP_PHOTO_VK1 : GROUP_PHOTO_VK2;

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
          <img src={groupPhoto} alt={`Cynet Team ${activeBatch}`} />
          <div className="hero-overlay" />
          <h1 className="hero-title">CYNET 2026 TEAM</h1>
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