import Jersey from "@/components/atoms/texts/Jersey";
import { motion } from "framer-motion";

export default function ShopHeader() {
  return (
    <div className="mb-12 text-center relative group">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        <Jersey
          tag="h1"
          text="TIENDA (MERCH & ALBUMS)"
          size="48|56"
          className="text-black uppercase drop-shadow-[8px_8px_0px_rgba(255,105,180,0.5)] relative z-10 px-6 sm:px-0"
        />
        <div className="absolute -top-12 -right-8 text-7xl rotate-12 opacity-50 select-none hidden sm:block hover:rotate-45 transition-transform cursor-help">🐰</div>
        <div className="absolute -bottom-8 -left-4 text-4xl rotate-[-12deg] opacity-40 select-none hidden sm:block">💖</div>
        <div className="h-3 w-48 bg-v2k-pink-hot mx-auto mt-4 border-2 border-black shadow-v2k-xs -rotate-1 relative z-20" />
      </motion.div>
    </div>
  );
}
