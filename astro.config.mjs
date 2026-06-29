// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
const isGhPages = process.env.DEPLOY_TARGET === 'github-pages';

export default defineConfig({
  site: isGhPages ? 'https://guillaume-etienne.github.io' : 'https://www.bilenekite.com',
  base: isGhPages ? '/web-BKC-Astro-2026' : '/',
  integrations: [sitemap()],
});
