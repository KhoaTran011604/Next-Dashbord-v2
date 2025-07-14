/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

module.exports = {
  env: {
    NEXT_LOCAL_API_URL: 'http://localhost:5000/api',
    NEXT_PUBLIC_API_URL: 'https://server-todoapp-3.onrender.com/api',
    TEST_PUBLIC_API: 'https://quanlyvumua-server.onrender.com/api',
  },
};
