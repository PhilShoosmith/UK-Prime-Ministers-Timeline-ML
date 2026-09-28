import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.GEMINI_API_KEY': JSON.stringify(process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || 'AIzaSyDGxo8qmOmG9KhfYqbxDkpOBKloUTdhHeE'),
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(
          process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || 'AIzaSyDGxo8qmOmG9KhfYqbxDkpOBKloUTdhHeE'
        )
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
              firebase: ['firebase/app', 'firebase/firestore', 'firebase/auth'],
              icons: ['lucide-react']
            }
          }
        }
      }
    };
});
