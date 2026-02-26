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
    ],
  },
};

export default nextConfig;
