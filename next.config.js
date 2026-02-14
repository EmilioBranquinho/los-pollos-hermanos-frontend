/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "https://api-los-pollos-hermanos.onrender.com"
      }
    ],
  },
};

module.exports = nextConfig;
