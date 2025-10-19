import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/vuework/', // matches your GitHub Pages repo
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // manualChunks must be a function in your Vite version
        manualChunks(id) {
          if (
            id.includes('node_modules/vue') ||
            id.includes('node_modules/vue-router') ||
            id.includes('node_modules/pinia')
          ) {
            return 'vendor'
          }
          if (id.includes('node_modules/axios')) {
            return 'utils'
          }
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom'
  }
})
