export interface PollData {
  id: string;
  questionEs: string;
  questionEn: string;
  optionsEs: string[];
  optionsEn: string[];
}

export const WEEKLY_POLLS: PollData[] = [
  {
    id: "poll_01",
    questionEs: "¿Cuál es tu era favorita de NewJeans?",
    questionEn: "What is your favorite NewJeans era?",
    optionsEs: ["New Jeans", "OMG / Ditto", "Get Up", "How Sweet / Supernatural"],
    optionsEn: ["New Jeans", "OMG / Ditto", "Get Up", "How Sweet / Supernatural"],
  },
  {
    id: "poll_02",
    questionEs: "¿Quién es tu bias de NewJeans actualmente?",
    questionEn: "Who is your NewJeans bias currently?",
    optionsEs: ["Minji", "Hanni", "Danielle", "Haerin", "Hyein"],
    optionsEn: ["Minji", "Hanni", "Danielle", "Haerin", "Hyein"],
  },
  {
    id: "poll_03",
    questionEs: "¿Qué canción prefieres para relajarte?",
    questionEn: "Which song do you prefer for relaxing?",
    optionsEs: ["Ditto", "Hurt", "Bubble Gum", "ASAP"],
    optionsEn: ["Ditto", "Hurt", "Bubble Gum", "ASAP"],
  },
  {
    id: "poll_04",
    questionEs: "¿Qué te gustaría ver en el próximo comeback?",
    questionEn: "What would you like to see in the next comeback?",
    optionsEs: ["Concepto Retro", "Balada Emotiva", "Hip-Hop Fuerte", "Pop Brillante"],
    optionsEn: ["Retro Concept", "Emotional Ballad", "Strong Hip-Hop", "Bright Pop"],
  },
];
