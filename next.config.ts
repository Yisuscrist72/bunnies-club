import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le decimos a Next.js que Cloudinary es un dominio seguro para las imágenes
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;
