"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Window from "@/components/molecules/Window";
import SpaceText from "@/components/atoms/texts/SpaceText";
import type { PollOption } from "../hooks/useForum";

interface ForumPollProps {
  pollOptions: PollOption[];
  hasVoted: boolean;
  handleVote: (id: string) => void;
  user: { uid: string } | null;
}

export default function ForumPoll({ pollOptions, hasVoted, handleVote, user }: ForumPollProps) {
  return (
    <div className="lg:col-span-3">
      <Window title="✨ POLL" className="w-full border-[3px]">
        <div className="flex flex-col gap-3 p-2 text-center">
          <SpaceText text="¿Canción fav. Newjeans?" size="14|14" className="font-black mb-1 md:text-[16|16]" />
          
          <div className="flex flex-col gap-1.5 px-1 md:px-0">
            {pollOptions.map((opt) => {
              const totalVotes = pollOptions.reduce((acc, curr) => acc + (curr.votes || 0), 0);
              const percentage = totalVotes > 0 ? Math.round(((opt.votes || 0) / totalVotes) * 100) : 0;
              
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleVote(opt.id)}
                  disabled={hasVoted}
                  className={`
                    relative overflow-hidden w-full p-2.5 md:p-3 border-2 border-black text-left transition-all
                    ${hasVoted ? "bg-white" : "hover:bg-v2k-accent bg-white shadow-[2px_2px_0px_#000] md:shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-none"}
                    disabled:cursor-default
                  `}
                >
                  {/* Progress Bar Background */}
                  {hasVoted && (
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      className="absolute inset-0 bg-v2k-accent/30 pointer-events-none"
                    />
                  )}
                  
                  <div className="relative z-10 flex justify-between items-center group">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-black flex items-center justify-center bg-white ${hasVoted && "border-v2k-accent"}`}>
                         {hasVoted && <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-black" />}
                      </div>
                      <span className="font-bold text-[11px] md:text-sm uppercase tracking-tighter">{opt.label}</span>
                    </div>
                    {hasVoted && (
                      <span className="text-[10px] font-black opacity-60">{percentage}%</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {!user && (
              <p className="text-[8px] font-bold opacity-50 uppercase mt-1">
                  * Loguéate para votar
              </p>
          )}
          {hasVoted && (
              <div className="mt-2 flex flex-col items-center gap-1">
                  <CheckCircle2 className="text-v2k-green-hover" size={20} />
                  <SpaceText text="VOTO REGISTRADO" size="12|12" className="font-black text-v2k-green-hover" />
              </div>
          )}
        </div>
      </Window>

      {/* Reglas del Foro / Conducta */}
      <div className="mt-6 md:mt-8 bg-black/5 border-2 border-dashed border-black/20 p-4 rounded-lg">
          <p className="text-[10px] font-black uppercase tracking-wider mb-2 text-center opacity-60">
             📜 REGLAS DE CONDUCTA
          </p>
          <ul className="text-[9px] font-bold uppercase space-y-1 opacity-50 list-disc list-inside">
            <li>Respeta a todos los Bunnies</li>
            <li>No compartas contenido inapropiado</li>
            <li>Evita el spam y mensajes repetitivos</li>
            <li>Disfruta y apoya a NewJeans ✨</li>
          </ul>
      </div>
    </div>
  );
}
