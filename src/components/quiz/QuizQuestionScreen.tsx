"use client";

import { motion } from "framer-motion";
import Jersey from "@/components/atoms/texts/Jersey";
import Window from "@/components/molecules/Window";
import type { QuizQuestion } from "@/data/quiz-data";
import type { MemberKey } from "@/data/quiz-data";
import { useLanguage } from "@/context/LanguageContext";

interface QuizQuestionScreenProps {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  onAnswer: (member: MemberKey) => void;
}

const OPTION_COLORS = [
  "hover:bg-v2k-blue/40 hover:border-blue-400",
  "hover:bg-v2k-pink/60 hover:border-pink-400",
  "hover:bg-v2k-yellow/60 hover:border-yellow-400",
  "hover:bg-v2k-green-soft/60 hover:border-green-400",
  "hover:bg-v2k-purple-soft/60 hover:border-purple-400",
];

export default function QuizQuestionScreen({
  question,
  questionIndex,
  totalQuestions,
  onAnswer,
}: QuizQuestionScreenProps) {
  const { t } = useLanguage();
  const progress = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <motion.div
      key={`question-${question.id}`}
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="w-full max-w-2xl relative z-10"
    >
      <Window title={`${t.quiz.question_label} ${questionIndex + 1} / ${totalQuestions}`}>
        <div className="flex flex-col bg-v2k-yellow-soft/40">
          {/* Barra de progreso superior */}
          <div className="relative h-3 bg-v2k-gray-win border-b-2 border-black overflow-hidden">
            <motion.div
              initial={{ width: `${(questionIndex / totalQuestions) * 100}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute left-0 top-0 h-full bg-v2k-pink-hot"
            />
            {/* Marcadores de pasos */}
            <div className="absolute inset-0 flex">
              {Array.from({ length: totalQuestions }).map((_, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: step markers are purely presentational and never reordered
                  key={`step-marker-${i}`}
                  className="flex-1 border-r border-black/20 last:border-0"
                />
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8 flex flex-col gap-6">
            {/* Chip de número de pregunta */}
            <div className="flex items-center gap-3">
              <span className="bg-black text-white text-[10px] font-black px-3 py-1 tracking-widest">
                {t.quiz.question_label} {questionIndex + 1}
              </span>
              <span className="text-xs font-bold text-black/40">
                {totalQuestions - questionIndex - 1} {t.quiz.remaining}
              </span>
            </div>

            {/* Texto de la pregunta */}
            <div className="min-h-[80px] flex items-center">
              <Jersey
                text={question.text}
                size="32|40"
                className="text-black leading-tight"
              />
            </div>

            {/* Opciones */}
            <div className="flex flex-col gap-3">
              {question.options.map((option, idx) => (
                <motion.button
                  key={`${question.id}-${option.member}-${option.text.slice(0, 10)}`}
                  type="button"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07 }}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onAnswer(option.member)}
                  className={`
                    w-full p-4 text-left border-2 border-black bg-white/50
                    transition-all duration-200 flex items-center gap-4 group
                    shadow-[3px_3px_0px_#000] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]
                    ${OPTION_COLORS[idx]}
                  `}
                >
                  {/* Letra / emoji */}
                  <span className="shrink-0 w-10 h-10 border-2 border-black bg-white flex items-center justify-center text-xl shadow-[2px_2px_0px_#000] group-hover:bg-black group-hover:text-white transition-colors">
                    {option.emoji}
                  </span>
                  <span className="font-bold text-sm md:text-base text-black uppercase leading-tight">
                    {option.text}
                  </span>
                  {/* Flecha derecha animada en hover */}
                  <span className="ml-auto text-black/0 group-hover:text-black transition-colors font-black text-lg">
                    →
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </Window>
    </motion.div>
  );
}
