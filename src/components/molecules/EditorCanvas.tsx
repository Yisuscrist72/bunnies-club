"use client";

import dynamic from "next/dynamic";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import type { EditorElement } from "../../app/photocard-editor/[id]/types";
import { ICON_MAP } from "@/components/molecules/EditorTools";

const Rnd = dynamic(() => import("react-rnd").then((mod) => mod.Rnd), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-black/5 w-full h-full rounded-xl" />
  ),
});

interface EditorCanvasProps {
  side: "front" | "back";
  imageURL?: string;
  elements: EditorElement[];
  updateElement: (id: string, data: Partial<EditorElement>) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

export default function EditorCanvas({ side, imageURL, elements, updateElement, selectedId, setSelectedId }: EditorCanvasProps) {
  return (
    <section className="w-full lg:grow flex flex-col lg:flex-row items-center justify-center shrink-0 order-1 lg:order-none overflow-hidden">
      {/* Contenedor principal de la Photocard */}
      <div className="relative aspect-[2/3] w-[80%] max-w-[320px] lg:max-w-none lg:w-auto lg:h-[78vh] border-[4px] lg:border-[6px] border-black shadow-[15px_15px_0px_rgba(0,0,0,0.1)] bg-white overflow-hidden transition-all duration-300">
        
        {side === "front" ? (
          <img src={imageURL} className="w-full h-full object-cover select-none pointer-events-none" alt="Front" />
        ) : (
          <div className="w-full h-full bg-v2k-yellow-soft flex flex-col items-center justify-center p-8 border-4 border-dashed border-black/10">
            <Jersey text="REVERSO" size="44|80" className="text-black/10 -rotate-12" />
            <SpaceText text="Personaliza el reverso" size="12|12" className="text-black/20 font-bold uppercase mt-4" />
          </div>
        )}

        {elements.map((el, index) => (
          <Rnd
            key={el.id}
            size={{ width: el.width, height: el.height }}
            position={{ x: el.x, y: el.y }}
            onDragStop={(_e, d) => updateElement(el.id, { x: d.x, y: d.y })}
            onResizeStop={(_e, _dir, ref, _delta, pos) =>
              updateElement(el.id, {
                width: parseInt(ref.style.width, 10),
                height: parseInt(ref.style.height, 10),
                ...pos,
              })
            }
            bounds="parent"
            onMouseDown={() => setSelectedId(el.id)}
            style={{ zIndex: selectedId === el.id ? 100 : index + 1 }}
            className={`flex items-center justify-center transition-all ${
              selectedId === el.id ? "border-[2px] border-dashed border-v2k-pink-hot bg-v2k-pink-hot/5" : ""
            }`}
          >
            <div
              className="w-full h-full flex items-center justify-center pointer-events-none"
              style={{ transform: `rotate(${el.rotation || 0}deg)` }}
            >
              {el.type === "icon" && (
                <div className="w-full h-full filter drop-shadow-[2px_2px_0px_white]" style={{ color: el.color || "#000000" }}>
                  {ICON_MAP[el.content]}
                </div>
              )}

              {el.type === "text" && (
                <div
                  style={{
                    color: el.color || "#000000",
                    fontFamily: el.fontFamily ? `'${el.fontFamily}', sans-serif` : "inherit", 
                    fontSize: `${el.height * 0.5}px`, 
                    lineHeight: 1.1,
                  }}
                  className="whitespace-pre-wrap text-center px-2 select-none filter drop-shadow-[1px_1px_0px_white]"
                >
                  {el.content}
                </div>
              )}
              
              {el.type === "image" && (
                <img src={el.content} className="w-full h-full object-contain" alt="" />
              )}
            </div>
          </Rnd>
        ))}
      </div>
    </section>
  );
}