import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react({
      include: ['**/*.tsx', '**/*.ts'],
    }),
    Sitemap(),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
