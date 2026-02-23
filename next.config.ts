import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Le decimos a Next.js que Cloudinary es un dominio seguro para las imágenes
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
