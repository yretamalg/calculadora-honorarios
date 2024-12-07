// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: netlify({
    edgeMiddleware: true
  }),
  vite: {
    // Configuración para desarrollo local
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
        }
      }
    }
  }
});