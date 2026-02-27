"use client";

import { motion } from "framer-motion";

interface ProfileActionsProps {
  isEditing: boolean;
  isSaving: boolean;
  onEditToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
  onLogout: () => void;
}

export default function ProfileActions({
  isEditing,
  isSaving,
  onEditToggle,
  onSave,
  onCancel,
  onLogout
}: ProfileActionsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={isEditing ? onSave : onEditToggle}
        disabled={isSaving}
        className={`flex-1 border-4 border-black py-4 rounded-2xl font-bold text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all ${
          isEditing 
            ? "bg-green-400 text-white" 
            : "bg-v2k-pink-hot text-white"
        }`}
      >
        {isSaving ? "GUARDANDO..." : isEditing ? "GUARDAR CAMBIOS" : "EDITAR PERFIL"}
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: "#ef4444", color: "white" }}
        whileTap={{ scale: 0.98 }}
        onClick={isEditing ? onCancel : onLogout}
        className="flex-1 bg-white text-red-500 border-4 border-black py-4 rounded-2xl font-bold text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
      >
        {isEditing ? "CANCELAR" : "CERRAR SESIÓN"}
      </motion.button>
    </div>
  );
}
