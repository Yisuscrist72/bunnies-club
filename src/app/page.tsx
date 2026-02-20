'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Jersey from '../components/atoms/texts/Jersey';
import Image from '../components/atoms/Image';
import Window from '../components/atoms/Window';
import MusicPlayer from '../components/molecules/MusicPlayer';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    /* CAMBIO AQUÍ: bg-gradient-to-b con colores personalizados */
    <main className="flex-grow bg-gradient-to-b from-[#C9E9F6] via-[#F4D8ED] to-[#F9F1C3] p-4 md:p-8 overflow-x-hidden relative min-h-screen flex flex-col items-center">
      
      <div className="w-full max-w-[1200px] flex flex-col gap-10 relative z-10 mt-4">
        
        {/* --- 1. SECCIÓN HERO --- */}
        <section className="relative w-full h-[300px] md:h-[450px] border-[4px] border-black shadow-[6px_6px_0px_#000] overflow-hidden rounded-xl bg-white flex items-center justify-center">
          <Image
            src="/images/Image-Home.avif"
            alt="NewJeans Home"
            wrapperClassName="w-full h-full absolute inset-0 z-0"
            className="object-cover object-center w-full h-full opacity-90"
            pixelated={false}
          />

          {/* TÍTULO CENTRAL NEW JEANS */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4">
            <h1 className="font-jersey text-[4rem] md:text-[6rem] lg:text-[8rem] leading-none text-white drop-shadow-[4px_4px_0px_#000] md:drop-shadow-[6px_6px_0px_#000] tracking-tighter text-center">
              NEW JEANS
            </h1>
          </div>

          {/* POPUP */}
          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="absolute z-20"
              >
                <Window title="( NEWJEANS_MATCH.EX )" onClose={() => setShowPopup(false)} className="w-[320px] text-center shadow-[8px_8px_0px_rgba(0,0,0,0.8)]">
                  <div className="py-6 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: "#BEE5FD" }}
                      whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px #000" }}
                      className="bg-[#CDE8FF] border-[3px] border-black px-8 py-3 rounded-full shadow-[4px_4px_0px_#000] transition-colors"
                    >
                      <Jersey tag="span" text="EMPEZAR TEST" size="20|24" className="text-black font-bold" />
                    </motion.button>
                  </div>
                </Window>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* --- 2. SECCIÓN INFERIOR --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end mt-4">
          
          {/* COLUMNA 1: PHOTOCARD DECORATOR */}
          <div className="flex flex-col gap-2 items-center w-full">
            <Jersey tag="h2" text="PHOTOCARD DECORATOR" size="20|24" className="text-black font-bold drop-shadow-[1px_1px_0px_#FFF]" />
            <Link href="/decorator" className="w-full group">
              <div className="w-full bg-gradient-to-br from-[#C9E9F6] to-[#F4D8ED] border-[3px] border-black p-3 shadow-[6px_6px_0px_#000] group-hover:shadow-[4px_4px_0px_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all cursor-pointer">
                <div className="bg-white border-[2px] border-black h-48 flex">
                  <div className="w-1/2 border-r-[2px] border-black flex items-center justify-center bg-gray-100 relative">
                      <span className="text-4xl opacity-20">👤</span>
                  </div>
                  <div className="w-1/2 bg-[#f9f9f9] p-2 flex flex-col">
                    <div className="text-[10px] font-bold border-b border-black mb-1 pb-1">Stickers</div>
                    <div className="grid grid-cols-3 gap-1 flex-grow items-center justify-items-center text-xl">
                      <span className="cursor-default">🐰</span>
                      <span className="cursor-default">💖</span>
                      <span className="cursor-default">✨</span>
                      <span className="cursor-default">⭐</span>
                      <span className="cursor-default">🎀</span>
                      <span className="cursor-default">🎵</span>
                    </div>
                    <div className="w-full text-xs font-bold border-[2px] border-black bg-[#CDE8FF] py-1 shadow-[2px_2px_0px_#000] text-center mt-auto">
                      IR AL EDITOR ➡️
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* COLUMNA 2: MUSIC PLAYER */}
          <div className="flex justify-center pb-4">
             <MusicPlayer />
          </div>

          {/* COLUMNA 3: FREEBIES ZONE */}
          <div className="flex flex-col gap-2 items-center w-full">
            <Jersey tag="h2" text="FREEBIES ZONE" size="20|24" className="text-black font-bold drop-shadow-[1px_1px_0px_#FFF]" />
            <Window title="C:\Freebies" className="w-full">
              <div className="flex justify-between px-4 py-6">
                {['Wallpapers', 'Icons', 'Schedules'].map((item) => (
                  <div key={item} className="flex flex-col items-center gap-2 cursor-pointer group">
                    <span className="text-5xl drop-shadow-[2px_2px_0px_#000] group-hover:scale-110 transition-transform">
                      📁
                    </span>
                    <Jersey tag="span" text={item} size="18|22" className="text-black font-bold" />
                  </div>
                ))}
              </div>
              <div className="px-4 pb-4">
                <button className="w-full border-[2px] border-black bg-white py-2 shadow-[3px_3px_0px_#000] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100">
                  DOWNLOAD ALL ⬇️
                </button>
              </div>
            </Window>
          </div>

        </section>
      </div>
    </main>
  );
}