"use client";
import { motion } from "framer-motion";
import React from "react";
import {
  IconFacebook,
  IconInstagram,
  IconSpotify,
  IconX,
} from "../atoms/icons/SocialIcons";
import Jersey from "../atoms/texts/Jersey";
import SpaceText from "../atoms/texts/SpaceText";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#BEE5FD] border-t-[3px] border-black py-10 md:py-16 mt-20 md:mt-32 z-0 relative overflow-hidden">
      {/* Fondo decorativo con logo BUNNIES CLUB */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
        <span className="font-jersey text-[8rem] md:text-[14rem] leading-none text-black whitespace-nowrap font-bold tracking-tighter">
          BUNNIES CLUB
        </span>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-black animate-pulse" />
              <Jersey
                tag="span"
                text="BUNNIES_CLUB.SYS"
                size="32|40"
                className="text-black font-bold"
              />
            </div>

            <div className="flex flex-col gap-5">
              <SpaceText
                text="ESTE NODO ES EL PUNTO DE ENCUENTRO DEFINITIVO PARA LA COMUNIDAD GLOBAL DE NEWJEANS."
                size="18|22"
                className="text-black font-bold leading-tight uppercase"
              />

              <div className="flex flex-col gap-4">
                <SpaceText
                  text="BUNNIES CLUB HA SIDO DISEÑADO COMO UNA INTERFAZ DE NAVEGACIÓN TEMPORAL QUE CONECTA EL ESTILO VISUAL DE LOS AÑOS 2000 CON EL SONIDO REVOLUCIONARIO DEL PRESENTE."
                  size="16|16"
                  className="text-black font-medium leading-relaxed"
                />

                <SpaceText
                  text="NUESTRO SISTEMA PERMITE ACCEDER A BASES DE DATOS DE MÚSICA, DESAFÍOS DE CONOCIMIENTO (QUIZZES), UNA TIENDA DE ARTEFACTOS EXCLUSIVOS Y UN FORO DE DISCUSIÓN. VERSIÓN 1.0 DEL PROTOCOLO."
                  size="12|12"
                  className="text-black/80 max-w-[600px] leading-snug"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 items-start md:items-end justify-start">
            <div className="flex flex-col gap-4 items-start md:items-end">
              <Jersey
                tag="h4"
                text="CONEXIONES_EXTERNAS"
                size="20|24"
                className="text-black font-bold underline decoration-pink-500 underline-offset-8"
              />
              <div className="flex gap-4">
                {[
                  { icon: <IconInstagram className="w-6 h-6" />, key: "ig" },
                  { icon: <IconSpotify className="w-6 h-6" />, key: "spotify" },
                  { icon: <IconX className="w-6 h-6" />, key: "x" },
                  { icon: <IconFacebook className="w-6 h-6" />, key: "fb" },
                ].map((item) => (
                  <motion.div
                    key={item.key}
                    whileHover={{ scale: 1.1, backgroundColor: "#FFF" }}
                    whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px #000" }}
                    transition={{ duration: 0.1 }}
                    className="w-12 h-12 bg-white border-[3px] border-black flex items-center justify-center shadow-[4px_4px_0px_#000] cursor-pointer text-black"
                  >
                    {item.icon}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-5 w-full">
              <div className="flex flex-col items-start md:items-end border-l-4 md:border-l-0 md:border-r-4 border-black pl-4 md:pl-0 md:pr-4 py-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                  <Jersey
                    tag="span"
                    text="ESTADO: SISTEMA OPERATIVO ONLINE"
                    size="14|14"
                    className="text-black font-bold"
                  />
                </div>
                <Jersey
                  tag="span"
                  text="LOCALIZACIÓN: NODO_CENTRAL_NJ"
                  size="12|12"
                  className="text-black opacity-60"
                />
                <Jersey
                  tag="span"
                  text="ÚLTIMA_ACTUALIZACIÓN: 2026.02.19"
                  size="12|12"
                  className="text-black opacity-60"
                />
              </div>

              <div className="flex flex-col items-start md:items-end gap-8">
                <motion.button
                    onClick={scrollToTop}
                    initial={{ backgroundColor: "#FFF", color: "#000" }}
                    whileHover={{
                    backgroundColor: "#000",
                    color: "#FFF",
                    scale: 1.05,
                    }}
                    whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px #000" }}
                    transition={{ duration: 0.1, ease: "linear" }}
                    className="px-8 py-2 border-[3px] border-black shadow-[4px_4px_0px_#000] flex items-center justify-center bg-white"
                >
                    <Jersey tag="span" text="VOLVER_ARRIBA ▲" size="14|14" />
                </motion.button>

                {/* SECCIÓN DE CONTACTO CON SPACETEXT PARA MAYOR LEGIBILIDAD */}
                <div className="flex flex-col items-start md:items-end gap-1.5">
                    <SpaceText 
                        text="CONTACTANOS:" 
                        size="14|14" 
                        className="text-black opacity-50 uppercase tracking-widest font-bold"
                    />
                    <a href="mailto:contact.bunnies.dev@gmail.com" className="hover:text-pink-600 transition-colors duration-200">
                        <SpaceText 
                            text="contact.bunnies.dev@gmail.com" 
                            size="14|14" 
                            className="text-black font-bold lowercase tracking-tighter underline underline-offset-4 decoration-black/10"
                        />
                    </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t-[3px] border-black flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Jersey
              tag="p"
              text="© 2026 NEWJEANS FANS CLUB. MADE BY JESÚS."
              size="14|14"
              className="text-black font-bold tracking-tight"
            />
            <Jersey
              tag="p"
              text="TODOS LOS DERECHOS RESERVADOS_V1.0"
              size="12|12"
              className="text-black/50"
            />
          </div>

          <div className="flex gap-8">
            <Jersey
              tag="span"
              text="PRIVACY_POLICY.TXT"
              size="12|12"
              className="text-black opacity-60 cursor-pointer hover:opacity-100 hover:underline transition-all"
            />
            <Jersey
              tag="span"
              text="TERMS_OF_USE.EXE"
              size="12|12"
              className="text-black opacity-60 cursor-pointer hover:opacity-100 hover:underline transition-all"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}