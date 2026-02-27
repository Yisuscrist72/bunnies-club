"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Jersey from "@/components/atoms/texts/Jersey";

interface XpNotificationProps {
  amount: number;
  message?: string;
  onComplete?: () => void;
}

export default function XpNotification({ amount, message, onComplete }: XpNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        setTimeout(onComplete, 500); // Esperar a la animación de salida
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50, x: "-50%" }}
          animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          exit={{ opacity: 0, scale: 0.5, y: -20, x: "-50%" }}
          className="fixed bottom-24 left-1/2 z-9999 flex items-center gap-3 bg-white border-4 border-black p-4 shadow-[8px_8px_0px_#000] rounded-2xl min-w-[200px]"
        >
          <div className="bg-v2k-pink-hot border-2 border-black w-12 h-12 flex items-center justify-center rounded-full shadow-[2px_2px_0px_#000] shrink-0">
            <span className="text-white font-black text-xs">+{amount}</span>
          </div>
          <div className="flex flex-col">
            <Jersey text="¡XP GANADA!" size="16|16" className="text-v2k-pink-hot" />
            <p className="text-[10px] font-bold text-black uppercase">{message || "Acción completada"}</p>
          </div>
          <div className="ml-2 text-2xl">✨</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
