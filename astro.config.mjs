// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// Keep in sync with `locales` in src/i18n/ui.ts.
const locales = ['en', 'my'];
const defaultLocale = 'en';

/** `astro dev` does not serve a public directory index. Netlify does, so /admin works there. */
function adminDirectoryIndex() {
  return {
    name: 'admin-directory-index',
    /**
     * @param {import('vite').ViteDevServer} server
     */
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const [path, query] = (req.url ?? '').split('?');
        if (path === '/admin' || path === '/admin/') {
          req.url = `/admin/index.html${query ? `?${query}` : ''}`;
        }
        next();
      });
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE_URL || 'https://example.com',
  i18n: {
    locales,
    defaultLocale,
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    react(),
    sitemap({
      i18n: {
        defaultLocale,
        locales: Object.fromEntries(locales.map((locale) => [locale, locale])),
      },
    }),
  ],
  vite: {
    plugins: [adminDirectoryIndex(), tailwindcss()],
  },
});
