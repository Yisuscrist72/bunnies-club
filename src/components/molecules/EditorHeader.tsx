"use client";

import { useRouter } from "next/navigation";
import Jersey from "@/components/atoms/texts/Jersey";

interface EditorHeaderProps {
  side: "front" | "back";
  setSide: (side: "front" | "back") => void;
  title: string;
}

export default function EditorHeader({
  side,
  setSide,
  title,
}: EditorHeaderProps) {
  const router = useRouter();

  return (
    <header className="relative z-30 w-full p-2 lg:p-4 flex flex-col lg:flex-row gap-2 lg:gap-0 justify-between items-center bg-white border-b-[4px] border-black shadow-[0px_4px_0px_rgba(0,0,0,0.1)]">
      
      {/* 1. SECCIÓN IZQUIERDA: BOTONES DE ACCIÓN (SALIR Y GIRAR) */}
      <div className="flex w-full lg:w-auto justify-between lg:justify-start gap-2 order-2 lg:order-1">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 lg:flex-none bg-v2k-red-soft border-[3px] border-black px-3 lg:px-6 py-2 lg:py-1 font-bold shadow-[3px_3px_0px_#000] active:translate-y-1 active:shadow-none transition-all uppercase text-[10px] lg:text-xs text-center"
        >
          SALIR
        </button>
        <button
          type="button"
          onClick={() => setSide(side === "front" ? "back" : "front")}
          className="flex-[2] lg:flex-none bg-v2k-accent border-[3px] border-black px-3 lg:px-6 py-2 lg:py-1 font-bold shadow-[3px_3px_0px_#000] active:translate-y-1 active:shadow-none transition-all uppercase text-[9px] lg:text-xs text-center leading-tight"
        >
          {side === "front" ? "Girar a Reverso ↺" : "Girar a Frontal ↺"}
        </button>
      </div>

      {/* 2. SECCIÓN CENTRAL: TÍTULO DEL PROYECTO */}
      {/* Eliminamos cualquier botón de menú que pudiera estar aquí o a la derecha */}
      <div className="bg-white border-[3px] border-black px-4 lg:px-6 py-1 rounded-full shadow-[3px_3px_0px_rgba(0,0,0,0.1)] order-1 lg:order-2 w-full lg:w-auto text-center truncate">
        <Jersey text={title} size="16|16" className="text-black lg:text-[20px]" />
      </div>

      {/* 3. SECCIÓN DERECHA: BOTÓN EXPORTAR */}
      {/* Este botón ahora ocupa el lugar donde antes estaba el menú en el flujo visual */}
      <button
        type="button"
        className="w-full lg:w-auto order-3 bg-v2k-green-soft border-[3px] border-black px-6 py-2 lg:py-1 font-bold shadow-[3px_3px_0px_#000] hover:bg-v2k-green-hover transition-all uppercase text-[10px] lg:text-xs active:translate-y-1 active:shadow-none"
      >
        EXPORTAR .PNG
      </button>

      {/* IMPORTANTE: No debe haber más divs o buttons después de este punto */}
    </header>
  );
}