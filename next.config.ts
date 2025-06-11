import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "plus.unsplash.com",
        protocol: "https",
        port: ""
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
        port: ""
      },
      {
        hostname: "4.img-dpreview.com",
        protocol: "https",
        port: ""
      },
      {
        hostname: "2.img-dpreview.com",
        protocol: "https",
        port: ""
      }
    ]
  }
};

export default nextConfig;
