'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Jersey from '../atoms/texts/Jersey';
import Image from '../atoms/Image';
import Window from '../atoms/Window';

export default function HeroSection() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* SECCIÓN HERO (El marco de la foto) */}
      <section className="relative w-full h-75 md:h-112.5 y2k-card flex items-center justify-center">
        <Image
          src="/images/Image-Home.avif"
          alt="NewJeans Home"
          wrapperClassName="w-full h-full absolute inset-0 z-0"
          className="object-cover object-center w-full h-full opacity-90"
          pixelated={false}
          priority={true}
        />

        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4">
          <h1 className="sticker-title text-[5rem] md:text-[7rem] lg:text-[9rem]">
            NEW JEANS
          </h1>
        </div>
      </section>

      {/* POPUP FUERA DE LA SECCIÓN PARA LIBERTAD TOTAL */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.5, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.8 }}
            /* Explicación de clases:
               - fixed: Se posiciona respecto a la ventana del navegador, no a la foto.
               - z-[100]: Asegura que esté por encima de TODO.
               - top-1/2 left-1/2: Lo centra inicialmente.
            */
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