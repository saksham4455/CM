import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = ({ theme = 'blue' }) => {
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  const themeColors = {
    blue: { primary: '#00f3ff', secondary: '#0099ff' },
    purple: { primary: '#b829ff', secondary: '#8b19cc' },
    green: { primary: '#00ff41', secondary: '#00cc34' },
    red: { primary: '#ff0055', secondary: '#cc0044' }
  };

  const colors = themeColors[theme] || themeColors.blue;

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hover over interactive elements
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    // Smooth cursor follow animation
    let animationFrameId;
    const animateCursor = () => {
      const lerp = (start, end, factor) => start + (end - start) * factor;
      
      // Smooth follow with different speeds for inner and outer
      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.15);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.15);

      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`;
      }

      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Glow Only - Inner Dot with enhanced glow */}
      <div
        ref={cursorInnerRef}
        className="custom-cursor-inner"
        style={{
          position: 'fixed',
          top: '-8px',
          left: '-8px',
          width: isHovering ? '20px' : (isClicking ? '12px' : '16px'),
          height: isHovering ? '20px' : (isClicking ? '12px' : '16px'),
          borderRadius: '50%',
          background: colors.primary,
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'width 0.2s ease, height 0.2s ease',
          boxShadow: `0 0 15px ${colors.primary}, 0 0 30px ${colors.primary}, 0 0 45px ${colors.primary}`,
          willChange: 'transform, width, height'
        }}
      />
    </>
  );
};

export default CustomCursor;
