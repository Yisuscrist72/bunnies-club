"use client";

import { motion } from "framer-motion";
import Jersey from "@/components/atoms/texts/Jersey";
import Window from "@/components/molecules/Window";

export default function QuizCalculating() {
  const steps = [
    { label: "ANALIZANDO RESPUESTAS", done: true },
    { label: "CALCULANDO COMPATIBILIDAD", done: true },
    { label: "BUSCANDO TU MATCH PERFECTO", done: false },
  ];

  return (
    <motion.div
      key="calculating"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-lg relative z-10"
    >
      <Window title="CALCULANDO_RESULTADO.SYS" className="scanlines">
        <div className="flex flex-col items-center gap-8 p-10 bg-black text-v2k-pink-hot">
          {/* Scanner de línea */}
          <div className="relative w-full h-36 border-2 border-v2k-pink-hot overflow-hidden bg-v2k-pink-hot/5 rounded-sm">
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-v2k-pink-hot z-10"
              style={{ boxShadow: "0 0 12px 4px #ff69b4" }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 font-mono text-xs text-v2k-pink-hot/70">
              <div className="animate-pulse text-lg mb-1">👁️</div>
              <div>SCANNING BUNNY DNA...</div>
              <div className="opacity-50">PROCESSING_ID: #NEWJEANS_MATCH</div>
            </div>
          </div>

          {/* Pasos */}
          <div className="w-full flex flex-col gap-3 font-mono text-xs">
            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3 }}
                className="flex items-center gap-3"
              >
                <span className="text-v2k-green-soft">
                  {step.done ? (
                    "✅"
                  ) : (
                    <span className="animate-spin inline-block">⏳</span>
                  )}
                </span>
                <span
                  className={
                    step.done
                      ? "text-v2k-green-soft"
                      : "text-v2k-pink-hot animate-pulse"
                  }
                >
                  {step.label}
                </span>
                {step.done && (
                  <span className="ml-auto text-v2k-green-soft/60">OK</span>
                )}
              </motion.div>
            ))}
          </div>

          <Jersey
            text="GENERANDO TU RESULTADO..."
            size="20|24"
            className="text-v2k-pink-hot"
          />
        </div>
      </Window>
    </motion.div>
  );
}
