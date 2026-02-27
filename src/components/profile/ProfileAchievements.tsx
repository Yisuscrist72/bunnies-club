"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpaceText from "@/components/atoms/texts/SpaceText";
import ProfileSection from "./ProfileSection";
import { ALL_ACHIEVEMENTS } from "./constants";

interface ProfileAchievementsProps {
  points: number;
  hasBioBonus?: boolean;
}

function ProfileAchievements({ points, hasBioBonus }: ProfileAchievementsProps) {
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);

  const achievementsWithStatus = ALL_ACHIEVEMENTS.map(ach => ({
    ...ach,
    requirement: (ach.id === 'perfil' && hasBioBonus) ||
                (ach.id === 'explorador' && points >= 100) ||
                (ach.id === 'fan' && points >= 500) ||
                (ach.id === 'leyenda' && points >= 5000)
  }));

  return (
    <ProfileSection title="MIS LOGROS 🏆">
      <div className="flex flex-wrap gap-6 justify-center md:justify-start mb-8">
        {achievementsWithStatus.map((ach) => (
          <motion.button
            key={ach.id}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedAchievement(selectedAchievement === ach.id ? null : ach.id)}
            className={`flex flex-col items-center gap-2 transition-all ${ach.requirement ? "opacity-100" : "opacity-30 grayscale filter"}`}
          >
            <div className={`w-16 h-16 ${ach.color} border-2 border-black rounded-2xl flex items-center justify-center text-3xl shadow-[3px_3px_0px_#000] ${selectedAchievement === ach.id ? "ring-4 ring-v2k-pink-hot ring-offset-2" : ""}`}>
              {ach.icon}
            </div>
            <span className="text-[10px] font-black uppercase text-center">{ach.name}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-[3px] border-black rounded-2xl bg-v2k-gray-soft/10 relative">
              <button 
                type="button"
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-2 right-2 text-gray-400 hover:text-black"
                aria-label="Cerrar detalles"
              >
                ✕
              </button>
              <div className="flex items-center gap-4">
                <div className="text-4xl">
                  {achievementsWithStatus.find(a => a.id === selectedAchievement)?.icon}
                </div>
                <div>
                  <SpaceText 
                    text={achievementsWithStatus.find(a => a.id === selectedAchievement)?.name || ""} 
                    size="16|16" 
                    className="font-black text-black uppercase" 
                  />
                  <SpaceText 
                    text={achievementsWithStatus.find(a => a.id === selectedAchievement)?.description || ""} 
                    size="14|14" 
                    className="text-gray-600 font-bold" 
                  />
                  <div className="mt-2 text-[10px] font-black uppercase text-v2k-pink-hot">
                    {achievementsWithStatus.find(a => a.id === selectedAchievement)?.requirement 
                      ? "✅ ¡DESBLOQUEADO!" 
                      : "🔒 POR DESBLOQUEAR"}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ProfileSection>
  );
}

export default memo(ProfileAchievements);
