import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    scrollRestoration: false, // disable App Router scroll restoration
  },
};

export default nextConfig;
