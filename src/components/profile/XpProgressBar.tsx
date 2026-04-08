"use client";
import { memo } from "react";
import Jersey from "@/components/atoms/texts/Jersey";
import { useLanguage } from "@/context/LanguageContext";

interface XpProgressBarProps {
  points: number;
}

function XpProgressBar({ points }: XpProgressBarProps) {
  const { t } = useLanguage();

  const getProgress = (pts: number) => {
    if (pts < 100) return pts;
    if (pts < 500) return (pts - 100) / 4;
    if (pts < 1500) return (pts - 500) / 10;
    if (pts < 5000) return (pts - 1500) / 35;
    return 100;
  };

  const getNextRank = (pts: number) => {
    if (pts < 100) return `${t.profile.xp_bar.next}: TOKKI`;
    if (pts < 500) return `${t.profile.xp_bar.next}: FANATIC`;
    if (pts < 1500) return `${t.profile.xp_bar.next}: SUPER SHY`;
    if (pts < 5000) return `${t.profile.xp_bar.next}: LEGEND`;
    return t.profile.xp_bar.max_level;
  };

  return (
    <div className="mt-6 max-w-xs mx-auto md:mx-0">
      <div className="flex justify-between items-end mb-2">
        <Jersey
          text={`${t.profile.xp_bar.xp_label} ${points}`}
          size="16|16"
          className="text-black"
        />
        <Jersey
          text={getNextRank(points)}
          size="12|12"
          className="text-gray-500"
        />
      </div>
      <div className="w-full h-4 bg-gray-200 border-2 border-black rounded-full overflow-hidden shadow-[2px_2px_0px_#000]">
        <div
          className="h-full bg-v2k-pink-hot transition-all duration-1000"
          style={{ width: `${Math.min(100, getProgress(points))}%` }}
        />
      </div>
    </div>
  );
}

export default memo(XpProgressBar);
