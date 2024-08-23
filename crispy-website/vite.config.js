import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
 
  server: {
    port: 5173,
    open: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Your backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
