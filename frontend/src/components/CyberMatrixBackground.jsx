import React, { useRef, useEffect, useState } from 'react';

const CyberMatrixBackground = ({ theme = 'blue' }) => {
  const gridRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  const themeColors = {
    blue: { main: '#00f3ff', hsl: '188, 100%' },
    purple: { main: '#b829ff', hsl: '277, 100%' },
    green: { main: '#00ff41', hsl: '140, 100%' },
    red: { main: '#ff0055', hsl: '340, 100%' }
  };

  const currentTheme = themeColors[theme];

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !gridRef.current) return;

    const grid = gridRef.current;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/?;:"[]{}\\|!@#$%^&*()_+-=アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    let columns = 0;
    let rows = 0;

    const createTile = (index) => {
      const tile = document.createElement('div');
      tile.classList.add('cyber-tile');

      tile.onclick = e => {
        const target = e.target;
        target.textContent = chars[Math.floor(Math.random() * chars.length)];
      };

      return tile;
    };

    const createTiles = (quantity) => {
      Array.from(Array(quantity)).map((_, index) => {
        grid.appendChild(createTile(index));
      });
    };

    const createGrid = () => {
      grid.innerHTML = '';

      const size = 40;
      columns = Math.floor(window.innerWidth / size);
      rows = Math.floor(window.innerHeight / size);

      grid.style.setProperty('--columns', columns);
      grid.style.setProperty('--rows', rows);

      createTiles(columns * rows);

      // Set initial characters
      for (const tile of grid.children) {
        tile.textContent = chars[Math.floor(Math.random() * chars.length)];
      }
    };

    const handleMouseMove = e => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const radius = window.innerWidth / 4;

      for (const tile of grid.children) {
        const rect = tile.getBoundingClientRect();
        const tileX = rect.left + rect.width / 2;
        const tileY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(mouseX - tileX, 2) + Math.pow(mouseY - tileY, 2)
        );

        const intensity = Math.max(0, 1 - distance / radius);

        tile.style.setProperty('--intensity', intensity);
      }
    };

    window.addEventListener('resize', createGrid);
    window.addEventListener('mousemove', handleMouseMove);

    createGrid();

    return () => {
      window.removeEventListener('resize', createGrid);
      window.removeEventListener('mousemove', handleMouseMove);
    };

  }, [isClient]);

  return (
    <>
      <div
        ref={gridRef}
        id="cyber-tiles"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      />

      <style>{`
        #cyber-tiles {
          --intensity: 0;
          display: grid;
          grid-template-columns: repeat(var(--columns), 1fr);
          grid-template-rows: repeat(var(--rows), 1fr);
        }
        .cyber-tile {
          position: relative;
          cursor: default;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Courier New', Courier, monospace;
          font-size: 1rem;
          user-select: none;
          pointer-events: auto;
          
          /* Use CSS variable for dynamic styling */
          opacity: calc(0.15 + var(--intensity) * 0.85);
          color: hsl(${currentTheme.hsl}, calc(70% + var(--intensity) * 30%));
          text-shadow: 
            0 0 calc(var(--intensity) * 20px) ${currentTheme.main},
            0 0 calc(var(--intensity) * 45px) ${currentTheme.main},
            0 0 calc(var(--intensity) * 65px) ${currentTheme.main};
          transform: scale(calc(1 + var(--intensity) * 0.6));
          transition: color 0.15s ease, text-shadow 0.15s ease, transform 0.15s ease, opacity 0.15s ease;
        }
      `}</style>
    </>
  );
};

export default CyberMatrixBackground;
