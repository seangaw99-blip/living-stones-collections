import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Living Stones Collections',
    short_name: 'Living Stones',
    description:
      'Rare mineral specimens sourced from six origins worldwide. Curated for collectors who value what lasts.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F7F5F2',
    theme_color: '#3A3530',
    lang: 'en-PH',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
