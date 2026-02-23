"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import SpaceText from "../atoms/texts/SpaceText";
import { useAudio } from "../../context/AudioContext";

const SpeakerGrille = ({ className }: { className?: string }) => (
    <div className={`grid grid-cols-4 gap-1 opacity-40 ${className}`}>
        {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-black rounded-full shadow-[inset_0.5px_0.5px_0px_rgba(255,255,255,0.2)]" />
        ))}
    </div>
);

const HoloDisc = ({ size, hole }: { size: string; hole: string }) => (
    <div className={`${size} relative rounded-full border-[3px] border-black overflow-hidden shadow-lg bg-white`}>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#FFB7CE,#B2EBF2,#D1C4E9,#B2F2BB,#FFB7CE)] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent mix-blend-overlay" />
        <div className={`${hole} absolute inset-0 m-auto rounded-full bg-white border-2 border-black flex items-center justify-center shadow-inner`}>
            <div className="w-1/2 h-1/2 bg-[#222] border border-black rounded-full" />
        </div>
    </div>
);

export default function MusicPlayer() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { isPlaying, currentTrack, volume, currentTime, duration, togglePlay, playNext, playPrev, changeVolume, seek } = useAudio();

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
            {/* DISCO FLOTANTE MÓVIL */}
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
                            <HoloDisc size="w-16 h-16" hole="w-5 h-5" />
                        </motion.div>
                    </motion.button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {showPlayer && (
                    <motion.div
                        key="player"
                        initial={{ opacity: 0, scale: 0.7, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 100 }}
                        className={`
                            bg-[#E0F7FA] border-[4px] border-black p-5 shadow-[10px_10px_0px_#000] 
                            w-full max-w-[280px] flex flex-col gap-4 z-[110] rounded-[45px] mx-auto
                            ${isOpen ? "fixed bottom-24 right-4" : "relative"} lg:relative
                        `}
                    >
                        {/* BOTÓN DE CIERRE MEJORADO (SOLO MOBILE) */}
                        {isOpen && (
                            <motion.button 
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsOpen(false)}
                                className="lg:hidden absolute -top-3 -right-3 w-10 h-10 bg-[#FF69B4] border-[3px] border-black rounded-full flex items-center justify-center shadow-[3px_3px_0px_#000] z-[120]"
                            >
                                <span className="text-black font-black text-xl leading-none mt-[-2px]">✕</span>
                            </motion.button>
                        )}

                        {/* PANTALLA LCD ANIMADA */}
                        <div className="bg-[#D1C4E9] rounded-[30px] p-4 border-[3px] border-black shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)] flex flex-col gap-3 overflow-hidden relative">
                            
                            <SpeakerGrille className="absolute left-2 top-1/2 -translate-y-1/2 rotate-90" />
                            <SpeakerGrille className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90" />

                            <div className="flex justify-between items-center relative z-10">
                                <div className="flex items-center gap-1.5">
                                    <motion.div 
                                        animate={{ opacity: isPlaying ? [1, 0, 1] : 1 }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className={`w-2.5 h-2.5 rounded-full border border-black ${isPlaying ? 'bg-[#FF69B4]' : 'bg-gray-400'}`} 
                                    />
                                    <div className="w-32 overflow-hidden whitespace-nowrap relative">
                                        <motion.div
                                            animate={{ x: [120, -220] }}
                                            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                                            className="inline-block"
                                        >
                                            <SpaceText 
                                                text={isPlaying ? ">>> REPRODUCIENDO_AUDIO_BUNNIES_ >>>" : "|| REPRODUCTOR_LISTO_ESPERANDO_ ||"} 
                                                size="12|12" 
                                                className="text-black font-black tracking-widest" 
                                            />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4 relative z-10">
                                <motion.div animate={isPlaying ? { rotate: 360 } : { rotate: 0 }} transition={isPlaying ? { duration: 3, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}>
                                    <HoloDisc size="w-24 h-24" hole="w-8 h-8" />
                                </motion.div>
                                <div className="w-full text-center px-1">
                                    <motion.div
                                        animate={isPlaying ? { scale: [1, 1.03, 1] } : {}}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                    >
                                        <SpaceText text={currentTrack?.title || "SIN PISTA"} size="14|14" className="text-black font-black uppercase truncate" />
                                    </motion.div>
                                    <div className="h-0.5 w-full bg-black/10 mt-1" />
                                </div>
                            </div>

                            <div className="relative h-5 bg-white border-[2.5px] border-black rounded-full overflow-hidden mt-1 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] z-10">
                                <div className="absolute top-0 left-0 h-full bg-[#FFB7CE] border-r-2 border-black" style={{ width: `${(currentTime / duration) * 100}%` }} />
                                <input type="range" min="0" max={duration || 0} value={currentTime} onChange={(e) => seek(Number(e.target.value))} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                <div className="absolute inset-0 flex justify-between items-center px-3 pointer-events-none">
                                    <SpaceText text={formatTime(currentTime)} size="12|12" className="text-black font-bold" />
                                    <SpaceText text={formatTime(duration)} size="12|12" className="text-black font-bold" />
                                </div>
                            </div>
                        </div>

                        {/* CONTROLES */}
                        <div className="flex flex-col gap-4 px-1">
                            <div className="flex justify-between items-center gap-3">
                                <button type="button" onClick={playPrev} className="flex-1 h-12 rounded-2xl bg-[#B2F2BB] border-[3px] border-black text-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center">
                                    <SpaceText text="⏮" size="12|12" />
                                </button>
                                <button type="button" onClick={togglePlay} className="w-16 h-16 bg-[#FFB7CE] border-[4px] border-black rounded-full shadow-[5px_5px_0px_#000] flex items-center justify-center text-black active:translate-x-1 active:translate-y-1 active:shadow-none transition-all">
                                    <SpaceText text={isPlaying ? "⏸" : "▶"} size="16|16" />
                                </button>
                                <button type="button" onClick={playNext} className="flex-1 h-12 rounded-2xl bg-[#B2F2BB] border-[3px] border-black text-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center">
                                    <SpaceText text="⏭" size="12|12" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between gap-2 bg-white rounded-2xl p-2.5 border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                                <button type="button" onClick={() => adjustVol(-10)} className="w-9 h-9 rounded-xl bg-[#D0EBFF] border-2 border-black text-black font-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 flex items-center justify-center">
                                    <SpaceText text="-" size="12|12" />
                                </button>
                                <div className="flex-1 flex flex-col items-center">
                                    <SpaceText text={`VOL: ${volume}%`} size="12|12" className="text-black/60 mb-1.5 font-bold" />
                                    <div className="flex gap-1">
                                        {[20, 40, 60, 80, 100].map((v) => (
                                            <div key={`v-${v}`} className={`w-3 h-2 rounded-sm border border-black ${volume >= v ? "bg-[#FFD1DC]" : "bg-gray-100"}`} />
                                        ))}
                                    </div>
                                </div>
                                <button type="button" onClick={() => adjustVol(10)} className="w-9 h-9 rounded-xl bg-[#D0EBFF] border-2 border-black text-black font-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 flex items-center justify-center">
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