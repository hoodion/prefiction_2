import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Keep this import for the resolve alias

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Keep your alias for component imports
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
  // Remove: root: path.resolve(__dirname),
  // Remove: build: { ... }
})
