/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'maps.googleapis.com',
      'maps.gstatic.com',
      'lh3.googleusercontent.com',
      'v0.blob.com'  // v0.blob.comを追加
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // ビルド時に環境変数をチェック
  webpack: (config, { isServer }) => {
    if (isServer) {
      if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        console.warn('\x1b[33m%s\x1b[0m', 'Warning: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable is not set');
      }
    }
    return config;
  },
};

export default nextConfig;

