// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://aditirm.github.io',
  trailingSlash: 'ignore',
  vite: {
    server: {
      // The project lives on the Windows drive and runs inside WSL, where file-change
      // events don't cross over. Polling lets the dev server notice edits from either side.
      watch: { usePolling: true, interval: 400 },
    },
  },
});
