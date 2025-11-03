import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    host: '0.0.0.0', // 👈 Makes Vite accessible through your Vagrant port forwarding
    port: 5173       // 👈 Optional: ensures consistent port
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined // optional: avoid code splitting
      }
    }
  }
});

