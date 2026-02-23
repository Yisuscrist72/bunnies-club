"use client";

import Window from "@/components/molecules/Window";
import SpaceText from "@/components/atoms/texts/SpaceText";
import {
  Smile,
  Heart,
  Star,
  Music,
  Zap,
  Coffee,
  Camera,
  Sparkles,
  Moon,
} from "lucide-react";
import type { EditorElement } from "@/app/photocard-editor/[id]/types";

export const ICON_MAP: Record<string, React.ReactNode> = {
  Smile: <Smile className="w-full h-full" strokeWidth={2} />,
  Heart: (
    <Heart className="w-full h-full" strokeWidth={2} fill="currentColor" />
  ),
  Star: <Star className="w-full h-full" strokeWidth={2} fill="currentColor" />,
  Music: <Music className="w-full h-full" strokeWidth={2} />,
  Zap: <Zap className="w-full h-full" strokeWidth={2} fill="currentColor" />,
  Coffee: <Coffee className="w-full h-full" strokeWidth={2} />,
  Camera: <Camera className="w-full h-full" strokeWidth={2} />,
  Sparkles: <Sparkles className="w-full h-full" strokeWidth={2} />,
  Moon: <Moon className="w-full h-full" strokeWidth={2} fill="currentColor" />,
};

interface EditorToolsProps {
  addElement: (type: EditorElement["type"], content: string) => void;
}

export default function EditorTools({ addElement }: EditorToolsProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addElement("image", url);
    }
  };

  return (
    <aside className="w-80 flex flex-col gap-4">
      <Window
        title="HERRAMIENTAS.EXE"
        className="h-full border-[4px] border-black shadow-[8px_8px_0px_#000]"
        contentClassName="flex flex-col flex-1 overflow-hidden"
      >
        <div className="flex border-b-[3px] border-black bg-black shrink-0">
          <button
            type="button"
            className="flex-1 py-3 font-bold bg-v2k-pink border-r-[3px] border-black uppercase text-[10px]"
          >
            Stickers
          </button>
          <button
            type="button"
            className="flex-1 py-3 font-bold bg-white uppercase text-[10px]"
          >
            Texto
          </button>
        </div>

        <div className="p-4 overflow-y-auto grow bg-[#F9F9F9] custom-scrollbar">
          <SpaceText
            text="EMOJIS"
            size="12|12"
            className="mb-2 font-bold opacity-40 uppercase"
          />
          <div className="grid grid-cols-3 gap-3 mb-6">
            {["🐰", "💖", "✨", "⭐", "🎀", "🎵", "🦋", "🍭", "🌈"].map(
              (s, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => addElement("sticker", s)}
                  className="aspect-square bg-white border-[3px] border-black text-3xl flex items-center justify-center hover:bg-v2k-accent hover:scale-105 transition-all shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none"
                >
                  {s}
                </button>
              ),
            )}
          </div>

          <SpaceText
            text="ICONOS REACT"
            size="12|12"
            className="mb-2 font-bold opacity-40 uppercase"
          />
          <div className="grid grid-cols-3 gap-3">
            {Object.keys(ICON_MAP).map((iconName) => (
              <button
                type="button"
                key={iconName}
                onClick={() => addElement("icon", iconName)}
                className="aspect-square bg-white border-[3px] border-black text-black flex items-center justify-center hover:bg-v2k-pink hover:scale-105 transition-all shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none p-3"
              >
                {ICON_MAP[iconName]}
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t-[3px] border-black border-dashed">
            <SpaceText
              text="PROPIOS"
              size="12|12"
              className="mb-4 font-bold opacity-40 uppercase"
            />
            <button
              type="button"
              onClick={() => addElement("text", "NUEVO TEXTO")}
              className="w-full bg-v2k-yellow-soft border-[3px] border-black py-3 font-bold shadow-[4px_4px_0px_#000] mb-4 uppercase text-xs active:translate-y-1 active:shadow-none"
            >
              + Texto Retro
            </button>
            <label className="block w-full bg-white border-[3px] border-black py-3 text-center cursor-pointer font-bold shadow-[4px_4px_0px_#000] hover:bg-v2k-blue-soft active:translate-y-1 active:shadow-none transition-all uppercase text-xs">
              + Subir Imagen
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
      </Window>
    </aside>
  );
}
