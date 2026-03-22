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
    cover: "https://upload.wikimedia.org/wikipedia/en/2/2e/New_Jeans_%28EP%29_cover.jpg",
    tracks: ["Attention", "Hype Boy", "Cookie", "Hurt"],
    links: {
      spotify: "https://open.spotify.com/album/488vX7HNo9MvALTh9vYFv0",
      apple: "https://music.apple.com/us/album/new-jeans-ep/1635003316",
      youtube: "https://www.youtube.com/playlist?list=OLAK5uy_k_oI4SgD5qZ_6M9O-Z1_wY_6h_4wY_8_w"
    },
    color: "bg-[#e0f2fe]", // Sky Blue
    headerColor: "bg-[#bae6fd]"
  },
  {
    id: 2,
    title: "OMG & DITTO",
    type: "SINGLE ALBUM",
    cover: "https://upload.wikimedia.org/wikipedia/en/9/9e/New_Jeans_OMG_cover.jpg",
    tracks: ["OMG", "Ditto"],
    links: {
      spotify: "https://open.spotify.com/album/58674514589254848",
      apple: "https://music.apple.com/us/album/omg-single/1653833215",
      youtube: "https://www.youtube.com/playlist?list=OLAK5uy_l_7p_8_v_s_v_v_v"
    },
    color: "bg-[#fdf2f8]", // Pink
    headerColor: "bg-[#fbcfe8]"
  },
  {
    id: 3,
    title: "GET UP",
    type: "2ND EP",
    cover: "https://upload.wikimedia.org/wikipedia/en/1/14/New_Jeans_Get_Up_cover.jpg",
    tracks: ["New Jeans", "Super Shy", "ETA", "Cool With You", "Get Up", "ASAP"],
    links: {
      spotify: "https://open.spotify.com/album/2873495823749",
      apple: "https://music.apple.com/us/album/get-up-ep/1691234912",
      youtube: "https://www.youtube.com/playlist?list=OLAK5uy_k_oI4SgD5qZ_6M9O-Z1_wY_6h_4wY_8_w"
    },
    color: "bg-[#f0fdf4]", // Green
    headerColor: "bg-[#dcfce7]"
  },
  {
    id: 4,
    title: "HOW SWEET",
    type: "SINGLE ALBUM",
    cover: "https://upload.wikimedia.org/wikipedia/en/c/c2/New_Jeans_How_Sweet_cover.jpg",
    tracks: ["How Sweet", "Bubble Gum"],
    links: {
      spotify: "https://open.spotify.com/album/4892374982374",
      apple: "https://music.apple.com/us/album/how-sweet-single/174492349",
      youtube: "https://www.youtube.com/playlist?list=OLAK5uy_k_oI4SgD5qZ_6M9O-Z1_wY_6h_4wY_8_w"
    },
    color: "bg-[#fffbeb]", // Yellow
    headerColor: "bg-[#fef3c7]"
  },
  {
    id: 5,
    title: "SUPERNATURAL",
    type: "EP / SINGLE",
    cover: "https://upload.wikimedia.org/wikipedia/en/5/52/New_Jeans_Supernatural_cover.jpg",
    tracks: ["Supernatural", "Right Now"],
    links: {
      spotify: "https://open.spotify.com/album/4892374982374",
      apple: "https://music.apple.com/us/album/supernatural-single/174492349",
      youtube: "https://www.youtube.com/playlist?list=OLAK5uy_k_oI4SgD5qZ_6M9O-Z1_wY_6h_4wY_8_w"
    },
    color: "bg-[#faf5ff]", // Purple
    headerColor: "bg-[#f3e8ff]"
  },
  {
    id: 6,
    title: "GODS",
    type: "SENCILLO",
    cover: "https://upload.wikimedia.org/wikipedia/en/4/4c/New_Jeans_Gods_cover.jpg",
    tracks: ["GODS (League of Legends World Championship)"],
    links: {
      spotify: "https://open.spotify.com/album/4892374982374",
      apple: "https://music.apple.com/us/album/gods-single/171092349",
      youtube: "https://www.youtube.com/playlist?list=OLAK5uy_k_oI4SgD5qZ_6M9O-Z1_wY_6h_4wY_8_w"
    },
    color: "bg-[#ecfeff]", // Cyan
    headerColor: "bg-[#cffafe]"
  }
];

export default function MusicPage() {
  return (
    <div className="relative min-h-screen pt-10 pb-20 px-4 md:px-8 overflow-x-hidden">
      <BackgroundDecorations />
      
      {/* Header Stickers / Titles */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center mb-16">
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-6"
        >
             <Jersey
                tag="h1"
                text="MÚSICA"
                size="68|94"
                className="sticker-title text-v2k-accent !text-[3rem] sm:!text-[5rem] lg:!text-[6rem] drop-shadow-[4px_4px_0px_#000]"
                style={{
                  textShadow: "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 6px 6px 0px #000"
                }}
             />
        </motion.div>
        
        <motion.div
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ delay: 0.1 }}
           className="bg-v2k-pink-hot border-[4px] border-black px-6 sm:px-8 py-2.5 sm:py-3 shadow-v2k-sm -rotate-1 mb-10 sm:mb-12 relative"
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
           <div className="absolute top-1/2 -left-32 text-4xl opacity-10 animate-pulse hidden 2xl:block">🎵</div>
           <div className="absolute top-1/4 -right-32 text-6xl opacity-10 animate-spin-slow hidden 2xl:block">💿</div>
           
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

      {/* Retro Bottom Navigation / UI helper */}
      <div className="fixed bottom-10 left-10 z-20 hidden lg:block">
         <div className="bg-white border-[3px] border-black p-3 shadow-v2k-xs flex flex-col gap-2">
            <span className="text-[10px] font-black text-black/40">SYSTEM STATUS:</span>
            <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-v2k-green-soft rounded-full border border-black" />
               <SpaceText text="AUDIO_SYNC_ACTIVE" size="12|12" className="text-black font-bold" />
            </div>
         </div>
      </div>
    </div>
  );
}
