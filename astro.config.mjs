import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [
    react(),
    tailwind(),
  ],
  build: {
    // Asegura que las rutas estén correctamente manejadas
    format: 'file'
  },
  // Configura las rutas base
  base: '/',
  trailingSlash: 'never'
});