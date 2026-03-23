import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import Jersey from "../atoms/texts/Jersey";
import SpaceText from "../atoms/texts/SpaceText";
import {
  IconSpotify,
  IconAppleMusic,
  IconYouTube,
} from "../atoms/icons/SocialIcons";
import Image from "../atoms/Image";

export interface Album {
  id: number;
  title: string;
  type: string;
  cover: string;
  tracks: string[];
  durations?: string[];
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
  const [isAnimating, setIsAnimating] = useState(false);

  // Valores de movimiento para el efecto de inclinación (Tilt)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Suavizado de la transición (Spring)
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Transformación de coordenadas a grados de rotación
  const rotateX = useTransform(mouseYSpring, (val) => {
     return (val as number) * -7;
  });
  
  const tiltRotateY = useTransform(mouseXSpring, (val) => {
     return (val as number) * 14;
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const toggleFlip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    x.set(0);
    y.set(0);
    setIsFlipped(!isFlipped);
  };

  const cardBg = album.color || "bg-[#E5E7EB]";
  const headerBg = album.headerColor || "bg-v2k-accent";

  // Efecto de Brillo (Shine) Intenso
  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["-30%", "130%"]);
  const shineY = useTransform(mouseYSpring, [-0.5, 0.5], ["-30%", "130%"]);
  const shineOpacity = useTransform([mouseXSpring, mouseYSpring], ([mx, my]) => {
    const dist = Math.sqrt((mx as number)**2 + (my as number)**2);
    return 0.2 + dist * 0.5;
  });

  return (
    <div 
      className="group h-[220px] sm:h-[240px] w-full max-w-[400px] mx-auto perspective-[1000px] cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="presentation"
    >
      <motion.div
        className="relative h-full w-full transform-3d will-change-transform"
        animate={{ 
          rotateY: isFlipped ? 180 : 0 
        }}
        onAnimationComplete={() => setIsAnimating(false)}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* CARA FRONTAL - Con Tilt */}
        <motion.div
          style={{ 
            rotateX: isFlipped ? 0 : rotateX, 
            rotateY: isFlipped ? 0 : tiltRotateY,
            z: !isFlipped ? 10 : 0 // Empujón sutil hacia adelante
          }}
          className={`absolute inset-0 backface-hidden flex flex-col ${cardBg} border-2 border-black shadow-v2k-sm rounded-xl overflow-hidden scanlines transition-opacity duration-300 ${!isFlipped ? "z-50 pointer-events-auto opacity-100" : "z-0 pointer-events-none opacity-0"}`}
        >
          {/* Capa de Brillo Holográfico */}
          <motion.div 
             style={{ 
               opacity: shineOpacity,
               left: shineX,
               top: shineY,
               background: "radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(165,243,252,0.3) 30%, rgba(253,192,236,0.3) 60%, transparent 85%)"
             }}
             className="absolute w-[140%] h-[140%] pointer-events-none z-30 blur-2xl"
          />

          <div className={`${headerBg} border-b-2 border-black px-3 h-8 flex justify-between items-center shrink-0 relative z-40`}>
            <Jersey tag="span" text={`(0${album.id}.BMP)`} className="text-black font-bold truncate text-sm" />
            <div className="flex gap-1.5 items-center">
              <div className="w-5 h-4 bg-white/40 border-2.5 border-black flex items-center justify-center text-[10px]">-</div>
              <div className="w-5 h-4 bg-v2k-pink-light border-2.5 border-black flex items-center justify-center text-[10px] select-none text-black">✕</div>
            </div>
          </div>

