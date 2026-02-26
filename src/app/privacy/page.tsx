"use client";

import React from "react";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Window from "@/components/molecules/Window";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Window title="PRIVACY_POLICY.TXT" contentClassName="p-8 bg-white">
          <div className="flex flex-col gap-6">
            <Jersey
              text="POLÍTICA DE PRIVACIDAD"
              size="32|40"
              className="text-black font-bold uppercase underline decoration-v2k-pink-hot underline-offset-8"
            />
            
            <SpaceText
              text="No recopilamos ni almacenamos datos personales de los usuarios en nuestros servidores. <strong>BUNNIES CLUB</strong> solo utiliza el almacenamiento local (localStorage) de su navegador para recordar preferencias visuales (como la configuración del popup de bienvenida)."
              size="16|16"
              className="text-black leading-relaxed"
            />
            
            <SpaceText
              text="Cualquier interacción en el foro o durante los desafíos se procesa de forma efímera en la mayoría de sus partes."
              size="16|16"
              className="text-black leading-relaxed"
            />
            
            <div className="flex justify-center mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                className="bg-v2k-accent text-black px-6 py-2 font-jersey uppercase text-lg border-[3px] border-black shadow-[4px_4px_0px_#000]"
              >
                CERRAR_SISTEMA
              </motion.button>
            </div>
          </div>
        </Window>
      </motion.div>
    </div>
  );
}
