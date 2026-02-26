"use client";
import { motion, AnimatePresence } from "framer-motion";
import Jersey from "../atoms/texts/Jersey";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Evita errores de hidratación en Next.js
    
    // Comprueba si ya cargó en esta sesión
    const hasLoaded = sessionStorage.getItem("bunnies_loaded");
    
    if (!hasLoaded) {
      setIsVisible(true);
      
      // Oculta la pantalla después de 3 segundos y guarda la marca
      const timer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("bunnies_loaded", "true");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Si no se ha montado en el cliente aún, no renderiza nada
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] bg-nav-bg flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Patrón de fondo retro */}
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage: `radial-gradient(var(--color-v2k-black) 1px, transparent 1px)`,
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
      )}
    </AnimatePresence>
  );
}