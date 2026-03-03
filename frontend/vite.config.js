import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Plugin: watch public/ folder and force full reload on any file change
function publicReloadPlugin() {
  return {
    name: 'watch-public',
    configureServer(server) {
      const publicDir = path.resolve(__dirname, 'public')
      server.watcher.add(publicDir)
      const reload = (filePath) => {
        if (filePath.startsWith(publicDir)) {
          server.ws.send({ type: 'full-reload' })
        }
      }
      server.watcher.on('change', reload)
      server.watcher.on('add', reload)
      server.watcher.on('unlink', reload)
    }
  }
}

export default defineConfig({
  plugins: [react(), publicReloadPlugin()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    strictPort: true,
    hmr: {
      protocol: 'ws',
      port: 3000
    },
    watch: {
      usePolling: true,
      interval: 1000
    }
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion', 'gsap', 'lenis'],
          'three-vendor': ['three', '@react-three/fiber']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'three']
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
