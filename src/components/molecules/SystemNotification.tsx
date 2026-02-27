"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Jersey from "@/components/atoms/texts/Jersey";
import { CheckCircle, Info, Warning, XCircle } from "@phosphor-icons/react";

interface SystemNotificationProps {
  message: string;
  type?: "success" | "error" | "info" | "warning";
  onComplete?: () => void;
  duration?: number;
}

export default function SystemNotification({ 
  message, 
  type = "success", 
  onComplete,
  duration = 3000 
}: SystemNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) {
        setTimeout(onComplete, 500); 
      }
    }, duration);
    return () => clearTimeout(timer);
  }, [onComplete, duration]);

  const config = {
    success: {
      color: "bg-v2k-blue",
      icon: <CheckCircle weight="fill" className="text-white w-full h-full" />,
      title: "PLANTILLA_GUARDADA",
    },
    error: {
      color: "bg-v2k-pink-hot",
      icon: <XCircle weight="fill" className="text-white w-full h-full" />,
      title: "ERROR_DETECCION",
    },
    info: {
      color: "bg-v2k-yellow",
      icon: <Info weight="fill" className="text-white w-full h-full" />,
      title: "INFO_SISTEMA",
    },
    warning: {
      color: "bg-orange-500",
      icon: <Warning weight="fill" className="text-white w-full h-full" />,
      title: "ADVERTENCIA_!",
    },
  };

  const { color, icon, title } = config[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50, x: "-50%" }}
          animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
          transition={{ type: "spring", damping: 15, stiffness: 300 }}
          exit={{ opacity: 0, scale: 0.5, y: -20, x: "-50%" }}
          className="fixed bottom-10 left-1/2 z-[9999] flex items-center gap-4 bg-white border-4 border-black p-4 shadow-[10px_10px_0px_#000] rounded-2xl min-w-[300px] max-w-[90vw]"
        >
          <div className={`${color} border-2 border-black w-12 h-12 flex items-center justify-center rounded-full shadow-[3px_3px_0px_#000] shrink-0`}>
            <div className="w-8 h-8">
              {icon}
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <Jersey text={title} size="16|16" className="text-black" />
            <p className="text-[11px] font-bold text-black uppercase leading-tight mt-1">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
