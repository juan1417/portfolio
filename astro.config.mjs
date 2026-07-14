// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio-kc171616s-juan1417s-projects.vercel.app',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()]
});