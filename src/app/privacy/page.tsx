"use client";

import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Window from "@/components/molecules/Window";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  const privacyModules = [
    {
      id: "data-collection",
      title: "EXTRACCIÓN DE DATOS",
      content: "Recopilamos información limitada para optimizar tu conexión: identificadores técnicos, preferencias de interfaz y logs de actividad necesarios para el funcionamiento de los retos Bunny.",
      color: "bg-v2k-blue-light"
    },
    {
      id: "firebase-storage",
      title: "CLOUD_STORAGE (FIREBASE)",
      content: "Tus perfiles y configuraciones se sincronizan de forma segura mediante <strong>Firebase Cloud Services</strong>. Los datos están encriptados y protegidos bajo protocolos de seguridad industrial.",
      color: "bg-v2k-pink-light"
    },
    {
      id: "cookies-cache",
      title: "COOKIES & CACHE",
      content: "Utilizamos almacenamiento local (IndexDB/LocalStorage) para que tu experiencia sea instantánea. No rastreamos tu actividad fuera del ecosistema del BUNNIES CLUB.",
      color: "bg-v2k-yellow-soft"
    },
    {
      id: "user-rights",
      title: "DERECHOS DEL NODO",
      content: "Como usuario, tienes derecho a solicitar la purga total de tus datos de nuestros servidores en cualquier momento a través de la configuración de tu perfil.",
      color: "bg-v2k-green-soft"
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
        <Window title="PRIVACY_MODULE.v2.LOG" contentClassName="p-6 md:p-10 bg-white">
          <div className="flex flex-col gap-8">
            <header className="border-b-4 border-black pb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <Jersey
                  text="PROTOCOLOS DE PRIVACIDAD"
                  size="32|40"
                  className="text-black font-bold uppercase"
                />
                <div className="flex gap-2 mt-1">
                  <span className="text-v2k-pink-hot font-space text-[12px] font-bold uppercase animate-pulse">● ENCRYPT_ACTIVE</span>
                  <span className="text-black/40 font-space text-[12px] font-bold uppercase">SEC_LEVEL: ALPHA</span>
                </div>
              </div>
              <div className="bg-v2k-accent border-2 border-black px-4 py-1 shadow-[3px_3px_0px_#000]">
                <Jersey text="GDPR_COMPLIANT" size="14|14" className="font-bold text-black" />
              </div>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {privacyModules.map((module) => (
                <motion.div
                  key={module.id}
                  whileHover={{ scale: 1.02, rotate: -0.5 }}
                  className={`${module.color} border-[3px] border-black p-5 shadow-[6px_6px_0px_#000]`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 bg-black rounded-full" />
                    <Jersey
                      text={module.title}
                      size="18|22"
                      className="text-black font-bold uppercase"
                    />
                  </div>
                  <SpaceText
                    text={module.content}
                    size="14|14"
                    className="text-black leading-relaxed"
                  />
                </motion.div>
              ))}
            </div>

            <section className="bg-black text-white p-6 border-[3px] border-black shadow-[6px_6px_0px_var(--v2k-accent)]">
              <Jersey
                text="COMPROMISO DE SEGURIDAD"
                size="16|16"
                className="text-v2k-accent font-bold mb-2 uppercase italic"
              />
              <SpaceText
                text="En BUNNIES CLUB tratamos tus datos como si fueran nuestros. No vendemos, alquilamos ni cedemos información a agencias externas. Tu privacidad es la base de nuestra infraestructura digital."
                size="14|14"
                className="text-white/80"
              />
            </section>
            
            <footer className="flex flex-col md:flex-row justify-between items-center gap-6 mt-4">
              <div className="flex flex-col">
                <SpaceText
                  text="ÚLTIMA ACTUALIZACIÓN DEL CÓDIGO:"
                  size="12|12"
                  className="text-black/40 font-bold"
                />
                <SpaceText
                  text="FEB_2026_VERSION_DEPLOY"
                  size="12|12"
                  className="text-black font-bold"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                className="bg-v2k-pink-light text-black px-10 py-3 font-jersey uppercase text-xl border-4 border-black shadow-[6px_6px_0px_#000] hover:bg-white transition-all w-full md:w-auto text-center"
              >
                CERRAR_SISTEMA
              </motion.button>
            </footer>
          </div>
        </Window>
      </motion.div>
    </div>
  );
}

