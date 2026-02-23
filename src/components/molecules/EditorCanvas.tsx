"use client";

import dynamic from "next/dynamic";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import type { EditorElement } from "../../app/photocard-editor/[id]/types";
import { ICON_MAP } from "./EditorTools";

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

export default function EditorCanvas({
  side,
  imageURL,
  elements,
  updateElement,
  selectedId,
  setSelectedId,
}: EditorCanvasProps) {
  return (
    <section className="grow flex items-center justify-center overflow-hidden">
      <div className="relative aspect-[2/3] h-[78vh] border-[6px] border-black shadow-[20px_20px_0px_rgba(0,0,0,0.15)] bg-white overflow-hidden transition-transform duration-500">
        {side === "front" ? (
          <img
            src={imageURL}
            className="w-full h-full object-cover select-none"
            alt="Front"
          />
        ) : (
          <div className="w-full h-full bg-v2k-yellow-soft flex flex-col items-center justify-center p-8 border-4 border-dashed border-black/10">
            <Jersey
              text="REVERSO"
              size="44|80"
              className="text-black/10 -rotate-12"
            />
            <SpaceText
              text="Sube una foto para el reverso"
              size="12|12"
              className="text-black/20 font-bold uppercase mt-4"
            />
          </div>
        )}

        {elements.map((el) => (
          <Rnd
            key={el.id}
            size={{ width: el.width, height: el.height }}
            position={{ x: el.x, y: el.y }}
            onDragStop={(e: any, d: any) =>
              updateElement(el.id, { x: d.x, y: d.y })
            }
            onResizeStop={(e: any, dir: any, ref: any, delta: any, pos: any) =>
              updateElement(el.id, {
                width: parseInt(ref.style.width, 10),
                height: parseInt(ref.style.height, 10),
                ...pos,
              })
            }
            bounds="parent"
            onClick={() => setSelectedId(el.id)}
            className={`flex items-center justify-center transition-all ${
              selectedId === el.id
                ? "border-[3px] border-dashed border-v2k-pink-hot z-50 bg-v2k-pink-hot/5"
                : "z-10"
            }`}
          >
            {el.type === "sticker" && (
              <span className="text-5xl select-none filter drop-shadow-[2px_2px_0px_white]">
                {el.content}
              </span>
            )}
            {el.type === "icon" && (
              <div className="w-full h-full text-black filter drop-shadow-[2px_2px_0px_white] pointer-events-none">
                {ICON_MAP[el.content]}
              </div>
            )}
            {el.type === "image" && (
              <img
                src={el.content}
                className="w-full h-full object-contain pointer-events-none"
                alt=""
              />
            )}
            {el.type === "text" && (
              <Jersey
                text={el.content}
                size="20|24"
                className="text-black whitespace-nowrap px-2 select-none"
              />
            )}
          </Rnd>
        ))}
      </div>
    </section>
  );
}
