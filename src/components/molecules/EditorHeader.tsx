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
    <header className="relative z-30 w-full p-4 flex justify-between items-center bg-white border-b-[4px] border-black shadow-[0px_4px_0px_rgba(0,0,0,0.1)]">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-v2k-red-soft border-[3px] border-black px-6 py-1 font-bold shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none transition-all uppercase text-xs"
        >
          SALIR
        </button>
        <button
          type="button"
          onClick={() => setSide(side === "front" ? "back" : "front")}
          className="bg-v2k-accent border-[3px] border-black px-6 py-1 font-bold shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none transition-all uppercase text-xs"
        >
          {side === "front" ? "Girar a Reverso ↺" : "Girar a Frontal ↺"}
        </button>
      </div>

      <div className="bg-white border-[3px] border-black px-8 py-1 rounded-full shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
        <Jersey text={title} size="20|24" className="text-black" />
      </div>

      <button
        type="button"
        className="bg-v2k-green-soft border-[3px] border-black px-6 py-1 font-bold shadow-[4px_4px_0px_#000] hover:bg-v2k-green-hover transition-all uppercase text-xs"
      >
        EXPORTAR .PNG
      </button>
    </header>
  );
}
