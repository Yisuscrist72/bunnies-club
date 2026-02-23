import { motion } from "framer-motion";
import type React from "react";
import Jersey from "./texts/Jersey";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export default function Window({
  title,
  children,
  className = "",
  onClose,
}: WindowProps) {
  return (
    <div
      className={`bg-v2k-yellow-soft border-[3px] border-black shadow-[4px_4px_0px_#000] overflow-hidden ${className}`}
    >
      {/* Barra de Título */}
      <div className="bg-v2k-accent border-b-[3px] border-black px-2 py-1 flex justify-between items-center">
        <Jersey
          tag="span"
          text={title}
          size="14|14"
          className="text-black font-bold"
        />
        {onClose && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-5 h-5 bg-v2k-pink-light border-[2px] border-black flex items-center justify-center font-bold leading-none cursor-pointer"
          >
            X
          </motion.button>
        )}
      </div>
      {/* Contenido */}
      <div className="p-4">{children}</div>
    </div>
  );
}