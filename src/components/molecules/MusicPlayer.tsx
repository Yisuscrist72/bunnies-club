"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../../context/AudioContext"; 
import Jersey from "../atoms/texts/Jersey";

export default function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    isPlaying, currentTrack, volume, currentTime, duration, 
    togglePlay, playNext, playPrev, changeVolume, seek 
  } = useAudio();

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <>
      {/* BOTÓN FLOTANTE MOBILE - DISCO MÁS PEQUEÑO */}
      <div className="lg:hidden fixed bottom-20 right-5 z-[100]">
        {!isOpen && (
          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative w-12 h-12 flex items-center justify-center active:scale-90 transition-transform"
            aria-label="Abrir reproductor"
          >
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-full h-full rounded-full border-2 border-black bg-[conic-gradient(from_0deg,#ff80b5,#80c8f0,#b580ff,#ff80b5)] shadow-[3px_3px_8px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden"
            >
              <span className="text-xl z-10">💿</span>
              <div className="absolute w-3 h-3 bg-[#BEE5FD] border-2 border-black rounded-full z-20"></div>
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* REPRODUCTOR PRINCIPAL (VENTANA) */}
      <AnimatePresence mode="wait">
        {(isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024)) && (
          <motion.div
            key="player"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className={`
              bg-[#BEE5FD] border-[3px] border-black p-3 shadow-[6px_6px_0px_#000] 
              w-full max-w-[280px] flex flex-col gap-3 z-[110]
              ${isOpen ? 'fixed bottom-24 right-4' : 'relative'} 
              lg:relative lg:bottom-0 lg:right-0
            `}
          >
            {/* HEADER CON BOTÓN DE CIERRE TÁCTIL */}
            <div className="bg-black text-white px-2 py-1 flex justify-between items-center -mx-1 -mt-1 mb-1">
              <span className="text-[10px] font-bold tracking-tighter uppercase ml-1">Bunnies_Player.sys</span>
              <div className="flex gap-1 items-center">
                <button 
                  type="button"
                  onClick={() => setIsOpen(false)} 
                  className="lg:hidden min-w-[32px] min-h-[32px] flex items-center justify-center border-2 border-white bg-v2k-pink-hot text-white font-bold text-xs active:bg-white active:text-black transition-colors"
                >
                  ✕
                </button>
                <div className="hidden lg:block w-3 h-3 bg-v2k-pink-hot border border-white"></div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-black bg-[conic-gradient(from_0deg,#ff80b5,#80c8f0,#b580ff,#ff80b5)] flex items-center justify-center relative overflow-hidden"
                >
                  <span className="text-2xl lg:text-3xl z-10">💿</span>
                  <div className="absolute w-4 h-4 lg:w-6 lg:h-6 bg-[#BEE5FD] border-2 border-black rounded-full z-20"></div>
                </motion.div>
              </div>

              <div className="flex-1 overflow-hidden">
                <Jersey tag="h3" text={currentTrack?.title || "NO_DISK"} size="18|22" className="text-black truncate font-black italic uppercase leading-tight" />
                <p className="text-[10px] font-mono font-bold text-black/60">NWJNS_STREAM</p>
              </div>
            </div>

            {/* PROGRESS TRACKER */}
            <div className="relative h-6 bg-white border-2 border-black overflow-hidden shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)]">
              <div 
                className="absolute top-0 left-0 h-full bg-v2k-pink-hot border-r-2 border-black transition-all duration-300"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
              <input 
                type="range" min="0" max={duration || 0} value={currentTime} 
                onChange={(e) => seek(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none mix-blend-difference text-white font-mono text-[10px] font-bold">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* CONTROLES */}
            <div className="flex justify-between items-center bg-black/5 p-2 border border-black/10">
              <div className="flex gap-2">
                <button type="button" onClick={playPrev} className="w-9 h-9 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all">⏮</button>
                <button type="button" onClick={togglePlay} className="w-9 h-9 bg-black border-2 border-black shadow-[2px_2px_0px_#ff80b5] flex items-center justify-center text-white active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all">
                  {isPlaying ? "■" : "▶"}
                </button>
                <button type="button" onClick={playNext} className="w-9 h-9 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all">⏭</button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black tracking-tighter">VOL</span>
                <div className="w-12 h-2 bg-white border border-black relative">
                  <div className="h-full bg-black transition-all duration-200" style={{ width: `${volume}%` }} />
                  <input type="range" min="0" max="100" value={volume} onChange={(e) => changeVolume(Number(e.target.value))} className="absolute inset-0 opacity-0 cursor-pointer" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}