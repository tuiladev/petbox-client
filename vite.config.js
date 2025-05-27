import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
    extensions: ['.jsx', '.js']
  }
})
