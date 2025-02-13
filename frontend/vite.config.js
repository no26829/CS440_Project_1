import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration
export default defineConfig({
  // Enable React support
  plugins: [react()],
  
  // Set up path aliases
  resolve: {
    alias: {
      '@': '/src'  // Allows imports from '@/components' etc.
    }
  }
})