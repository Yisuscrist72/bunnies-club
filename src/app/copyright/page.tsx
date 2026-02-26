"use client";

import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Window from "@/components/molecules/Window";
import { motion } from "framer-motion";

export default function CopyrightPage() {
  const credits = [
    {
      id: "music",
      title: "MÚSICA Y AUDIOVISUAL",
      content: "Todos los derechos de audio, música y videos de NewJeans pertenecen a <strong>ADOR Co., Ltd.</strong> y <strong>HYBE Co., Ltd.</strong>. BUNNIES CLUB no posee ni reclama derechos sobre este material.",
      color: "bg-v2k-yellow-soft"
    },
    {
      id: "media",
      title: "IMÁGENES Y LOGOTIPOS",
      content: "Las imágenes, logotipos y nombres comerciales son propiedad exclusiva de sus respectivos dueños. Este sitio opera bajo el principio de <strong>Fair Use</strong> con fines recreativos y educativos.",
      color: "bg-v2k-pink-light"
    },
    {
      id: "dev",
      title: "DESARROLLO Y DISEÑO",
      content: "La arquitectura, código y diseño visual V2K de este sitio han sido creados por <strong>YISUSCRIST72</strong>. Inspirado en la estética digital de principios de los 2000.",
      color: "bg-v2k-accent"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Window title="COPYRIGHT_INFO.SYS" contentClassName="p-6 md:p-10 bg-white">
          <div className="flex flex-col gap-8">
            <header className="border-b-4 border-black pb-6 flex justify-between items-end">
              <div>
                <Jersey
                  text="AVISO LEGAL Y COPYRIGHT"
                  size="32|40"
                  className="text-black font-bold uppercase"
                />
                <SpaceText
                  text="VERIFICACIÓN DE ACTIVOS DIGITALES"
                  size="12|12"
                  className="text-black/60 font-bold"
                />
              </div>
              <div className="hidden md:block bg-black text-white px-3 py-1 font-jersey text-xl">
                NON-PROFIT_MODE
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {credits.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className={`${item.color} border-[3px] border-black p-4 shadow-[4px_4px_0px_#000]`}
                >
                  <Jersey
                    text={item.title}
                    size="18|22"
                    className="text-black font-bold mb-2 uppercase"
                  />
                  <SpaceText
                    text={item.content}
                    size="14|14"
                    className="text-black leading-tight"
                  />
                </motion.div>
              ))}
            </div>

            <section className="bg-v2k-blue-light border-[3px] border-black p-6 shadow-[6px_6px_0px_#000]">
              <Jersey
                text="EXTENSIÓN DE RESPONSABILIDAD"
                size="20|24"
                className="text-black font-bold mb-3 uppercase underline decoration-v2k-pink-light decoration-4"
              />
              <SpaceText
                text="BUNNIES CLUB es una plataforma independiente hecha por fans. No existe afiliación oficial, patrocinio ni respaldo por parte de ADOR, HYBE o las integrantes de NewJeans. Todo el contenido se utiliza con fines de homenaje a la cultura 'Bunny'."
                size="16|16"
                className="text-black leading-relaxed"
              />
            </section>

            <footer className="mt-4 pt-6 border-t-2 border-black/10 flex flex-col items-center gap-6">
              <SpaceText
                text="© 2026 BUNNIES CLUB - DESARROLLADO CON PASIÓN POR LA ESTÉTICA V2K"
                size="12|12"
                className="text-black/40 font-bold text-center uppercase tracking-widest"
              />
              
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                className="bg-black text-white px-8 py-3 font-jersey uppercase text-xl border-[3px] border-black shadow-[6px_6px_0px_var(--v2k-accent)] hover:bg-v2k-accent hover:text-black transition-all"
              >
                REGRESAR_AL_SISTEMA
              </motion.button>
            </footer>
          </div>
        </Window>
      </motion.div>
    </div>
  );
}

