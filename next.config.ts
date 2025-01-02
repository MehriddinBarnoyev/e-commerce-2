import type { NextConfig } from "next";

const domains = [
  "www.freetogame.com",
  "target.scene7.com",
  "encrypted-tbn0.gstatic.com",
  "wallpapers.com",
  "files.oaiusercontent.com",
];
const nextConfig: NextConfig = {
  images: {
    domains: [...domains],
    deviceSizes: [320, 420, 768, 1024, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
  /* config options here */
};

export default nextConfig;
