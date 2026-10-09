import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages serves the site from /<repo>/, so CI passes BASE_PATH.
  base: process.env.BASE_PATH || '/',
  plugins: [react(), tailwindcss()],
})
