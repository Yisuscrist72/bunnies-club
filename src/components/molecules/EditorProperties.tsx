"use client";

import Window from "@/components/molecules/Window";
import SpaceText from "@/components/atoms/texts/SpaceText";

import type { EditorElement } from "@/app/photocard-editor/[id]/types";

interface EditorPropertiesProps {
  selectedElement: EditorElement | null;
  updateElement: (id: string, data: Partial<EditorElement>) => void;
  moveLayer: (direction: "up" | "down" | "top" | "bottom") => void;
  onDelete: () => void;
}

const COLORS = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#0000FF",
  "#FFFF00",
  "#ff9eb5", // pastel pink
  "#b5d8ff", // pastel blue
  "#c4ffb5", // pastel green
  "#eebbff", // pastel purple
];

export default function EditorProperties({
  selectedElement,
  updateElement,
  moveLayer,
  onDelete,
}: EditorPropertiesProps) {
  return (
    <aside className="w-full lg:w-72 shrink-0 lg:h-full order-3 lg:order-none">
      <Window
        title="PROPIEDADES"
        className="h-auto lg:h-full lg:min-h-0 border-[4px] border-black shadow-[4px_4px_0px_#000] lg:shadow-[8px_8px_0px_#000]"
        contentClassName="p-0 flex flex-col flex-1 overflow-hidden"
      >
        <div className="p-6 bg-[#FEFCE8] flex-1 flex flex-col overflow-y-auto custom-scrollbar">
          {selectedElement ? (
            <div className="flex flex-col gap-6">
              <div className="bg-black text-white px-2 py-1 inline-block text-[10px] font-bold self-start uppercase tracking-tighter">
                Capa Seleccionada
              </div>

              {selectedElement.type === "text" && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase">Texto</span>
                  <input
                    type="text"
                    value={selectedElement.content}
                    onChange={(e) =>
                      updateElement(selectedElement.id, {
                        content: e.target.value,
                      })
                    }
                    className="w-full border-[3px] border-black p-2 bg-white text-sm outline-none focus:border-v2k-pink"
                  />
                </div>
              )}

              {(selectedElement.type === "text" ||
                selectedElement.type === "icon") && (
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-xs font-bold uppercase">Color</span>
                  <div className="flex flex-wrap gap-2">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() =>
                          updateElement(selectedElement.id, { color: c })
                        }
                        className={`w-6 h-6 border-[2px] border-black ${selectedElement.color === c ? "scale-125" : ""}`}
                        style={{ backgroundColor: c }}
                        aria-label={`Color ${c}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-4 pt-4 border-t-[3px] border-dashed border-black">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">
                      Rotación
                    </span>
                    <span className="text-[10px] font-bold opacity-50">
                      {selectedElement.rotation || 0}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={selectedElement.rotation || 0}
                    onChange={(e) =>
                      updateElement(selectedElement.id, {
                        rotation: Number(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-v2k-pink border-[2px] border-black"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase">Tamaño</span>
                    <span className="text-[10px] font-bold opacity-50">
                      {Math.round(
                        Math.max(selectedElement.width, selectedElement.height),
                      )}
                      px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="500"
                    value={Math.max(
                      selectedElement.width,
                      selectedElement.height,
                    )}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const originalMax =
                        Math.max(
                          selectedElement.width,
                          selectedElement.height,
                        ) || 1;
                      const scale = val / originalMax;
                      updateElement(selectedElement.id, {
                        width: selectedElement.width * scale,
                        height: selectedElement.height * scale,
                      });
                    }}
                    className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-v2k-pink border-[2px] border-black"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t-[3px] border-dashed border-black">
                <span className="text-xs font-bold uppercase">Capas</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => moveLayer("up")}
                    className="bg-v2k-yellow-soft border-[3px] border-black py-2 font-bold shadow-[2px_2px_0px_#000] active:translate-y-1 active:shadow-none text-[10px] uppercase"
                  >
                    ↑ Subir
                  </button>
                  <button
                    type="button"
                    onClick={() => moveLayer("down")}
                    className="bg-v2k-yellow-soft border-[3px] border-black py-2 font-bold shadow-[2px_2px_0px_#000] active:translate-y-1 active:shadow-none text-[10px] uppercase"
                  >
                    ↓ Bajar
                  </button>
                  <button
                    type="button"
                    onClick={() => moveLayer("top")}
                    className="bg-white border-[3px] border-black py-2 font-bold shadow-[2px_2px_0px_#000] active:translate-y-1 active:shadow-none text-[10px] uppercase"
                  >
                    ⇈ Tope
                  </button>
                  <button
                    type="button"
                    onClick={() => moveLayer("bottom")}
                    className="bg-white border-[3px] border-black py-2 font-bold shadow-[2px_2px_0px_#000] active:translate-y-1 active:shadow-none text-[10px] uppercase"
                  >
                    ⇊ Fondo
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={onDelete}
                className="w-full mt-4 bg-v2k-red-soft border-[3px] border-black py-4 font-bold text-red-600 shadow-[4px_4px_0px_#000] hover:bg-v2k-red-hover active:translate-y-1 active:shadow-none transition-all uppercase text-xs"
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
