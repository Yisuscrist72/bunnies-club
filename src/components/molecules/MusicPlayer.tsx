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

  // Niveles para el visualizador
  const volLevels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  // Función para ajustar volumen con botones (más fácil en mobile)
  const adjustVolume = (amount: number) => {
    const newVol = Math.min(100, Math.max(0, volume + amount));
    changeVolume(newVol);
  };

  return (
    <>
      {/* DISCO FLOTANTE (MOBILE) */}
      <div className="lg:hidden fixed bottom-20 right-5 z-[100]">
        {!isOpen && (
          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative w-12 h-12 flex items-center justify-center active:scale-90 transition-transform"
          >
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-full h-full rounded-full border-2 border-black bg-[conic-gradient(from_0deg,#ff80b5,#80c8f0,#b580ff,#ff80b5)] shadow-[3px_3px_8px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden"
            >
              <span className="text-xl z-10">💿</span>
              <div className="absolute w-3 h-3 bg-[#BEE5FD] border-2 border-black rounded-full z-20" />
            </motion.div>
          </motion.button>
        )}
      </div>

      {/* VENTANA DEL REPRODUCTOR */}
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
            {/* BARRA DE TÍTULO */}
            <div className="bg-black text-white px-2 py-1 flex justify-between items-center -mx-1 -mt-1 mb-1">
              <span className="text-[10px] font-bold tracking-tighter uppercase ml-1">Bunnies_Player.sys</span>
              <button 
                type="button"
                onClick={() => setIsOpen(false)} 
                className="lg:hidden min-w-[32px] min-h-[32px] flex items-center justify-center border-2 border-white bg-v2k-pink-hot text-white font-bold"
              >
                ✕
              </button>
            </div>

            {/* AREA CENTRAL (DISCO E INFO) */}
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-black bg-[conic-gradient(from_0deg,#ff80b5,#80c8f0,#b580ff,#ff80b5)] flex items-center justify-center relative overflow-hidden shrink-0"
              >
                <span className="text-2xl lg:text-3xl z-10">💿</span>
                <div className="absolute w-4 h-4 lg:w-6 lg:h-6 bg-[#BEE5FD] border-2 border-black rounded-full z-20" />
              </motion.div>
              <div className="flex-1 overflow-hidden">
                <Jersey tag="h3" text={currentTrack?.title || "NO_DISK"} size="18|22" className="text-black truncate font-black italic uppercase leading-tight" />
                <p className="text-[10px] font-mono font-bold text-black/60 uppercase tracking-tighter">NewJeans Radio</p>
              </div>
            </div>

            {/* BARRA DE PROGRESO */}
            <div className="relative h-7 bg-white border-2 border-black overflow-hidden shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)]">
              <div 
                className="absolute top-0 left-0 h-full bg-v2k-pink-hot border-r-2 border-black transition-all"
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

            {/* CONTROLES DE REPRODUCCIÓN */}
            <div className="flex justify-between items-center bg-black/5 p-1 border border-black/10">
              <button type="button" onClick={playPrev} className="w-10 h-10 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">⏮</button>
              <button type="button" onClick={togglePlay} className="w-12 h-10 bg-black border-2 border-black shadow-[2px_2px_0px_#ff80b5] flex items-center justify-center text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
                {isPlaying ? "■" : "▶"}
              </button>
              <button type="button" onClick={playNext} className="w-10 h-10 bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">⏭</button>
            </div>

            {/* CONTROL DE VOLUMEN OPTIMIZADO PARA DEDO */}
            <div className="bg-black/5 p-2 border border-black/10 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-tighter">Volume: {volume}%</span>
                <div className="flex gap-[1px]">
                  {volLevels.map((level) => (
                    <div 
                      key={`v-bar-${level}`} 
                      className={`w-1.5 h-3 border-[1px] border-black transition-colors ${volume >= level ? 'bg-v2k-pink-hot' : 'bg-white'}`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => adjustVolume(-10)}
                  className="flex-1 h-10 bg-white border-2 border-black shadow-[2px_2px_0px_#000] font-bold text-lg active:shadow-none active:translate-y-0.5 transition-all"
                >
                  -
                </button>
                <button 
                  type="button" 
                  onClick={() => adjustVolume(10)}
                  className="flex-1 h-10 bg-white border-2 border-black shadow-[2px_2px_0px_#000] font-bold text-lg active:shadow-none active:translate-y-0.5 transition-all"
                >
                  +
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}