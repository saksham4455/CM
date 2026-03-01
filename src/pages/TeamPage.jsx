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
      { id: "VK-1_CORE_2", name: "Gurnoor Kaur Pawan", position: "Vice President", department: "CORE", img: "public/Enigma_Team/Core/Gurnoor_.jpg" },
      { id: "VK-1_CORE_3", name: "Ayush Dahiya", position: "Vice President", department: "CORE", img: "/Enigma_Team/Core/Ayush Dahiya 00914202024.jpeg" },
      { id: "VK-1_CORE_4", name: "Sana Jain", position: "Secretary", department: "CORE", img: "public/Enigma_Team/Core/Sana Jain .jpg" }
    ],
    color: "#00ffcc"
  },
  {
    name: "DEVELOPER",
    members: [
      { id: "VK-1_DEVELOPER_1", name: "Kanika Bhandari", position: "Directorr", department: "DEVELOPER", img: "public/Enigma_Team/Developer/Kanika.webp" },
      { id: "VK-1_DEVELOPER_2", name: "Aditya Kumar", position: "Assistant Director", department: "DEVELOPER", img: "/Enigma_Team/Developer/aditya.jpg" },
      { id: "VK-1_DEVELOPER_3", name: "Saksham Bansal", position: "Assistant Director", department: "DEVELOPER", img: "public/Enigma_Team/Developer/Saksham.JPG" },
      { id: "VK-1_DEVELOPER_4", name: "Ananya Vig", position: "Manager", department: "DEVELOPER", img: "public/Enigma_Team/Developer/Ananya.JPG" },
      { id: "VK-1_DEVELOPER_5", name: "Daksh Baweja", position: "Manager", department: "DEVELOPER", img: "public/Enigma_Team/Developer/Daksh .jpg" },
      { id: "VK-1_DEVELOPER_6", name: "Avnish Aryan", position: "Member", department: "DEVELOPER", img: "public/Enigma_Team/Developer/Avnish.jpeg" },
      { id: "VK-1_DEVELOPER_7", name: "Shubbu Husain", position: "Member", department: "DEVELOPER", img: "public/Enigma_Team/Developer/Shubbu Husain.jpg" },
      { id: "VK-1_DEVELOPER_8", name: "Jia Sharma", position: "Member", department: "DEVELOPER", img: "public/Enigma_Team/Developer/Jia.png" },
      { id: "VK-1_DEVELOPER_9", name: "Harshit Sharma", position: "Member", department: "DEVELOPER", img: "public/Enigma_Team/Developer/harshit.jpg" }
    ],
      color: "#00f3ff"
  },
  {
    name: "EVENT MANAGEMENT",
    members: [
      { id: "VK-1_EVENT_2", name: "Kartik Arora", position: "Assistant Director", department: "EVENT MANAGEMENT", img: "/Enigma_Team/Event/Kartik Arora Assistant Director.jpg" },
      { id: "VK-1_EVENT_3", name: "Sidhant Mehta", position: "Assistant Director", department: "EVENT MANAGEMENT", img: "public/Enigma_Team/Event/Sidhant Mehta  (Assistant Director).jpg" },
      { id: "VK-1_EVENT_4", name: "Puru Gupta", position: "Manager", department: "EVENT MANAGEMENT", img: "public/Enigma_Team/Event/Puru Gupta Manager .jpg" },
      { id: "VK-1_EVENT_5", name: "Nysa Katyal", position: "Manager", department: "EVENT MANAGEMENT", img: "public/Enigma_Team/Event/Nysa Katyal (manager).jpg" },
      { id: "VK-1_EVENT_6", name: "Kavya Datta", position: "Member", department: "EVENT MANAGEMENT", img: "public/Enigma_Team/Event/kavya.jpeg" },
      { id: "VK-1_EVENT_7", name: "Jiyaa Arora", position: "Member", department: "EVENT MANAGEMENT", img: ""},
      { id: "VK-1_EVENT_8", name: "Shrishti Saklani", position: "Member", department: "EVENT MANAGEMENT", img: "public/Enigma_Team/Event/Shrishti ( member ).jpg" },
      { id: "VK-1_EVENT_9", name: "Harassis Singh", position: "Member", department: "EVENT MANAGEMENT", img: "public/Enigma_Team/Event/Harassis Singh.jpg" },
      { id: "VK-1_EVENT_10", name: "Ishaan", position: "Member", department: "EVENT MANAGEMENT", img: "public/Enigma_Team/Event/Ishaan.webp" },
      { id: "VK-1_EVENT_11", name: "Harsh Dull", position: "Member", department: "EVENT MANAGEMENT", img: "public/Enigma_Team/Event/Harsh Dhull.jpg" },
      { id: "VK-1_EVENT_12", name: "Sejal", position: "Member", department: "EVENT MANAGEMENT", img: "public/Enigma_Team/Event/Sejal .jpeg" },
    ],
    color: "#b100ff"
  },
  {
    name: "MARKETING AND PR",
    members: [
      { id: "VK-1_MARKETING_1", name: "Marketing Head", position: "Director", department: "MARKETING", img: "/Enigma_Team/Marketing/head.jpg" },
      { id: "VK-1_MARKETING_2", name: "Aditya Kapoor", position: "Assistant Director", department: "MARKETING", img: "/Enigma_Team/Marketing/social.jpg" },
      { id: "VK-1_MARKETING_3", name: "Pushkar Sharma", position: "Assistant Director", department: "MARKETING", img: "/Enigma_Team/Marketing/content.jpg" },
      { id: "VK-1_MARKETING_4", name: "Shyna Chaurasia", position: "Manager", department: "MARKETING", img: "public/Enigma_Team/Marketing/Shyna chaurasia_.jpg" },
      { id: "VK-1_MARKETING_5", name: "Prachi Bjaj", position: "Manager", department: "MARKETING", img: "/Enigma_Team/Marketing/content.jpg" },
      { id: "VK-1_MARKETING_6", name: "Mayank Rai", position: "Member", department: "MARKETING", img: "public/Enigma_Team/Marketing/Mayank Rai.jpg" },
      { id: "VK-1_MARKETING_7", name: "Vanita Dua", position: "Member", department: "MARKETING", img: "public/Enigma_Team/Marketing/vanita dua.jpg" },
      { id: "VK-1_MARKETING_8", name: "Jay Bhardwaj", position: "Member", department: "MARKETING", img: "/Enigma_Team/Marketing/content.jpg" },
      { id: "VK-1_MARKETING_9", name: "Bhavik Khanna", position: "Member", department: "MARKETING", img: "public/Enigma_Team/Marketing/Bhavik.webp" },
      { id: "VK-1_MARKETING_10", name: "Jay Bhardwaj", position: "Member", department: "MARKETING", img: "/Enigma_Team/Marketing/content.jpg" },
      { id: "VK-1_MARKETING_11", name: "Jeevansh Wadhwa", position: "Member", department: "MARKETING", img: "public/Enigma_Team/Marketing/Jeevansh Wadhwa.jpg" }
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
    name: "CORE",
    members: [
      { id: "VK-2_CORE_1", name: "Akshat", position: "President", department: "CORE", img: "public/BUGSLAYERS/Core/Akshat.jpg" },
      { id: "VK-2_CORE_2", name: "Shubham", position: "Vice President", department: "CORE", img: "public/BUGSLAYERS/Core/Shubham.jpg" },
      { id: "VK-2_CORE_3", name: "Simran", position: "Vice President", department: "CORE", img: "public/BUGSLAYERS/Core/Simran.jpg" }
    ],
    color: "#ffffff"
  },

  {
    name: "CREATIVE",
    members: [
      { id: "VK-2_CREATIVE_1", name: "Garima", position: "Convener", department: "CREATIVE", img: "public/BUGSLAYERS/Creative/Garima.jpg" },
      { id: "VK-2_CREATIVE_2", name: "K M Neha Rawat", position: "Member", department: "CREATIVE", img: "public/BUGSLAYERS/Creative/Neha.jpg" },
      { id: "VK-2_CREATIVE_3", name: "Preeti", position: "Member", department: "CREATIVE", img: "public/BUGSLAYERS/Creative/Preeti.jpg" },
      { id: "VK-2_CREATIVE_4", name: "Kanchan", position: "Member", department: "CREATIVE", img: "public/BUGSLAYERS/Creative/Kanchan.jpg" },
      { id: "VK-2_CREATIVE_5", name: "Khushboo", position: "Member", department: "CREATIVE", img: "public/BUGSLAYERS/Creative/Khushboo.jpg" },
      { id: "VK-2_CREATIVE_6", name: "Shree Sai", position: "Member", department: "CREATIVE", img: "public/BUGSLAYERS/Creative/ShreeSai.jpg" },
      { id: "VK-2_CREATIVE_7", name: "Aarohi", position: "Member", department: "CREATIVE", img: "public/BUGSLAYERS/Creative/Aarohi.jpg" },
      { id: "VK-2_CREATIVE_8", name: "Anirban", position: "Member", department: "CREATIVE", img: "public/BUGSLAYERS/Creative/Anirban.jpg" },
      { id: "VK-2_CREATIVE_9", name: "Karishma", position: "Member", department: "CREATIVE", img: "public/BUGSLAYERS/Creative/Karishma.jpg" }
    ],
    color: "#00f3ff"
  },

  {
    name: "ANCHORING",
    members: [
      { id: "VK-2_ANCHORING_1", name: "Avni", position: "Member", department: "ANCHORING", img: "public/BUGSLAYERS/Anchoring/Avni.jpg" },
      { id: "VK-2_ANCHORING_2", name: "Aditya Nath", position: "Member", department: "ANCHORING", img: "public/BUGSLAYERS/Anchoring/AdityaNath.jpg" },
      { id: "VK-2_ANCHORING_3", name: "Tanvi", position: "Member", department: "ANCHORING", img: "public/BUGSLAYERS/Anchoring/Tanvi.jpg" },
      { id: "VK-2_ANCHORING_4", name: "Arunima", position: "Member", department: "ANCHORING", img: "public/BUGSLAYERS/Anchoring/Arunima.jpg" },
      { id: "VK-2_ANCHORING_5", name: "Aditya Katoch", position: "Member", department: "ANCHORING", img: "public/BUGSLAYERS/Anchoring/AdityaKatoch.jpg" },
      { id: "VK-2_ANCHORING_6", name: "Karishma", position: "Member", department: "ANCHORING", img: "public/BUGSLAYERS/Anchoring/Karishma.jpg" },
      { id: "VK-2_ANCHORING_7", name: "Rishika", position: "Member", department: "ANCHORING", img: "public/BUGSLAYERS/Anchoring/Rishika.jpg" },
      { id: "VK-2_ANCHORING_8", name: "Bhavya", position: "Member", department: "ANCHORING", img: "public/BUGSLAYERS/Anchoring/Bhavya.jpg" }
    ],
    color: "#00ffcc"
  },

  {
    name: "PHOTOGRAPHY",
    members: [
      { id: "VK-2_PHOTOGRAPHY_1", name: "Dharmveer", position: "Member", department: "PHOTOGRAPHY", img: "public/BUGSLAYERS/Photography/Dharmveer.jpg" },
      { id: "VK-2_PHOTOGRAPHY_2", name: "Lakshay", position: "Member", department: "PHOTOGRAPHY", img: "public/BUGSLAYERS/Photography/Lakshay.jpg" },
      { id: "VK-2_PHOTOGRAPHY_3", name: "Manas Gupta", position: "Member", department: "PHOTOGRAPHY", img: "public/BUGSLAYERS/Photography/Manas.jpg" },
      { id: "VK-2_PHOTOGRAPHY_4", name: "Yash Biduri", position: "Member", department: "PHOTOGRAPHY", img: "public/BUGSLAYERS/Photography/Yash.jpg" }
    ],
    color: "#00ff66"
  },

  {
    name: "SOCIAL MEDIA",
    members: [
      { id: "VK-2_SOCIAL_1", name: "Dharamveer", position: "Convener", department: "SOCIAL MEDIA", img: "public/BUGSLAYERS/SocialMedia/Dharamveer.jpg" },
      { id: "VK-2_SOCIAL_2", name: "Lakshay", position: "Member", department: "SOCIAL MEDIA", img: "public/BUGSLAYERS/SocialMedia/Lakshay.jpg" },
      { id: "VK-2_SOCIAL_3", name: "Aditya Katoch", position: "Member", department: "SOCIAL MEDIA", img: "public/BUGSLAYERS/SocialMedia/AdityaKatoch.jpg" },
      { id: "VK-2_SOCIAL_4", name: "Yash Biduri", position: "Member", department: "SOCIAL MEDIA", img: "public/BUGSLAYERS/SocialMedia/Yash.jpg" },
      { id: "VK-2_SOCIAL_5", name: "Anchal", position: "Member", department: "SOCIAL MEDIA", img: "public/BUGSLAYERS/SocialMedia/Anchal.jpg" },
      { id: "VK-2_SOCIAL_6", name: "Prisha", position: "Member", department: "SOCIAL MEDIA", img: "public/BUGSLAYERS/SocialMedia/Prisha.jpg" },
      { id: "VK-2_SOCIAL_7", name: "Arohi", position: "Member", department: "SOCIAL MEDIA", img: "public/BUGSLAYERS/SocialMedia/Arohi.jpg" },
      { id: "VK-2_SOCIAL_8", name: "Sai", position: "Member", department: "SOCIAL MEDIA", img: "public/BUGSLAYERS/SocialMedia/Sai.jpg" },
      { id: "VK-2_SOCIAL_9", name: "Siddhartha", position: "Member", department: "SOCIAL MEDIA", img: "public/BUGSLAYERS/SocialMedia/Siddhartha.jpg" },
      { id: "VK-2_SOCIAL_10", name: "Sambhav", position: "Member", department: "SOCIAL MEDIA", img: "public/BUGSLAYERS/SocialMedia/Sambhav.jpg" },
      { id: "VK-2_SOCIAL_11", name: "Garvit", position: "Member", department: "SOCIAL MEDIA", img: "public/BUGSLAYERS/SocialMedia/Garvit.jpg" }
    ],
    color: "#ffaa00"
  },

  {
    name: "INVITATION & SPONSORSHIP",
    members: [
      { id: "VK-2_SPONSOR_1", name: "Shivam", position: "Member", department: "INVITATION & SPONSORSHIP", img: "public/BUGSLAYERS/Sponsorship/Shivam.jpg" },
      { id: "VK-2_SPONSOR_2", name: "Yashraj", position: "Member", department: "INVITATION & SPONSORSHIP", img: "public/BUGSLAYERS/Sponsorship/Yashraj.jpg" },
      { id: "VK-2_SPONSOR_3", name: "Kunal", position: "Member", department: "INVITATION & SPONSORSHIP", img: "public/BUGSLAYERS/Sponsorship/Kunal.jpg" },
      { id: "VK-2_SPONSOR_4", name: "Yash Biduri", position: "Member", department: "INVITATION & SPONSORSHIP", img: "public/BUGSLAYERS/Sponsorship/Yash.jpg" },
      { id: "VK-2_SPONSOR_5", name: "Manas", position: "Member", department: "INVITATION & SPONSORSHIP", img: "public/BUGSLAYERS/Sponsorship/Manas.jpg" },
      { id: "VK-2_SPONSOR_6", name: "Abbu Sufiyan", position: "Member", department: "INVITATION & SPONSORSHIP", img: "public/BUGSLAYERS/Sponsorship/Abbu.jpg" },
      { id: "VK-2_SPONSOR_7", name: "Pravar", position: "Member", department: "INVITATION & SPONSORSHIP", img: "public/BUGSLAYERS/Sponsorship/Pravar.jpg" },
      { id: "VK-2_SPONSOR_8", name: "Amolak", position: "Member", department: "INVITATION & SPONSORSHIP", img: "public/BUGSLAYERS/Sponsorship/Amolak.jpg" },
      { id: "VK-2_SPONSOR_9", name: "Ayush", position: "Member", department: "INVITATION & SPONSORSHIP", img: "public/BUGSLAYERS/Sponsorship/Ayush.jpg" }
    ],
    color: "#ff006e"
  },

  {
    name: "POSTER MAKING",
    members: [
      { id: "VK-2_POSTER_1", name: "Yashik", position: "Member", department: "POSTER MAKING", img: "public/BUGSLAYERS/Poster/Yashik.jpg" },
      { id: "VK-2_POSTER_2", name: "Jashandeep", position: "Member", department: "POSTER MAKING", img: "public/BUGSLAYERS/Poster/Jashandeep.jpg" },
      { id: "VK-2_POSTER_3", name: "Ishqpreet", position: "Member", department: "POSTER MAKING", img: "public/BUGSLAYERS/Poster/Ishqpreet.jpg" },
      { id: "VK-2_POSTER_4", name: "Aarohi", position: "Member", department: "POSTER MAKING", img: "public/BUGSLAYERS/Poster/Aarohi.jpg" },
      { id: "VK-2_POSTER_5", name: "Sai", position: "Member", department: "POSTER MAKING", img: "public/BUGSLAYERS/Poster/Sai.jpg" }
    ],
    color: "#ff0044"
  },

  {
    name: "IT EVENT",
    members: [
      { id: "VK-2_IT_1", name: "Vinay", position: "Member", department: "IT EVENT", img: "public/BUGSLAYERS/ITEvent/Vinay.jpg" },
      { id: "VK-2_IT_2", name: "Yagnesh Bala", position: "Member", department: "IT EVENT", img: "public/BUGSLAYERS/ITEvent/Yagnesh.jpg" },
      { id: "VK-2_IT_3", name: "Krishank", position: "Member", department: "IT EVENT", img: "public/BUGSLAYERS/ITEvent/Krishank.jpg" },
      { id: "VK-2_IT_4", name: "Preeti", position: "Member", department: "IT EVENT", img: "public/BUGSLAYERS/ITEvent/Preeti.jpg" },
      { id: "VK-2_IT_5", name: "Rishika", position: "Member", department: "IT EVENT", img: "public/BUGSLAYERS/ITEvent/Rishika.jpg" }
    ],
    color: "#b100ff"
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