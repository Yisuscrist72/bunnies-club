"use client";

import React from "react";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Window from "@/components/molecules/Window";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Window title="TERMS_OF_USE.EXE" contentClassName="p-8 bg-white">
          <div className="flex flex-col gap-6">
            <Jersey
              text="TÉRMINOS DE USO DEL BUNNIES CLUB"
              size="32|40"
              className="text-black font-bold uppercase underline decoration-v2k-accent underline-offset-8"
            />
            
            <SpaceText
              text="Al acceder al <strong>BUNNIES CLUB</strong>, el usuario acepta que este sitio es puramente recreativo y no oficial. Queda prohibida la redistribución comercial del contenido de este sitio sin permiso explícito de los titulares de los derechos originales (ADOR, HYBE)."
              size="16|16"
              className="text-black leading-relaxed"
            />
            
            <div className="bg-black/5 p-4 border-l-4 border-black font-space text-[14px]">
              <Jersey text="PROTOCOLO DE CONDUCTA:" size="16|16" className="font-bold underline mb-2" />
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Respetar a otros Bunnies.</li>
                <li>No realizar ataques contra las integrantes de NewJeans.</li>
                <li>Disfrutar de la estética V2K con moderación.</li>
              </ul>
            </div>
            
            <div className="flex justify-center mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                className="bg-v2k-pink-light text-black px-6 py-2 font-jersey uppercase text-lg border-[3px] border-black shadow-[4px_4px_0px_#000]"
              >
                ACEPTAR_PROTOCOLOS
              </motion.button>
            </div>
          </div>
        </Window>
      </motion.div>
    </div>
  );
}
