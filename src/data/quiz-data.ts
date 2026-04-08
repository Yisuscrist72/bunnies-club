import type { Translations } from "@/locales/es";
export type MemberKey = "Minji" | "Hanni" | "Danielle" | "Haerin" | "Hyein";

export interface MemberInfo {
  name: string;
  emoji: string;
  accent: string;
  bg: string;
  gradient: string;
  image: string;
}

export interface QuizOption {
  text: string;
  emoji: string;
  member: MemberKey;
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
}

// ── Integrantes (Información estática) ──────────────────────────────────────
export const MEMBERS: Record<MemberKey, MemberInfo> = {
  Minji: {
    name: "MINJI",
    emoji: "👑",
    accent: "#5B9BD5",
    bg: "#EBF4FD",
    gradient: "linear-gradient(135deg, #c9e9f6 0%, #5B9BD5 100%)",
    image: "/images/quiz/minji-quiz.avif",
  },
  Hanni: {
    name: "HANNI",
    emoji: "🎤",
    accent: "#FF69B4",
    bg: "#FFF0F7",
    gradient: "linear-gradient(135deg, #f4d8ed 0%, #FF69B4 100%)",
    image: "/images/quiz/hanni-quiz.avif",
  },
  Danielle: {
    name: "DANIELLE",
    emoji: "🌻",
    accent: "#F5A623",
    bg: "#FFFBEC",
    gradient: "linear-gradient(135deg, #f9f1c3 0%, #F5A623 100%)",
    image: "/images/quiz/danielle-quiz.avif",
  },
  Haerin: {
    name: "HAERIN",
    emoji: "🐱",
    accent: "#2ECC71",
    bg: "#EAFAF1",
    gradient: "linear-gradient(135deg, #b2f2bb 0%, #2ECC71 100%)",
    image: "/images/quiz/haerin-quiz.avif",
  },
  Hyein: {
    name: "HYEIN",
    emoji: "💎",
    accent: "#A78BFA",
    bg: "#F5F3FF",
    gradient: "linear-gradient(135deg, #ffb6c1 0%, #A78BFA 100%)",
    image: "/images/quiz/hyein-quiz.avif",
  },
};

export const QUIZ_SIZE = 20;

export function getLocalizedQuestions(t: Translations): QuizQuestion[] {
  if (!t?.quiz?.questions) return [];
  return t.quiz.questions;
}

export function getRandomQuestions(t: Translations, count: number = QUIZ_SIZE): QuizQuestion[] {
  const all = getLocalizedQuestions(t);
  const pool = [...all];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const selected = pool.slice(0, count);
  return selected.map((q) => {
    const opts = [...q.options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return { ...q, options: opts };
  });
}
