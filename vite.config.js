import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Relative base works for user site root and future custom domain
  build: {
    outDir: 'docs' // Build directly to docs/ for GitHub Pages (user site)
  }
})



//我以后加域名的话，加这句。base: '/your-repo-name/'