"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, addDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { domToPng } from "modern-screenshot";

import Jersey from "@/components/atoms/texts/Jersey";
import BackgroundDecorations from "@/components/atoms/BackgroundDecorations";
import EditorHeader from "@/components/molecules/EditorHeader";
import EditorTools from "@/components/molecules/EditorTools";
import EditorCanvas from "@/components/molecules/EditorCanvas";
import type { EditorElement } from "./types";

interface Template {
  id: string;
  title: string;
  imageURL: string;
}

export default function PhotocardEditorPage() {
  const { id } = useParams();

  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [side, setSide] = useState<"front" | "back">("front");
  const [frontElements, setFrontElements] = useState<EditorElement[]>([]);
  const [backElements, setBackElements] = useState<EditorElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [backColor, setBackColor] = useState<string>("#FFFFFF");
  const [isSaving, setIsSaving] = useState(false);
  const { user, addPoints, showSystemNotification } = useAuth();
  const [isUserTemplate, setIsUserTemplate] = useState(false);
  const [customTitle, setCustomTitle] = useState<string>("");

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        // Primero intentamos cargar como plantilla de usuario
        const userDocSnap = await getDoc(doc(db, "user_photocards", id as string));
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          // Necesitamos el recurso original para la imagen
          const resourceSnap = await getDoc(doc(db, "photocards_resources", data.templateId));
          if (resourceSnap.exists()) {
            const resData = resourceSnap.data();
            setTemplate({ 
              id: data.templateId, 
              title: resData.title, 
              imageURL: resData.imageURL 
            });
            setFrontElements(data.frontElements || []);
            setBackElements(data.backElements || []);
            setBackColor(data.backColor || "#FFFFFF");
            setCustomTitle(data.title || resData.title);
            setIsUserTemplate(true);
          }
        } else {
          // Si no es de usuario, cargamos el recurso base
          const docSnap = await getDoc(doc(db, "photocards_resources", id as string));
          if (docSnap.exists()) {
            const resData = docSnap.data();
            setTemplate({ 
              id: docSnap.id, 
              title: resData.title, 
              imageURL: resData.imageURL 
            });
          }
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleSave = async () => {
    if (!user || !template) return;
    setIsSaving(true);
    try {
      setSide("front");
      
      // Esperamos a que el canvas se renderice en el frente si no lo estaba
      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvasElement = document.getElementById("photocard-canvas");
      let previewURL = "";
      
      if (canvasElement) {
        // Capturamos el frente como preview
        // Nota: En una app de producción esto debería subirse a Firebase Storage,
        // pero para este entorno usaremos Base64 o simplemente guardaremos el estado.
        // Como el usuario pidió "preview aparezca editado", capturamos la imagen actual.
        previewURL = await domToPng(canvasElement, { scale: 1, quality: 0.8 });
      }

      const pcData = {
        userId: user.uid,
        templateId: template.id,
        frontElements,
        backElements,
        backColor,
        updatedAt: serverTimestamp(),
        title: customTitle || template.title,
        previewImage: previewURL, // Guardamos la captura actual
      };

      if (isUserTemplate) {
        // Actualizar existente
        await updateDoc(doc(db, "user_photocards", id as string), pcData);
        showSystemNotification("¡Cambios guardados correctamente!", "success");
      } else {
        // Crear nueva
        await addDoc(collection(db, "user_photocards"), {
          ...pcData,
          createdAt: serverTimestamp(),
        });
        setIsUserTemplate(true);
        showSystemNotification("¡Plantilla guardada en tu colección!", "success");
        await addPoints(100, "¡Guardaste tu primera decoración! 🐰💖");
      }
    } catch (error) {
      console.error("Error saving:", error);
      showSystemNotification("Error al guardar la plantilla.", "error");
    } finally {
      setIsSaving(false);
    }
  };

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
      color: "#000000", // Color inicial por defecto
    };
    const setter = side === "front" ? setFrontElements : setBackElements;
    setter((prev) => [...prev, newEl]);
    setSelectedId(newEl.id);
  };

  const updateElement = (elId: string, data: Partial<EditorElement>) => {
    const setter = side === "front" ? setFrontElements : setBackElements;
    setter((prev) => prev.map((el) => (el.id === elId ? { ...el, ...data } : el)));
  };

  const deleteElement = () => {
    if (!selectedId) return;
    const setter = side === "front" ? setFrontElements : setBackElements;
    setter((prev) => prev.filter((el) => el.id !== selectedId));
    setSelectedId(null);
  };

  const moveElementForward = (elId: string) => {
    const setter = side === "front" ? setFrontElements : setBackElements;
    setter((prev) => {
      const index = prev.findIndex((el) => el.id === elId);
      if (index === -1 || index === prev.length - 1) return prev;
      const newArr = [...prev];
      const nextEl = newArr[index + 1];
      newArr[index + 1] = newArr[index];
      newArr[index] = nextEl;
      return newArr;
    });
  };

  const moveElementBackward = (elId: string) => {
    const setter = side === "front" ? setFrontElements : setBackElements;
    setter((prev) => {
      const index = prev.findIndex((el) => el.id === elId);
      if (index <= 0) return prev;
      const newArr = [...prev];
      const prevEl = newArr[index - 1];
      newArr[index - 1] = newArr[index];
      newArr[index] = prevEl;
      return newArr;
    });
  };

  const bringElementToFront = (elId: string) => {
    const setter = side === "front" ? setFrontElements : setBackElements;
    setter((prev) => {
      const el = prev.find((e) => e.id === elId);
      if (!el) return prev;
      return [...prev.filter((e) => e.id !== elId), el];
    });
  };

  const sendElementToBack = (elId: string) => {
    const setter = side === "front" ? setFrontElements : setBackElements;
    setter((prev) => {
      const el = prev.find((e) => e.id === elId);
      if (!el) return prev;
      return [el, ...prev.filter((e) => e.id !== elId)];
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#BEE5FD]">
        <Jersey text="CARGANDO_ESTUDIO.SYS" className="animate-pulse" />
      </div>
    );

  const activeElements = side === "front" ? frontElements : backElements;
  const selectedElement = activeElements.find((el) => el.id === selectedId) || null;

  return (
    <div className="fixed inset-0 z-50 w-full h-full flex flex-col items-center bg-[#BEE5FD] overflow-hidden font-space">
      <BackgroundDecorations />
      <EditorHeader
        side={side}
        setSide={setSide}
        title={template?.title || "EDITOR_V2K"}
        setSelectedId={setSelectedId}
        onSave={user ? handleSave : undefined}
        isSaving={isSaving}
        customTitle={customTitle}
        setCustomTitle={setCustomTitle}
      />
      <main className="relative z-10 w-full flex-1 flex flex-col lg:flex-row p-4 lg:p-6 gap-6 items-center lg:items-stretch min-h-0 overflow-y-auto lg:overflow-hidden">
        <EditorTools
          addElement={addElement}
          deleteElement={deleteElement}
          updateElement={updateElement}
          moveElementForward={moveElementForward}
          moveElementBackward={moveElementBackward}
          bringElementToFront={bringElementToFront}
          sendElementToBack={sendElementToBack}
          selectedElement={selectedElement}
          backColor={backColor}      // Pasamos el color
          setBackColor={setBackColor} // Pasamos el setter
        />
        <EditorCanvas
          side={side}
          imageURL={template?.imageURL}
          elements={activeElements}
          updateElement={updateElement}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          backColor={backColor} // El canvas ahora usa este color para el reverso
        />
      </main>
    </div>
  );
}