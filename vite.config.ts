import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@react-pdf/renderer']
  },
  build: {
    commonjsOptions: {
      include: [/@react-pdf\/renderer/],
      transformMixedEsModules: true
    },
    rollupOptions: {
      external: ['react/jsx-runtime'],
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'pdf-vendor': ['@react-pdf/renderer']
        }
      }
    }
  }
});