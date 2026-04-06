"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Window from "@/components/molecules/Window";
import BackgroundDecorations from "@/components/atoms/BackgroundDecorations";
import { useAuth } from "@/context/AuthContext";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import Image from "next/image";

// --- TIPOS ---
type MemberKey = "Minji" | "Hanni" | "Danielle" | "Haerin" | "Hyein";
type QuizState = "START" | "QUIZ" | "RESULT";

interface MemberInfo {
  name: string;
  description: string;
  color: string;
  image: string;
}

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    member: MemberKey;
  }[];
}

// --- DATOS ---
const MEMBERS: Record<MemberKey, MemberInfo> = {
  Minji: {
    name: "MINJI",
    description: "Eres la líder natural y la elegancia personificada. Tu calma y madurez inspiran a todos a tu alrededor. Tienes un estilo clásico pero con un toque moderno que nunca pasa de moda.",
    color: "#c9e9f6",
    image: "/images/bunny-logo.avif",
  },
  Hanni: {
    name: "HANNI",
    description: "¡Eres pura diversión y expresividad! Tu energía es contagiosa y siempre encuentras la manera de hacer sonreír a los demás. Tienes un talento natural para brillar en cualquier escenario.",
    color: "#f4d8ed",
    image: "/images/bunny-logo.avif",
  },
  Danielle: {
    name: "DANIELLE",
    description: "Eres como un rayo de sol constante. Tu positividad y dulzura no tienen límites. Siempre ves el lado bueno de las cosas y tu entusiasmo es simplemente irresistible.",
    color: "#f9f1c3",
    image: "/images/bunny-logo.avif",
  },
  Haerin: {
    name: "HAERIN",
    description: "Tienes una vibra única y misteriosa que atrae a todos. Eres curiosa, observadora y posees un encanto especial que te hace destacar sin necesidad de gritar. Eres la definición de 'cool'.",
    color: "#b2f2bb",
    image: "/images/bunny-logo.avif",
  },
  Hyein: {
    name: "HYEIN",
    description: "A pesar de ser la más joven, tu madurez y presencia son impresionantes. Tienes un sentido de la moda impecable y una confianza que te llevará muy lejos. ¡Toda una estrella!",
    color: "#ffb6c1",
    image: "/images/bunny-logo.avif",
  },
};

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "¿CUÁL ES TU ENERGÍA UN VIERNES NOCHE?",
    options: [
      { text: "OMG - ¡A BAILAR CON TODO!", member: "Hanni" },
      { text: "DITTO - ALGO MÁS CHILL Y NOSTÁLGICO", member: "Minji" },
      { text: "HYPE BOY - DISFRUTAR CON AMIGOS", member: "Haerin" },
      { text: "SUPER SHY - UN POCO TÍMIDA PERO FELIZ", member: "Danielle" },
      { text: "NEW JEANS - PROBAR COSAS NUEVAS", member: "Hyein" },
    ],
  },
  {
    id: 2,
    text: "¿QUÉ ACTIVIDAD PREFIERES EN TU TIEMPO LIBRE?",
    options: [
      { text: "DORMIR O LEER UN BUEN LIBRO", member: "Minji" },
      { text: "VER PELÍCULAS O SERIES DIVERTIDAS", member: "Hanni" },
      { text: "SALIR AL AIRE LIBRE Y DISFRUTAR EL SOL", member: "Danielle" },
      { text: "ESCUCHAR MÚSICA Y PERDERME EN MIS PENSAMIENTOS", member: "Haerin" },
      { text: "IR DE COMPRAS O BUSCAR OUTFITS", member: "Hyein" },
    ],
  },
  {
    id: 3,
    text: "SI FUERAS UN ANIMAL, ¿CUÁL SERÍAS?",
    options: [
      { text: "UN OSO PROTECTOR Y FUERTE", member: "Minji" },
      { text: "UN CONEJITO ALEGRE Y RÁPIDO", member: "Hanni" },
      { text: "UN PERRITO LEAL Y CARIÑOSO", member: "Danielle" },
      { text: "UN GATO CURIOSO E INDEPENDIENTE", member: "Haerin" },
      { text: "UN HÁMSTER PEQUEÑO Y ADORABLE", member: "Hyein" },
    ],
  },
  {
    id: 4,
    text: "¿CUÁL ES TU ACCESORIO INDISPENSABLE?",
    options: [
      { text: "UNAS GAFAS DE SOL CHIC", member: "Minji" },
      { text: "UN GORRITO O DIADEMA DIVERTIDA", member: "Hanni" },
      { text: "ALGO QUE BRILLE MUCHO", member: "Danielle" },
      { text: "AURICULARES PARA MI MÚSICA", member: "Haerin" },
      { text: "UN BOLSO ELEGANTE", member: "Hyein" },
    ],
  },
  {
    id: 5,
    text: "¿CÓMO TE DESCRIBIRÍAN TUS MEJORES AMIGOS?",
    options: [
      { text: "MADURA Y CONFIABLE", member: "Minji" },
      { text: "DIVERTIDA Y RUIDOSA", member: "Hanni" },
      { text: "ALEGRE Y SIEMPRE POSITIVA", member: "Danielle" },
      { text: "TRANQUILA Y CREATIVA", member: "Haerin" },
      { text: "SEGURA DE SÍ MISMA Y TRENDY", member: "Hyein" },
    ],
  },
];

