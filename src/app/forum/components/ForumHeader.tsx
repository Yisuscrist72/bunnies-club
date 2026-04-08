"use client";

import { motion } from "framer-motion";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import { useLanguage } from "@/context/LanguageContext";

interface ForumHeaderProps {
  onlineUsers: number;
}

export default function ForumHeader({ onlineUsers }: ForumHeaderProps) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-center mb-8 md:mb-12 relative"
    >
      <Jersey
        text={t.forum.title}
        size="44|80"
        className="text-black drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
      />
      <SpaceText
        text={t.forum.subtitle}
        size="16|16"
        className="font-bold tracking-[0.2em] text-black/60 md:size-[18|22]"
      />

      <div className="mt-4 flex items-center justify-center gap-2 bg-white/40 backdrop-blur-sm border-2 border-black px-4 py-1.5 shadow-[3px_3px_0px_#000]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <SpaceText
          text={`${onlineUsers} ${t.forum.online_count}`}
          size="12|12"
          className="font-black"
        />
      </div>
    </motion.div>
  );
}
