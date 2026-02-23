"use client";
import { motion } from "framer-motion";
import Jersey from "../atoms/texts/Jersey";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-[#BEE5FD] flex flex-col items-center justify-center"
    >
      {/* Patrón de fondo retro */}
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* Logo o Icono animado */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-8xl"
        >
          🐰
        </motion.div>

        {/* Texto de carga estilo terminal */}
        <div className="flex flex-col items-center gap-2">
          <Jersey text="BUNNIES CLUB OS" size="32|40" className="text-black" />
          <div className="flex items-center gap-2">
            <div className="w-48 h-4 border-2 border-black p-0.5 bg-white">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="h-full bg-v2k-pink"
              />
            </div>
          </div>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="font-mono text-xs text-black uppercase tracking-tighter"
          >
            Iniciando componentes...
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
