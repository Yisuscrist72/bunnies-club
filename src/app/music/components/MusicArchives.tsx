"use client";

import { useState } from "react";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type ArchiveEra = {
  id: string;
  name: string;
  color: string;
  videoUrl: string;
  behindUrl: string;
  factsEs: string[];
  factsEn: string[];
};

const ARCHIVE_DATA: ArchiveEra[] = [
  {
    id: "newjeans",
    name: "NEW JEANS (1ST EP)",
    color: "bg-album-sky",
    videoUrl: "https://www.youtube.com/embed/js1CtxSY38I",
    behindUrl: "https://www.youtube.com/embed/BwvTlYb5jtc", // Attention MV Behind
    factsEs: [
      "El debut de NewJeans fue lanzado por sorpresa el 22 de julio de 2022, sin teasers previos presentando a las integrantes individualmente.",
      "Gran parte del material visual, incluyendo los icónicos videoclips de 'Attention' y 'Hype Boy', fueron grabados en locaciones de España, concretamente en Barcelona.",
      "El concepto nostálgico inspirado en los años 2000 y el sonido R&B y pop fresco marcaron inmediatamente una nueva tendencia en toda la industria del K-Pop."
    ],
    factsEn: [
      "NewJeans' debut was released as a surprise on July 22, 2022, without any prior teasers introducing the members individually.",
      "Much of the visual material, including the iconic music videos for 'Attention' and 'Hype Boy', were filmed on location in Spain, specifically in Barcelona.",
      "The nostalgic concept inspired by the 2000s and the fresh R&B/Pop sound immediately set a new trend across the entire K-Pop industry."
    ]
  },
  {
    id: "omg",
    name: "OMG & DITTO",
    color: "bg-album-pink",
    videoUrl: "https://www.youtube.com/embed/pSUydWEqKwE",
    behindUrl: "https://www.youtube.com/embed/TBx6lToicIs", // Ditto MV Behind
    factsEs: [
      "'Ditto' logró un Perfect All-Kill (PAK) en Corea del Sur y se convirtió en la canción con más PAKs en la historia de MelOn.",
      "El lado A y lado B del MV de 'Ditto' cuentan una historia melancólica ambientada en 1998, grabada simulando videocámaras VHS.",
      "La coreografía del sencillo 'OMG' y su icónico paso de los brazos se viralizó globalmente en TikTok al instante de salir."
    ],
    factsEn: [
      "'Ditto' achieved a Perfect All-Kill (PAK) in South Korea and became the song with the most PAKs in MelOn history.",
      "The Side A and Side B of the 'Ditto' MV tell a melancholic story set in 1998, recorded simulating VHS camcorders.",
      "The choreography for 'OMG' and its iconic arm movements went globally viral on TikTok instantly upon release."
    ]
  },
  {
    id: "getup",
    name: "GET UP",
    color: "bg-album-green",
    videoUrl: "https://www.youtube.com/embed/ArmDp-zijuc",
    behindUrl: "https://www.youtube.com/embed/ArmDp-zijuc", 
    factsEs: [
      "El segundo EP del grupo debutó directamente en el número 1 de la lista Billboard 200 en los Estados Unidos.",
      "La coreografía urbana estilo waacking de 'Super Shy' fue grabada y bailada en forma de flashmob masivo en las calles de Lisboa, Portugal.",
      "NewJeans colaboró con la popular franquicia 'The Powerpuff Girls' (Las Chicas Superpoderosas) para el concepto visual y el MV de 'New Jeans'."
    ],
    factsEn: [
      "The group's second EP debuted straight at number 1 on the Billboard 200 chart in the United States.",
      "The waacking-styled urban choreography for 'Super Shy' was filmed and danced as a massive flashmob in the streets of Lisbon, Portugal.",
      "NewJeans collaborated with the popular franchise 'The Powerpuff Girls' for the visual concept and MV of the track 'New Jeans'."
    ]
  },
  {
    id: "howsweet",
    name: "HOW SWEET",
    color: "bg-album-yellow",
    videoUrl: "https://www.youtube.com/embed/Q3K0TOvTOno",
    behindUrl: "https://www.youtube.com/embed/Q3K0TOvTOno", // Temporarily using main MV to avoid broken link
    factsEs: [
      "El videoclip principal 'How Sweet' fue filmado casi en su totalidad en escenarios reales en varias locaciones de Taiwán.",
      "La coreografía presenta marcadas influencias del hip-hop clásico y el breakdance de los años 90.",
      "La pista lado-B 'Bubble Gum' fue seleccionada como la canción oficial para una importante campaña de shampoo Essential de Kao en Japón."
    ],
    factsEn: [
      "The main music video for 'How Sweet' was filmed almost entirely on practical sets across various locations in Taiwan.",
      "The choreography features strong influences from old-school hip-hop and 90s breakdance.",
      "The B-side track 'Bubble Gum' was selected as the official song for a major Kao Essential shampoo campaign in Japan."
    ]
  },
  {
    id: "supernatural",
    name: "SUPERNATURAL",
    color: "bg-album-purple",
    videoUrl: "https://www.youtube.com/embed/ZncbtRo7RXs",
    behindUrl: "https://www.youtube.com/embed/ZncbtRo7RXs", // Temporarily using main MV
    factsEs: [
      "Este álbum marcó el ambicioso y esperado debut oficial de NewJeans en el mercado japonés.",
      "El sencillo principal 'Supernatural' incluye créditos e interpolaciones de la clásica canción 'Back of My Mind' de Pharrell Williams.",
      "El icónico artista japonés Takashi Murakami fue el encargado del diseño principal de los personajes y portadas de esta era."
    ],
    factsEn: [
      "This album marked the ambitious and highly anticipated official debut of NewJeans in the Japanese market.",
      "The lead single 'Supernatural' includes credits and interpolations from Pharrell Williams' classic song 'Back of My Mind'.",
      "The iconic Japanese artist Takashi Murakami was in charge of the main character designs and cover art for this era."
    ]
  }
];

