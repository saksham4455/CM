import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import "../css/pastevents.css";
import BoxText from "../components/BoxText";

// Reference images from public folder (Vite serves public/ at root)
const C24_1 = "/Cynet_Images/Cynet-2024-folder/C24-1.jpg";
const C24_2 = "/Cynet_Images/Cynet-2024-folder/C24-2.jpg";
const C24_3 = "/Cynet_Images/Cynet-2024-folder/C24-3.jpg";
const C24_4 = "/Cynet_Images/Cynet-2024-folder/C24-4.jpg";
const C24_5 = "/Cynet_Images/Cynet-2024-folder/C24-5.jpg";
const C24_6 = "/Cynet_Images/Cynet-2024-folder/C24-6.jpg";
const C24_7 = "/Cynet_Images/Cynet-2024-folder/C24-7.jpg";
const C24_8 = "/Cynet_Images/Cynet-2024-folder/C24-8.jpg";
const C24_9 = "/Cynet_Images/Cynet-2024-folder/C24-9.jpg";

const C25_1 = "/Cynet_Images/Cynet-2025/C25-1.jpg";
const C25_2 = "/Cynet_Images/Cynet-2025/C25-2.jpg";
const C25_3 = "/Cynet_Images/Cynet-2025/C25-3.jpg";
const C25_4 = "/Cynet_Images/Cynet-2025/C25-4.jpg";
const C25_5 = "/Cynet_Images/Cynet-2025/C25-5.jpg";
const C25_6 = "/Cynet_Images/Cynet-2025/C25-6.jpg";
const C25_7 = "/Cynet_Images/Cynet-2025/C25-7.jpg";
const C25_8 = "/Cynet_Images/Cynet-2025/C25-8.jpg";
const C25_9 = "/Cynet_Images/Cynet-2025/C25-9.jpg";
const C25_10 = "/Cynet_Images/Cynet-2025/C25-10.jpg";
const C25_11 = "/Cynet_Images/Cynet-2025/C25-11.jpg";
const C25_12 = "/Cynet_Images/Cynet-2025/C25-12.jpg";

// ─── Globe config ──────────────────────────────────────────────────────────────
const ROWS = 12;
const COLS = 32;
const THETA_TOTAL = 110;
const THETA_START_D = 55;
const THETA_PER_D = THETA_TOTAL / ROWS;
const DEG = (d) => (d * Math.PI) / 180;

const GAP_FACTOR_W = 0.85;
const GAP_FACTOR_H = 0.85;

const getGlobeParams = (width) => {
  const height = window.innerHeight;
  const isSmall = width < 768;

  // Calculate maximum radius that fills the vertical space
  const safeHeight = height - 150; // Account for header space
  const maxSafeRadius = safeHeight / (2 * Math.sin(DEG(THETA_TOTAL / 2)));

  // Maximize width to fill entire screen - scaled radius by another 40% (1.5 * 1.4 = 2.1)
  let targetRadius = width * 1.8;
  let r_css = Math.min(targetRadius, maxSafeRadius) * 2.1;
  let persp = r_css * 2.8;

  if (isSmall) {
    r_css = width * 2.5; // (1.8 * 1.4)
    persp = r_css * 2.5;
  }

  const rowElev = Array.from({ length: ROWS }, (_, r) => 90 - (THETA_START_D + THETA_PER_D * (r + 0.5)));
  const tileH = Math.round(2 * r_css * Math.tan(DEG(THETA_PER_D / 2)) * GAP_FACTOR_H);

  const rowWidths = rowElev.map((e) => {
    const circum = 2 * Math.PI * r_css * Math.cos(DEG(e));
    return Math.round((circum / COLS) * GAP_FACTOR_W);
  });

  return { r_css, persp, rowElev, tileH, rowWidths };
};

const IMAGES = [
  C24_1, C24_2, C24_3, C24_4, C24_5, C24_6, C24_7, C24_8, C24_9,
  C25_1, C25_2, C25_3, C25_4, C25_5, C25_6, C25_7, C25_8, C25_9, C25_10, C25_11, C25_12
];

