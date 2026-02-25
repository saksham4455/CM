/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          blue: '#00f3ff',
          purple: '#b829ff',
          green: '#00ff41',
          red: '#ff0055',
          dark: '#0a0a0f',
          darker: '#05050a'
        },
        cyberpunk: {
          darkSpace: '#0B0F1A',
          deepCharcoal: '#111827',
          electricAqua: '#00F5FF',
          neonPurple: '#6C63FF',
          electricPink: '#FF00E5',
          softSilver: '#B3B3B3'
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
        display: ['Orbitron', 'sans-serif']
      },
      animation: {
        'scan': 'scan 3s ease-in-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'hologram': 'hologram 3s ease-in-out infinite',
        'neon-pulse': 'neonPulse 1.5s ease-in-out infinite alternate'
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '100%': { boxShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.5), 0 0 40px rgba(0, 245, 255, 0.3)'
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(0, 245, 255, 0.8), 0 0 60px rgba(0, 245, 255, 0.5), 0 0 90px rgba(0, 245, 255, 0.3)'
          }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        hologram: {
          '0%, 100%': { opacity: '0.8', transform: 'translateZ(0)' },
          '50%': { opacity: '1', transform: 'translateZ(10px)' }
        },
        neonPulse: {
          '0%': { 
            textShadow: '0 0 10px currentColor, 0 0 20px currentColor'
          },
          '100%': { 
            textShadow: '0 0 20px currentColor, 0 0 30px currentColor, 0 0 40px currentColor'
          }
        }
      }
    },
  },
  plugins: [],
}