export default function MusicArchives() {
  const { t, language } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>("newjeans");

  const selectedEra = ARCHIVE_DATA.find((era) => era.id === selectedId) || ARCHIVE_DATA[0];

  return (
    <div className="w-full max-w-7xl mx-auto mt-28 mb-10 px-4 relative z-10">
      <div className="flex flex-col items-center mb-10 space-y-2">
        <Jersey
          text={t.music.archives?.title || "BUNNY ARCHIVES"}
          className="text-white text-5xl md:text-[5rem] drop-shadow-[4px_4px_0px_#FF2E93] text-center"
          size="44|80"
        />
        <SpaceText
          text={t.music.archives?.subtitle || "BEHIND THE SCENES & MVs"}
          className="bg-black text-white px-4 py-2 border-2 border-v2k-pink-hot font-bold tracking-widest text-sm text-center"
          size="12|12"
        />
      </div>

      {/* Selector de Eras */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {ARCHIVE_DATA.map((era) => {
          const isSelected = selectedId === era.id;
          return (
            <button
              type="button"
              key={era.id}
              onClick={() => setSelectedId(era.id)}
              className={`
                px-5 py-2 font-black text-sm md:text-base border-4 border-black transition-all duration-300
                ${isSelected ? era.color + " translate-y-[2px] shadow-[2px_2px_0px_#000]" : "bg-white hover:bg-gray-100 hover:-translate-y-1 shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] text-black"}
              `}
            >
              {era.name}
            </button>
          );
        })}
      </div>

      {/* Contenido (Video + Curiosidades) */}
      <div className="relative">
        {/* Fondo decorativo offset para dar profundidad */}
        <div className="absolute top-4 left-4 w-full h-full bg-v2k-pink-hot border-4 border-black box-border z-0"></div>
        
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selectedEra.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white border-4 border-black p-4 md:p-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Columna Izquierda: Video */}
            <div className="flex flex-col gap-4">
              <div className="bg-v2k-blue-light border-4 border-black px-4 py-2 text-center font-black tracking-wider shadow-[4px_4px_0px_#000]">
                🎥 {t.music.archives?.mv_gallery || "VIDEOTECA OFICIAL"}
              </div>
              <div className="aspect-video w-full border-4 border-black shadow-[6px_6px_0px_#000] bg-black">
                <iframe
                  src={selectedEra.videoUrl}
                  title={selectedEra.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>

            {/* Columna Derecha: Datos curiosos */}
            <div className="flex flex-col gap-4">
              <div className="bg-v2k-yellow border-4 border-black px-4 py-2 text-center font-black tracking-wider shadow-[4px_4px_0px_#000]">
                ✨ {t.music.archives?.fun_facts || "DATOS CURIOSOS"}
              </div>
              <div className="flex-1 bg-gray-50 border-4 border-black p-6 shadow-[inset_4px_4px_0px_rgba(0,0,0,0.05)] font-mono text-sm md:text-base flex flex-col gap-6 overflow-y-auto">
                {(language === 'es' ? selectedEra.factsEs : selectedEra.factsEn).map((fact, index) => (
                  <div key={`${selectedEra.id}-fact-${index}`} className="flex gap-4 items-start group">
                    <span className="text-v2k-pink-hot font-bold mt-1 text-lg group-hover:scale-110 transition-transform">
                      {`{0${index + 1}}`}
                    </span>
                    <p className="leading-relaxed text-gray-800 font-medium">{fact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fila Inferior: Behind the Scenes */}
            <div className="col-span-1 lg:col-span-2 mt-4 pt-8 border-t-4 border-dashed border-gray-300">
              <div className="bg-black text-white px-4 py-2 text-center font-black tracking-widest border-4 border-black shadow-[4px_4px_0px_#FF2E93] inline-block mb-6 relative -rotate-1">
                {t.music.archives?.raw_footage || "📼 RAW FOOTAGE: BEHIND THE SCENES"}
              </div>
              <div className="aspect-[21/9] md:aspect-video lg:aspect-[21/9] w-full border-4 border-black shadow-[6px_6px_0px_#000] bg-black">
                <iframe
                  src={selectedEra.behindUrl}
                  title={`${selectedEra.name} Behind The Scenes`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
