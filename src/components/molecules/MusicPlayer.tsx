"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import SpaceText from "../atoms/texts/SpaceText";
import { useAudio } from "../../context/AudioContext";

const HoloDisc = ({ size, hole }: { size: string; hole: string }) => (
    <div className={`${size} relative rounded-full border-[3px] border-black overflow-hidden shadow-lg bg-zinc-900`}>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#ff00cc,#3399ff,#00ffcc,#9900ff,#ff00cc)] opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent mix-blend-overlay" />
        <div className={`${hole} absolute inset-0 m-auto rounded-full bg-gradient-to-b from-gray-100 to-gray-300 border-2 border-black flex items-center justify-center`}>
            <div className="w-1/2 h-1/2 bg-[#0f0f0f] border border-black rounded-full" />
        </div>
    </div>
);

export default function MusicPlayer() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { isPlaying, currentTrack, volume, currentTime, duration, togglePlay, playNext, playPrev, changeVolume, seek } = useAudio();

    // Evita errores de hidratación al esperar a que el componente cargue en el cliente
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
    const showPlayer = isOpen || isDesktop;

    const formatTime = (t: number) => `${Math.floor(t / 60)}:${Math.floor(t % 60).toString().padStart(2, "0")}`;
    const adjustVol = (n: number) => changeVolume(Math.min(100, Math.max(0, volume + n)));

    return (
        <>
            {/* DISCO FLOTANTE MOBILE */}
            <div className="lg:hidden fixed bottom-20 right-5 z-[100]">
                {!isOpen && (
                    <motion.button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        whileTap={{ scale: 0.8 }}
                    >
                        <motion.div
                            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                            transition={isPlaying ? { duration: 4, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
                        >
                            <HoloDisc size="w-14 h-14" hole="w-4 h-4" />
                        </motion.div>
                    </motion.button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {showPlayer && (
                    <motion.div
                        key="player"
                        initial={{ opacity: 0, scale: 0.7, y: 100, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 100, transition: { duration: 0.3 } }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 1 }}
                        className={`
                            bg-gradient-to-br from-pink-500/90 to-purple-600/90
                            backdrop-blur-sm border-[4px] border-black p-4 shadow-[8px_8px_0px_#000] 
                            w-full max-w-[260px] flex flex-col gap-4 z-[110] rounded-[45px] mx-auto
                            ${isOpen ? "fixed bottom-24 right-4" : "relative"} lg:relative
                        `}
                    >
                        {/* PANTALLA LCD */}
                        <div className="bg-[#0a0a0a] rounded-[28px] p-3 border-[3px] border-black shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)] flex flex-col gap-2.5">
                            <div className="flex justify-between items-center px-1">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse shadow-[0_0_8px_#ec4899]" />
                                    <SpaceText text="BUNNIES_CORE_SYS" size="12|12" className="text-pink-400 font-bold tracking-[0.1em]" />
                                </div>
                                <button type="button" onClick={() => setIsOpen(false)} className="lg:hidden text-white font-black px-1 text-xs">✕</button>
                            </div>

                            <div className="flex flex-col items-center gap-3">
                                <motion.div animate={isPlaying ? { rotate: 360 } : { rotate: 0 }} transition={isPlaying ? { duration: 3, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}>
                                    <HoloDisc size="w-20 h-20" hole="w-7 h-7" />
                                </motion.div>
                                <div className="w-full text-center overflow-hidden px-1">
                                    <SpaceText text={currentTrack?.title || "OFFLINE"} size="14|14" className="text-white font-bold uppercase italic leading-none truncate" />
                                    <SpaceText text="HI-FI_AUDIO" size="12|12" className="text-pink-300/40 uppercase mt-1.5 tracking-tight" />
                                </div>
                            </div>

                            {/* BARRA DE PROGRESO */}
                            <div className="relative h-3.5 bg-white/5 rounded-full border border-white/10 overflow-hidden mt-1">
                                <div className="absolute top-0 left-0 h-full bg-pink-500 shadow-[0_0_12px_#ec4899]" style={{ width: `${(currentTime / duration) * 100}%` }} />
                                <input type="range" min="0" max={duration || 0} value={currentTime} onChange={(e) => seek(Number(e.target.value))} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                <div className="absolute inset-0 flex justify-between items-center px-3 pointer-events-none">
                                    <SpaceText text={formatTime(currentTime)} size="12|12" className="text-white font-bold" />
                                    <SpaceText text={formatTime(duration)} size="12|12" className="text-white font-bold" />
                                </div>
                            </div>
                        </div>

                        {/* CONTROLES */}
                        <div className="flex flex-col gap-4 px-1">
                            <div className="flex justify-between items-center gap-3">
                                <button type="button" onClick={playPrev} className="flex-1 h-10 rounded-2xl bg-white border-2 border-black text-black shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center">
                                    <SpaceText text="⏮" size="12|12" />
                                </button>
                                <button type="button" onClick={togglePlay} className="w-14 h-14 bg-white border-[4px] border-black rounded-full shadow-[4px_4px_0px_#000] flex items-center justify-center text-black active:scale-90 transition-all">
                                    <SpaceText text={isPlaying ? "⏸" : "▶"} size="16|16" />
                                </button>
                                <button type="button" onClick={playNext} className="flex-1 h-10 rounded-2xl bg-white border-2 border-black text-black shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center">
                                    <SpaceText text="⏭" size="12|12" />
                                </button>
                            </div>

                            {/* VOLUMEN */}
                            <div className="flex items-center justify-between gap-2 bg-black/20 rounded-2xl p-2 border border-black/30">
                                <button type="button" onClick={() => adjustVol(-10)} className="w-8 h-8 rounded-xl bg-white border-2 border-black text-black font-bold shadow-[1px_1px_0px_rgba(0,0,0,0.2)] active:scale-95 flex items-center justify-center">
                                    <SpaceText text="-" size="12|12" />
                                </button>
                                <div className="flex-1 flex flex-col items-center">
                                    <SpaceText text={`VOL: ${volume}%`} size="12|12" className="text-white/70 mb-1 tracking-tighter" />
                                    <div className="flex gap-[2px]">
                                        {[20, 40, 60, 80, 100].map((v) => (
                                            <div key={`v-${v}`} className={`w-2.5 h-1.5 rounded-sm ${volume >= v ? "bg-white" : "bg-white/10"}`} />
                                        ))}
                                    </div>
                                </div>
                                <button type="button" onClick={() => adjustVol(10)} className="w-8 h-8 rounded-xl bg-white border-2 border-black text-black font-bold shadow-[1px_1px_0px_rgba(0,0,0,0.2)] active:scale-95 flex items-center justify-center">
                                    <SpaceText text="+" size="12|12" />
                                </button>
                            </div>
                        </div>
					</motion.div>
                )}
            </AnimatePresence>
        </>
    );
}