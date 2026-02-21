"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpaceText from "../atoms/texts/SpaceText";
import Window from "../atoms/Window";
import ResourceSwiperCard from "../atoms/ResourceSwiperCard";
import { db } from "../../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import JSZip from "jszip";

interface FreebieItem {
  id: string;
  title: string;
  imageURL: string;
  type: string;
}

export default function FreebiesZone() {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [items, setItems] = useState<FreebieItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [previewItem, setPreviewItem] = useState<FreebieItem | null>(null);
  
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [isDraggingCarousel, setIsDraggingCarousel] = useState(false);

  useEffect(() => {
    const isModalOpen = !!(activeFolder || previewItem);
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [activeFolder, previewItem]);

  useEffect(() => {
    if (constraintsRef.current && items.length > 0) {
      setWidth(constraintsRef.current.scrollWidth - constraintsRef.current.offsetWidth + 60);
    }
  }, [items, activeFolder]);

  useEffect(() => {
    if (!activeFolder) return;
    const fetchItems = async () => {
      setLoading(true);
      try {
        const typeMap: Record<string, string> = {
          wallpapers: "wallpaper",
          icons: "icon",
          schedules: "schedule"
        };
        const dbType = typeMap[activeFolder] || activeFolder;
        const q = query(collection(db, "freebies_resources"), where("type", "==", dbType));
        const querySnapshot = await getDocs(q);
        const fetchedData = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })) as FreebieItem[];
        setItems(fetchedData);
      } catch (error) {
        console.error("Error Firebase:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [activeFolder]);

  const handleDownloadSingle = useCallback(async (item: FreebieItem) => {
    const response = await fetch(item.imageURL);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = item.title || "Freebie";
    link.click();
    window.URL.revokeObjectURL(url);
  }, []);

  const handleDownloadAllZip = useCallback(async () => {
    if (items.length === 0) return;
    setIsDownloadingAll(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder(activeFolder || "Freebies");
      const downloadPromises = items.map(async (item, index) => {
        const response = await fetch(item.imageURL);
        const blob = await response.blob();
        const extension = blob.type.split('/')[1] || "jpg";
        const filename = `${(item.title || `file-${index}`).replace(/\s+/g, '_')}.${extension}`;
        folder?.file(filename, blob);
      });
      await Promise.all(downloadPromises);
      const zipContent = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(zipContent);
      const link = document.createElement("a");
      link.href = url;
      link.download = `BunniesClub_${activeFolder}.zip`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error ZIP:", error);
    } finally {
      setIsDownloadingAll(false);
    }
  }, [items, activeFolder]);

  return (
    <div className="flex flex-col gap-2 items-center w-full px-4 relative">
      <SpaceText tag="h2" text="FREEBIES ZONE" size="18|22" className="font-bold uppercase tracking-widest text-black text-center" />
      
      <Window title="C:\Freebies" className="w-full max-w-4xl shadow-none border-2 border-black">
        <div className="flex flex-wrap justify-center md:justify-between gap-4 md:gap-6 px-4 py-6">
          {["Wallpapers", "Icons", "Schedules"].map((folder) => (
            <button key={folder} type="button" onClick={() => setActiveFolder(folder.toLowerCase())} className="flex flex-col items-center gap-2 group bg-transparent border-none p-0 cursor-pointer">
              <motion.span whileHover={{ scale: 1.1 }} className="text-4xl md:text-5xl">📁</motion.span>
              <SpaceText tag="span" text={folder} size="14|14" className="font-bold text-black" />
            </button>
          ))}
        </div>
      </Window>

      <AnimatePresence>
        {activeFolder && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 flex items-center justify-center z-[500] p-2 md:p-4 bg-black/80"
          >
            <div className="w-full max-w-6xl overflow-hidden">
              <Window title={`C:\\Freebies\\${activeFolder}`} className="h-auto max-h-[85vh] md:max-h-[90vh] relative flex flex-col overflow-hidden bg-white border-2 border-black shadow-none">
                <button type="button" onClick={() => { setActiveFolder(null); setItems([]); }} className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-gray-200 border-2 border-black font-bold z-20 hover:bg-red-400">X</button>
                
                {/* AJUSTADO: mt-4 y p-4 para reducir espacio superior */}
                <div className="p-4 md:p-6 bg-white m-1 mt-4 flex flex-col overflow-hidden h-full">
                  <SpaceText tag="h3" text={`${activeFolder} ZONE`} size="18|22" className="font-bold text-black mb-4 uppercase text-center flex-shrink-0" />
                  
                  {!loading && items.length > 0 && (
                     <div className="mb-4 flex justify-center flex-shrink-0">
                        <button type="button" onClick={handleDownloadAllZip} disabled={isDownloadingAll} className="px-4 md:px-6 py-2 border-2 border-black bg-green-200 text-xs md:text-sm font-bold active:translate-x-0.5 active:translate-y-0.5 transition-all">
                            {isDownloadingAll ? "ZIPPING..." : "DOWNLOAD ALL ZIP 📦"}
                        </button>
                     </div>
                  )}

                  <div className="overflow-hidden flex-grow cursor-grab active:cursor-grabbing py-4 touch-pan-y">
                    {loading ? (
                      <p className="text-center font-mono text-gray-500 animate-pulse mt-10 w-full text-xs">Cargando...</p>
                    ) : (
                      <motion.div 
                        ref={constraintsRef}
                        drag="x"
                        dragConstraints={{ right: 0, left: -width }}
                        dragElastic={0}
                        dragMomentum={true}
                        onDragStart={() => setIsDraggingCarousel(true)}
                        onDragEnd={() => setTimeout(() => setIsDraggingCarousel(false), 50)}
                        className="flex gap-4 md:gap-12 h-full items-center px-6 md:px-24 transform-gpu"
                      >
                        {items.map((item) => (
                          <ResourceSwiperCard 
                            key={item.id} 
                            title={item.title} 
                            imageURL={item.imageURL} 
                            onClick={() => { if (!isDraggingCarousel) setPreviewItem(item); }} 
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </Window>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {previewItem && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 flex items-center justify-center z-[600] p-2 md:p-4 bg-black"
          >
             <div className="w-full max-w-5xl">
               <Window title={`Preview: ${previewItem.title}`} className="relative bg-gray-100 my-4 md:my-8 border-2 border-black shadow-none">
                  <button type="button" onClick={() => setPreviewItem(null)} className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-gray-200 border-2 border-black font-bold">X</button>
                  {/* AJUSTADO: mt-4 para centrar mejor el preview */}
                  <div className="p-4 mt-4 flex flex-col items-center gap-4 w-full">
                      <div className="border-2 border-black bg-white p-2 shadow-[6px_6px_0px_black]">
                          <img src={previewItem.imageURL} alt={previewItem.title} className="w-auto h-auto max-w-full max-h-[60vh] md:max-h-[70vh] object-contain" />
                      </div>
                      <SpaceText tag="h4" text={previewItem.title} size="18|22" className="font-bold text-black mt-2 text-center" />
                      <button type="button" onClick={() => handleDownloadSingle(previewItem)} className="px-4 md:px-6 py-2 bg-blue-200 border-2 border-black text-xs md:text-sm font-bold shadow-[4px_4px_0px_black] active:translate-x-0.5 active:translate-y-0.5 transition-all">⬇️ DESCARGAR ARCHIVO</button>
                  </div>
               </Window>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}