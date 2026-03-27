import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/foundations.html",
      },
    ];
  },
};

export default nextConfig;
