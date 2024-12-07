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
    // Asegurar que las variables de entorno estén disponibles
    envPrefix: ['BANCO_CENTRAL_'],
    ssr: {
      noExternal: ['node-fetch']
    }
  }
});