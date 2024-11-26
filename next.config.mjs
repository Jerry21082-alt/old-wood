/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middleware: {
      matcher: ["/dashboard/:path*", "/account", "/profile/:path*"], // Match specific routes
    },
  },
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
