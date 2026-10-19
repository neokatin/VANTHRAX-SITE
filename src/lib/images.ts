/**
 * Registry of the photographic assets the site is designed around.
 *
 * Final photography is produced separately. Each entry documents where the
 * file belongs; the build detects which files exist (see vite.config.ts) and
 * components fall back to original illustrations for anything missing, so the
 * site never ships a broken image. Full specifications: docs/IMAGE-ASSETS.md.
 */

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export const IMAGES = {
  heroBackground: {
    src: '/images/hero/vanthrax-hero-background.webp',
    width: 2560,
    height: 1440,
    alt: '',
  },
  vscChip: {
    src: '/images/products/vanthrax-vsc-security-chip.webp',
    width: 1600,
    height: 1200,
    alt: 'VANTHRAX Security Chip (VSC) product render',
  },
  evscDevice: {
    src: '/images/products/vanthrax-evsc-external-module.webp',
    width: 1600,
    height: 1200,
    alt: 'External VANTHRAX Security Chip (EVSC) device render',
  },
  dataCenter: {
    src: '/images/infrastructure/vanthrax-data-center.webp',
    width: 2400,
    height: 1029,
    alt: 'VANTHRAX secure operations facility',
  },
  ceoPortrait: {
    src: '/images/leadership/vexy-razor-portrait.webp',
    width: 1200,
    height: 1500,
    alt: 'Portrait of Vexy Razor, Founder and Chief Executive Officer of VANTHRAX Systems',
  },
} as const satisfies Record<string, ImageAsset>;

const available = new Set(__AVAILABLE_IMAGES__);

/** Returns the asset when its file has been supplied, otherwise null. */
export function imageIfAvailable(asset: ImageAsset): ImageAsset | null {
  return available.has(asset.src) ? asset : null;
}
