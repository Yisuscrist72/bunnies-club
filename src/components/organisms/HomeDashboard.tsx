import Link from "next/link";
import React from "react";
import SpaceText from "../atoms/texts/SpaceText";
import FreebiesZone from "../molecules/FreebiesZone";
import MusicPlayer from "../molecules/MusicPlayer";

// Componente del módulo de Photocard con estilos Neo-Brutalistas
const PhotocardModule = () => (
  <div className="flex flex-col gap-2 items-center w-full">
    <SpaceText
      tag="h2"
      text="PHOTOCARD DECORATOR"
      size="18|22"
      className="font-bold uppercase tracking-widest text-black"
    />

    <Link href="/photocard-editor" className="w-full group">
      {/* - border-[3px] border-black: Restaura el borde grueso.
          - shadow-[8px_8px_0px_#000]: Sombra sólida negra.
          - active:translate-x-0.5...: Animación para dispositivos móviles al pulsar.
      */}
      <div
        className="w-full bg-gradient-to-br from-v2k-blue to-v2k-pink border-[3px] border-black p-3 shadow-[8px_8px_0px_#000] 
                      group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-none 
                      active:translate-x-1 active:translate-y-1 active:shadow-none
                      transition-all rounded-xl cursor-pointer"
      >
        {/* Contenedor interno blanco con bordes definidos */}
        <div className="bg-white border-[3px] border-black h-48 flex overflow-hidden">
          {/* Lado izquierdo: Visual de la Photocard */}
          <div className="w-1/2 border-r-[3px] border-black flex items-center justify-center bg-gray-100 opacity-20 text-4xl">
            👤
          </div>

          {/* Lado derecho: Información y Stickers */}
          <div className="w-1/2 bg-[#f9f9f9] p-2 flex flex-col">
            <SpaceText
              text="Stickers"
              size="12|12"
              className="font-bold border-b-[3px] border-black mb-1 pb-1 uppercase text-black"
            />

            <div className="grid grid-cols-3 gap-1 flex-grow items-center justify-items-center text-xl">
              {["🐰", "💖", "✨", "⭐", "🎀", "🎵"].map((s) => (
                <span
                  key={s}
                  className="drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Botón de acción interno */}
            <div
              className="w-full border-[3px] border-black bg-v2k-accent py-1 shadow-[3px_3px_0px_#000] 
                            group-hover:shadow-none active:shadow-none text-center mt-auto transition-all"
            >
              <SpaceText
                tag="span"
                text="IR AL EDITOR ➡️"
                size="12|12"
                className="font-bold text-black"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

// Dashboard Principal
export default function HomeDashboard() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-end mt-8 lg:mt-4">
      {/* Módulo del Editor de Photocards */}
      <PhotocardModule />

      {/* Reproductor de Música Central */}
      <div className="flex justify-center pb-4 lg:pb-0">
        <MusicPlayer />
      </div>

      {/* Zona de Recursos Gratuitos */}
      <FreebiesZone />
    </section>
  );
}
