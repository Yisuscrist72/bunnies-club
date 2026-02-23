"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// Componentes
import Jersey from "@/components/atoms/texts/Jersey";
import BackgroundDecorations from "@/components/atoms/BackgroundDecorations";
import EditorHeader from "@/components/molecules/EditorHeader";
import EditorTools from "@/components/molecules/EditorTools";
import EditorCanvas from "@/components/molecules/EditorCanvas";
import EditorProperties from "@/components/molecules/EditorProperties";
import type { EditorElement } from "./types";

export default function PhotocardEditorPage() {
  const { id } = useParams();

  // --- ESTADOS ---
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [side, setSide] = useState<"front" | "back">("front");
  const [frontElements, setFrontElements] = useState<EditorElement[]>([]);
  const [backElements, setBackElements] = useState<EditorElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // --- CARGA DE DATOS OPTIMIZADA ---
  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        const docSnap = await getDoc(
          doc(db, "photocards_resources", id as string),
        );
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
  const addElement = (type: EditorElement["type"], content: string) => {
    const newEl: EditorElement = {
      id: `el-${Date.now()}`,
      type,
      content,
      x: 40,
      y: 40,
      width: type === "text" ? 180 : type === "icon" ? 80 : 100,
      height: type === "text" ? 100 : type === "icon" ? 80 : 100,
    };
    const setter = side === "front" ? setFrontElements : setBackElements;
    setter((prev) => [...prev, newEl]);
    setSelectedId(newEl.id);
  };

  const updateElement = (elId: string, data: Partial<EditorElement>) => {
    const setter = side === "front" ? setFrontElements : setBackElements;
    setter((prev) =>
      prev.map((el) => (el.id === elId ? { ...el, ...data } : el)),
    );
  };

  const deleteElement = () => {
    if (!selectedId) return;
    const setter = side === "front" ? setFrontElements : setBackElements;
    setter((prev) => prev.filter((el) => el.id !== selectedId));
    setSelectedId(null);
  };

  // --- RENDERIZADO DE CARGA (SKELETON) ---
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-v2k-blue">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-black border-t-v2k-pink rounded-full animate-spin" />
          <Jersey text="CARGANDO_ESTUDIO.SYS" className="animate-pulse" />
        </div>
      </div>
    );

  const activeElements = side === "front" ? frontElements : backElements;

  return (
    <div className="fixed inset-0 z-50 w-full h-full flex flex-col items-center bg-[#BEE5FD] overflow-hidden font-space">
      <BackgroundDecorations />

      <EditorHeader
        side={side}
        setSide={setSide}
        title={template?.title || "EDITOR_V2K"}
      />

      <main className="relative z-10 w-full flex-1 flex p-6 gap-6 min-h-0">
        <EditorTools addElement={addElement} />

        <EditorCanvas
          side={side}
          imageURL={template?.imageURL}
          elements={activeElements}
          updateElement={updateElement}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />

        <EditorProperties selectedId={selectedId} onDelete={deleteElement} />
      </main>
    </div>
  );
}
