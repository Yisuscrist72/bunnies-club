"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "../atoms/Image";
import {
  IconFacebook,
  IconInstagram,
  IconSpotify,
  IconX,
} from "../atoms/icons/SocialIcons";
import Jersey from "../atoms/texts/Jersey";
import MobileMenu from "../molecules/MobileMenu";

const WHILE_TAP = { x: 4, y: 4, boxShadow: "0px 0px 0px #000000" };
const TRANSITION_SPRING = {
  type: "spring" as const,
  stiffness: 400,
  damping: 17,
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFreebiesModalOpen, setIsFreebiesModalOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleModalEvent = (e: any) => setIsFreebiesModalOpen(e.detail);
    window.addEventListener("toggleFreebiesModal", handleModalEvent);
    return () =>
      window.removeEventListener("toggleFreebiesModal", handleModalEvent);
  }, []);

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      {!isMenuOpen && !isFreebiesModalOpen && (
        <motion.button
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={WHILE_TAP}
          className="md:hidden fixed top-4 right-4 text-black border-[3px] border-black bg-nav-mobile px-4 py-1.5 rounded-full shadow-nav-btn z-40"
          onClick={() => setIsMenuOpen(true)}
        >
          <Jersey tag="span" text="MENU" size="16|16" />
        </motion.button>
      )}

      {/* DESKTOP NAVBAR */}
      <nav className="hidden md:block w-full bg-nav-bg border-b-[3px] border-black relative">
        <div className="flex items-center justify-between md:justify-center md:gap-8 lg:gap-16 px-4 py-3">
          {/* LOGO SECTION */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 relative w-20 h-10 md:w-32 md:h-12 cursor-pointer"
            >
              <Image
                src="/images/bunny-logo.avif"
                alt="Bunnies Club Logo"
                pixelated={true}
                wrapperClassName="absolute -top-2 md:-top-6 -left-2 w-28 h-32 md:w-32 md:h-40 overflow-visible"
                className="!object-contain drop-shadow-[3px_3px_0px_rgba(0,0,0,0.6)]"
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
                  href={`/${item.toLowerCase() === "música" ? "music" : item.toLowerCase()}`}
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
            className="hidden md:block text-black border-[3px] border-black bg-gradient-to-r from-lang-from to-lang-to px-4 lg:px-6 py-1 rounded-full shadow-nav-small transition-colors duration-200"
          >
            <Jersey tag="span" text="ES/EN" size="18|22" />
          </motion.button>
        </div>
      </nav>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
