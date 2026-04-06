import { motion } from "framer-motion";

export default function ShopBackground() {
  return (      
      <div className="fixed inset-0 pointer-events-none z-10 opacity-20 overflow-hidden">
        {/* Left Side Stickers */}
        <motion.div 
          animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-[140px] hidden 2xl:block"
        >
          🛍️
        </motion.div>
        
        <motion.div 
          animate={{ x: [-10, 10, -10], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-40 left-20 text-8xl hidden xl:block"
        >
          📦
        </motion.div>

        <motion.div 
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/3 left-1/4 text-6xl opacity-30"
        >
          🏷️
        </motion.div>

        {/* Right Side Stickers */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-16 text-[200px] hidden 2xl:block opacity-40"
        >
          💿
        </motion.div>
        
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [5, -5, 5] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 right-32 text-7xl hidden xl:block"
        >
          🛒
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[20%] right-[10%] text-6xl opacity-30"
        >
          🎟️
        </motion.div>

        {/* Small floating particles */}
        <motion.div animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-40 left-1/3 text-4xl">💎</motion.div>
        <motion.div animate={{ scale: [0.8, 1.1, 0.8] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} className="absolute bottom-60 right-1/4 text-3xl">💵</motion.div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute top-2/3 left-1/3 text-3xl opacity-20">✨</motion.div>
      </div>
  );
}