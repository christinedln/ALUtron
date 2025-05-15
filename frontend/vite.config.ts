import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    proxy: {
      // Proxy all calls to Flask backend:
      '/calculate': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
      // Add other backend routes here if you want
    },
  },
})

