"use client";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Link from "next/link";
import React from "react";
import Image from "../atoms/Image";
import {
  IconFacebook,
  IconInstagram,
  IconSpotify,
  IconX,
} from "../atoms/icons/SocialIcons";
import Jersey from "../atoms/texts/Jersey";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuVariants: Variants = {
    closed: {
      x: "100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    closed: { y: 20, opacity: 0 },
    open: { y: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 w-full h-[100dvh] bg-nav-bg z-[100] flex flex-col md:hidden overflow-hidden"
        >
          {/* BARRA DE TÍTULO */}
          <div className="w-full bg-v2k-blue-deep p-2 border-b-[3px] border-black flex justify-between items-center shadow-[0_2px_0_var(--color-v2k-shadow-white)_inset]">
            <div className="flex items-center gap-2 ml-2">
              <div className="w-3 h-3 bg-black border border-black shadow-[1px_1px_0_white]" />
              <Jersey
                tag="span"
                text="BUNNIES_MENU.EXE"
                size="12|12"
                className="text-black tracking-tighter font-bold"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ x: 2, y: 2, boxShadow: "0px 0px 0px #000" }}
              onClick={onClose}
              className="w-8 h-8 rounded-full border-[2px] border-black bg-white flex items-center justify-center shadow-[2px_2px_0px_#000] transition-all"
            >
              <Jersey
                tag="span"
                text="X"
                size="14|14"
                className="font-bold text-black"
              />
            </motion.button>
          </div>

          {/* CONTENIDO PRINCIPAL */}
          <div className="flex-grow flex flex-col items-center justify-center relative p-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-10 pointer-events-none grayscale">
              <Image
                src="/images/bunny-logo.avif"
                alt=""
                pixelated={true}
                wrapperClassName="w-full h-full"
              />
            </div>

            <ul className="flex flex-col gap-5 w-full max-w-[280px] z-10">
              {[
                { label: "INICIO", href: "/" },
                { label: "MÚSICA", href: "/music" },
                { label: "QUIZ", href: "/quiz", sparkles: true },
                { label: "TIENDA", href: "/shop" },
                { label: "FORO", href: "/forum" },
              ].map((item) => (
                <motion.li
                  key={item.label}
                  variants={itemVariants}
                  className="w-full"
                >
                  <Link href={item.href} onClick={onClose}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ x: 6, y: 6, boxShadow: "0px 0px 0px #000" }}
                      className="group flex items-center justify-center bg-white border-[3px] border-black p-4 shadow-[6px_6px_0px_#000] cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2">
                        {item.sparkles && <span className="text-xl">✨</span>}
                        <Jersey
                          tag="span"
                          text={item.label}
                          size="32|40"
                          className={`text-black group-hover:text-pink-500 transition-colors ${item.label === "INICIO" ? "font-black" : ""}`}
                        />
                        {item.sparkles && <span className="text-xl">✨</span>}
                      </div>
                    </motion.div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* FOOTER - ICONOS Y IDIOMA */}
          <div className="p-8 flex flex-col items-center gap-6 bg-black/5 border-t-[2px] border-black/10 z-10">
            <motion.div variants={itemVariants} className="flex gap-4">
              {[
                <IconInstagram key="ig" className="w-5 h-5" />,
                <IconSpotify key="spotify" className="w-5 h-5" />,
                <IconX key="x" className="w-5 h-5" />,
                <IconFacebook key="fb" className="w-5 h-5" />,
              ].map((icon) => (
                <motion.div
                  key={icon.key}
                  whileHover={{ scale: 1.1, backgroundColor: "var(--color-v2k-pink-hover)" }}
                  whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px var(--color-v2k-black)" }}
                  className="w-12 h-12 bg-v2k-white border-[3px] border-black flex items-center justify-center shadow-[4px_4px_0px_var(--color-v2k-black)] cursor-pointer transition-colors text-black"
                >
                  {icon}
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px var(--color-v2k-black)" }}
              className="w-full max-w-[220px] text-black border-[3px] border-black bg-gradient-to-r from-lang-from to-lang-to py-3 rounded-full shadow-[4px_4px_0px_var(--color-v2k-black)] transition-all"
            >
              <Jersey
                tag="span"
                text="ESPAÑOL / ENGLISH"
                size="16|16"
                className="text-black"
              />
            </motion.button>
          </div>

          {/* BARRA DE ESTADO */}
          <div className="w-full bg-nav-bg border-t-[3px] border-black px-4 py-1 flex justify-between items-center font-bold">
            <Jersey
              tag="span"
              text="SYSTEM READY"
              size="12|12"
              className="text-black"
            />
            <div className="flex gap-2 items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <Jersey
                tag="span"
                text="v1.0"
                size="12|12"
                className="text-black"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
