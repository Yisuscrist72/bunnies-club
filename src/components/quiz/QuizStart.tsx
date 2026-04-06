"use client";

import { motion } from "framer-motion";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Window from "@/components/molecules/Window";

interface QuizStartProps {
  onStart: () => void;
  totalQuestions: number;
}

export default function QuizStart({ onStart, totalQuestions }: QuizStartProps) {
  return (
    <motion.div
      key="start"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl relative z-10"
    >
      <Window title="( BUNNIES_MATCH.EXE )" className="scanlines">
        {/* Header con gradiente */}
        <div
          className="relative flex flex-col items-center justify-center p-10 text-center gap-6 overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #c9e9f6 0%, #f4d8ed 50%, #f9f1c3 100%)",
          }}
        >
          {/* Dots decorativos */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Icono animado */}
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              className="absolute -inset-6 border-[3px] border-dashed border-black/25 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute -inset-3 border-2 border-dotted border-v2k-pink-hot/40 rounded-full"
            />
            <div className="text-7xl drop-shadow-md">🐰</div>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <Jersey
              text="DESCUBRE TU MATCH DIGITAL!"
              size="48|56"
              className="sticker-title px-4"
            />
            <SpaceText
              text="Escanea tus gustos..."
              size="16|16"
              className="text-black font-black mt-2 tracking-widest uppercase opacity-60"
            />
            <div className="h-0.5 bg-black/10 w-full mt-4" />
            <SpaceText
              text={`${totalQuestions} preguntas · ~3 minutos · Resultado instantáneo`}
              size="12|12"
              className="text-black/40 font-bold mt-2"
            />
          </div>

          {/* Info box */}
          <div className="flex gap-4 w-full max-w-sm">
            {["🎯 Preguntas únicas", "💖 5 posibles matches", "✨ XP por completar"].map(
              (item) => (
                <div
                  key={item}
                  className="flex-1 bg-white/70 border-2 border-black rounded-lg p-2 text-[10px] font-bold text-center leading-tight"
                >
                  {item}
                </div>
              )
            )}
          </div>

          {/* Botón */}
          <motion.button
            type="button"
            onClick={onStart}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96, translateY: 4 }}
            className="
              mt-2 px-10 py-4 bg-v2k-pink-hot text-white
              border-[3px] border-black shadow-[6px_6px_0px_#000]
              active:shadow-none active:translate-x-[6px] active:translate-y-[6px]
              transition-all font-bold tracking-widest uppercase
            "
          >
            <Jersey text="🎮  INICIAR ESCANEO" size="24|28" className="text-white" />
          </motion.button>
        </div>
      </Window>
    </motion.div>
  );
}
