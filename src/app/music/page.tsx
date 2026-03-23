"use client";

import BackgroundDecorations from "@/components/atoms/BackgroundDecorations";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import MusicCard, { type Album } from "@/components/molecules/MusicCard";
import { motion } from "framer-motion";


const ALBUMS: Album[] = [
  {
    id: 1,
    title: "NEW JEANS",
    type: "1ST EP",
    cover: "/images/music/newjeans.avif",
    tracks: ["Attention", "Hype Boy", "Cookie", "Hurt"],
    durations: ["3:00", "2:59", "3:55", "2:57"],
    links: {
      spotify: "https://open.spotify.com/album/488vX7HNo9MvALTh9vYFv0",
      apple: "https://music.apple.com/us/album/new-jeans-ep/1635003316",
      youtube: "https://www.youtube.com/playlist?list=OLAK5uy_k_oI4SgD5qZ_6M9O-Z1_wY_6h_4wY_8_w"
    },
    color: "bg-album-sky",
    headerColor: "bg-album-sky-header"
  },
  {
    id: 2,
    title: "OMG & DITTO",
    type: "SINGLE ALBUM",
    cover: "/images/music/omg-ditto.avif",
    tracks: ["OMG", "Ditto"],
    durations: ["3:32", "3:05"],
    links: {
      spotify: "https://open.spotify.com/album/58674514589254848",
      apple: "https://music.apple.com/us/album/omg-single/1653833215",
      youtube: "https://www.youtube.com/playlist?list=OLAK5uy_l_7p_8_v_s_v_v_v"
    },
    color: "bg-album-pink",
    headerColor: "bg-album-pink-header"
  },
  {
    id: 3,
    title: "GET UP",
    type: "2ND EP",
    cover: "/images/music/get-up.avif",
    tracks: ["New Jeans", "Super Shy", "ETA", "Cool With You", "Get Up", "ASAP"],
    durations: ["1:48", "2:34", "2:31", "2:27", "0:36", "2:14"],
    links: {
      spotify: "https://open.spotify.com/album/2873495823749",
      apple: "https://music.apple.com/us/album/get-up-ep/1691234912",
      youtube: "https://www.youtube.com/playlist?list=OLAK5uy_k_oI4SgD5qZ_6M9O-Z1_wY_6h_4wY_8_w"
    },
    color: "bg-album-green",
    headerColor: "bg-album-green-header"
  },
  {
    id: 4,
    title: "HOW SWEET",
    type: "SINGLE ALBUM",
    cover: "/images/music/howsweet.avif",
    tracks: ["How Sweet", "Bubble Gum"],
    durations: ["3:39", "3:20"],
    links: {
      spotify: "https://open.spotify.com/album/4892374982374",
      apple: "https://music.apple.com/us/album/how-sweet-single/174492349",
      youtube: "https://www.youtube.com/playlist?list=OLAK5uy_k_oI4SgD5qZ_6M9O-Z1_wY_6h_4wY_8_w"
    },
    color: "bg-album-yellow",
    headerColor: "bg-album-yellow-header"
  },
  {
    id: 5,
    title: "SUPERNATURAL",
    type: "EP / SINGLE",
    cover: "/images/music/supernatural.avif",
    tracks: ["Supernatural", "Right Now"],
    durations: ["3:12", "2:40"],
    links: {
      spotify: "https://open.spotify.com/album/4892374982374",
      apple: "https://music.apple.com/us/album/supernatural-single/174492349",
      youtube: "https://www.youtube.com/playlist?list=OLAK5uy_k_oI4SgD5qZ_6M9O-Z1_wY_6h_4wY_8_w"
    },
    color: "bg-album-purple",
    headerColor: "bg-album-purple-header"
  },
  {
    id: 6,
    title: "GODS",
    type: "SENCILLO",
    cover: "/images/music/gods.avif",
    tracks: ["GODS (League of Legends World Championship)"],
    durations: ["3:40"],
    links: {
      spotify: "https://open.spotify.com/album/4892374982374",
      apple: "https://music.apple.com/us/album/gods-single/171092349",
      youtube: "https://www.youtube.com/playlist?list=OLAK5uy_k_oI4SgD5qZ_6M9O-Z1_wY_6h_4wY_8_w"
    },
    color: "bg-album-cyan",
    headerColor: "bg-album-cyan-header"
  }
];

export default function MusicPage() {
  return (
    <div className="relative min-h-screen pt-10 pb-20 px-4 md:px-8 overflow-x-hidden">
      <BackgroundDecorations />
      
      {/* Header Stickers / Titles */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center mb-16">
        <div className="mb-6">
             <Jersey
                tag="h1"
                text="MÚSICA"
                size="68|94"
                className="sticker-title text-v2k-pink-hot text-[3rem]! sm:text-[5rem]! lg:text-[6rem]! drop-shadow-[4px_4px_0px_#000]"
                style={{
                  textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 6px 6px 0px #000"
                }}
             />
        </div>
        
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ delay: 0.1 }}
           className="bg-v2k-blue-deep border-4 border-black px-6 sm:px-8 py-2.5 sm:py-3 shadow-v2k-sm -rotate-1 mb-10 sm:mb-12 relative"
        >
           <Jersey
              text="DISCOGRAFÍA (ALBUMS & EPS)"
              size="24|28"
              className="text-white text-base sm:text-2xl"
           />
        </motion.div>

        <motion.div
           initial={{ x: -20, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="flex items-center gap-4 mb-16"
        >
           <SpaceText
              text="— EXPLORA EL UNIVERSO MUSICAL DE NEWJEANS —"
              size="12|12"
              className="text-black font-black italic tracking-[0.2em]"
           />
        </motion.div>

        {/* Music Cards Grid: 3 columns for better usage of white space */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 w-full relative z-10 px-4">
           {/* Decorations */}
               {/* Improved Background Decorations */}
           <div className="absolute inset-0 pointer-events-none overflow-visible hidden 2xl:block">
             <motion.div 
               animate={{ y: [0, -30, 0], rotate: 360 }}
               transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
               className="absolute top-1/4 -left-40 text-7xl opacity-15"
             >
               💿
             </motion.div>
             <motion.div 
               animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-2/3 -right-32 text-6xl opacity-10"
             >
               🎵
             </motion.div>
             <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-10 right-0 text-5xl"
             >
               ✨
             </motion.div>
             <motion.div 
               animate={{ rotate: [0, 15, -15, 0] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-1/4 -left-20 text-6xl opacity-10"
             >
               🎧
             </motion.div>
             <motion.div 
               animate={{ scale: [0.8, 1, 0.8] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute top-1/2 left-1/4 text-3xl opacity-5"
             >
               ⭐
             </motion.div>
           </div>
           
           {ALBUMS.map((album, idx) => (
             <motion.div
                key={album.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
             >
                <MusicCard album={album} />
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}
