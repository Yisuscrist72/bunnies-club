"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "../atoms/Image";
import {
  IconFacebook,
  IconInstagram,
  IconSpotify,
  IconUser,
  IconX,
} from "../atoms/icons/SocialIcons";
import Jersey from "../atoms/texts/Jersey";
import MobileMenu from "../molecules/MobileMenu";
import { useAuth } from "@/context/AuthContext";

const WHILE_TAP = { x: 4, y: 4, boxShadow: "0px 0px 0px #000000" };
const TRANSITION_SPRING = {
  type: "spring" as const,
  stiffness: 400,
  damping: 17,
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFreebiesModalOpen, setIsFreebiesModalOpen] = useState(false);
  const { user, profile } = useAuth();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleModalEvent = (e: CustomEvent<boolean>) => setIsFreebiesModalOpen(e.detail);
    window.addEventListener("toggleFreebiesModal", handleModalEvent as EventListener);
    return () =>
      window.removeEventListener("toggleFreebiesModal", handleModalEvent as EventListener);
  }, []);

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      {!isMenuOpen && !isFreebiesModalOpen && (
        <motion.button
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={WHILE_TAP}
          className="lg:hidden fixed top-4 right-4 text-black border-[3px] border-black bg-nav-mobile px-4 py-1.5 rounded-full shadow-nav-btn z-40"
          onClick={() => setIsMenuOpen(true)}
        >
          <Jersey tag="span" text="MENU" size="16|16" />
        </motion.button>
      )}

      {/* DESKTOP NAVBAR */}
      <nav className="hidden lg:block w-full bg-nav-bg border-b-[3px] border-black relative">
        <div className="flex items-center justify-between md:justify-center md:gap-8 lg:gap-16 px-4 py-3">
          {/* LOGO SECTION */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 relative w-20 h-10 md:w-32 md:h-12 cursor-pointer"
            >
              <Image
                src="/images/bunny-logo.avif"
                alt="Bunnies Club Logo"
                pixelated={true}
                wrapperClassName="absolute -top-2 md:-top-6 -left-2 w-28 h-32 md:w-32 md:h-40 overflow-visible"
                className="object-contain! drop-shadow-[3px_3px_0px_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </Link>

          {/* NAV LINKS */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-10 text-black tracking-widest mt-1">
            {["MÚSICA", "QUIZ", "TIENDA", "FORO"].map((item) => (
              <motion.li
                key={item}
                whileHover={{ y: -3, scale: 1.1 }}
                transition={TRANSITION_SPRING}
              >
                <Link
                  href={
                    item === "MÚSICA" ? "/music" :
                    item === "TIENDA" ? "/shop" :
                    item === "FORO"   ? "/forum" :
                    `/${item.toLowerCase()}`
                  }
                  className="hover:text-v2k-pink-hot transition-colors flex items-center gap-1"
                >
                  {item === "QUIZ" && (
                    <span className="text-yellow-400 text-xl lg:text-2xl drop-shadow-[1px_1px_0px_#000]">
                      ✨
                    </span>
                  )}
                  <Jersey tag="span" text={item} size="20|24" />
                  {item === "QUIZ" && (
                    <span className="text-yellow-400 text-xl lg:text-2xl drop-shadow-[1px_1px_0px_#000]">
                      ✨
                    </span>
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* SOCIAL BUTTONS CON ANIMACIÓN INTENSIVA */}
          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {[
              {
                ico: <IconInstagram className="w-5 h-5" />,
                bg: "bg-insta",
                hov: "hover:bg-pink-400",
                rotate: -8,
                href: "https://www.instagram.com/newjeans_official/",
              },
              {
                ico: <IconSpotify className="w-5 h-5" />,
                bg: "bg-spotify",
                hov: "hover:bg-green-500",
                round: "rounded-full",
                rotate: 8,
                href: "https://open.spotify.com/artist/6HvZYvR2fszIU3bGvbiTjC",
              },
              {
                ico: <IconX className="w-5 h-5" />,
                bg: "bg-nav-bg",
                hov: "hover:bg-blue-300",
                rotate: -5,
                href: "https://twitter.com/NewJeans_ADOR",
              },
              {
                ico: <IconFacebook className="w-5 h-5" />,
                bg: "bg-fb",
                hov: "hover:bg-blue-600",
                round: "rounded-full",
                txt: "text-white",
                rotate: 5,
                href: "https://www.facebook.com/official.newjeans/",
              },
            ].map((soc) => (
              <Link key={soc.href} href={soc.href} target="_blank">
                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.15,
                    rotate: soc.rotate,
                    boxShadow: "6px 6px 0px var(--color-v2k-black)",
                  }}
                  whileTap={WHILE_TAP}
                  transition={TRANSITION_SPRING}
                  className={`w-9 h-9 lg:w-11 lg:h-11 ${soc.bg} border-[3px] border-black ${soc.round || "rounded-md"} flex items-center justify-center cursor-pointer ${soc.hov} shadow-nav-small ${soc.txt || "text-black"} transition-colors duration-200`}
                >
                  {soc.ico}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* LANGUAGE BUTTON CON CONTRASTE CORREGIDO */}
          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "var(--color-v2k-black)",
              boxShadow: "6px 6px 0px var(--color-v2k-pink-hot)",
            }}
            whileTap={WHILE_TAP}
            transition={TRANSITION_SPRING}
            className="hidden md:block text-black border-[3px] border-black bg-linear-to-r from-lang-from to-lang-to px-4 lg:px-6 py-1 rounded-full shadow-nav-small transition-colors duration-200"
          >
            <Jersey tag="span" text="ES/EN" size="18|22" />
          </motion.button>

          {/* USER PROFILE ICON & RANK INFO */}
          <div className="relative group">
            <Link href={user ? "/profile" : "/login"}>
              <motion.div
                whileHover={{
                  y: -6,
                  scale: 1.15,
                  rotate: -5,
                  boxShadow: "6px 6px 0px var(--color-v2k-black)",
                }}
                whileTap={WHILE_TAP}
                transition={TRANSITION_SPRING}
                className="w-9 h-9 lg:w-11 lg:h-11 bg-v2k-pink-hot border-[3px] border-black rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-400 shadow-nav-small text-white transition-colors duration-200 overflow-hidden"
              >
                {profile?.photoURL ? (
                  <Image
                    src={profile.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <IconUser className="w-6 h-6" />
                )}
              </motion.div>
            </Link>

            {/* Rank Bubble (Solo escritorio por ahora) */}
            {user && profile ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:flex absolute -right-2 -bottom-2 bg-black border-2 border-white rounded-full px-2 py-0.5 z-20 shadow-sm pointer-events-none"
              >
                <span className="text-[8px] text-white font-black whitespace-nowrap">
                  LVL {Math.floor((profile.points || 0) / 100) + 1}
                </span>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:flex absolute -right-2 -bottom-2 bg-v2k-red-soft border-2 border-black rounded-full px-2 py-0.5 z-20 shadow-sm pointer-events-none"
              >
                <span className="text-[8px] text-black font-black whitespace-nowrap">
                  GUEST
                </span>
              </motion.div>
            )}

            {/* Hover tooltip with XP or Login prompt */}
            {user && profile ? (
              <div className="absolute top-14 right-0 bg-white border-2 border-black p-2 shadow-[4px_4px_0px_#000] hidden group-hover:block z-50 min-w-[120px]">
                <p className="text-[10px] font-black uppercase text-black">{profile.rank}</p>
                <div className="h-1 bg-gray-100 mt-1 mb-1">
                  <div 
                    className="h-full bg-v2k-pink-hot" 
                    style={{ width: `${(profile.points || 0) % 100}%` }}
                  />
                </div>
                <p className="text-[9px] font-bold text-black">{profile.points} XP TOTAL</p>
              </div>
            ) : (
              <div className="absolute top-14 right-0 bg-white border-2 border-black p-3 shadow-[4px_4px_0px_#000] hidden group-hover:block z-50 min-w-[160px]">
                <p className="text-[10px] font-black uppercase text-black">MODO INVITADO</p>
                <div className="h-0.5 bg-black/10 my-2" />
                <p className="text-[9px] font-bold text-v2k-black leading-tight">
                  LOGUEATE PARA GANAR XP Y SUBIR DE NIVEL 🐰✨
                </p>
                <Link href="/login">
                  <button type="button" className="w-full mt-2 bg-v2k-accent border-2 border-black py-1 text-[9px] font-black shadow-[2px_2px_0px_#000] active:shadow-none translate-y-0 active:translate-y-1 transition-all">
                    ENTRAR AHORA
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
