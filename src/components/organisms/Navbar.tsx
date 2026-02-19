"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion"; 
import Jersey from "../atoms/texts/Jersey";
import Image from "../atoms/Image";
import MobileMenu from "../molecules/MobileMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* 1. BOTÓN FLOTANTE MÓVIL */}
      {!isMenuOpen && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ x: 2, y: 2, boxShadow: "0px 0px 0px #000000" }}
          transition={{ duration: 0.1 }} // Transición rápida
          className="md:hidden fixed top-4 right-4 text-black border-[3px] border-black bg-[#E0F0FF] px-4 py-1.5 rounded-full shadow-[3px_3px_0px_#000000] z-[90]"
          onClick={() => setIsMenuOpen(true)}
        >
          <Jersey tag="span" text="MENU" size="16|16" />
        </motion.button>
      )}

      {/* 2. NAVBAR COMPLETO DESKTOP */}
      <nav className="hidden md:block w-full bg-[#BEE5FD] border-b-[3px] border-black relative z-40">
        <div className="flex items-center justify-between md:justify-center md:gap-8 lg:gap-16 px-4 py-3">
          
          {/* LOGO */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            transition={{ duration: 0.2 }} // El logo puede ser un pelín más suave
            className="flex-shrink-0 relative z-[60] w-20 h-10 md:w-32 md:h-12 cursor-pointer"
          >
            <Image
              src="/images/bunny-logo.avif"
              alt="Bunnies Club Logo"
              pixelated={true}
              wrapperClassName="absolute -top-2 md:-top-6 -left-2 w-28 h-32 md:w-32 md:h-40 overflow-visible"
              className="!object-contain drop-shadow-[3px_3px_0px_rgba(0,0,0,0.6)]"
            />
          </motion.div>

          {/* ENLACES CENTRALES */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-10 text-black tracking-widest mt-1">
            {["MÚSICA", "QUIZ", "TIENDA", "FORO"].map((item) => (
              <motion.li 
                key={item} 
                whileHover={{ y: -2, scale: 1.05 }}
                transition={{ duration: 0.1 }} // Reacción instantánea
              >
                <Link
                  href={`/${item.toLowerCase() === "música" ? "music" : item.toLowerCase()}`}
                  className="hover:text-pink-500 transition-colors flex items-center gap-1"
                >
                  {item === "QUIZ" && (
                    <span className="text-yellow-400 text-xl lg:text-2xl drop-shadow-[1px_1px_0px_#000]">✨</span>
                  )}
                  <Jersey tag="span" text={item} size="20|24" />
                  {item === "QUIZ" && (
                    <span className="text-yellow-400 text-xl lg:text-2xl drop-shadow-[1px_1px_0px_#000]">✨</span>
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* ICONOS SOCIALES: Ajustados para ser más ligeros */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {[
              { ico: "📷", bg: "bg-pink-300", hov: "hover:bg-pink-400" },
              { ico: "🎵", bg: "bg-green-400", hov: "hover:bg-green-500", round: "rounded-full" },
              { ico: "𝕏", bg: "bg-[#BEE5FD]", hov: "hover:bg-blue-300" },
              { ico: "f", bg: "bg-blue-500", hov: "hover:bg-blue-600", round: "rounded-full", txt: "text-white" }
            ].map((soc, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }} // Un pelín más de subida para que se note la ligereza
                whileTap={{ x: 2, y: 2, boxShadow: "0px 0px 0px #000000" }}
                transition={{ type: "tween", ease: "easeOut", duration: 0.1 }} // Tween corto = más ligero
                className={`w-8 h-8 lg:w-10 lg:h-10 ${soc.bg} border-[3px] border-black ${soc.round || 'rounded-md'} flex items-center justify-center cursor-pointer ${soc.hov} text-xs shadow-[2px_2px_0px_#000000] ${soc.txt || ''}`}
              >
                {soc.ico}
              </motion.div>
            ))}
          </div>

          {/* BOTÓN IDIOMA: Reacción rápida */}
          <motion.button 
            whileHover={{ scale: 1.05 }} // Un poco más de escala para feedback claro
            whileTap={{ x: 2, y: 2, boxShadow: "0px 0px 0px #000000" }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
            className="hidden md:block text-black border-[3px] border-black bg-gradient-to-r from-[#cae8fb] to-[#f4d1e2] px-4 lg:px-6 py-1 rounded-full shadow-[2px_2px_0px_#000000]"
          >
            <Jersey tag="span" text="ES/EN" size="18|22" />
          </motion.button>
        </div>
      </nav>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}