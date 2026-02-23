import Link from "next/link";
import React from "react";
import SpaceText from "../atoms/texts/SpaceText";
import FreebiesZone from "../molecules/FreebiesZone";
import MusicPlayer from "../molecules/MusicPlayer";

// Constante interna para el Photocard
const PhotocardModule = () => (
  <div className="flex flex-col gap-2 items-center w-full">
    <SpaceText
      tag="h2"
      text="PHOTOCARD DECORATOR"
      size="18|22"
      className="font-bold uppercase tracking-widest text-black"
    />
    {/* ¡AQUÍ ESTÁ LA RUTA ACTUALIZADA! */}
    <Link href="/photocard-editor" className="w-full group">
      <div className="w-full bg-gradient-to-br from-v2k-blue to-v2k-pink y2k-card p-3 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
        <div className="bg-white border border-black h-48 flex">
          <div className="w-1/2 border-r border-black flex items-center justify-center bg-gray-100 opacity-20 text-4xl">
            👤
          </div>
          <div className="w-1/2 bg-[#f9f9f9] p-2 flex flex-col">
            <SpaceText
              text="Stickers"
              size="12|12"
              className="font-bold border-b border-black mb-1 pb-1 uppercase"
            />
            <div className="grid grid-cols-3 gap-1 flex-grow items-center justify-items-center text-xl">
              {["🐰", "💖", "✨", "⭐", "🎀", "🎵"].map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
            <div className="w-full border-2 border-black bg-v2k-accent py-1 shadow-[2px_2px_0px_var(--v2k-shadow)] text-center mt-auto">
              <SpaceText
                tag="span"
                text="IR AL EDITOR ➡️"
                size="12|12"
                className="font-bold"
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default function HomeDashboard() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-8 items-end mt-8 lg:mt-4">
      <PhotocardModule />

      <div className="flex justify-center pb-4 lg:pb-0">
        <MusicPlayer />
      </div>

      <FreebiesZone />
    </section>
  );
}