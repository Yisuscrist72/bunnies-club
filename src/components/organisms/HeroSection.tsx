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
    <section className="relative w-full h-75 md:h-112.5 y2k-card flex items-center justify-center">
      <Image
        src="/images/Image-Home.avif"
        alt="NewJeans Home"
        wrapperClassName="w-full h-full absolute inset-0 z-0"
        className="object-cover object-center w-full h-full opacity-90"
        pixelated={false}
        priority={true} // Corrige la minicarga rara
      />

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4">
        <h1 className="sticker-title text-[5rem] md:text-[8rem] lg:text-[10rem]">
          NEW JEANS
        </h1>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute z-20"
          >
            <Window title="( NEWJEANS_MATCH.EX )" onClose={() => setShowPopup(false)} className="w-[320px] text-center shadow-[8px_8px_0px_rgba(0,0,0,0.8)]">
              <div className="py-6 flex justify-center">
                <motion.button whileHover={{ scale: 1.05 }} className="btn-y2k">
                  <Jersey tag="span" text="EMPEZAR TEST" size="20|24" />
                </motion.button>
              </div>
            </Window>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}