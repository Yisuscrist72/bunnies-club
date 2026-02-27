"use client";

import { memo } from "react";
import Jersey from "@/components/atoms/texts/Jersey";

interface XPGuideProps {
  streak?: number;
}

function XPGuide({ streak }: XPGuideProps) {
  const guideItems = [
    { text: "Completar tu perfil", xp: "+100" },
    { text: "Crear photocards", xp: "+50" },
    { text: "Hacer Quizzes", xp: "+XP var." },
    { text: "Login diario", xp: streak && streak >= 5 ? "+40 (x2 🔥)" : "+20" },
  ];

  return (
    <div className="mb-12 border-[3px] border-black p-6 rounded-3xl bg-v2k-cyan-soft shadow-[4px_4px_0px_#000]">
      <Jersey text="CÓMO GANAR XP 🚀" size="20|24" className="mb-4 text-black" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {guideItems.map((item) => (
          <div key={item.text} className="flex justify-between items-center bg-white/50 border-2 border-black/10 px-4 py-2 rounded-xl">
            <span className="font-bold text-sm">{item.text}</span>
            <span className="bg-v2k-pink-hot text-white text-[10px] font-black px-2 py-1 rounded-lg">{item.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(XPGuide);
