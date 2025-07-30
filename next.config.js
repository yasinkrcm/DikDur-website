/** @type {import('next').NextConfig} */
const nextConfig = {
  // WASM dosyalarını statik olarak serve et
  async headers() {
    return [
      {
        source: '/models/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },

  // Webpack konfigürasyonu
  webpack: (config, { isServer }) => {
    // WASM dosyalarını handle et
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // WASM dosyalarını optimize et
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });

    return config;
  },

  // Gzip sıkıştırma
  compress: true,

  // Görüntü optimizasyonu
  images: {
    domains: [],
    unoptimized: true,
  },

  // Output optimizasyonu
  output: 'standalone',

  // Experimental özellikleri kaldır (build hatası nedeniyle)
  // experimental: {
  //   optimizeCss: true,
  //   optimizePackageImports: ['onnxruntime-web'],
  // },
};

module.exports = nextConfig; 