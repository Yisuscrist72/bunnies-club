"use client";

import React, { useState, useEffect } from "react";
import Window from "@/components/molecules/Window";
import SpaceText from "@/components/atoms/texts/SpaceText";
import { 
  Heart, Star, Smiley, MusicNotes, 
  Lightning, Coffee, Camera, Sparkle, 
  Moon, Headphones, Disc, Fire, 
  Cloud, Sun, Crown, GameController, 
  Microphone, Butterfly, Flower, Ghost,
  HandPeace, Palette, Alien, Rainbow,
  Trash, ArrowsClockwise, ArrowsOut,
  TextT, PaintBrush, TextAa, PaintBucket,
  CursorClick
} from "@phosphor-icons/react";
import type { EditorElement } from "@/app/photocard-editor/[id]/types";

const GOOGLE_FONTS = [
  { name: "Jersey 10", family: "Jersey 10" },
  { name: "Space Grotesk", family: "Space Grotesk" },
  { name: "VT323", family: "VT323" },
  { name: "Bangers", family: "Bangers" },
  { name: "Pacifico", family: "Pacifico" },
  { name: "Press Start 2P", family: "Press Start 2P" },
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  Heart: <Heart weight="fill" className="w-full h-full text-[#ff007f]" />,
  Star: <Star weight="fill" className="w-full h-full text-yellow-400" />,
  Smiley: <Smiley weight="bold" className="w-full h-full" />,
  Music: <MusicNotes weight="bold" className="w-full h-full" />,
  Zap: <Lightning weight="fill" className="w-full h-full text-yellow-500" />,
  Coffee: <Coffee weight="bold" className="w-full h-full" />,
  Camera: <Camera weight="bold" className="w-full h-full" />,
  Sparkle: <Sparkle weight="fill" className="w-full h-full text-[#ffccff]" />,
  Moon: <Moon weight="fill" className="w-full h-full text-indigo-300" />,
  Headphones: <Headphones weight="bold" className="w-full h-full" />,
  Disc: <Disc weight="bold" className="w-full h-full" />,
  Fire: <Fire weight="fill" className="w-full h-full text-orange-500" />,
  Cloud: <Cloud weight="fill" className="w-full h-full text-blue-200" />,
  Sun: <Sun weight="fill" className="w-full h-full text-yellow-500" />,
  Crown: <Crown weight="fill" className="w-full h-full text-yellow-400" />,
  Game: <GameController weight="bold" className="w-full h-full" />,
  Mic: <Microphone weight="bold" className="w-full h-full" />,
  Butterfly: <Butterfly weight="bold" className="w-full h-full text-[#ff007f]" />,
  Flower: <Flower weight="fill" className="w-full h-full text-[#ffccff]" />,
  Ghost: <Ghost weight="bold" className="w-full h-full" />,
  Peace: <HandPeace weight="bold" className="w-full h-full" />,
  Alien: <Alien weight="fill" className="w-full h-full text-green-400" />,
  Rainbow: <Rainbow weight="bold" className="w-full h-full" />,
};

interface EditorToolsProps {
  addElement: (type: EditorElement["type"], content: string) => void;
  deleteElement: () => void;
  updateElement: (elId: string, data: Partial<EditorElement>) => void;
  selectedElement: EditorElement | null;
  backColor: string;
  setBackColor: (color: string) => void;
}

