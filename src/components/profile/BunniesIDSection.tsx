"use client";

import { useRef } from "react";
import Jersey from "@/components/atoms/texts/Jersey";
import BunniesClubID from "@/components/molecules/BunniesClubID";
import type { UserProfile } from "@/context/AuthContext";
import { domToPng } from "modern-screenshot";

interface BunniesIDSectionProps {
  profile: UserProfile;
}

export default function BunniesIDSection({ profile }: BunniesIDSectionProps) {
  const idCardRef = useRef<HTMLDivElement>(null);
  
  const handleDownloadID = async () => {
    if (!idCardRef.current) return;
    try {
      const dataUrl = await domToPng(idCardRef.current, { scale: 3 });
      const link = document.createElement('a');
      link.download = `BunniesClub_ID_${profile.displayName.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating ID card:", err);
      alert("Error al generar el carnet de socio");
    }
  };

  return (
    <div className="mb-12 border-[3px] border-black p-4 md:p-6 rounded-3xl bg-v2k-pink-soft/30 shadow-[6px_6px_0px_#000] flex flex-col items-center gap-6 overflow-hidden">
      <Jersey text="TU CARNET DE BUNNY ID 🆔" size="20|24" className="text-black text-center" />
      
      <div className="w-full flex justify-center -my-8 sm:my-0">
        <div className="scale-[0.6] min-[400px]:scale-[0.75] sm:scale-95 md:scale-100 origin-center">
          <BunniesClubID profile={profile} ref={idCardRef} />
        </div>
      </div>

      <div className="w-full max-w-sm flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleDownloadID}
          className="w-full bg-v2k-accent border-[3px] border-black px-8 py-3 font-bold shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 hover:bg-v2k-accent/90"
        >
          <span>DESCARGAR PARA COMPARTIR</span>
          <span>📸</span>
        </button>
        
        {(!profile.hasBioBonus || profile.points < 100) && (
          <p className="text-[10px] font-bold text-gray-500 text-center uppercase">
            ⚠️ Necesitas +100 XP y Perfil Completo para estar verificado
          </p>
        )}
      </div>
    </div>
  );
}
