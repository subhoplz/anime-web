/** @type {import('next').NextConfig} */

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's4.anilist.co',
        port: '',
        pathname: '/file/anilistcdn/media/anime/cover/medium/**',
      },
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(new webpack.webpack.BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 9999,
        openAnalyzer: true,
      }));
    }
    return config;
  },
};

module.exports = nextConfig;