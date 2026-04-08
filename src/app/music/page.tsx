"use client";

import { useEffect } from "react";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import MusicCard, { type Album } from "@/components/molecules/MusicCard";
import { motion } from "framer-motion";
import MusicDecorations from "./components/MusicDecorations";

const ALBUMS: Album[] = [
  {
    id: 1,
    title: "NEW JEANS",
    type: "1ST EP",
    cover: "/images/music/newjeans.avif",
    tracks: ["Attention", "Hype Boy", "Cookie", "Hurt"],
    durations: ["3:00", "2:59", "3:55", "2:57"],
    links: {
      spotify:
        "https://open.spotify.com/intl-es/album/1HMLpmZAnNyl9pxvOnTovV?si=zO7AIYxMRN-d5cNqfHnezg",
      apple:
        "https://music.apple.com/es/album/newjeans-1st-ep-new-jeans/1635469682",
      youtube:
        "https://music.youtube.com/playlist?list=OLAK5uy_lxuD5WJ6rLmZZRUS9rVSot3WtE8BF4sc8&si=TL2SOw37HeDM_8LF",
    },
    color: "bg-album-sky",
    headerColor: "bg-album-sky-header",
  },
  {
    id: 2,
    title: "OMG & DITTO",
    type: "SINGLE ALBUM",
    cover: "/images/music/omg-ditto.avif",
    tracks: ["OMG", "Ditto"],
    durations: ["3:32", "3:05"],
    links: {
      spotify:
        "https://open.spotify.com/intl-es/album/45ozep8uHHnj5CCittuyXj?si=ff-cdWaOTC6xcfI0ZqyLug",
      apple: "https://music.apple.com/es/album/newjeans-omg-single/1659513441",
      youtube:
        "https://music.youtube.com/playlist?list=OLAK5uy_kGx7BCyb1rmzKNpSDwSu6atiGRtZZb9nc&si=NGFJP_gReCp1HMP8",
    },
    color: "bg-album-pink",
    headerColor: "bg-album-pink-header",
  },
  {
    id: 3,
    title: "GET UP",
    type: "2ND EP",
    cover: "/images/music/get-up.avif",
    tracks: ["New Jeans", "Super Shy", "ETA", "Cool With You", "Get Up", "ASAP"],
    durations: ["1:48", "2:34", "2:31", "2:27", "0:36", "2:14"],
    links: {
      spotify:
        "https://open.spotify.com/intl-es/album/4N1fROq2oeyLGAlQ1C1j18?si=N9nFBLA5Tg-zetZuyIBiYQ",
      apple:
        "https://music.apple.com/es/album/newjeans-super-shy-single/1692686264",
      youtube:
        "https://music.youtube.com/playlist?list=OLAK5uy_lLXcmlXKis8WKClqvQEJnL7O_jUxUXr3s&si=b0r_K5wRFgH4B_G1",
    },
    color: "bg-album-green",
    headerColor: "bg-album-green-header",
  },
  {
    id: 4,
    title: "HOW SWEET",
    type: "SINGLE ALBUM",
    cover: "/images/music/howsweet.avif",
    tracks: ["How Sweet", "Bubble Gum"],
    durations: ["3:39", "3:20"],
    links: {
      spotify:
        "https://open.spotify.com/intl-es/album/0EhZEM4RRz0yioTgucDhJq?si=y1wsdIcFSGyHWnrUTCkoqw",
      apple: "https://music.apple.com/es/album/how-sweet-ep/1744448415",
      youtube:
        "https://music.youtube.com/playlist?list=OLAK5uy_l0nFJiyQV7ZaVmRh1gW9g1tk3UANGUipc&si=ZqZqQpt3JJnAljm2",
    },
    color: "bg-album-yellow",
    headerColor: "bg-album-yellow-header",
  },
  {
    id: 5,
    title: "SUPERNATURAL",
    type: "EP / SINGLE",
    cover: "/images/music/supernatural.avif",
    tracks: ["Supernatural", "Right Now"],
    durations: ["3:12", "2:40"],
    links: {
      spotify:
        "https://open.spotify.com/intl-es/album/1FVw30SoC91lq1UZ6N9rwN?si=mTDUQDIfSySsKPOgWY92bw",
      apple: "https://music.apple.com/es/album/supernatural-single/1750576829",
      youtube:
        "https://music.youtube.com/playlist?list=OLAK5uy_njHYTrAU6R9n__3q6vR7Gbht_jxw7W-20&si=IOQx2If92OMZ_Jyx",
    },
    color: "bg-album-purple",
    headerColor: "bg-album-purple-header",
  },
  {
    id: 6,
    title: "GODS",
    type: "SENCILLO",
    cover: "/images/music/gods.avif",
    tracks: ["GODS (League of Legends World Championship)"],
    durations: ["3:40"],
    links: {
      spotify:
        "https://open.spotify.com/intl-es/album/4uFXfeGmzFDUrYUyz3Wb1O?si=Gwj4f7JJSKq_mT0XRsHIPg",
      apple: "https://music.apple.com/es/album/gods-single/1833057824",
      youtube:
        "https://music.youtube.com/playlist?list=OLAK5uy_nfHvX3Q7Ina7eV94Xv3ipATdDFHElUOM8&si=GVG23W9Lby_NICAA",
    },
    color: "bg-album-cyan",
    headerColor: "bg-album-cyan-header",
  },
];

