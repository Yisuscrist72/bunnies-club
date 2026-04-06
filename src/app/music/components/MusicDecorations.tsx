"use client";

import { motion } from "framer-motion";

export default function MusicDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {/* Vinyl Record */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] -left-20 text-[180px] opacity-10 hidden xl:block"
        >
          💿
        </motion.div>

        {/* Music Notes */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] right-[10%] text-6xl"
        >
          🎶
        </motion.div>

        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] left-[15%] text-8xl"
        >
          🎵
        </motion.div>

        <motion.div 
          animate={{ rotate: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[60%] right-[2%] text-7xl opacity-10"
        >
          🎧
        </motion.div>

        {/* Stars/Sparkles */}
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-[15%] right-[25%] text-4xl"
        >
          ✨
        </motion.div>

        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[40%] left-[5%] text-3xl"
        >
          ⭐
        </motion.div>
      </div>
    </div>
  );
}
