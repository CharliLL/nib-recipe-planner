/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com",
      },
    ],
  },
};

module.exports = nextConfig;
