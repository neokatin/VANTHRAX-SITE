import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const IMAGE_DIR = join(import.meta.dirname, 'public', 'images');
const IMAGE_EXT = /\.(avif|webp|jpe?g|png)$/i;

/**
 * Lists every image currently present in /public/images so components can
 * render a supplied photograph when it exists and fall back to an original
 * illustration when it does not. This keeps the site free of broken image
 * links while final photography is still being produced.
 */
function scanImages(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return scanImages(full);
    if (!IMAGE_EXT.test(name)) return [];
    return ['/images/' + relative(IMAGE_DIR, full).split(sep).join('/')];
  });
}

export default defineConfig({
  plugins: [react()],
  define: {
    __AVAILABLE_IMAGES__: JSON.stringify(scanImages(IMAGE_DIR)),
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    modulePreload: { polyfill: false },
    assetsInlineLimit: 0,
    sourcemap: false,
  },
});
