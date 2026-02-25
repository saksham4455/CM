import React, { useEffect, useRef, useState } from "react";
import "../css/TeamPage.css";
import { useGlitchText } from "../hooks/useGlitchText";

// Group photo placeholder
const GROUP_PHOTO = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop";

// Random team names generator
const teamNames = [
  "CYBER_PHOENIX",
  "NEXUS_VANGUARD",
  "ZERO_DAY_SQUAD",
  "PHANTOM_CORP",
  "DIGITAL_SENTINELS",
  "SYNTHWAVE_ELITE",
  "QUANTUM_FORCE",
  "NEON_ASSASSINS",
  "DATA_DRAGONS",
  "CIRCUIT_BREAKERS",
  "BYTE_NINJAS",
  "FUTURE_FRAGMENT",
  "CODE_MASTERS",
  "GRID_GUARDIANS",
  "STREAM_RUNNERS",
  "PIXEL_WARRIORS",
  "NODE_NOMADS",
  "LOGIC_LORDS",
  "SIGNAL_STRIKERS"
];

const getRandomTeamName = (index) => {
  return teamNames[index % teamNames.length];
};

// Typing animation component
const TypingTitle = ({ text, colorClass }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span className={colorClass}>{displayText}<span className="typing-cursor">_</span></span>;
};

// Department color mapping
const departmentColors = {
  developers: { primary: "var(--blue)", glow: "var(--blue-glow)", class: "dept-developers" },
  events: { primary: "var(--violet)", glow: "var(--violet-glow)", class: "dept-events" },
  marketingPR: { primary: "var(--pink)", glow: "var(--pink-glow)", class: "dept-marketing" },
  socialMedia: { primary: "var(--green)", glow: "var(--green-glow)", class: "dept-social" },
  stillsMotion: { primary: "var(--red)", glow: "var(--red-glow)", class: "dept-stills" }
};

