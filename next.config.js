import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: false, // Changed to false
  },
  eslint: {
    ignoreDuringBuilds: false, // Changed to false
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
        // Add image sizes for optimization
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Add device sizes for responsiveness
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        // Enable AVIF support if needed
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60,
    },
  // Enable webpack analyzer to identify large bundles
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
    if (process.env.ANALYZE === 'true') {
      config.plugins.push(new webpack.webpack.BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: isServer ? 8888 : 9999,
        openAnalyzer: true,
      }));
    }
    config.module.rules.push({
      test: /worker\.js$/,
      use: {
        loader: 'worker-loader',
        options: {
          name: 'worker.[hash].js',
          publicPath: '/_next/',
        },
      },
    });

    return config;
  },
};

export default nextConfig;
