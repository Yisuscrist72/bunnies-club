"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import BackgroundDecorations from "@/components/atoms/BackgroundDecorations";
import QuizStart from "@/components/organisms/quiz/QuizStart";
import QuizQuestionScreen from "@/components/organisms/quiz/QuizQuestionScreen";
import QuizCalculating from "@/components/organisms/quiz/QuizCalculating";
import QuizResult from "@/components/organisms/quiz/QuizResult";

import { getRandomQuestions, QUIZ_SIZE } from "@/data/quiz-data";
import type { MemberKey, QuizQuestion } from "@/data/quiz-data";
import { useAuth } from "@/context/AuthContext";

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
  const { width, height } = useWindowSize();

  const [quizState, setQuizState] = useState<QuizState>("START");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<MemberKey, number>>(INITIAL_SCORES);

  // Se genera al hacer start; permanece fija durante la partida.
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleStart = () => {
    // Seleccionar y mezclar QUIZ_SIZE preguntas del banco completo
    setActiveQuestions(getRandomQuestions(QUIZ_SIZE));
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
    [scores, resultMemberKey]
  );

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 py-12 overflow-hidden">
      <BackgroundDecorations />

      {/* Confetti en el resultado */}
      {quizState === "RESULT" && matchPercentage >= 30 && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={250}
          recycle={false}
          colors={["#ff69b4", "#c9e9f6", "#f9f1c3", "#b2f2bb", "#ffb6c1", "#A78BFA"]}
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
