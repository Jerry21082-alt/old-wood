/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {}, // No middleware configuration here
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
