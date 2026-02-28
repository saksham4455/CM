import { useEffect, useState } from 'react';

/**
 * Performance Monitor Hook - Development Only
 * Monitors FPS, memory usage, and performance metrics
 */
export const usePerformanceMonitor = (enabled = process.env.NODE_ENV === 'development') => {
  const [metrics, setMetrics] = useState({
    fps: 0,
    memory: 0,
    paintTime: 0,
  });

  useEffect(() => {
    if (!enabled) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let rafId;

    const measurePerformance = () => {
      frameCount++;
      const currentTime = performance.now();

      // Update FPS every second
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        // Get memory info if available
        const memory = performance.memory
          ? Math.round(performance.memory.usedJSHeapSize / 1048576) // MB
          : 0;

        // Get paint timing
        const paintEntries = performance.getEntriesByType('paint');
        const paintTime = paintEntries.length > 0
          ? Math.round(paintEntries[paintEntries.length - 1].startTime)
          : 0;

        setMetrics({ fps, memory, paintTime });
        
        frameCount = 0;
        lastTime = currentTime;
      }

      rafId = requestAnimationFrame(measurePerformance);
    };

    rafId = requestAnimationFrame(measurePerformance);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  return metrics;
};

/**
 * Performance Monitor Component - Shows performance metrics in corner
 */
export const PerformanceMonitor = ({ enabled = process.env.NODE_ENV === 'development' }) => {
  const metrics = usePerformanceMonitor(enabled);

  if (!enabled) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#00f3ff',
        padding: '10px 15px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '12px',
        zIndex: 9999,
        border: '1px solid rgba(0, 243, 255, 0.3)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div>FPS: <span style={{ color: metrics.fps < 30 ? '#ff0055' : '#00ff41' }}>{metrics.fps}</span></div>
      {metrics.memory > 0 && (
        <div>Memory: <span style={{ color: metrics.memory > 100 ? '#ff0055' : '#00f3ff' }}>{metrics.memory}MB</span></div>
      )}
      {metrics.paintTime > 0 && (
        <div>Paint: {metrics.paintTime}ms</div>
      )}
    </div>
  );
};

export default PerformanceMonitor;
