import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sirve las imágenes locales sin recomprimir demasiado
    formats: ["image/avif", "image/webp"],
    // Asegura que el breakpoint de 672px (ancho del quiz) esté disponible
    deviceSizes: [320, 480, 640, 672, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
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
