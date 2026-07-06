// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
const isGhPages = process.env.DEPLOY_TARGET === 'github-pages';

export default defineConfig({
  site: isGhPages ? 'https://guillaume-etienne.github.io' : 'https://www.bilenekite.com',
  base: isGhPages ? '/web-BKC-Astro-2026' : '/',
  // Convention unique sur tout le site : URLs AVEC slash final (forme servie
  // par Apache). Canonicals, hreflang, sitemap et liens internes suivent.
  trailingSlash: 'always',
  integrations: [
    sitemap({
      // On exclut du sitemap les pages noindex, pour ne lister que des URL
      // réellement indexables (sinon Google s'en plaint dans la Search Console) :
      //   - /secret (page cachée, noindex/nofollow)
      //   - les 3 stubs de redirection FAQ (noindex + meta-refresh vers la prépa)
      filter: (page) =>
        !page.includes('/secret/') &&
        !page.includes('/la-faq-pour-bilene-au-mozambique/') &&
        !page.includes('/faq-bilene-mozambique/'),
    }),
  ],
});
