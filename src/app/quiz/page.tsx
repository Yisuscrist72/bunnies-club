"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import QuizStart from "@/components/quiz/QuizStart";
import QuizQuestionScreen from "@/components/quiz/QuizQuestionScreen";
import QuizCalculating from "@/components/quiz/QuizCalculating";
import QuizResult from "@/components/quiz/QuizResult";

import { getRandomQuestions, QUIZ_SIZE } from "@/data/quiz-data";
import type { MemberKey, QuizQuestion } from "@/data/quiz-data";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

// ── Estado del quiz ──────────────────────────────────────────────────────────
type QuizState = "START" | "QUIZ" | "CALCULATING" | "RESULT";

const INITIAL_SCORES: Record<MemberKey, number> = {
  Minji: 0,
  Hanni: 0,
  Danielle: 0,
  Haerin: 0,
  Hyein: 0,
};

// ── Página principal del quiz ─────────────────────────────────────────────────
export default function QuizPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { width, height } = useWindowSize();

  // Efecto para fondo vibrante estilo Figma
  useEffect(() => {
    const originalBg = document.body.style.background;
    const originalImage = document.body.style.backgroundImage;

    document.body.style.backgroundColor = "#fff";
    document.body.style.backgroundImage = `
      radial-gradient(at 0% 0%, #fbcfe8 0px, transparent 50%),
      radial-gradient(at 100% 0%, #dcfce7 0px, transparent 50%),
      radial-gradient(at 50% 100%, #e0f2fe 0px, transparent 50%),
      radial-gradient(at 100% 100%, #fef3c7 0px, transparent 50%)
    `;
    document.body.style.backgroundSize = "100% 100%";
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      document.body.style.background = originalBg;
      document.body.style.backgroundImage = originalImage;
    };
  }, []);

  const [quizState, setQuizState] = useState<QuizState>("START");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] =
    useState<Record<MemberKey, number>>(INITIAL_SCORES);

  // Se genera al hacer start; permanece fija durante la partida.
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleStart = () => {
    // Seleccionar y mezclar QUIZ_SIZE preguntas del banco completo
    setActiveQuestions(getRandomQuestions(t, QUIZ_SIZE));
    setQuizState("QUIZ");
  };

  const handleAnswer = (member: MemberKey) => {
    const newScores = { ...scores, [member]: scores[member] + 1 };
    setScores(newScores);

    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setQuizState("CALCULATING");
      setTimeout(() => setQuizState("RESULT"), 3000);
    }
  };

  const handleReset = () => {
    setQuizState("START");
    setCurrentIdx(0);
    setScores(INITIAL_SCORES);
    setActiveQuestions([]);
  };

  // ── Resultado ────────────────────────────────────────────────────────────────
  const resultMemberKey = useMemo((): MemberKey => {
    let max = -1;
    let winner: MemberKey = "Minji";
    for (const key of Object.keys(scores) as MemberKey[]) {
      if (scores[key] > max) {
        max = scores[key];
        winner = key;
      }
    }
    return winner;
  }, [scores]);

  const matchPercentage = useMemo(
    () => Math.round((scores[resultMemberKey] / QUIZ_SIZE) * 100),
    [scores, resultMemberKey],
  );

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 py-24 overflow-x-hidden pt-32">
      {/* Decoraciones Estilo Figma (Aliens, Corazones, Stars) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Lado Izquierdo */}
        <div className="absolute top-[20%] left-[5%] text-4xl opacity-40">
          💖
        </div>
        <div className="absolute top-[35%] left-[15%] text-5xl opacity-40">
          👽
        </div>
        <div className="absolute bottom-[25%] left-[8%] text-3xl opacity-40">
          ⭐
        </div>

        {/* Lado Derecho */}
        <div className="absolute top-[15%] right-[8%] text-4xl opacity-40 animate-pulse">
          ✨
        </div>
        <div className="absolute top-[40%] right-[12%] text-5xl opacity-40">
          👽
        </div>
        <div className="absolute bottom-[30%] right-[5%] text-3xl opacity-40">
          💖
        </div>
        <div className="absolute top-[60%] right-[5%] text-4xl opacity-40">
          👽
        </div>

        {/* Bunnies Flotantes */}
        <motion.div
          animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[15%] opacity-30 shadow-2xl hidden lg:block"
        >
          <Image
            src="/images/bunny-logo.avif"
            alt="Bunny"
            width={120}
            height={120}
            className="border-4 border-white rounded-3xl"
          />
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-[10%] right-[15%] opacity-30 shadow-2xl hidden lg:block"
        >
          <Image
            src="/images/bunny-logo.avif"
            alt="Bunny"
            width={120}
            height={120}
            className="border-4 border-white rounded-3xl"
          />
        </motion.div>
      </div>

      {/* Mobile Glows (Mezcla de colores Figma) */}
      <div className="fixed inset-0 pointer-events-none z-0 md:hidden">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-pink-300/20 blur-[80px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-emerald-300/20 blur-[80px] rounded-full" />
      </div>

      {/* Confetti en el resultado */}
      {quizState === "RESULT" && matchPercentage >= 30 && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={250}
          recycle={false}
          colors={[
            "#ff69b4",
            "#c9e9f6",
            "#f9f1c3",
            "#b2f2bb",
            "#ffb6c1",
            "#A78BFA",
          ]}
        />
      )}

      <AnimatePresence mode="wait">
        {quizState === "START" && (
          <QuizStart
            key="start"
            onStart={handleStart}
            totalQuestions={QUIZ_SIZE}
          />
        )}

        {quizState === "QUIZ" && activeQuestions.length > 0 && (
          <QuizQuestionScreen
            key={`q-${currentIdx}`}
            question={activeQuestions[currentIdx]}
            questionIndex={currentIdx}
            totalQuestions={activeQuestions.length}
            onAnswer={handleAnswer}
          />
        )}

        {quizState === "CALCULATING" && <QuizCalculating key="calc" />}

        {quizState === "RESULT" && (
          <QuizResult
            key="result"
            memberKey={resultMemberKey}
            matchPercentage={matchPercentage}
            allScores={scores}
            totalQuestions={QUIZ_SIZE}
            user={user}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
