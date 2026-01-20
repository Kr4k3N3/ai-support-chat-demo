import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Frontend calls /api/chat -> proxied to backend
      '/api': 'http://localhost:8787',
      '/health': 'http://localhost:8787'
    }
  }
});