export default function EditorTools({ addElement, deleteElement, updateElement, selectedElement, backColor, setBackColor }: EditorToolsProps) {
  const [activeTab, setActiveTab] = useState<"libreria" | "capas">("libreria");

  useEffect(() => {
    if (selectedElement) {
      setActiveTab("capas");
    }
    
    if (selectedElement?.fontFamily) {
      const fontName = selectedElement.fontFamily.replace(/\s+/g, "+");
      const linkId = `google-font-${fontName}`;
      if (!document.getElementById(linkId)) {
        const link = document.createElement("link");
        link.id = linkId;
        link.rel = "stylesheet";
        link.href = `https://fonts.googleapis.com/css2?family=${fontName}:wght@400;700&display=swap`;
        document.head.appendChild(link);
      }
    }
  }, [selectedElement, selectedElement?.fontFamily]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      addElement("image", url);
    }
  };

  return (
    <aside className="w-full lg:w-[420px] flex flex-col shrink-0 lg:h-full order-2 lg:order-none min-h-0 font-space">
      <Window title="DESIGN_CORE.EXE" className="flex flex-col h-full border-[4px] border-black shadow-[10px_10px_0px_#000]" contentClassName="flex flex-col flex-1 min-h-0">
        <div className="flex border-b-[3px] border-black bg-black shrink-0">
          <button type="button" onClick={() => setActiveTab("libreria")} className={`flex-1 py-4 font-bold border-r-[3px] border-black uppercase text-[12px] transition-all ${activeTab === "libreria" ? "bg-v2k-pink" : "bg-white"}`}>Librería</button>
          <button type="button" onClick={() => setActiveTab("capas")} className={`flex-1 py-4 font-bold uppercase text-[12px] transition-all ${activeTab === "capas" ? "bg-v2k-pink" : "bg-white"}`}>Capas</button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 bg-[#F9F9F9] custom-scrollbar min-h-0">
          {activeTab === "libreria" ? (
            <div className="flex flex-col gap-6">
              <div>
                <SpaceText text="STICKERS" size="12|12" className="mb-5 font-bold opacity-40 uppercase" />
                <div className="grid grid-cols-4 gap-3 mb-8">
                  {Object.keys(ICON_MAP).map((iconKey) => (
                    <button key={iconKey} type="button" onClick={() => { addElement("icon", iconKey); }} className="group aspect-square bg-white border-[3px] border-black flex items-center justify-center transition-all shadow-[3px_3px_0px_#000] hover:bg-v2k-blue p-2">
                      <div className="w-full h-full transition-transform group-hover:scale-110">{ICON_MAP[iconKey]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* PICKER COLOR FONDO (REVERSO) */}
              <div className="space-y-3 bg-white p-4 border-[3px] border-black shadow-[4px_4px_0px_#000]">
                <div className="flex items-center gap-2">
                  <PaintBrush size={18} weight="bold" />
                  <p className="text-[10px] font-black uppercase">Color Fondo Reverso</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 border-[2px] border-black shadow-[2px_2px_0px_#000] overflow-hidden">
                    <input 
                      type="color" 
                      value={backColor} 
                      onChange={(e) => setBackColor(e.target.value)}
                      className="absolute -inset-2 w-[150%] h-[150%] cursor-pointer appearance-none bg-transparent border-none"
                    />
                  </div>
                  <span className="text-[12px] font-mono font-bold uppercase">{backColor}</span>
                </div>
              </div>

              <div className="pt-6 border-t-[3px] border-black border-dashed">
                <button type="button" onClick={() => { addElement("text", "NUEVO TEXTO"); }} className="w-full bg-v2k-yellow-soft border-[3px] border-black py-4 font-bold shadow-[4px_4px_0px_#000] mb-5 uppercase text-[11px] hover:bg-v2k-yellow">+ Texto Editable</button>
                <label className="block w-full bg-white border-[3px] border-black py-4 text-center cursor-pointer font-bold shadow-[4px_4px_0px_#000] hover:bg-v2k-blue-soft uppercase text-[11px]">
                  + Imagen Local
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </label>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {selectedElement ? (
                <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2">
                  {selectedElement.type === "text" && (
                    <div className="space-y-4 bg-white p-4 border-[3px] border-black shadow-[4px_4px_0px_#000]">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2"><TextT size={18} weight="bold" /><p className="text-[10px] font-black uppercase">Contenido</p></div>
                        <textarea value={selectedElement.content} onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })} className="w-full p-3 border-[2px] border-black bg-v2k-yellow-soft font-bold text-sm focus:outline-none min-h-[60px] resize-none" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2"><PaintBucket size={18} weight="bold" /><p className="text-[10px] font-black uppercase">Color del Texto</p></div>
                        <div className="flex items-center gap-4">
                          <div className="relative w-10 h-10 border-[2px] border-black shadow-[2px_2px_0px_#000] overflow-hidden">
                            <input 
                              type="color" 
                              value={selectedElement.color || "#000000"} 
                              onChange={(e) => updateElement(selectedElement.id, { color: e.target.value })}
                              className="absolute -inset-2 w-[150%] h-[150%] cursor-pointer appearance-none bg-transparent border-none"
                            />
                          </div>
                          <span className="text-[11px] font-mono font-bold uppercase">{selectedElement.color || "#000000"}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2"><TextAa size={18} weight="bold" /><p className="text-[10px] font-black uppercase">Fuente</p></div>
                        <select value={selectedElement.fontFamily || ""} onChange={(e) => updateElement(selectedElement.id, { fontFamily: e.target.value })} className="w-full p-2 border-[2px] border-black bg-white font-bold text-[12px] cursor-pointer">
                          <option value="">Seleccionar...</option>
                          {GOOGLE_FONTS.map(f => <option key={f.family} value={f.family}>{f.name}</option>)}
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="space-y-8 bg-white p-5 border-[3px] border-black shadow-[4px_4px_0px_#000]">
                    <div className="relative group">
                      <div className="flex justify-between items-center mb-4"><div className="flex items-center gap-2"><ArrowsOut size={20} weight="bold" /><p className="text-[10px] font-black uppercase">Tamaño</p></div><span className="text-[10px] font-bold bg-black text-white px-2">{selectedElement.width}px</span></div>
                      <input type="range" min="30" max="600" value={selectedElement.width} onChange={(e) => updateElement(selectedElement.id, { width: Number(e.target.value), height: Number(e.target.value) })} className="w-full h-6 accent-v2k-pink-hot cursor-pointer appearance-none bg-gray-200 border-[2px] border-black" />
                    </div>
                    <div className="relative group">
                      <div className="flex justify-between items-center mb-4"><div className="flex items-center gap-2"><ArrowsClockwise size={20} weight="bold" /><p className="text-[10px] font-black uppercase">Rotación</p></div><span className="text-[10px] font-bold bg-black text-white px-2">{selectedElement.rotation || 0}°</span></div>
                      <input type="range" min="0" max="360" value={selectedElement.rotation || 0} onChange={(e) => updateElement(selectedElement.id, { rotation: Number(e.target.value) })} className="w-full h-6 accent-v2k-blue cursor-pointer appearance-none bg-gray-200 border-[2px] border-black" />
                    </div>
                  </div>
                  <button type="button" onClick={deleteElement} className="w-full bg-v2k-red-soft border-[3px] border-black py-4 font-bold text-red-600 shadow-[4px_4px_0px_#000] hover:bg-v2k-red-hover active:translate-y-1 transition-all flex items-center justify-center gap-3"><Trash size={20} weight="fill" /> ELIMINAR CAPA</button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-10 h-full">
                  <div className="w-16 h-16 mb-4 opacity-20">
                    <CursorClick size={64} weight="fill" className="animate-bounce" />
                  </div>
                  <p className="text-[10px] font-black uppercase leading-tight opacity-40">
                    Propiedades de Capa
                  </p>
                  <p className="text-[13px] font-bold mt-2 text-v2k-pink-hot italic">
                    "Haz DOBLE CLIC sobre un sticker para editarlo"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </Window>
    </aside>
  );
}