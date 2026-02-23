"use client";

import Window from "@/components/molecules/Window";
import SpaceText from "@/components/atoms/texts/SpaceText";

interface EditorPropertiesProps {
  selectedId: string | null;
  onDelete: () => void;
}

export default function EditorProperties({
  selectedId,
  onDelete,
}: EditorPropertiesProps) {
  return (
    <aside className="w-72">
      <Window
        title="PROPIEDADES"
        className="h-full border-[4px] border-black shadow-[8px_8px_0px_#000]"
        contentClassName="p-0 flex flex-col flex-1 overflow-hidden"
      >
        <div className="p-6 bg-[#FEFCE8] flex-1 flex flex-col">
          {selectedId ? (
            <div className="flex flex-col gap-6">
              <div className="bg-black text-white px-2 py-1 inline-block text-[10px] font-bold self-start uppercase tracking-tighter">
                Capa Seleccionada
              </div>

              <button
                type="button"
                onClick={onDelete}
                className="w-full bg-v2k-red-soft border-[3px] border-black py-4 font-bold text-red-600 shadow-[4px_4px_0px_#000] hover:bg-v2k-red-hover active:translate-y-1 active:shadow-none transition-all uppercase text-xs"
              >
                Borrar Elemento
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center">
              <div className="text-5xl mb-4">🖱️</div>
              <SpaceText
                text="Selecciona un sticker para editarlo"
                size="12|12"
                className="font-bold leading-tight"
              />
            </div>
          )}
        </div>
      </Window>
    </aside>
  );
}