export default function MusicPage() {
  // Efecto para cambiar el fondo al estilo "Musical-Flow"
  useEffect(() => {
    const originalBg = document.body.style.background;
    const originalImage = document.body.style.backgroundImage;

    document.body.style.backgroundColor = "#fffaff";
    document.body.style.backgroundImage = `
      radial-gradient(at 20% 20%, #e0f2fe 0px, transparent 40%),
      radial-gradient(at 80% 20%, #fdf2f8 0px, transparent 40%),
      radial-gradient(at 50% 50%, #f5f3ff 0px, transparent 50%),
      radial-gradient(at 20% 80%, #f0fdf4 0px, transparent 40%),
      radial-gradient(at 80% 80%, #fff7ed 0px, transparent 40%)
    `;
    document.body.style.backgroundSize = "100% 100%";
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      document.body.style.background = originalBg;
      document.body.style.backgroundImage = originalImage;
    };
  }, []);

  return (
    <div className="relative min-h-screen pt-10 pb-20 px-4 md:px-8 overflow-x-hidden">
      <MusicDecorations />

      {/* Header Container */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center mb-16">
        <div className="mb-6">
          <Jersey
            tag="h1"
            text="MÚSICA"
            size="68|94"
            className="sticker-title text-v2k-pink-hot text-[3rem]! sm:text-[5rem]! lg:text-[6rem]! drop-shadow-[4px_4px_0px_#000]"
            style={{
              textShadow:
                "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 6px 6px 0px #000",
            }}
          />
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-v2k-blue-deep border-4 border-black px-6 sm:px-8 py-2.5 sm:py-3 shadow-v2k-sm -rotate-1 mb-10 sm:mb-12 relative"
        >
          <Jersey
            text="DISCOGRAFÍA (ALBUMS & EPS)"
            size="24|28"
            className="text-white text-base sm:text-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4 mb-8"
        >
          <SpaceText
            text="— EXPLORA EL UNIVERSO MUSICAL DE NEWJEANS —"
            size="12|12"
            className="text-black font-black italic tracking-[0.2em]"
          />
        </motion.div>
      </div>

      {/* Grid Container (Outside the flex-col items-center to allow full width and proper alignment) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 w-full relative z-10 px-4">
        {ALBUMS.map((album, idx) => (
          <motion.div
            key={album.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 + 0.3 }}
          >
            <MusicCard album={album} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
