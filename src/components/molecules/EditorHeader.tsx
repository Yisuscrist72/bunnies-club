"use client";

import { useRouter } from "next/navigation";
import Jersey from "@/components/atoms/texts/Jersey";
import { domToPng } from "modern-screenshot";
import { jsPDF } from "jspdf";
import { useAuth } from "@/context/AuthContext";

interface EditorHeaderProps {
  side: "front" | "back";
  setSide: (side: "front" | "back") => void;
  title: string;
  setSelectedId: (id: string | null) => void;
}

export default function EditorHeader({ side, setSide, title, setSelectedId }: EditorHeaderProps) {
  const router = useRouter();
  const { user, addPoints } = useAuth();

  const handleExportPDF = async () => {
    setSelectedId(null); // Limpiamos selección

    try {
      const canvasElement = document.getElementById("photocard-canvas");
      if (!canvasElement) return;

      // 1. Capturamos la cara ACTUAL
      const currentImage = await domToPng(canvasElement, { scale: 3 });

      // 2. Cambiamos de cara para capturar la otra
      const otherSide = side === "front" ? "back" : "front";
      setSide(otherSide);

      // Esperamos un momento a que el DOM se actualice con la otra cara
      await new Promise((resolve) => setTimeout(resolve, 500));
      const otherImage = await domToPng(canvasElement, { scale: 3 });

      // 3. Crear el PDF (A4 es el estándar de impresión)
      const pdf = new jsPDF("p", "mm", "a4");
      
      // Definimos el tamaño de una photocard real (aprox 55mm x 85mm)
      const pcWidth = 55;
      const pcHeight = 85;

      // Cara Frontal (Izquierda)
      const frontImg = side === "front" ? currentImage : otherImage;
      // Cara Trasera (Derecha)
      const backImg = side === "back" ? currentImage : otherImage;

      pdf.setFontSize(10);
      pdf.text("Bunnies Club - Photocard Print Sheet", 10, 15);

      // Dibujamos la frontal
      pdf.addImage(frontImg, "PNG", 20, 30, pcWidth, pcHeight);
      // Dibujamos la trasera al lado
      pdf.addImage(backImg, "PNG", 20 + pcWidth + 5, 30, pcWidth, pcHeight);

      // 4. Descargar
      pdf.save(`PC-${title.replace(/\s+/g, "-")}-Printable.pdf`);

      // 5. Premiar con XP si está logueado
      if (user) {
        await addPoints(50, "¡Creador de Photocards! 🎨✨");
      } else {
        alert("¡PDF Generado! Sabías que si te logueas ganarías 50 XP por esto? 🐰");
      }

      // Devolvemos al usuario a la cara en la que estaba originalmente
      setSide(side);

    } catch (err) {
      console.error("Error generando PDF:", err);
      alert("Error al crear el PDF imprimible.");
    }
  };

  return (
    <header className="relative z-30 w-full p-2 lg:p-4 flex flex-col lg:flex-row gap-2 lg:gap-0 justify-between items-center bg-white border-b-[4px] border-black shadow-[0px_4px_0px_rgba(0,0,0,0.1)] font-space">
      <div className="flex w-full lg:w-auto justify-between lg:justify-start gap-2 order-2 lg:order-1">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 lg:flex-none bg-v2k-red-soft border-[3px] border-black px-3 py-2 font-bold shadow-[3px_3px_0px_#000] active:translate-y-1 active:shadow-none transition-all text-[10px]"
        >
          SALIR
        </button>
        <button
          type="button"
          onClick={() => setSide(side === "front" ? "back" : "front")}
          className="flex-[2] lg:flex-none bg-v2k-accent border-[3px] border-black px-3 py-2 font-bold shadow-[3px_3px_0px_#000] active:translate-y-1 active:shadow-none transition-all text-[9px] leading-tight uppercase"
        >
          Ver {side === "front" ? "Trasera" : "Frontal"} ↺
        </button>
      </div>

      <div className="bg-white border-[3px] border-black px-4 py-1 rounded-full shadow-[3px_3px_0px_rgba(0,0,0,0.1)] order-1 lg:order-2 w-full lg:w-auto text-center truncate">
        <Jersey text={title} size="16|16" />
      </div>

      <button
        type="button"
        onClick={handleExportPDF}
        className="w-full lg:w-auto order-3 bg-v2k-green-soft border-[3px] border-black px-6 py-2 font-bold shadow-[3px_3px_0px_#000] hover:bg-v2k-green-hover transition-all text-[10px] active:translate-y-1 active:shadow-none uppercase"
      >
        Descargar PDF Imprimible
      </button>
    </header>
  );
}