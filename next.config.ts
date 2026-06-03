import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "barkleanchile.cl",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
