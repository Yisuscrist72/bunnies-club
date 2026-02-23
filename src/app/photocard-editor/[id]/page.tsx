"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

import Jersey from "@/components/atoms/texts/Jersey";
import BackgroundDecorations from "@/components/atoms/BackgroundDecorations";
import EditorHeader from "@/components/molecules/EditorHeader";
import EditorTools from "@/components/molecules/EditorTools";
import EditorCanvas from "@/components/molecules/EditorCanvas";
import EditorProperties from "@/components/molecules/EditorProperties";
import type { EditorElement } from "./types";

export default function PhotocardEditorPage() {
  const { id } = useParams();

  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [side, setSide] = useState<"front" | "back">("front");
  const [frontElements, setFrontElements] = useState<EditorElement[]>([]);
  const [backElements, setBackElements] = useState<EditorElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const addElement = (type: EditorElement["type"], content: string) => {
    const newEl: EditorElement = {
      id: `el-${Date.now()}`,
      type,
      content,
      x: 50,
      y: 50,
      width: type === "text" ? 180 : 100,
      height: type === "text" ? 100 : 100,
      rotation: 0,
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-v2k-blue">
        <Jersey text="CARGANDO_ESTUDIO.SYS" className="animate-pulse" />
      </div>
    );

  const activeElements = side === "front" ? frontElements : backElements;
  const selectedElement =
    activeElements.find((el) => el.id === selectedId) || null;

  return (
    <div className="fixed inset-0 z-50 w-full h-full flex flex-col items-center bg-[#BEE5FD] overflow-hidden">
      <BackgroundDecorations />
      <EditorHeader
        side={side}
        setSide={setSide}
        title={template?.title || "EDITOR_V2K"}
      />
      <main className="relative z-10 w-full flex-1 flex flex-col lg:flex-row p-4 lg:p-6 gap-6 items-center lg:items-stretch min-h-0 overflow-y-auto lg:overflow-hidden">
        <EditorTools
          addElement={addElement}
          deleteElement={deleteElement}
          updateElement={updateElement}
          selectedElement={selectedElement}
        />
        <EditorCanvas
          side={side}
          imageURL={template?.imageURL}
          elements={activeElements}
          updateElement={updateElement}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </main>
    </div>
  );
}
