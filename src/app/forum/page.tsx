"use client";

import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Window from "@/components/molecules/Window";
import BackgroundDecorations from "@/components/atoms/BackgroundDecorations";

export default function ForumPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <BackgroundDecorations />
      
      <Window title="BUNNIES_FORUM.SYS" className="w-full max-w-2xl relative z-10">
        <div className="flex flex-col items-center p-8 text-center gap-6">
          <div className="text-6xl animate-pulse">💬</div>
          
          <Jersey text="BUNNIES FORUM" size="40|48" className="text-black" />
          
          <SpaceText 
            text="EL ESPACIO PARA COMPARTIR TUS DECORACIONES, TEORÍAS Y AMOR POR NEWJEANS." 
            size="16|16" 
            className="font-bold text-black"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="bg-v2k-blue/10 border-2 border-black p-4 rounded-xl flex flex-col items-center">
                <span className="text-2xl mb-2">📥</span>
                <p className="font-bold text-xs uppercase mb-1">Publicar Post</p>
                <span className="bg-v2k-pink-hot text-white text-[9px] font-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000]">+30 XP</span>
            </div>
            <div className="bg-v2k-accent/10 border-2 border-black p-4 rounded-xl flex flex-col items-center">
                <span className="text-2xl mb-2">💬</span>
                <p className="font-bold text-xs uppercase mb-1">Comentar</p>
                <span className="bg-v2k-pink-hot text-white text-[9px] font-black px-2 py-0.5 rounded shadow-[1px_1px_0px_#000]">+10 XP</span>
            </div>
          </div>

          <p className="opacity-50 font-bold text-[10px] uppercase tracking-tighter">
            * El foro está en mantenimiento para asegurar una navegación 100% segura para los Bunnies.
          </p>

          <button 
            type="button"
            onClick={() => window.history.back()}
            className="mt-4 bg-white border-[3px] border-black px-8 py-3 font-bold shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none transition-all"
          >
            VOLVER AL MENÚ
          </button>
        </div>
      </Window>
    </div>
  );
}