// CORE MEMBERS
const coreMembers = {
  president: [
    { id: 1, name: "ALEX_CHEN", position: "President", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" }
  ],
  vicePresidents: [
    { id: 2, name: "SARAH_WILLIAMS", position: "Vice President", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face" },
    { id: 3, name: "MICHAEL_RODRIGUEZ", position: "Vice President", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face" }
  ],
  secretary: [
    { id: 4, name: "EMILY_JOHNSON", position: "Secretary", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face" }
  ]
};

// DEPARTMENT STRUCTURE: 1 Director, 2 AD, 2 Managers, 4 Members
const createDepartment = (startId, departmentName) => ({
  director: [
    { id: startId, name: `${departmentName}_DIR_01`, position: "Director", department: departmentName, img: `https://images.unsplash.com/photo-${1472099645785 + startId}?w=400&h=400&fit=crop&crop=face` }
  ],
  assistantDirectors: [
    { id: startId + 1, name: `${departmentName}_AD_01`, position: "Assistant Director", department: departmentName, img: `https://images.unsplash.com/photo-${1472099645785 + startId + 1}?w=400&h=400&fit=crop&crop=face` },
    { id: startId + 2, name: `${departmentName}_AD_02`, position: "Assistant Director", department: departmentName, img: `https://images.unsplash.com/photo-${1472099645785 + startId + 2}?w=400&h=400&fit=crop&crop=face` }
  ],
  managers: [
    { id: startId + 3, name: `${departmentName}_MGR_01`, position: "Manager", department: departmentName, img: `https://images.unsplash.com/photo-${1472099645785 + startId + 3}?w=400&h=400&fit=crop&crop=face` },
    { id: startId + 4, name: `${departmentName}_MGR_02`, position: "Manager", department: departmentName, img: `https://images.unsplash.com/photo-${1472099645785 + startId + 4}?w=400&h=400&fit=crop&crop=face` }
  ],
  members: [
    { id: startId + 5, name: `${departmentName}_MBR_01`, position: "Member", department: departmentName, img: `https://images.unsplash.com/photo-${1472099645785 + startId + 5}?w=400&h=400&fit=crop&crop=face` },
    { id: startId + 6, name: `${departmentName}_MBR_02`, position: "Member", department: departmentName, img: `https://images.unsplash.com/photo-${1472099645785 + startId + 6}?w=400&h=400&fit=crop&crop=face` },
    { id: startId + 7, name: `${departmentName}_MBR_03`, position: "Member", department: departmentName, img: `https://images.unsplash.com/photo-${1472099645785 + startId + 7}?w=400&h=400&fit=crop&crop=face` },
    { id: startId + 8, name: `${departmentName}_MBR_04`, position: "Member", department: departmentName, img: `https://images.unsplash.com/photo-${1472099645785 + startId + 8}?w=400&h=400&fit=crop&crop=face` }
  ]
});

// DEPARTMENTS
const departments = {
  developers: createDepartment(100, "DEVELOPERS"),
  events: createDepartment(200, "EVENTS"),
  marketingPR: createDepartment(300, "MARKETING_PR"),
  socialMedia: createDepartment(400, "SOCIAL_MEDIA"),
  stillsMotion: createDepartment(500, "STILLS_MOTION")
};

// Profile data - 19 profiles total
const profiles = [
  ...coreMembers.president,
  ...coreMembers.vicePresidents,
  ...coreMembers.secretary,
  ...Object.values(departments).flatMap(dept => [
    ...dept.director,
    ...dept.assistantDirectors,
    ...dept.managers,
    ...dept.members
  ])
];

// Get color class based on position
const getPositionColorClass = (position) => {
  switch (position) {
    case "President":
      return "position-president";
    case "Vice President":
      return "position-vicepresident";
    case "Secretary":
      return "position-secretary";
    case "Director":
      return "position-director";
    case "Assistant Director":
      return "position-assistant";
    case "Manager":
      return "position-manager";
    case "Member":
      return "position-member";
    default:
      return "position-default";
  }
};

function Team() {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("card-visible");
            entry.target.classList.remove("card-hidden");
          } else {
            // Only hide when scrolling up past navbar
            if (entry.boundingClientRect.top < 0) {
              entry.target.classList.add("card-hidden");
              entry.target.classList.remove("card-visible");
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-80px 0px 0px 0px" // Account for navbar height
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  // Render profile card
  const renderProfileCard = (profile) => {
    const glitchName = useGlitchText(profile.name);
    
    return (
      <div
        key={profile.id}
        ref={(el) => {
          if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
          }
        }}
        className={`profile-card-container ${getPositionColorClass(profile.position)} card-visible`}
      >
        <div className="profile-card">
          <div className="profile-image-container">
            <img 
              src={profile.img} 
              alt={profile.name} 
              className="profile-img" 
            />
            <div className="profile-image-overlay"></div>
          </div>
          
          <div className="profile-content">
            <h3 className="profile-name">{glitchName}</h3>
            <p className="profile-team">{getRandomTeamName(profile.id)}</p>
            <span className="profile-position">{profile.position.toUpperCase()}</span>
          </div>
          
          {/* Decorative corner elements */}
          <div className="card-corner card-corner-tl"></div>
          <div className="card-corner card-corner-tr"></div>
          <div className="card-corner card-corner-bl"></div>
          <div className="card-corner card-corner-br"></div>
        </div>
        
        {/* Glitch effect overlay */}
        <div className="glitch-overlay"></div>
      </div>
    );
  };

  // Render department section with card layout
  const renderDepartment = (deptKey, deptData, displayName) => {
    const colorConfig = departmentColors[deptKey];
    
    return (
      <div key={deptKey} className={`department-card ${colorConfig.class}`}>
        <h2 className="department-card-title">
          <TypingTitle text={displayName} colorClass={colorConfig.class} />
        </h2>
        
        <div className="department-sections">
          {/* Section 1: Directors & Assistant Directors */}
          <div className="department-subsection leadership-section">
            <h3 className="subsection-header">LEADERSHIP</h3>
            <div className="profiles-grid">
              {deptData.director.map(renderProfileCard)}
              {deptData.assistantDirectors.map(renderProfileCard)}
            </div>
          </div>
          
          {/* Section 2: Managers & Members */}
          <div className="department-subsection team-section">
            <h3 className="subsection-header">TEAM</h3>
            <div className="profiles-grid">
              {deptData.managers.map(renderProfileCard)}
              {deptData.members.map(renderProfileCard)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="team-page-wrapper">
      <div className="main-container">
        {/* Group Photo */}
        <div className="group-photo-section">
          <img src={GROUP_PHOTO} alt="Team Group Photo" className="group-photo" />
          <div className="group-photo-overlay"></div>
          <h1 className="group-photo-title">CYNET 2025 TEAM</h1>
        </div>

        {/* Core Members Section */}
        <div className="core-members-section">
          <div className="core-box">
            <h2 className="core-box-title">CORE</h2>
            <div className="core-members-grid">
              {coreMembers.president.map(renderProfileCard)}
              {coreMembers.vicePresidents.map(renderProfileCard)}
              {coreMembers.secretary.map(renderProfileCard)}
            </div>
          </div>
        </div>

        {/* Departments Section */}
        <div className="departments-section">
          <h2 className="section-title-main">DEPARTMENTS</h2>
          
          {renderDepartment("developers", departments.developers, "DEVELOPERS")}
          {renderDepartment("events", departments.events, "EVENTS")}
          {renderDepartment("marketingPR", departments.marketingPR, "MARKETING & PR")}
          {renderDepartment("socialMedia", departments.socialMedia, "SOCIAL MEDIA")}
          {renderDepartment("stillsMotion", departments.stillsMotion, "STILLS & MOTION")}
        </div>
      </div>
    </div>
  );
}

export default Team;