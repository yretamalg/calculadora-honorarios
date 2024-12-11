import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'server',
  adapter: netlify({
    edgeMiddleware: true
  }),
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@/components': path.resolve(__dirname, 'src/components'),
        '@/shared': path.resolve(__dirname, 'src/shared'),
        '@/layouts': path.resolve(__dirname, 'src/layouts'),
        '@/core': path.resolve(__dirname, 'src/core'),
        '@/config': path.resolve(__dirname, 'src/config'),
        '@/utils': path.resolve(__dirname, 'src/utils')
      }
    }
  }
});