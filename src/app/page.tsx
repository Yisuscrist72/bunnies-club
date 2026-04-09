"use client";

import dynamic from "next/dynamic";
import HeroSection from "../components/organisms/HeroSection";

// El Dashboard se carga de forma dinámica para optimizar peso
const HomeDashboard = dynamic(
  () => import("../components/organisms/HomeDashboard"),
  {
    ssr: false,
  },
);

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="grow p-4 md:p-8 flex flex-col items-center relative">
      {/* --- FONDO ANIMADO Y DECORATIVO Y2K --- */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        {/* Grid de puntos suave */}
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-v2k-black)_1px,transparent_1px)] bg-size-[32px_32px] opacity-[0.04]" />
        
        {/* Orbes de luz coloridos */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-pink-300/30 blur-[100px] rounded-full mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-sky-300/30 blur-[120px] rounded-full mix-blend-multiply" />
        <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] max-w-[300px] max-h-[300px] bg-yellow-200/30 blur-[80px] rounded-full mix-blend-multiply" />

        {/* Emojis / Formas flotantes con animación */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 10, -5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-[15%] left-[8%] md:left-[15%] text-4xl md:text-5xl opacity-60 drop-shadow-md"
        >
          ⭐
        </motion.div>

        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, -10, 5, 0] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute bottom-[20%] right-[5%] md:right-[15%] text-5xl md:text-6xl opacity-70 drop-shadow-md"
        >
          🎀
        </motion.div>

        <motion.div 
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-[35%] right-[8%] md:right-[10%] text-3xl md:text-4xl opacity-50 drop-shadow-sm"
        >
          🎵
        </motion.div>

        <motion.div 
          animate={{ y: [0, -15, 0], x: [0, 15, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute bottom-[35%] left-[5%] md:left-[10%] text-4xl md:text-5xl opacity-40 drop-shadow-sm"
        >
          🐰
        </motion.div>
        
        {/* Adorno extra central */}
        <motion.div 
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.3, 0.5, 0.3] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
          className="hidden md:block absolute top-[55%] left-[45%] text-2xl drop-shadow-sm"
        >
          ✨
        </motion.div>
      </div>
      <div className="w-full max-w-[1200px] flex flex-col gap-10 relative mt-4 min-h-screen">
        <HeroSection />
        <HomeDashboard />
      </div>
    </main>
  );
}