// ─── CSSGlobe Component ────────────────────────────────────────────────────────
const CSSGlobe = ({ mouseX, mouseY }) => {
  const grpRef = useRef();
  const baseRotY = useRef(0);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth });
  const [hoveredImage, setHoveredImage] = useState(null);
  const [isGlobeHovered, setIsGlobeHovered] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { r_css, persp, rowElev, tileH, rowWidths } = useMemo(() => getGlobeParams(windowSize.width), [windowSize.width]);

  const tiles = useMemo(() => {
    const t = [];
    const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

    let pool = [];
    const refillPool = () => {
      pool = [...IMAGES].sort(() => Math.random() - 0.5);
    };

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const top = r > 0 ? grid[r - 1][c] : null;
        const left = c > 0 ? grid[r][c - 1] : null;

        if (pool.length === 0) refillPool();

        let foundIdx = pool.findIndex(img => img !== top && img !== left);
        if (foundIdx === -1) foundIdx = 0;

        const selectedImg = pool.splice(foundIdx, 1)[0];
        grid[r][c] = selectedImg;

        t.push({
          key: r * COLS + c,
          url: selectedImg,
          phi: (c / COLS) * 360,
          elev: rowElev[r],
          w: rowWidths[r],
        });
      }
    }
    return t;
  }, [rowElev, rowWidths]);

  const driftX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), { stiffness: 60, damping: 40 });
  const driftY = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 60, damping: 40 });

  useEffect(() => {
    let id;
    const tick = () => {
      // Pause rotation when hovering over globe
      if (!isGlobeHovered) {
        baseRotY.current += 0.2679;
      }
      if (grpRef.current) {
        grpRef.current.style.transform = `rotateX(${-6 + driftY.get()}deg) rotateY(${baseRotY.current + driftX.get()}deg)`;
      }
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [driftX, driftY, isGlobeHovered]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      onMouseEnter={() => setIsGlobeHovered(true)}
      onMouseLeave={() => setIsGlobeHovered(false)}
      style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        perspective: `${persp}px`, perspectiveOrigin: "50% 50%",
        pointerEvents: "none",
        touchAction: "none"
      }}>
      <div ref={grpRef} className="globe-group">
        {tiles.map(({ key, url, phi, elev, w }) => {
          const isC24_2 = url === C24_2;
          return (
            <div key={key} style={{
              position: "absolute", width: w, height: tileH,
              marginLeft: -w / 2, marginTop: -tileH / 2,
              transform: `rotateY(${phi}deg) rotateX(${-elev}deg) translateZ(${r_css}px)`,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}>
              <div
                className={`globe-tile gt${key}`}
                onMouseEnter={() => setHoveredImage(url)}
                onMouseLeave={() => setHoveredImage(null)}
                style={{
                  width: "100%", height: "100%",
                  backgroundImage: `url(${url})`,
                  backgroundSize: "cover",
                  backgroundPosition: isC24_2 ? "center 20%" : "center center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "#0d0d0d",
                  cursor: "pointer", pointerEvents: "auto", overflow: "hidden",
                  position: "relative",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Hover Popup */}
      <AnimatePresence>
        {hoveredImage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(10px)",
                zIndex: 9998,
                pointerEvents: "none",
              }}
            />

            {/* Centered Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                zIndex: 9999,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 30px 80px rgba(0, 243, 255, 0.5), 0 0 40px rgba(0, 243, 255, 0.3)",
                  border: "3px solid #00f3ff",
                  background: "#0a0a0a",
                }}
              >
                <img
                  src={hoveredImage}
                  alt="Preview"
                  style={{
                    display: "block",
                    maxWidth: "40vw",
                    maxHeight: "40vh",
                    width: "auto",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function PastEventsPage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handlePagePointer = (e) => {
    mouseX.set((e.clientX / window.innerWidth) - 0.5);
    mouseY.set((e.clientY / window.innerHeight) - 0.5);
  };

  const springMouseX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springMouseY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  return (
    <div onPointerMove={handlePagePointer} className="past-events-main">
      <header className="page-header">
        <div className="dot-matrix-heading">
          <BoxText text="CYNET GLIMPSES" size={6} gap={1.2} charGap={7} />
        </div>
      </header>

      <main className="globe-container-wrap">
        <CSSGlobe mouseX={springMouseX} mouseY={springMouseY} />
      </main>

      {/* ─── Removed: gallery-section, lightbox, selectedImage state ─────── */}
      {/* ─── Removed: Canvas, CyberGalaxy, and all particle effects ─────── */}
      {/* ─── Removed: All background effects and scrollers ─────── */}
    </div>
  );
}