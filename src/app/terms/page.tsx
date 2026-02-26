"use client";

import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Window from "@/components/molecules/Window";
import { motion } from "framer-motion";

export default function TermsPage() {
  const sections = [
    {
      id: "acceptance",
      title: "1. ACEPTACIÓN DEL PROTOCOLO",
      content: "Al acceder a BUNNIES CLUB, te unes a una red digital dedicada al apoyo de NewJeans. Al usar este sitio, aceptas cumplir con nuestros protocolos de operación. Si no estás de acuerdo con estos términos, deberás desconectarte del servidor inmediatamente.",
      color: "bg-v2k-blue-light"
    },
    {
      id: "auth",
      title: "2. CUENTAS Y SEGURIDAD (SYSTEM_AUTH)",
      content: "Para acceder a funciones avanzadas, el sistema podrá requerir la creación de un perfil Bunny. Utilizamos servicios de autenticación de alta seguridad (Firebase). Eres responsable de mantener la confidencialidad de tu acceso y de todas las actividades que ocurran bajo tu perfil.",
      color: "bg-v2k-yellow-soft"
    },
    {
      id: "privacy",
      title: "3. DATOS Y PRIVACIDAD (CLOUD_DATA)",
      content: "Tus datos (como favoritos, interacciones y preferencias) se almacenan en nuestra base de datos en la nube para mejorar tu experiencia. No vendemos tu información a terceros. Al interactuar con el 'Bunnies Club', autorizas el procesamiento de estos datos técnicos para el funcionamiento óptimo de la interfaz.",
      color: "bg-v2k-green-soft"
    },
    {
      id: "conduct",
      title: "4. CÓDIGO DE CONDUCTA",
      content: "Nuestra comunidad se basa en el respeto. Queda estrictamente prohibido el uso de la plataforma para difundir odio, spam o realizar ataques contra las integrantes de NewJeans o cualquier miembro de la comunidad. El incumplimiento resultará en la terminación inmediata del acceso.",
      color: "bg-v2k-pink-light"
    },
    {
      id: "third-party",
      title: "5. CONTENIDO DE TERCEROS",
      content: "Este sitio contiene enlaces, música y visuales que son propiedad de ADOR y HYBE. Este es un proyecto recreativo sin fines comerciales. Reconocemos y respetamos todos los derechos de autor originales.",
      color: "bg-white"
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
        <Window title="TERMS_v2.0.EXE" contentClassName="p-6 md:p-10 bg-white">
          <div className="flex flex-col gap-8">
            <header className="border-b-4 border-black pb-6 flex flex-col gap-2">
              <Jersey
                text="TÉRMINOS DE USO Y PROTOCOLOS"
                size="32|40"
                className="text-black font-bold uppercase"
              />
              <div className="flex gap-2">
                <span className="bg-black text-white px-2 py-1 font-space text-[12px] uppercase">Estado: ACTIVO</span>
                <span className="bg-v2k-accent text-black px-2 py-1 font-space text-[12px] uppercase font-bold">Versión: 2026.1</span>
              </div>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  whileHover={{ x: 5, y: -5 }}
                  className={`${section.color} border-[3px] border-black p-5 shadow-[6px_6px_0px_#000] transition-all`}
                >
                  <Jersey
                    text={section.title}
                    size="18|22"
                    className="text-black font-bold mb-3 uppercase"
                  />
                  <SpaceText
                    text={section.content}
                    size="14|14"
                    className="text-black leading-relaxed"
                  />
                </motion.div>
              ))}
            </div>

            <div className="bg-black text-v2k-accent p-6 border-[3px] border-black shadow-[6px_6px_0px_var(--v2k-pink-light)]">
               <SpaceText
                  text="AL PULSAR EL BOTÓN DE ABAJO, CONFIRMAS QUE HAS LEÍDO Y ACEPTADO TODOS LOS PROTOCOLOS DE SEGURIDAD Y PRIVACIDAD DEL BUNNIES CLUB. TU NODO DE ACCESO SERÁ REGISTRADO."
                  size="14|14"
                  className="font-bold text-center italic"
                />
            </div>
            
            <div className="flex justify-center mt-4">
              <motion.button
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.history.back()}
                className="bg-v2k-accent text-black px-10 py-4 font-jersey uppercase text-2xl border-4 border-black shadow-[8px_8px_0px_#000] hover:bg-white transition-colors"
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

