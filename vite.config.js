import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/wuhoyu.github.io/' // ⚠️ 这里替换成你的仓库名
})
