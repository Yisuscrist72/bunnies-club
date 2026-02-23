"use client";
import { motion } from "framer-motion";
import Image from "./Image";
import Jersey from "./texts/Jersey";

interface PhotocardSwiperCardProps {
  title: string;
  imageURL: string;
  onClick: () => void;
}

export const PhotocardSwiperCard = ({
  title,
  imageURL,
  onClick,
}: PhotocardSwiperCardProps) => {
  return (
    <div className="flex-shrink-0 w-40 md:w-52 flex flex-col items-center gap-3 transform-gpu">
      {/* LA IMAGEN DE LA PHOTOCARD */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="w-full aspect-[2/3] bg-white border-[3px] border-black overflow-hidden relative cursor-pointer p-0 group shadow-[4px_4px_0px_black] md:shadow-[6px_6px_0px_black] rounded-xl"
      >
        <Image
          src={imageURL}
          alt={title}
          fill
          className="object-cover pointer-events-none"
          priority={false}
        />
        <div className="absolute inset-0 bg-v2k-pink-hot/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </motion.button>

      {/* LA ETIQUETA DE TEXTO (AQUÍ ESTÁ EL CAMBIO) */}
      <div className="w-full bg-v2k-pink border-[3px] border-black py-2 rounded-xl text-center shadow-[inset_2px_2px_0px_rgba(255,255,255,0.5)]">
        <Jersey tag="h3" text={title} size="16|16" className="text-black" />
      </div>
    </div>
  );
};
