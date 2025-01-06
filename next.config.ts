import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.telegram.org',
        port: '',
        pathname: '/file/bot6467847581:AAH6c0YZgmpMXC91CP4VHpG_djDYzc-JnJc/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/w500/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
