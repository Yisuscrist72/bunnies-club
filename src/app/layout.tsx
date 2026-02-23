"use client";

import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { usePathname } from "next/navigation";
import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import { AudioProvider } from "@/context/AudioContext";
import LoadingScreen from "@/components/molecules/LoadingScreen"; // <-- Asegúrate de tener bien la ruta

const jersey10 = localFont({
  src: "../../public/fonts/Jersey10-Regular.ttf",
  variable: "--font-jersey",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Detecta si es la página del editor
  const isEditor = pathname?.includes("/photocard-editor/");

  return (
    <html
      lang="es"
      className={`${jersey10.variable} ${spaceGrotesk.variable} h-full bg-[#BEE5FD]`}
    >
      <body className="antialiased flex flex-col min-h-full w-full bg-gradient-to-b from-[#BEE5FD] via-[#FEE2FE] to-[#BEE5FD] bg-fixed bg-no-repeat bg-cover">
        {/* Aquí ponemos la pantalla de carga, ella sola sabe cuándo mostrarse */}
        <LoadingScreen />

        <AudioProvider>
          {/* Solo mostramos Navbar y Footer si NO estamos editando */}
          {!isEditor && <Navbar />}

          <main className="grow flex flex-col relative z-10">{children}</main>

          {!isEditor && <Footer />}

          {/* El MusicPlayer ha sido eliminado visualmente de aquí */}
        </AudioProvider>
      </body>
    </html>
  );
}
