import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

export default defineConfig({
    site: 'https://www.vbox.pro',
    integrations: [
        react(),
        tailwind(),
        sitemap({
            changefreq: 'weekly',
            priority: 0.7,
            lastmod: new Date(),
            i18n: {
                defaultLocale: 'es',
                locales: {
                    es: 'es-CL'
                }
            }
        }),
        compress({
            css: true,
            html: true,
            js: true,
            img: false,
            svg: false
        })
    ],
    vite: {
        build: {
            sourcemap: true
        },
        optimizeDeps: {
            exclude: ['@formatjs/intl-localematcher', '@formatjs/intl']
        }
    }
});