"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import type { EditorElement } from "../../app/photocard-editor/[id]/types";
import * as Icons from "@phosphor-icons/react";

const Rnd = dynamic(() => import("react-rnd").then((mod) => mod.Rnd), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse bg-black/5 w-full h-full rounded-xl" />
  ),
});

// Componente para renderizar iconos por nombre
const IconRenderer = ({
  name,
  ...props
}: {
  name: string;
  [key: string]: any;
}) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
};

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
  backColor,
}: EditorCanvasProps) {
  return (
    <section className="w-full lg:grow flex flex-col items-center justify-center shrink-0 order-1 lg:order-none overflow-hidden p-2 lg:p-6">
      <div
        id="photocard-canvas"
        role="button"
        tabIndex={0}
        className="relative aspect-[2/3] w-[90vw] max-w-[350px] lg:max-w-none lg:h-[70vh] lg:w-[46.6vh] rounded-[24px] overflow-hidden shadow-[0px_10px_40px_rgba(0,0,0,0.15)] transition-all duration-300 bg-white cursor-crosshair focus:outline-none focus:ring-2 focus:ring-v2k-pink-hot"
        style={{ backgroundColor: side === "back" ? backColor : "white" }}
        onClick={() => setSelectedId(null)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSelectedId(null);
          }
        }}
      >
        {/* CARA FRONTAL */}
        {side === "front" && imageURL && (
          <Image
            src={imageURL}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
            className="absolute inset-0 object-cover select-none pointer-events-none"
            alt="Front Base"
            crossOrigin="anonymous"
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
            style={{ zIndex: index + 10 }}
            className={`flex items-center justify-center transition-all ${
              selectedId === el.id
                ? "border-[2px] border-dashed border-v2k-pink-hot bg-v2k-pink-hot/5"
                : ""
            }`}
          >
            <div
              role="button"
              tabIndex={0}
              className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing focus:outline-none"
              style={{ transform: `rotate(${el.rotation || 0}deg)` }}
              title="Doble clic para editar"
              // IMPLEMENTACIÓN DOBLE CLICK OBLIGATORIO PARA SELECCIONAR
              onDoubleClick={(e) => {
                e.stopPropagation();
                setSelectedId(el.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.stopPropagation();
                  e.preventDefault();
                  setSelectedId(el.id);
                }
              }}
            >
              {el.type === "icon" && el.content && (
                <div
                  className="w-full h-full pointer-events-none"
                  style={{ color: el.color || "#000000" }}
                >
                  <IconRenderer
                    name={el.content}
                    weight="fill"
                    className="w-full h-full"
                  />
                </div>
              )}

              {el.type === "text" && (
                <div
                  style={{
                    color: el.color || "#000000",
                    fontFamily: el.fontFamily
                      ? `'${el.fontFamily}', sans-serif`
                      : "inherit",
                    fontSize: `${el.height * 0.45}px`,
                    lineHeight: 1.1,
                  }}
                  className="whitespace-pre-wrap text-center px-2 select-none pointer-events-none"
                >
                  {el.content}
                </div>
              )}

              {el.type === "image" && (
                <Image
                  src={el.content}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  unoptimized
                  className="object-contain pointer-events-none"
                  alt="Upload"
                  crossOrigin="anonymous"
                />
              )}
            </div>
          </Rnd>
        ))}
      </div>
    </section>
  );
}
