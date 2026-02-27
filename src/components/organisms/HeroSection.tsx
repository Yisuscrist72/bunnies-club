"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "../atoms/Image";
import Jersey from "../atoms/texts/Jersey";
import SpaceText from "../atoms/texts/SpaceText";
import Window from "../molecules/Window";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HeroSection() {
  const router = useRouter();
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hidePopup = localStorage.getItem("hideHeroPopup");
      if (hidePopup === "true") return;
    }

    const timer = setTimeout(() => setShowPopup(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = (shouldNavigate = false) => {
    if (dontShowAgain && typeof window !== "undefined") {
      localStorage.setItem("hideHeroPopup", "true");
    }
    setShowPopup(false);
    if (shouldNavigate) {
      router.push("/quiz");
    }
  };

  return (
    <>
      <section className="relative w-full h-80 md:h-120 border-[3px] border-black shadow-[8px_8px_0px_#000] flex items-center justify-center overflow-hidden rounded-xl bg-white">
        <Image
          src="/images/Image-Home.avif"
          alt="NewJeans Home"
          wrapperClassName="w-full h-full absolute inset-0 z-0"
          className="object-cover w-full h-full opacity-90"
          priority={true}
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4"
        >
          <h1 className="sticker-title text-[4.5rem] md:text-[6.5rem] lg:text-[10rem]">
            NEW JEANS
          </h1>
        </motion.div>
      </section>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            drag
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-10 right-10 z-150 cursor-grab active:cursor-grabbing touch-none"
          >
            <Window
              title="( NEWJEANS_MATCH.EXE )"
              onClose={handleClose}
            >
              <div className="flex flex-col items-center gap-4 p-5 min-w-[280px] bg-v2k-gray-med">
                <SpaceText
                  text="¿CUÁL SERÁ TU INTEGRANTE?"
                  size="12|12"
                  className="text-v2k-pink-hot font-bold italic tracking-tighter text-center"
                />

                <SpaceText
                  text="¿ESTÁS LISTA PARA EL DESAFÍO, BUNNY?"
                  size="14|14"
                  className="text-center font-bold text-black"
                />

                <div className="flex items-center gap-2 mt-2 self-start cursor-pointer hover:opacity-80 transition-opacity">
                  <input
                    type="checkbox"
                    id="dontShowAgain"
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                    className="w-4 h-4 border-2 border-black accent-v2k-pink-hot cursor-pointer"
                  />
                  <label
                    htmlFor="dontShowAgain"
                    className="text-[10px] font-bold text-black cursor-pointer uppercase tracking-tight"
                  >
                    No mostrar nunca más
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95, translateX: 2, translateY: 2 }}
                  className="mt-2 bg-v2k-accent border-[3px] border-black p-3 shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all relative"
                  onClick={() => handleClose(true)}
                  type="button"
                >
                  <div className="flex items-center gap-2">
                    <Jersey
                      text="INICIAR_TEST"
                      size="20|24"
                      className="text-black"
                    />
                      <span className="bg-v2k-pink-hot text-white text-[10px] font-black px-2 py-0.5 rounded-md border border-black shadow-[2px_2px_0px_#000]">
                        {user ? "+XP" : "🔒 +XP"}
                      </span>
                  </div>
                </motion.button>
              </div>
            </Window>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