          <div className="flex-1 flex bg-white/40 overflow-hidden relative z-10">
            <div className="p-3 shrink-0">
              <div className="relative aspect-square w-32 border-2 border-black shadow-v2k-xs bg-white transition-transform overflow-hidden">
                <Image src={album.cover} alt={album.title} fill className="object-cover" />
              </div>
            </div>
            <div className="flex-1 p-3 flex flex-col justify-center gap-2">
              <div className="space-y-0.5">
                <Jersey tag="h3" text={album.title} size="24|28" className="text-black uppercase leading-tight font-black sm:text-[1.5rem]!" />
                <SpaceText text={album.type} className="text-black/60 font-black tracking-widest text-[10px] uppercase" />
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); toggleFlip(); }}
                className="group/btn relative w-fit mt-1 sm:mt-2 cursor-pointer z-50"
              >
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-sm transition-transform group-hover/btn:translate-x-1.5 group-hover/btn:translate-y-1.5" />
                <div className="relative bg-white border-2 border-black px-4 py-1.5 flex items-center gap-2 transition-transform group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-black">VER TRACKLIST</span>
                  <span className="text-xs sm:text-sm text-v2k-pink-hot group-hover/btn:rotate-180 transition-transform duration-500 font-bold">↺</span>
                </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* CARA TRASERA - Plana y Estática */}
        <div
          style={{ 
            transform: `rotateY(180deg) translateZ(${isFlipped ? "10px" : "0px"})` 
          }}
          className={`absolute inset-0 backface-hidden flex flex-col ${cardBg} border-2 border-black shadow-v2k-sm rounded-xl overflow-hidden transition-opacity duration-300 ${isFlipped ? "z-50 pointer-events-auto opacity-100" : "z-0 pointer-events-none opacity-0"}`}
        >
          <div className={`${headerBg} border-b-2 border-black px-3 h-8 flex justify-between items-center shrink-0 relative z-40`}>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleFlip(); }}
              className="px-2 py-0.5 bg-white/40 hover:bg-white border border-transparent hover:border-black rounded text-black font-black text-xs cursor-pointer transition-all active:scale-95 flex items-center gap-1 group/back"
            >
              <span className="group-hover/back:-translate-x-0.5 transition-transform">←</span>
              VOLVER
            </button>
            <div className="w-5 h-5 bg-v2k-pink-light border-2.5 border-black flex items-center justify-center text-[10px] font-black select-none text-black">✕</div>
          </div>

          <div className="flex-1 flex bg-white/30 overflow-hidden relative z-10">
            <div className="w-32 shrink-0 flex items-center justify-center p-2 bg-black/5">
              <div className="relative w-full aspect-square rounded-full border-2 border-black overflow-hidden bg-black animate-[spin_10s_linear_infinite]">
                <Image src={album.cover} alt="disc" fill className="object-cover" />
                <div className="absolute inset-0 bg-[repeating-radial-gradient(circle,rgba(0,0,0,0.1)_0,rgba(0,0,0,0.1)_1px,transparent_1px,transparent_2px)] opacity-30" />
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.4)_0%,transparent_50%,rgba(0,0,0,0.1)_100%)]" />
                <div className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-white border-2 border-black shadow-inner" />
              </div>
            </div>
            <div className="flex-1 p-3 bg-white/60 border-l-2 border-black border-dashed flex flex-col justify-between overflow-hidden">
              <div className="space-y-1 overflow-y-auto no-scrollbar">
                {album.tracks.slice(0, 7).map((track, i) => (
                  <div key={`${album.id}-${i}`} className="flex gap-2 items-center text-[13px] font-black uppercase group/track">
                    <span className="text-v2k-pink-hot shrink-0">{i + 1}.</span>
                    <span className="flex-1 truncate group-hover/track:translate-x-1 transition-transform text-black">{track}</span>
                    {album.durations?.[i] && <span className="text-[10px] text-black/40 font-bold shrink-0">{album.durations[i]}</span>}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-2 border-t border-black/10 shrink-0">
                <a href={album.links.spotify} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all text-[#1DB954]"><IconSpotify className="w-5 h-5" /></a>
                <a href={album.links.apple} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all text-[#FA243C]"><IconAppleMusic className="w-5 h-5" /></a>
                <a href={album.links.youtube} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-all text-[#FF0000]"><IconYouTube className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
