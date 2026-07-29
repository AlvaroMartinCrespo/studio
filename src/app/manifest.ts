import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Álvaro Martín Crespo - Desarrollador Frontend',
    short_name: 'DevÁlvaro',
    description:
      'Portfolio, proyectos y blog de Álvaro Martín Crespo, desarrollador frontend en Sevilla.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#7c00ff',
    lang: 'es-ES',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
