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
    <section className="relative w-full h-75 md:h-112.5 border-4 border-black shadow-[6px_6px_0px_#000] overflow-hidden rounded-xl bg-white flex items-center justify-center">
      <Image
        src="/images/Image-Home.avif"
        alt="NewJeans Home"
        wrapperClassName="w-full h-full absolute inset-0 z-0"
        className="object-cover object-center w-full h-full opacity-90"
        pixelated={false}
      />

      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4">
        <h1 className="font-jersey text-[4rem] md:text-[6rem] lg:text-[8rem] leading-none text-white drop-shadow-[4px_4px_0px_#000] md:drop-shadow-[6px_6px_0px_#000] tracking-tighter text-center">
          NEW JEANS
        </h1>
      </div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute z-20"
          >
            <Window title="( NEWJEANS_MATCH.EX )" onClose={() => setShowPopup(false)} className="w-[320px] text-center shadow-[8px_8px_0px_rgba(0,0,0,0.8)]">
              <div className="py-6 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#BEE5FD" }}
                  whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px #000" }}
                  className="bg-[#CDE8FF] border-[3px] border-black px-8 py-3 rounded-full shadow-[4px_4px_0px_#000] transition-colors"
                >
                  <Jersey tag="span" text="EMPEZAR TEST" size="20|24" className="text-black font-bold" />
                </motion.button>
              </div>
            </Window>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}