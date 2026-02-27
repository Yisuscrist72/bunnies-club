"use client";

import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Window from "@/components/molecules/Window";
import BackgroundDecorations from "@/components/atoms/BackgroundDecorations";

export default function QuizPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      <BackgroundDecorations />
      
      <Window title="BUNNIES_QUIZ.EXE" className="w-full max-w-xl relative z-10">
        <div className="flex flex-col items-center p-8 text-center gap-6">
          <div className="text-6xl animate-bounce">🧪</div>
          
          <Jersey text="PRÓXIMAMENTE" size="40|48" className="text-black" />
          
          <SpaceText 
            text="ESTAMOS PREPARANDO LOS TESTS MÁS DIFÍCILES PARA VER SI ERES UN VERDADERO TOKKI." 
            size="16|16" 
            className="font-bold text-black"
          />

          <div className="bg-v2k-pink-hot/10 border-2 border-black p-4 rounded-xl w-full">
            <span className="text-v2k-pink-hot font-black text-xs uppercase tracking-widest block mb-2">XP REWARDS ACTIVE</span>
            <p className="font-bold text-sm">
              Ganarás entre <span className="text-v2k-pink-hot">10 y 100 XP</span> por cada Quiz completado basado en tu puntuación.
            </p>
          </div>

          <button 
            type="button"
            onClick={() => window.history.back()}
            className="mt-4 bg-white border-[3px] border-black px-8 py-3 font-bold shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none transition-all"
          >
            VOLVER ATRÁS
          </button>
        </div>
      </Window>
    </div>
  );
}
