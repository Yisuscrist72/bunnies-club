import type { Metadata } from "next";
import localFont from "next/font/local"; // Importante para fuentes .ttf
import "./globals.css";

// 1. Configuramos la fuente Jersey 10
const jersey10 = localFont({
  src: "../../public/fonts/Jersey10-Regular.ttf",
  variable: "--font-jersey",
});

export const metadata: Metadata = {
  title: "Bunnies Club",
  description: "Retro Y2K Community Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={jersey10.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}