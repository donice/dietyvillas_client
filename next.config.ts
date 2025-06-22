import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.hospitable.com",
      },
      {
        protocol: "https",
        hostname: "storage-letscomanage-staging.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
