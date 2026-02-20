'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Jersey from '../atoms/texts/Jersey';
import Image from '../atoms/Image'; 

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50); // Estado para controlar el volumen

  const togglePlay = () => setIsPlaying(!isPlaying);

  // Clases compartidas para los botones (Ahora más grandes: w-12 h-10)
  const controlButtonClass = "w-11 h-9 md:w-12 md:h-10 bg-white border-[2px] border-black flex items-center justify-center shadow-[2px_2px_0px_#000] cursor-pointer active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all text-black";

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-[280px] mx-auto">
      
      {/* 1. DISCO GIRATORIO (Estilo CD Y2K) */}
      <motion.div
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="w-32 h-32 rounded-full border-[3px] border-black overflow-hidden relative bg-gradient-to-tr from-pink-300 via-[#80c8f0] to-purple-300 shadow-[4px_4px_0px_rgba(0,0,0,0.2)] flex items-center justify-center"
      >
        {/* Placeholder del CD (Aquí luego puedes poner la imagen real con el componente <Image />) */}
        <span className="text-5xl opacity-80">💿</span>

        {/* Agujero central del CD */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#BEE5FD] border-[3px] border-black rounded-full z-10 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.4)]"></div>
      </motion.div>

      {/* 2. TÍTULO DE LA CANCIÓN */}
      <div className="text-center mt-2 mb-1">
        <Jersey tag="h3" text="ASAP" size="20|24" className="text-black font-bold tracking-widest" />
      </div>

      {/* 3. CONTROLES */}
      <div className="flex gap-2">
        <button className={controlButtonClass}>
          <span className="text-sm md:text-base">⏮</span>
        </button>
        <button className={controlButtonClass}>
          <span className="text-sm md:text-base">◀</span>
        </button>
        
        {/* Botón central de Play/Pause */}
        <button className={controlButtonClass} onClick={togglePlay}>
          <span className="text-sm md:text-base">{isPlaying ? '⏸' : '▶'}</span>
        </button>
        
        <button className={controlButtonClass}>
          <span className="text-sm md:text-base">▶</span>
        </button>
        <button className={controlButtonClass}>
          <span className="text-sm md:text-base">⏭</span>
        </button>
      </div>

      {/* 4. BARRA DE VOLUMEN NEO-BRUTALISTA */}
      <div className="flex items-center gap-3 w-full mt-2 px-4">
        <span className="text-sm">🔈</span>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full h-3 bg-white border-[2px] border-black appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-6 
                     [&::-webkit-slider-thumb]:bg-v2k-pink-hot [&::-webkit-slider-thumb]:border-[2px] [&::-webkit-slider-thumb]:border-black"
        />
        <span className="text-sm">🔊</span>
      </div>

    </div>
  );
}