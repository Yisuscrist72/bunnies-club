"use client"; // Necesario para usar usePathname y AudioProvider

import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { usePathname } from "next/navigation";
import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import { AudioProvider } from "@/context/AudioContext";
import MusicPlayer from "@/components/molecules/MusicPlayer";

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

  // Detectamos si estamos en la ruta del editor (ej: /photocard-editor/ID_DE_LA_FOTO)
  const isEditor = pathname?.includes("/photocard-editor/");

  return (
    <html
      lang="es"
      className={`
        ${jersey10.variable} ${spaceGrotesk.variable} 
        h-full bg-[#BEE5FD]
      `}
    >
      <body
        className="
        antialiased 
        flex flex-col 
        min-h-full 
        w-full 
        bg-gradient-to-b from-[#BEE5FD] via-[#FEE2FE] to-[#BEE5FD] 
        bg-fixed 
        bg-no-repeat 
        bg-cover
      "
      >
        <AudioProvider>
          {/* Si NO es el editor, mostramos el Navbar (el botón de MENU desaparece del editor) */}
          {!isEditor && <Navbar />}
          
          <main className="grow flex flex-col relative z-10">
            {children}
          </main>

          {/* Si NO es el editor, mostramos el Footer */}
          {!isEditor && <Footer />}

          {/* REPRODUCTOR MP3: 
              Añadimos la condición !isEditor para que el reproductor 
              DESAPAREZCA cuando estás editando la foto
          */}
          {!isEditor && (
            <div className="fixed bottom-4 left-4 z-[9999]">
              <MusicPlayer />
            </div>
          )}
        </AudioProvider>
      </body>
    </html>
  );
}