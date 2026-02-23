import React from "react";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";

export default function ComingSoonBanner() {
  return (
    <div className="w-full mt-4 border-4 border-black rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden bg-v2k-yellow-soft">
      {/* Rayas decorativas en el banner */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)",
          backgroundSize: "10px 10px",
        }}
      />

      <div className="bg-white border-[3px] border-black px-8 py-5 text-center shadow-v2k-sm z-10 -rotate-1 max-w-lg w-full">
        <div className="text-4xl mb-3 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
          🚧 🔒 🚧
        </div>
        <Jersey
          tag="h3"
          text="NUEVAS PHOTOCARDS EN CAMINO"
          size="20|24"
          className="text-black"
        />
        <SpaceText
          text="Estamos en búsqueda de más y creando nuevos diseños. ¡Vuelve pronto!"
          size="14|14"
          className="font-bold text-black/60 mt-2 uppercase tracking-widest"
        />
      </div>
    </div>
  );
}
