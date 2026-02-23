"use client";
import { motion } from "framer-motion";
import Image from "./Image";

interface ResourceSwiperCardProps {
  title: string;
  imageURL: string;
  onClick: () => void;
}

export const ResourceSwiperCard = ({
  title,
  imageURL,
  onClick,
}: ResourceSwiperCardProps) => {
  return (
    <div className="flex-shrink-0 w-52 md:w-80 flex flex-col items-center gap-4 transform-gpu">
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        /* RECUPERADO: Borde y Sombra sólida negra */
        className="w-full aspect-[4/5] bg-gray-100 border-2 border-black overflow-hidden relative cursor-pointer p-0 group shadow-[6px_6px_0px_black] md:shadow-[8px_8px_0px_black]"
      >
        <Image
          src={imageURL}
          alt={title}
          fill
          className="object-cover pointer-events-none"
          priority={false}
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </motion.button>

      {/* Texto con su respectivo borde y sombra sólida */}
      <p className="font-mono text-[10px] md:text-xs text-center font-bold text-black bg-white border-2 border-black px-2 md:px-4 py-1 shadow-[3px_3px_0px_black] md:shadow-[4px_4px_0px_black] uppercase truncate w-full select-none">
        {title}
      </p>
    </div>
  );
};

export default ResourceSwiperCard;
