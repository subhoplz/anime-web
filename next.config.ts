/** @type {import('next').NextConfig} */

// Import necessary types
import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';
import type { NextJsWebpackConfigContext } from 'next/dist/server/config-shared';
// Assuming webpack-bundle-analyzer is installed as a dev dependency
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const nextConfig: NextConfig = {
  typescript: {
    // Consider removing ignoreBuildErrors if you want TypeScript to enforce types during build
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
  // Add type annotations to the webpack function signature
  webpack: (config: WebpackConfig, context: NextJsWebpackConfigContext): WebpackConfig => {
    // Destructure context inside the function
    const { buildId, dev, isServer, webpack } = context; // defaultLoaders might also be needed if used

    if (process.env.ANALYZE === 'true') {
      // Ensure plugins array exists
      config.plugins = config.plugins || [];
      // Use the imported BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 9999,
        openAnalyzer: true,
      }));
    }
    return config;
  },
};

// Use export default for ESM
export default nextConfig;
