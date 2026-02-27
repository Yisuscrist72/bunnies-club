"use client";

import { motion } from "framer-motion";
import Image from "@/components/atoms/Image";
import Jersey from "@/components/atoms/texts/Jersey";
import { RANK_FRAMES } from "./constants";

interface AvatarDecorationsProps {
  rank: string;
}

const AvatarDecorations = ({ rank }: AvatarDecorationsProps) => {
  const isHighRank = rank.includes("Legend") || rank.includes("CEO") || rank.includes("Super Shy");
  const isFanatic = rank.includes("Fanatic");

  const earColor = rank.includes("Legend") ? "bg-yellow-400" : 
                   rank.includes("Fanatic") ? "bg-v2k-pink-hot" :
                   rank.includes("Super Shy") ? "bg-purple-400" :
                   rank.includes("CEO") ? "bg-v2k-pink-hot" : "bg-white";

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {(isHighRank || isFanatic) && (
        <>
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`absolute -top-12 left-[10%] w-10 h-20 ${earColor} border-4 border-black rounded-full -rotate-20 shadow-[4px_0_0_#000] z-[-1] flex items-center justify-center`}
          >
            <div className="w-4 h-12 bg-pink-100/50 rounded-full" />
          </motion.div>
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`absolute -top-12 right-[10%] w-10 h-20 ${earColor} border-4 border-black rounded-full rotate-20 shadow-[4px_0_0_#000] z-[-1] flex items-center justify-center`}
          >
            <div className="w-4 h-12 bg-pink-100/50 rounded-full" />
          </motion.div>
        </>
      )}
    </div>
  );
};

interface ProfileAvatarProps {
  photoURL?: string;
  displayName: string;
  rank: string;
  isEditing: boolean;
  hasBioBonus?: boolean;
  onEditClick: () => void;
}

export default function ProfileAvatar({ 
  photoURL, 
  displayName, 
  rank, 
  isEditing, 
  hasBioBonus,
  onEditClick 
}: ProfileAvatarProps) {
  return (
    <div className="relative group">
      <div className="relative z-10">
        <AvatarDecorations rank={rank} />
        <button 
          type="button"
          onClick={() => isEditing && onEditClick()}
          onKeyDown={(e) => {
            if (isEditing && (e.key === 'Enter' || e.key === ' ')) {
              onEditClick();
            }
          }}
          className={`w-32 h-32 md:w-44 md:h-44 rounded-full border-4 overflow-hidden relative transition-all bg-v2k-pink-soft ${RANK_FRAMES[rank] || RANK_FRAMES["Bunny Novato"]} ${isEditing ? "cursor-pointer hover:scale-105" : ""}`}
        >
          {photoURL ? (
            <Image 
              src={photoURL} 
              alt={displayName} 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Jersey text={displayName[0] || "?"} size="68|94" />
            </div>
          )}
          {isEditing && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-bold text-xs md:text-sm text-center px-1">CAMBIAR FOTO</span>
            </div>
          )}
        </button>
      </div>
      {hasBioBonus && (
        <motion.div 
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: -15 }}
          className="absolute -top-1 -right-1 bg-yellow-400 border-[3px] border-black px-2 py-0.5 rounded-lg shadow-[3px_3px_0px_#000] z-20 pointer-events-none"
        >
          <span className="text-[10px] font-black text-black italic whitespace-nowrap">VERIFIED BUNNY</span>
        </motion.div>
      )}
    </div>
  );
}
