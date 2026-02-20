'use client';

/**
 * COMPONENTE HEROSECTION
 * Este componente gestiona la primera vista de la página principal.
 * Contiene la imagen de portada, el título animado y un popup interactivo.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Jersey from '../atoms/texts/Jersey';
import Image from '../atoms/Image';
import Window from '../atoms/Window';

export default function HeroSection() {
  const [showPopup, setShowPopup] = useState(false);

  // Temporizador para disparar el popup de forma asíncrona
  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* SECCIÓN DEL BANNER PRINCIPAL: 
          Usa 'y2k-card' para el estilo de bordes y sombras definido en el CSS global. 
      */}
      <section className="relative w-full h-75 md:h-112.5 y2k-card flex items-center justify-center overflow-hidden">
        <Image
          src="/images/Image-Home.avif"
          alt="NewJeans Home"
          wrapperClassName="w-full h-full absolute inset-0 z-0"
          className="object-cover object-center w-full h-full opacity-90"
          pixelated={false}
          priority={true} // Priority evita el parpadeo de carga (Lazy loading) en la imagen principal
        />

        {/* TÍTULO CENTRAL ANIMADO:
            Se ha vuelto a añadir el motion.div para que el título aparezca con un
            efecto de escala y suavizado al entrar en la página.
        */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4"
        >
          <h1 className="sticker-title text-[5rem] md:text-[8rem] lg:text-[10rem]">
            NEW JEANS
          </h1>
        </motion.div>
      </section>

      {/* SISTEMA DE VENTANAS EMERGENTES (Popups):
          Se renderiza fuera de la sección para permitir el arrastre (Drag) libre por la pantalla.
      */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            drag
            dragMomentum={false} // Movimiento rígido para simular interfaces antiguas
            initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-1/2 left-1/2 z-[100] cursor-grab active:cursor-grabbing touch-none"
            style={{ translateX: "-50%", translateY: "-50%" }}
          >
            <Window 
              title="( NEWJEANS_MATCH.EX )" 
              onClose={() => setShowPopup(false)} 
              className="w-[320px] text-center y2k-window-shadow"
            >
              <div className="py-6 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-y2k"
                >
                  <Jersey tag="span" text="EMPEZAR TEST" size="20|24" />
                </motion.button>
              </div>
            </Window>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}