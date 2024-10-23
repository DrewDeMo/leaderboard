import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',
  server: {
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /^\/admin.*/, to: '/index.html' },
        { from: /./, to: '/index.html' }
      ]
    }
  },
  preview: {
    port: 5000
  }
})
