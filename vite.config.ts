import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/inicio/',        // caminho do repo no Pages
  plugins: [react()],
})
