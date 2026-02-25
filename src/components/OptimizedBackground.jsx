import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const OptimizedBackground = ({ theme = 'blue', intensity = 'low' }) => {
  const canvasRef = useRef(null);

  const themeColors = {
    blue: new THREE.Color(0x00f3ff),
    purple: new THREE.Color(0xb829ff),
    green: new THREE.Color(0x00ff41),
    red: new THREE.Color(0xff0055)
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: false, // Disable for performance
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Limit pixel ratio

    // Create fewer particles based on intensity
    const particleCount = intensity === 'low' ? 30 : intensity === 'medium' ? 50 : 80;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.005
      });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: themeColors[theme],
      size: 0.8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // Simplified connections - only draw some
    const lineMaterial = new THREE.LineBasicMaterial({
      color: themeColors[theme],
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });

    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    let frameCount = 0;
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      frameCount++;

      const posArray = particles.attributes.position.array;

      // Update particles
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        if (Math.abs(posArray[i * 3]) > 40) velocities[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 40) velocities[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 20) velocities[i].z *= -1;
      }

      particles.attributes.position.needsUpdate = true;

      // Update connections only every 3 frames for performance
      if (frameCount % 3 === 0) {
        lineGroup.clear();
        const maxConnections = intensity === 'low' ? 15 : 25;
        let connectionCount = 0;

        for (let i = 0; i < particleCount && connectionCount < maxConnections; i++) {
          for (let j = i + 1; j < particleCount && connectionCount < maxConnections; j++) {
            const dx = posArray[i * 3] - posArray[j * 3];
            const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
            const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < 12) {
              const lineGeometry = new THREE.BufferGeometry();
              const linePositions = new Float32Array([
                posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
                posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
              ]);
              lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
              const line = new THREE.Line(lineGeometry, lineMaterial);
              lineGroup.add(line);
              connectionCount++;
            }
          }
        }
      }

      particleSystem.rotation.y += 0.0003;
      particleSystem.rotation.x += 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particles.dispose();
      particleMaterial.dispose();
      lineMaterial.dispose();
    };
  }, [theme, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-30"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default OptimizedBackground;
