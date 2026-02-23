"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic'; // Para carga optimizada
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

// Componentes Atómicos
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Window from "@/components/atoms/Window";
import BackgroundDecorations from "@/components/atoms/BackgroundDecorations";

// --- OPTIMIZACIÓN: Carga dinámica del motor de arrastre ---
// Esto hace que la página inicial cargue mucho más rápido al no bajar Rnd de golpe.
const Rnd = dynamic(() => import('react-rnd').then(mod => mod.Rnd), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-black/5 w-full h-full rounded-xl" />
});

// --- TIPOS ---
interface Element {
  id: string;
  type: "sticker" | "text" | "image";
  content: string; 
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function PhotocardEditorPage() {
  const { id } = useParams();
  const router = useRouter();

  // --- ESTADOS ---
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [side, setSide] = useState<"front" | "back">("front");
  const [frontElements, setFrontElements] = useState<Element[]>([]);
  const [backElements, setBackElements] = useState<Element[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // --- CARGA DE DATOS OPTIMIZADA ---
  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        const docSnap = await getDoc(doc(db, "photocards_resources", id as string));
        if (docSnap.exists()) {
          setTemplate(docSnap.data());
        }
      } catch (error) {
        console.error("Error cargando recurso:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  // --- LÓGICA DEL EDITOR ---
  const addElement = (type: "sticker" | "text" | "image", content: string) => {
    const newEl: Element = {
      id: `el-${Date.now()}`,
      type,
      content,
      x: 40,
      y: 40,
      width: type === "text" ? 180 : 100,
      height: 100,
    };
    const setter = side === "front" ? setFrontElements : setBackElements;
    setter(prev => [...prev, newEl]);
    setSelectedId(newEl.id);
  };

  const updateElement = (elId: string, data: any) => {
    const setter = side === "front" ? setFrontElements : setBackElements;
    setter(prev => prev.map(el => el.id === elId ? { ...el, ...data } : el));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addElement("image", url);
    }
  };

  // --- RENDERIZADO DE CARGA (SKELETON) ---
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-v2k-blue">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-black border-t-v2k-pink rounded-full animate-spin" />
        <Jersey text="CARGANDO_ESTUDIO.SYS" className="animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-[#BEE5FD] overflow-hidden font-space">
      <BackgroundDecorations />

      {/* HEADER NEO-BRUTALISTA */}
      <header className="relative z-30 w-full p-4 flex justify-between items-center bg-white border-b-[4px] border-black shadow-[0px_4px_0px_rgba(0,0,0,0.1)]">
        <div className="flex gap-4">
          <button 
            onClick={() => router.back()} 
            className="bg-v2k-red-soft border-[3px] border-black px-6 py-1 font-bold shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none transition-all uppercase text-xs"
          >
            SALIR
          </button>
          <button 
            onClick={() => setSide(side === "front" ? "back" : "front")}
            className="bg-v2k-accent border-[3px] border-black px-6 py-1 font-bold shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none transition-all uppercase text-xs"
          >
            {side === "front" ? "Girar a Reverso ↺" : "Girar a Frontal ↺"}
          </button>
        </div>
        
        <div className="bg-white border-[3px] border-black px-8 py-1 rounded-full shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
          <Jersey text={template?.title || "EDITOR_V2K"} size="24|24" className="text-black" />
        </div>

        <button className="bg-v2k-green-soft border-[3px] border-black px-6 py-1 font-bold shadow-[4px_4px_0px_#000] hover:bg-v2k-green-hover transition-all uppercase text-xs">
          EXPORTAR .PNG
        </button>
      </header>

      <main className="relative z-10 w-full flex h-[calc(100vh-85px)] p-6 gap-6">
        
        {/* PANEL IZQUIERDO: HERRAMIENTAS */}
        <aside className="w-80 flex flex-col gap-4">
          <Window title="HERRAMIENTAS.EXE" className="h-full border-[4px] border-black shadow-[8px_8px_0px_#000]">
            <div className="flex border-b-[3px] border-black bg-black">
              <button className="flex-1 py-3 font-bold bg-v2k-pink border-r-[3px] border-black uppercase text-[10px]">Stickers</button>
              <button className="flex-1 py-3 font-bold bg-white uppercase text-[10px]">Texto</button>
            </div>
            
            <div className="p-4 overflow-y-auto grow bg-[#F9F9F9]">
              <div className="grid grid-cols-3 gap-3">
                {["🐰", "💖", "✨", "⭐", "🎀", "🎵", "🦋", "🍭", "🌈"].map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => addElement("sticker", s)}
                    className="aspect-square bg-white border-[3px] border-black text-3xl flex items-center justify-center hover:bg-v2k-accent hover:scale-105 transition-all shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none"
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t-[3px] border-black border-dashed">
                <SpaceText text="PROPIOS" size="10|10" className="mb-4 font-bold opacity-40 uppercase" />
                <button 
                  onClick={() => addElement("text", "NUEVO TEXTO")}
                  className="w-full bg-v2k-yellow-soft border-[3px] border-black py-3 font-bold shadow-[4px_4px_0px_#000] mb-4 uppercase text-xs active:translate-y-1 active:shadow-none"
                >
                  + Texto Retro
                </button>
                <label className="block w-full bg-white border-[3px] border-black py-3 text-center cursor-pointer font-bold shadow-[4px_4px_0px_#000] hover:bg-v2k-blue-soft active:translate-y-1 active:shadow-none transition-all uppercase text-xs">
                  + Subir Imagen
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </label>
              </div>
            </div>
          </Window>
        </aside>

        {/* ÁREA CENTRAL: LIENZO (CANVAS) */}
        <section className="grow flex items-center justify-center overflow-hidden">
          <div className="relative aspect-[2/3] h-[78vh] border-[6px] border-black shadow-[20px_20px_0px_rgba(0,0,0,0.15)] bg-white overflow-hidden transition-transform duration-500">
            {side === "front" ? (
              <img src={template?.imageURL} className="w-full h-full object-cover select-none" alt="Front" />
            ) : (
              <div className="w-full h-full bg-v2k-yellow-soft flex flex-col items-center justify-center p-8 border-4 border-dashed border-black/10">
                <Jersey text="REVERSO" size="48|48" className="text-black/10 -rotate-12" />
                <SpaceText text="Sube una foto para el reverso" size="10|10" className="text-black/20 font-bold uppercase mt-4" />
              </div>
            )}

            {/* ELEMENTOS ARRASTRABLES */}
            {(side === "front" ? frontElements : backElements).map((el) => (
              <Rnd
                key={el.id}
                size={{ width: el.width, height: el.height }}
                position={{ x: el.x, y: el.y }}
                onDragStop={(e, d) => updateElement(el.id, { x: d.x, y: d.y })}
                onResizeStop={(e, dir, ref, delta, pos) => updateElement(el.id, { width: parseInt(ref.style.width), height: parseInt(ref.style.height), ...pos })}
                bounds="parent"
                onClick={() => setSelectedId(el.id)}
                className={`flex items-center justify-center transition-all ${selectedId === el.id ? "border-[3px] border-dashed border-v2k-pink-hot z-50 bg-v2k-pink-hot/5" : "z-10"}`}
              >
                {el.type === "sticker" && <span className="text-5xl select-none filter drop-shadow-[2px_2px_0px_white]">{el.content}</span>}
                {el.type === "image" && <img src={el.content} className="w-full h-full object-contain pointer-events-none" />}
                {el.type === "text" && <Jersey text={el.content} size="24|24" className="text-black whitespace-nowrap px-2" />}
              </Rnd>
            ))}
          </div>
        </section>

        {/* PANEL DERECHO: INFO */}
        <aside className="w-72">
          <Window title="PROPIEDADES" className="h-full border-[4px] border-black shadow-[8px_8px_0px_#000]">
            <div className="p-6 bg-[#FEFCE8] h-full">
              {selectedId ? (
                <div className="flex flex-col gap-6">
                  <div className="bg-black text-white px-2 py-1 inline-block text-[10px] font-bold self-start uppercase tracking-tighter">Capa Seleccionada</div>
                  
                  <button 
                    onClick={() => {
                      const setter = side === "front" ? setFrontElements : setBackElements;
                      setter(prev => prev.filter(el => el.id !== selectedId));
                      setSelectedId(null);
                    }}
                    className="w-full bg-v2k-red-soft border-[3px] border-black py-4 font-bold text-red-600 shadow-[4px_4px_0px_#000] hover:bg-v2k-red-hover active:translate-y-1 active:shadow-none transition-all uppercase text-xs"
                  >
                    Borrar Elemento
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 opacity-30 text-center">
                  <div className="text-5xl mb-4">🖱️</div>
                  <SpaceText text="Selecciona un sticker para editarlo" size="12|12" className="font-bold leading-tight" />
                </div>
              )}
            </div>
          </Window>
        </aside>
      </main>
    </div>
  );
}