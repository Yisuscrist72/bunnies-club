"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Jersey from "../atoms/texts/Jersey";
import SpaceText from "../atoms/texts/SpaceText";
import { IconSpotify, IconAppleMusic, IconYouTube } from "../atoms/icons/SocialIcons";
import Image from "../atoms/Image";

export interface Album {
  id: number;
  title: string;
  type: string;
  cover: string;
  tracks: string[];
  links: {
    spotify: string;
    apple: string;
    youtube: string;
  };
  color?: string; // Color de fondo de la tarjeta
  headerColor?: string; // Color de la barra de título
}

export default function MusicCard({ album }: { album: Album }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => setIsFlipped(!isFlipped);

  const cardBg = album.color || "bg-[#E5E7EB]";
  const headerBg = album.headerColor || "bg-v2k-accent";

  return (
    <div className="group h-[220px] sm:h-[240px] w-full max-w-[400px] mx-auto [perspective:1000px]">
      <motion.div
        className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d]"
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          scale: isFlipped ? [1, 0.96, 1] : [1, 0.96, 1]
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 h-full w-full [backface-visibility:hidden]">
          <div className={`h-full w-full ${cardBg} border-[2px] border-black shadow-v2k-sm overflow-hidden flex flex-col rounded-[12px] scanlines`}>
            {/* Window Header */}
            <div className={`${headerBg} border-b-[2px] border-black px-3 py-1 flex justify-between items-center h-7 md:h-8`}>
              <div className="flex items-center gap-1.5 overflow-hidden">
                 <Jersey
                  tag="span"
                  text={`(0${album.id}.BMP)`}
                  size="16|20"
                  className="text-black font-bold uppercase truncate"
                />
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                <div className="w-5 h-4 bg-white/40 border-[2.5px] border-black flex items-center justify-center text-[10px] font-black leading-none">-</div>
                <div className="w-5 h-4 bg-v2k-pink-light border-[2.5px] border-black flex items-center justify-center text-[10px] items-center cursor-pointer hover:bg-v2k-pink-hot transition-colors">✕</div>
              </div>
            </div>

            {/* Content: Horizontal */}
            <div className="flex-1 flex overflow-hidden bg-white/40">
               {/* Left: Album Cover */}
               <div className="w-[120px] sm:w-[160px] p-2 sm:p-3 flex-shrink-0">
                  <div className="relative w-full aspect-square border-[2px] border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] bg-white group-hover:rotate-1 transition-transform overflow-hidden">
                    <Image
                      src={album.cover}
                      alt={album.title}
                      fill={true}
                      className="object-cover"
                    />
                  </div>
               </div>

               {/* Right: Album Info */}
               <div className="flex-1 p-3 sm:p-4 flex flex-col justify-center gap-1.5 sm:gap-2">
                  <div>
                    <Jersey
                      tag="h3"
                      text={album.title}
                      size="20|24"
                      className="text-black uppercase leading-tight font-black tracking-tight sm:!text-[1.5rem]"
                    />
                    <SpaceText
                      text={album.type}
                      size="12|12"
                      className="text-black/60 font-black tracking-[0.2em] sm:tracking-[0.25em] uppercase mt-0.5"
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); toggleFlip(); }}
                    className="mt-1 sm:mt-2 bg-white/80 border-[2px] border-black px-3 sm:px-4 py-1 sm:py-1.5 shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] hover:bg-v2k-accent hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[5px_5px_0px_#000] transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-[10px] sm:text-[12px] font-black w-fit flex items-center gap-2 uppercase cursor-pointer relative overflow-hidden group/btn"
                  >
                    <span className="relative z-10">VER TRACKLIST</span>
                    <span className="text-xs sm:text-sm group-hover/btn:rotate-180 transition-transform duration-500">↺</span>
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="absolute inset-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className={`h-full w-full ${cardBg} border-[2px] border-black shadow-v2k-sm overflow-hidden flex flex-col rounded-[12px]`}>
             {/* Window Header */}
             <div className={`${headerBg} border-b-[2px] border-black px-4 py-1.5 flex justify-between items-center h-8 opacity-80 backdrop-blur-sm shrink-0`}>
              <button 
                type="button"
                onClick={toggleFlip}
                className="flex items-center gap-2 hover:underline cursor-pointer group/back"
              >
                 <span className="font-black text-lg leading-none group-hover/back:-translate-x-1 transition-transform">←</span>
                 <Jersey tag="span" text="VOLVER" size="18|22" className="text-black font-bold uppercase transition-all" />
              </button>
              <button 
                type="button"
                className="w-5 h-5 bg-v2k-pink-light border-[2px] border-black flex items-center justify-center text-[10px] font-black cursor-pointer hover:bg-v2k-pink-hot transition-colors" 
                onClick={toggleFlip}
              >
                ✕
              </button>
            </div>

            {/* Content: Back side */}
            <div className="flex-1 flex overflow-hidden relative bg-white/30">
               {/* Left: CD */}
               <div className="w-[110px] sm:w-[150px] p-2 flex-shrink-0 flex items-center justify-center bg-linear-to-br from-white/20 to-black/5">
                  <div className="relative w-20 h-20 sm:w-28 h-28 md:w-32 md:h-32">
                    <div className="absolute inset-0 rounded-full border-[2px] sm:border-[3px] border-black overflow-hidden shadow-2xl bg-white animate-[spin_10s_linear_infinite] group-hover:animate-[spin_4s_linear_infinite] transition-all">
                        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#FFB7CE,#B2EBF2,#D1C4E9,#B2F2BB,#FFB7CE)] opacity-90 mix-blend-color-dodge" />
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.4)_0%,transparent_50%,rgba(0,0,0,0.1)_100%)]" />
                        <Image src={album.cover} alt="disc" fill={true} className="object-cover opacity-60 mix-blend-overlay" />
                        {/* CD Hole */}
                        <div className="absolute inset-0 m-auto w-6 h-6 sm:w-8 h-8 rounded-full bg-white border-[2px] sm:border-[3px] border-black shadow-inner" />
                    </div>
                  </div>
               </div>

               {/* Right: Full Tracks & Playback */}
               <div className="flex-1 p-3 sm:p-4 bg-white/60 border-l-[2px] border-black border-dashed flex flex-col justify-between overflow-y-auto no-scrollbar">
                  <div className="space-y-1 sm:space-y-1.5 h-full overflow-y-auto no-scrollbar">
                    {album.tracks.slice(0, 8).map((track, idx) => (
                      <div key={`${album.id}-${track}`} className="flex gap-1.5 sm:gap-2 items-center hover:translate-x-1 transition-transform cursor-default">
                        <span className="font-jersey font-bold text-v2k-pink-hot italic text-[10px] sm:text-xs w-3 sm:w-4">{idx + 1}.</span>
                        <SpaceText text={track} size="12|12" className="text-black font-black uppercase truncate text-[10px] sm:text-[12px]" />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-1.5 pt-2 border-t-[1.5px] border-black/10 shrink-0">
                    <span className="text-[9px] font-black text-black/40 uppercase tracking-widest">Listen on:</span>
                    <div className="flex gap-4">
                       <a href={album.links.spotify} target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-all text-[#1DB954] hover:drop-shadow-[0_0_8px_#1DB954]">
                          <IconSpotify className="w-5 h-5 sm:w-6 sm:h-6" />
                       </a>
                       <a href={album.links.apple} target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-all text-[#FA243C] hover:drop-shadow-[0_0_8px_#FA243C]">
                          <IconAppleMusic className="w-5 h-5 sm:w-6 sm:h-6" />
                       </a>
                       <a href={album.links.youtube} target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-all text-[#FF0000] hover:drop-shadow-[0_0_8px_#FF0000]">
                          <IconYouTube className="w-5 h-5 sm:w-6 sm:h-6" />
                       </a>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
