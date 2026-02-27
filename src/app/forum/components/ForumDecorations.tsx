"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ForumDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      <div className="absolute top-[15%] left-[10%] text-4xl animate-pulse opacity-20">✨</div>
      <div className="absolute top-[45%] right-[5%] text-5xl animate-bounce opacity-15">⭐</div>
      
      <motion.div 
        animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] left-[2%] opacity-30"
      >
         <Image src="/images/bunny-logo.avif" alt="Bunny" width={140} height={140} className="border-4 border-white rounded-xl shadow-lg" />
      </motion.div>

      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-[10%] right-[3%] opacity-30"
      >
         <Image src="/images/bunny-logo.avif" alt="Bunny" width={160} height={160} className="border-4 border-white rounded-xl shadow-lg" />
      </motion.div>
    </div>
  );
}
