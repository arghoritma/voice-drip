import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Argonext',
    short_name: 'Argonext',
    description: 'ArgoNext is a modern template for fullstack web application development using Next.js, React, and SQLite. The template is flexible and supports changing the database driver to MySQL, PostgreSQL, and others.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/maskable_icon_x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/maskable_icon_x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}