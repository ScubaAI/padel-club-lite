/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 1. Configuración de Imágenes (Ultra-optimización móvil según Design System)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/**',
      },
      // Soporte para imágenes temporales de Unsplash durante el desarrollo del Hero
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;