"use client";

import React from "react";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Window from "@/components/molecules/Window";
import { motion } from "framer-motion";

export default function CopyrightPage() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Window title="COPYRIGHT_INFO.SYS" contentClassName="p-8 bg-white">
          <div className="flex flex-col gap-8">
            <header className="border-b-4 border-black pb-4">
              <Jersey
                text="AVISO LEGAL Y DERECHOS DE AUTOR"
                size="32|40"
                className="text-black font-bold uppercase"
              />
            </header>

            <section className="flex flex-col gap-4">
              <div className="bg-v2k-yellow-soft border-[3px] border-black p-4 shadow-[4px_4px_0px_#000]">
                <Jersey
                  text="MÚSICA Y CONTENIDO AUDIOVISUAL"
                  size="20|24"
                  className="text-black font-bold mb-2 uppercase"
                />
                <SpaceText
                  text="Todos los derechos de audio, música y videos de NewJeans pertenecen a <strong>ADOR Co., Ltd.</strong> y <strong>HYBE Co., Ltd.</strong>. Este sitio web es un proyecto sin fines de lucro creado por fans para la comunidad (Bunnies)."
                  size="16|16"
                  className="text-black leading-relaxed"
                />
              </div>

              <div className="bg-v2k-pink-light border-[3px] border-black p-4 shadow-[4px_4px_0px_#000]">
                <Jersey
                  text="IMÁGENES Y MARCAS REGISTRADAS"
                  size="20|24"
                  className="text-black font-bold mb-2 uppercase"
                />
                <SpaceText
                  text="Las imágenes, logotipos y nombres comerciales de NewJeans son propiedad exclusiva de sus respectivos dueños. El uso de estos materiales en este sitio web se hace bajo el principio de 'Uso Legítimo' (Fair Use) con fines de entretenimiento y homenaje."
                  size="16|16"
                  className="text-black leading-relaxed"
                />
              </div>

              <div className="bg-v2k-accent border-[3px] border-black p-4 shadow-[4px_4px_0px_#000]">
                <Jersey
                  text="DESARROLLO"
                  size="20|24"
                  className="text-black font-bold mb-2 uppercase"
                />
                <SpaceText
                  text="El diseño y código de <strong>BUNNIES CLUB</strong> ha sido desarrollado por <strong>YISUSCRIST72</strong>. El estilo visual está inspirado en la estética Neo-Brutalista y la cultura digital de los años 2000 (V2K)."
                  size="16|16"
                  className="text-black leading-relaxed"
                />
              </div>
            </section>

            <footer className="mt-4 pt-4 border-t-2 border-black/10 flex flex-col gap-2">
              <SpaceText
                text="© 2026 BUNNIES CLUB - NO AFILIADO OFICIALMENTE CON ADOR O HYBE."
                size="12|12"
                className="text-black/60 font-bold text-center"
              />
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.history.back()}
                  className="bg-black text-white px-6 py-2 font-jersey uppercase text-lg border-[3px] border-black hover:bg-white hover:text-black transition-colors"
                >
                  VOLVER_ATRÁS
                </motion.button>
              </div>
            </footer>
          </div>
        </Window>
      </motion.div>
    </div>
  );
}
