import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
    extensions: ['._id.jsx', '.jsx', '.js']
  }
})
