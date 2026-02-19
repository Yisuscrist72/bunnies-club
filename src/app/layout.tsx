import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/src/components/organisms/Navbar";
import Footer from "@/src/components/organisms/Footer";

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
      {/* El flex flex-col min-h-screen asegura que el footer siempre quede abajo */}
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar />
        
        {/* Aquí en medio es donde se inyectará el SectionLayout y tus páginas */}
        <div className="flex-grow">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}