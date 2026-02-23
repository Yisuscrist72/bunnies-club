"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
// FIREBASE IMPORTS
import { db } from "@/lib/firebase"; // Ajusta esta ruta a tu config de firebase
import { collection, query, where, getDocs, doc, updateDoc, increment } from "firebase/firestore";

import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import { PhotocardSwiperCard } from "@/components/atoms/PhotocardSwiperCard"; 
import Window from "@/components/atoms/Window";

// Definimos la interfaz para TypeScript basada en tu captura de Firebase
interface PhotocardTemplate {
  id: string;
  title: string;
  imageURL: string;
  active: boolean;
  views: number;
  downloads: number;
}

export default function PhotocardSelectionPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<PhotocardTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<PhotocardTemplate | null>(null);

  const availableCarouselRef = useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = useState(0);

  // 1. CARGAR DATOS REALES DESDE FIREBASE
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        // Consultamos la colección que creaste: photocards_resources
        const q = query(
          collection(db, "photocards_resources"), 
          where("active", "==", true)
        );
        
        const querySnapshot = await getDocs(q);
        const fetchedData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          // Usamos el ID del documento de Firebase si no viene en los campos
          id: doc.id, 
        })) as PhotocardTemplate[];

        setTemplates(fetchedData);
      } catch (error) {
        console.error("Error cargando photocards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Recalcular ancho del carrusel cuando cargan los datos
  useEffect(() => {
    if (availableCarouselRef.current) {
      setAvailableWidth(availableCarouselRef.current.scrollWidth - availableCarouselRef.current.offsetWidth);
    }
  }, [templates]);

  // 2. REGISTRAR VISTA Y NAVEGAR AL CONFIRMAR
  const handleConfirm = async () => {
    if (selectedCard) {
      try {
        // Incrementamos el contador de 'views' en Firebase
        const cardRef = doc(db, "photocards_resources", selectedCard.id);
        await updateDoc(cardRef, {
          views: increment(1)
        });
        
        // Navegamos al editor con el ID real
        router.push(`/photocard-editor/${selectedCard.id}`);
      } catch (error) {
        console.error("Error al actualizar vistas:", error);
        // Navegamos de todos modos aunque falle el contador
        router.push(`/photocard-editor/${selectedCard.id}`);
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center pt-8 pb-24 px-4 md:px-8 relative z-10">
      
      {/* TÍTULO PRINCIPAL */}
      <div className="text-center mb-8">
        <Jersey 
          tag="h1" 
          text="PHOTOCARD DECORATOR" 
          className="text-5xl md:text-6xl text-black drop-shadow-[3px_3px_0px_#FFF] leading-none" 
        />
        <div className="mt-4 bg-white border-[3px] border-black px-6 py-2 rounded-full inline-block shadow-[4px_4px_0px_#000]">
          <SpaceText 
            text="SELECCIONA UNA PHOTOCARD PARA DECORAR" 
            size="14|14" 
            className="font-bold tracking-widest text-black" 
          />
        </div>
      </div>

      <div className="w-full max-w-[1300px] bg-v2k-blue border-[4px] border-black p-3 md:p-5 shadow-[12px_12px_0px_#000] relative z-10 rounded-2xl">
        <div className="w-full bg-white border-[4px] border-black p-6 md:p-10 rounded-xl min-h-[400px] flex flex-col justify-center">
          
          <div className="mb-4">
            <Jersey tag="h2" text="DISPONIBLES" size="20|24" className="text-black mb-6" />
          </div>
          
          {loading ? (
            // Estado de carga simple
            <div className="flex justify-center items-center h-32">
              <Jersey tag="span" text="CARGANDO_SISTEMA..." size="20|20" className="animate-pulse text-black" />
            </div>
          ) : (
            <motion.div ref={availableCarouselRef} className="overflow-hidden cursor-grab active:cursor-grabbing pb-8 pt-2">
              <motion.div 
                drag="x" 
                dragConstraints={{ right: 0, left: -availableWidth }} 
                whileTap={{ cursor: "grabbing" }}
                className="flex gap-6 w-max pl-2 pr-4"
              >
                {templates.map((template) => (
                  <PhotocardSwiperCard 
                    key={template.id}
                    title={template.title} 
                    imageURL={template.imageURL} 
                    onClick={() => setSelectedCard(template)} 
                  />
                ))}
                
                {templates.length === 0 && (
                  <SpaceText text="NO HAY PHOTOCARDS DISPONIBLES EN ESTE MOMENTO." size="12|12" className="text-black/40 italic" />
                )}
              </motion.div>
            </motion.div>
          )}

          {/* BANNER "MUY PRONTO" */}
          <div 
            className="w-full mt-4 border-[4px] border-black rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0px_0px_0px_4px_rgba(255,255,255,0.5)]"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, var(--color-v2k-yellow-soft) 25%, #fff 25%, #fff 75%, var(--color-v2k-yellow-soft) 75%, var(--color-v2k-yellow-soft))",
              backgroundPosition: "0 0, 20px 20px",
              backgroundSize: "40px 40px"
            }}
          >
            <div className="bg-white border-[3px] border-black px-8 py-5 text-center shadow-[6px_6px_0px_#000] z-10 rotate-[-1deg] max-w-lg w-full">
              <div className="text-4xl mb-3 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                🚧 🔒 🚧
              </div>
              <Jersey tag="h3" text="NUEVAS PHOTOCARDS EN CAMINO" size="20|24" className="text-black" />
              <SpaceText text="Estamos en búsqueda de más y creando nuevos diseños. ¡Vuelve pronto!" size="14|14" className="font-bold text-black/60 mt-2 uppercase tracking-widest" />
            </div>
          </div>

        </div>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-md"
            >
              <Window 
                title="SISTEMA_DE_CONFIRMACIÓN.EXE" 
                onClose={() => setSelectedCard(null)}
              >
                <div className="flex flex-col items-center gap-6 p-6 text-center bg-white">
                  <div className="text-7xl drop-shadow-[3px_3px_0px_#000] animate-bounce">
                    🤔
                  </div>
                  <SpaceText 
                    text={`¿Quieres utilizar la photocard "${selectedCard.title}" para tu decoración?`} 
                    size="14|14" 
                    className="font-bold text-black" 
                  />
                  
                  <div className="flex gap-4 w-full mt-4">
                    <button
                      type="button" 
                      onClick={() => setSelectedCard(null)} 
                      className="flex-1 bg-v2k-red-soft border-[3px] border-black py-3 shadow-[4px_4px_0px_#000] hover:bg-v2k-red-hover transition-colors font-bold text-black active:translate-y-1 active:shadow-none"
                    >
                      CANCELAR
                    </button>
                    <button 
                      type="button"
                      onClick={handleConfirm} 
                      className="flex-1 bg-v2k-green-soft border-[3px] border-black py-3 shadow-[4px_4px_0px_#000] hover:bg-v2k-green-hover transition-colors font-bold text-black active:translate-y-1 active:shadow-none"
                    >
                      ¡SÍ, VAMOS!
                    </button>
                  </div>
                </div>
              </Window>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}