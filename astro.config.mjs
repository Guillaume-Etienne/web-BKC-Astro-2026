// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
const isProd = process.env.DEPLOY_TARGET === 'production';
const isGhPages = process.env.DEPLOY_TARGET === 'github-pages';

export default defineConfig({
  site: isProd ? 'https://www.bilenekite.com' : 'https://guillaume-etienne.github.io',
  base: isGhPages ? '/web-BKC-Astro-2026' : '/',
  integrations: [sitemap()],
});