const INITIAL_SCORES: Record<MemberKey, number> = {
  Minji: 0,
  Hanni: 0,
  Danielle: 0,
  Haerin: 0,
  Hyein: 0,
};

export default function QuizPage() {
  const [quizState, setQuizState] = useState<QuizState>("START");
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [scores, setScores] = useState<Record<MemberKey, number>>(INITIAL_SCORES);
  const [isCalculating, setIsCalculating] = useState(false);

  const { width, height } = useWindowSize();
  const { user } = useAuth();

  const handleStart = () => {
    setQuizState("QUIZ");
  };

  const handleAnswer = (member: MemberKey) => {
    const newScores = { ...scores, [member]: scores[member] + 1 };
    setScores(newScores);

    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        setQuizState("RESULT");
      }, 2500);
    }
  };

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

  const matchPercentage = useMemo(() => {
    const winnerScore = scores[resultMemberKey];
    return Math.round((winnerScore / QUESTIONS.length) * 100);
  }, [scores, resultMemberKey]);

  const resultMember = MEMBERS[resultMemberKey];

  const handleReset = () => {
    setQuizState("START");
    setCurrentQuestionIdx(0);
    setScores(INITIAL_SCORES);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <BackgroundDecorations />

      {/* Elementos flotantes temáticos */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute top-20 left-10 text-6xl opacity-20"
        >
          🛸
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 5, 0] }}
          transition={{ repeat: Infinity, duration: 6, delay: 1 }}
          className="absolute bottom-20 right-10 text-6xl opacity-20"
        >
          ⭐
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute top-1/2 left-1/4 text-8xl opacity-10"
        >
          🐰
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {/* --- PANTALLA DE INICIO --- */}
        {quizState === "START" && !isCalculating && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full max-w-2xl relative z-10"
          >
            <Window title="BUNNIES_MATCH.EXE" className="scanlines">
              <div className="flex flex-col items-center p-8 md:p-12 text-center gap-8 bg-v2k-cyan/30">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="absolute -inset-4 border-2 border-dashed border-v2k-pink-hot rounded-full opacity-50"
                  />
                  <div className="text-8xl">🐰</div>
                </div>

                <div className="space-y-4">
                  <Jersey text="DESCUBRE TU MATCH DIGITAL" size="48|56" className="text-black sticker-title" />
                  <SpaceText
                    text="Escaneando tus gustos en 3, 2, 1..."
                    size="18|22"
                    className="font-bold text-v2k-pink-hot italic"
                  />
                </div>

                <div className="bg-white/50 border-2 border-black p-4 rounded-xl w-full max-w-md shadow-v2k-xs">
                  <p className="font-bold text-sm leading-relaxed">
                    Responde con sinceridad y descubre qué integrante de{" "}
                    <span className="text-v2k-pink-hot">NewJeans</span> eres hoy.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleStart}
                  className="btn-y2k group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Jersey text="INICIAR ESCANEO" size="20|24" />
                    <span className="text-xl">⚡</span>
                  </span>
                </button>
              </div>
            </Window>
          </motion.div>
        )}

        {/* --- PANTALLA DE CARGA / CÁLCULO --- */}
        {isCalculating && (
          <motion.div
            key="calculating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-2xl relative z-20"
          >
            <Window title="CALCULANDO_RESULTADO.SYS" className="scanlines">
              <div className="flex flex-col items-center p-12 text-center gap-8 bg-black text-v2k-pink-hot font-mono">
                <div className="relative w-full h-48 border-2 border-v2k-pink-hot overflow-hidden bg-v2k-pink-hot/10">
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-v2k-pink-hot shadow-[0_0_15px_#ff69b4] z-10"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="text-2xl animate-pulse">Scanning Profile...</div>
                    <div className="text-xs opacity-70">
                      ANALYZING CHOICES: OK<br />
                      MATCHING DNA: 89%<br />
                      BUNNY_POWER: MAXIMIZED
                    </div>
                  </div>
                </div>
                <Jersey text="PROCESANDO TUS DATOS..." size="32|36" />
              </div>
            </Window>
          </motion.div>
        )}

        {/* --- PREGUNTAS DEL QUIZ --- */}
        {quizState === "QUIZ" && !isCalculating && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="w-full max-w-2xl relative z-10"
          >
            <Window
              title={`BUNNIES_QUIZ.EXE — PREGUNTA ${currentQuestionIdx + 1}/${QUESTIONS.length}`}
            >
              <div className="flex flex-col p-6 md:p-10 gap-8 bg-v2k-yellow-soft/50">
                {/* Barra de progreso */}
                <div className="w-full bg-v2k-gray-win border-2 border-black h-4 rounded-full overflow-hidden shadow-v2k-xs">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentQuestionIdx + 1) / QUESTIONS.length) * 100}%`,
                    }}
                    className="h-full bg-v2k-pink-hot border-r-2 border-black"
                  />
                </div>

                {/* Pregunta */}
                <div className="min-h-[100px] flex items-center justify-center">
                  <Jersey
                    text={QUESTIONS[currentQuestionIdx].text}
                    size="32|40"
                    className="text-black text-center"
                  />
                </div>

                {/* Opciones */}
                <div className="flex flex-col gap-3">
                  {QUESTIONS[currentQuestionIdx].options.map((option, idx) => (
                    <motion.button
                      key={`${QUESTIONS[currentQuestionIdx].id}-${idx}`}
                      type="button"
                      whileHover={{ x: 10, backgroundColor: "#fff" }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.member)}
                      className="w-full p-4 text-left border-2 border-black bg-v2k-accent/20 font-bold hover:bg-white shadow-v2k-xs transition-colors flex items-center gap-4"
                    >
                      <span className="shrink-0 w-8 h-8 border-2 border-black bg-white flex items-center justify-center rounded-full text-xs font-black">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="uppercase text-sm md:text-base">{option.text}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </Window>
          </motion.div>
        )}

        {/* --- PANTALLA DE RESULTADO --- */}
        {quizState === "RESULT" && !isCalculating && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl relative z-10"
          >
            {matchPercentage > 50 && (
              <Confetti
                width={width}
                height={height}
                numberOfPieces={200}
                recycle={false}
                colors={["#ff69b4", "#c9e9f6", "#f9f1c3"]}
              />
            )}

            <Window title="MATCH_COMPLETO.EXE" className="scanlines">
              <div className="flex flex-col items-center p-8 md:p-12 text-center gap-8 bg-v2k-pink/20">
                {/* Título del resultado */}
                <div className="space-y-2">
                  <SpaceText
                    text="¡ESCANEO COMPLETO!"
                    size="14|14"
                    className="text-v2k-pink-hot font-black italic tracking-widest"
                  />
                  <Jersey
                    text={`ERES UN ${matchPercentage}% ${resultMember.name}`}
                    size="40|48"
                    className="text-black"
                  />
                </div>

                {/* Imagen de la integrante */}
                <div className="relative group">
                  <div
                    className="w-64 h-64 md:w-80 md:h-80 border-4 border-black box-content overflow-hidden rounded-2xl shadow-v2k-md relative"
                    style={{ backgroundColor: resultMember.color }}
                  >
                    <Image
                      src={resultMember.image}
                      alt={resultMember.name}
                      fill
                      className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end justify-center p-4">
                      <Jersey text={resultMember.name} size="32|36" className="text-white" />
                    </div>
                  </div>

                  <div className="absolute -top-4 -right-4 text-4xl animate-bounce">✨</div>
                  <div className="absolute -bottom-4 -left-4 text-4xl animate-pulse">💖</div>
                </div>

                {/* Descripción */}
                <div className="bg-white border-2 border-black p-6 rounded-xl shadow-v2k-sm max-w-lg">
                  <p className="font-bold text-sm md:text-base leading-relaxed text-black italic">
                    &ldquo;{resultMember.description}&rdquo;
                  </p>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 btn-y2k bg-white hover:bg-v2k-pink-light"
                  >
                    <Jersey text="VOLVER A JUGAR" size="20|24" />
                  </button>

                  <button
                    type="button"
                    className="flex-1 btn-y2k bg-v2k-pink-hot text-white hover:opacity-80"
                  >
                    <Jersey text="COMPARTIR RESULTADO" size="20|24" />
                  </button>
                </div>

                {/* XP reward si el usuario está logueado */}
                {user && (
                  <div className="p-3 bg-v2k-green-soft border-2 border-black rounded-lg animate-pulse">
                    <SpaceText
                      text="+50 XP REWARD CLAIMED!"
                      size="12|12"
                      className="font-black text-black"
                    />
                  </div>
                )}
              </div>
            </Window>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
