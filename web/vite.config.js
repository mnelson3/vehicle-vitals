import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // allow imports like 'shared/...'
      shared: path.resolve(__dirname, '../shared'),
      // ensure firebase imports from shared files resolve to web's node_modules
      firebase: path.resolve(__dirname, 'node_modules/firebase'),
    },
  },
  server: {
    fs: {
      // allow serving files from one level up
      allow: ['..'],
    },
  },
})
