"use client";

import dynamic from "next/dynamic";
import type { EditorElement } from "../../app/photocard-editor/[id]/types";
import { ICON_MAP } from "@/components/molecules/EditorTools";

const Rnd = dynamic(() => import("react-rnd").then((mod) => mod.Rnd), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-black/5 w-full h-full rounded-xl" />,
});

interface EditorCanvasProps {
  side: "front" | "back";
  imageURL?: string;
  elements: EditorElement[];
  updateElement: (id: string, data: Partial<EditorElement>) => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  backColor: string;
}

export default function EditorCanvas({ 
  side, 
  imageURL, 
  elements, 
  updateElement, 
  selectedId, 
  setSelectedId, 
  backColor 
}: EditorCanvasProps) {
  return (
    <section className="w-full lg:grow flex flex-col lg:flex-row items-center justify-center shrink-0 order-1 lg:order-none overflow-hidden">
      <div 
        id="photocard-canvas"
        /* CAMBIOS AQUÍ:
           1. Cambiamos 'rounded-none' por 'rounded-[20px]' o 'rounded-[32px]' para la forma de photocard.
           2. Quitamos 'border-black' y 'border-[4px]' para eliminar los bordes negros.
           3. Mantenemos 'overflow-hidden' para que la imagen se corte con la forma redondeada.
        */
        className="relative aspect-[2/3] w-[80%] max-w-[320px] lg:max-w-none lg:w-auto lg:h-[78vh] rounded-[24px] overflow-hidden shadow-[0px_10px_30px_rgba(0,0,0,0.2)] transition-all duration-300 bg-white"
        style={{ backgroundColor: side === "back" ? backColor : "white" }}
      >
        
        {/* CARA FRONTAL */}
        {side === "front" && imageURL && (
          <img 
            src={imageURL} 
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none" 
            alt="Front Base" 
          />
        )}

        {/* ELEMENTOS (STICKERS, TEXTOS) */}
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
              {el.type === "icon" && el.content && (
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
                <img src={el.content} className="w-full h-full object-contain" alt="Upload" />
              )}
            </div>
          </Rnd>
        ))}
      </div>
    </section>
  );
}