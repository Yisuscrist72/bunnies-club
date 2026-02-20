import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google"; // Fuente para lectura clara
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/src/components/organisms/Footer";
import Navbar from "@/src/components/organisms/Navbar";

// Fuente Jersey: Estética retro/pixel para títulos
const jersey10 = localFont({
  src: "../../public/fonts/Jersey10-Regular.ttf",
  variable: "--font-jersey",
});

// Fuente Space Grotesk: Estética tech-moderna para UI y contenido
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Bunnies Club | NewJeans Fan Experience",
  description: "A retro Y2K inspired community platform for Bunnies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${jersey10.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased flex flex-col min-h-screen bg-transparent">
        <Navbar />
        {/* El div 'grow' empuja el footer al final de la página */}
        <main className="grow flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
