"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Window from "@/components/molecules/Window";
import type { MemberInfo, MemberKey } from "@/data/quiz-data";
import { MEMBERS } from "@/data/quiz-data";
import type { User } from "firebase/auth";

interface QuizResultProps {
  memberKey: MemberKey;
  matchPercentage: number;
  allScores: Record<MemberKey, number>;
  totalQuestions: number;
  user: User | null;
  onReset: () => void;
}

function ScoreBar({ member, score, total, isWinner }: {
  member: MemberInfo;
  score: number;
  total: number;
  isWinner: boolean;
}) {
  const pct = Math.round((score / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-lg shrink-0">{member.emoji}</span>
      <span className={`text-xs font-black w-16 shrink-0 ${isWinner ? "text-black" : "text-black/50"}`}>
        {member.name}
      </span>
      <div className="flex-1 h-3 bg-black/10 border border-black/20 overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: isWinner ? member.accent : `${member.accent}70` }}
        />
      </div>
      <span className={`text-xs font-black w-8 text-right shrink-0 ${isWinner ? "text-black" : "text-black/40"}`}>
        {pct}%
      </span>
    </div>
  );
}

export default function QuizResult({
  memberKey,
  matchPercentage,
  allScores,
  totalQuestions,
  user,
  onReset,
}: QuizResultProps) {
  const member = MEMBERS[memberKey];
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Bunnies Match",
      text: `¡Soy un ${matchPercentage}% match con ${member.name} en Bunnies Club! 🐰💖 Haz el test aquí:`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error("Error al compartir:", err);
    }
  };

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl relative z-10"
    >
      <Window title="✨ MATCH_COMPLETO.EXE ✨" className="scanlines">
        {/* Banner superior con gradiente del personaje */}
        <div
          className="relative flex flex-col items-center justify-center p-8 gap-4 overflow-hidden border-b-2 border-black"
          style={{ background: member.gradient }}
        >
          {/* Polka dots */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          {/* Etiqueta */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black text-white text-[10px] font-black px-4 py-1 tracking-[0.2em] uppercase"
          >
            TE PARECES A...
          </motion.div>

          {/* Nombre con emoji principal */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-center"
          >
            <div className="text-6xl mb-2">{member.emoji}</div>
            <Jersey text={member.name} size="68|94" className="text-black leading-none" />
            <p className="font-black text-sm mt-1 text-black/60 uppercase tracking-widest">
              {member.tagline}
            </p>
          </motion.div>

          {/* Porcentaje de match */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="bg-white border-[3px] border-black shadow-[4px_4px_0px_#000] px-6 py-3 flex items-center gap-3"
          >
            <span className="text-2xl">💘</span>
            <Jersey
              text={`${matchPercentage}% MATCH`}
              size="32|40"
              className="text-black"
            />
          </motion.div>
        </div>

        {/* Contenido del resultado */}
        <div className="flex flex-col gap-6 p-6 md:p-8 bg-white">
          {/* Imagen grande de la integrante */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, type: "spring", stiffness: 180 }}
            className="relative w-full aspect-4/3 border-4 border-black shadow-[8px_8px_0px_#000] overflow-hidden"
            style={{ backgroundColor: member.bg }}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              quality={100}
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover object-center"
              priority
            />
            {/* Overlay degradado inferior con nombre */}
            <div
              className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
              <div>
                <Jersey text={member.name} size="40|48" className="text-white leading-none" />
                <p className="text-white/80 text-xs font-bold uppercase tracking-widest mt-0.5">
                  {member.tagline}
                </p>
              </div>
              <div
                className="text-5xl drop-shadow-lg"
                style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))" }}
              >
                {member.emoji}
              </div>
            </div>
            {/* Sticker de % match */}
            <div
              className="absolute top-3 right-3 border-[3px] border-black shadow-[3px_3px_0px_#000] bg-white px-3 py-1 rotate-2"
            >
              <Jersey
                text={`${matchPercentage}% MATCH`}
                size="16|16"
                className="text-black"
              />
            </div>
          </motion.div>

          {/* Descripción */}
          <motion.blockquote
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55 }}
            className="border-l-4 pl-4 py-1"
            style={{ borderColor: member.accent }}
          >
            <p className="font-bold text-sm leading-relaxed text-black/80 italic">
              &ldquo;{member.description}&rdquo;
            </p>
          </motion.blockquote>

          {/* Desglose de puntuaciones */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="border-2 border-black p-4 bg-v2k-gray-soft"
          >
            <SpaceText
              text="DESGLOSE DE TU COMPATIBILIDAD"
              size="12|12"
              className="font-black tracking-widest text-black/50 mb-4 uppercase"
            />
            <div className="flex flex-col gap-2">
              {(Object.keys(MEMBERS) as MemberKey[]).map((key) => (
                <ScoreBar
                  key={key}
                  member={MEMBERS[key]}
                  score={allScores[key]}
                  total={totalQuestions}
                  isWinner={key === memberKey}
                />
              ))}
            </div>
          </motion.div>

          {/* XP reward */}
          {user && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-3 bg-v2k-green-soft border-2 border-black p-3 shadow-v2k-xs"
            >
              <span className="text-2xl">⚡</span>
              <div>
                <SpaceText text="+50 XP REWARD CLAIMED!" size="12|12" className="font-black text-black" />
                <p className="text-[10px] font-bold text-black/50">Quiz completado · Bonus de primera vez</p>
              </div>
            </motion.div>
          )}

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <motion.button
              type="button"
              onClick={onReset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-3 bg-white border-[3px] border-black font-bold text-sm shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all hover:bg-v2k-yellow"
            >
              🔄 VOLVER A JUGAR
            </motion.button>
            <motion.button
              type="button"
              onClick={handleShare}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-3 text-white border-[3px] border-black font-bold text-sm shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
              style={{ backgroundColor: copied ? "#2ECC71" : member.accent }}
            >
              {copied ? "✅ ¡COPIADO!" : "📤 COMPARTIR RESULTADO"}
            </motion.button>
          </div>
        </div>
      </Window>
    </motion.div>
  );
}
