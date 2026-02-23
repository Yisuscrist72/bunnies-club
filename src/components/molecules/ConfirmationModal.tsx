"use client";

import { motion } from "framer-motion";
import Window from "@/components/atoms/Window";
import SpaceText from "@/components/atoms/texts/SpaceText";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  emoji?: string;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = "¡SÍ, VAMOS!",
  cancelText = "CANCELAR",
  onConfirm,
  onCancel,
  emoji = "🤔"
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} 
        animate={{ scale: 1, y: 0 }} 
        exit={{ scale: 0.9, y: 20 }} 
        className="w-full max-w-md"
      >
        <Window title={title} onClose={onCancel}>
          <div className="flex flex-col items-center gap-6 p-6 text-center bg-white">
            <div className="text-7xl drop-shadow-[3px_3px_0px_#000] animate-bounce text-black">
              {emoji}
            </div>
            <SpaceText text={message} size="14|14" className="font-bold text-black" />
            
            <div className="flex gap-4 w-full mt-4">
              <button 
                type="button" 
                onClick={onCancel} 
                className="flex-1 bg-v2k-red-soft border-[3px] border-black py-3 shadow-[4px_4px_0px_#000] hover:bg-v2k-red-hover font-bold text-black transition-colors active:translate-y-1 active:shadow-none"
              >
                {cancelText}
              </button>
              <button 
                type="button" 
                onClick={onConfirm} 
                className="flex-1 bg-v2k-green-soft border-[3px] border-black py-3 shadow-[4px_4px_0px_#000] hover:bg-v2k-green-hover font-bold text-black transition-colors active:translate-y-1 active:shadow-none"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </Window>
      </motion.div>
    </motion.div>
  );
}