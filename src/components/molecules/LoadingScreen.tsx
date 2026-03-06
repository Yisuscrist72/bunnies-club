"use client";
import { m, AnimatePresence } from "framer-motion";
import Jersey from "../atoms/texts/Jersey";
import { useState, useEffect, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export default function LoadingScreen() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isMounted) return;

    // Comprueba si ya cargó en esta sesión
    const hasLoaded = sessionStorage.getItem("bunnies_loaded");

    if (!hasLoaded) {
      // Usamos un pequeño timer para evitar setState síncrono dentro del effect
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 0);

      // Oculta la pantalla y guarda la marca
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("bunnies_loaded", "true");
      }, 3000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [isMounted]);

  // Si no se ha montado en el cliente aún, no renderiza nada
  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
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
            <m.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl"
            >
              🐰
            </m.div>

            {/* Texto de carga estilo terminal */}
            <div className="flex flex-col items-center gap-2">
              <Jersey
                text="BUNNIES CLUB OS"
                size="32|40"
                className="text-black"
              />
              <div className="flex items-center gap-2">
                <div className="w-48 h-4 border-2 border-black p-0.5 bg-white">
                  <m.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                    className="h-full bg-v2k-pink"
                  />
                </div>
              </div>
              <m.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="font-mono text-xs text-black uppercase tracking-tighter"
              >
                Iniciando componentes...
              </m.span>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
