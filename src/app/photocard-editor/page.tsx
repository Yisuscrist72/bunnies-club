"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

// Componentes Atómicos y Moleculares
import { PhotocardSwiperCard } from "@/components/atoms/PhotocardSwiperCard";
import BackgroundDecorations from "@/components/atoms/BackgroundDecorations";
import ComingSoonBanner from "@/components/molecules/ComingSoonBanner";
import ConfirmationModal from "@/components/molecules/ConfirmationModal"; // <-- Nuevo!
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";

interface PhotocardTemplate {
  id: string;
  title: string;
  imageURL: string;
  active?: boolean;
  isUserDesign?: boolean;
}

const PageHeader = () => (
  <div className="text-center mb-8">
    <Jersey
      tag="h1"
      text="PHOTOCARD DECORATOR"
      className="text-5xl md:text-6xl text-black drop-shadow-[3px_3px_0px_#FFF] leading-none"
    />
    <div className="mt-4 bg-white border-[3px] border-black px-6 py-2 rounded-full inline-block shadow-v2k-sm">
      <SpaceText
        text="SELECCIONA UNA PHOTOCARD PARA DECORAR"
        size="14|14"
        className="font-bold tracking-widest text-black"
      />
    </div>
  </div>
);

export default function PhotocardSelectionPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<PhotocardTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<PhotocardTemplate | null>(null);
  const { user } = useAuth();
  const [userTemplates, setUserTemplates] = useState<PhotocardTemplate[]>([]);
  const [loadingUser, setLoadingUser] = useState(false);

  const availableCarouselRef = useRef<HTMLDivElement>(null);
  const userCarouselRef = useRef<HTMLDivElement>(null);
  const [availableWidth, setAvailableWidth] = useState(0);
  const [userWidth, setUserWidth] = useState(0);

  // Carga de Plantillas Base
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const q = query(
          collection(db, "photocards_resources"),
          where("active", "==", true),
        );
        const querySnapshot = await getDocs(q);
        setTemplates(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as PhotocardTemplate[],
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  // Carga de Diseños de Usuario
  useEffect(() => {
    const fetchUserTemplates = async () => {
      if (!user) {
        setUserTemplates([]);
        return;
      }
      setLoadingUser(true);
      try {
        const q = query(
          collection(db, "user_photocards"),
          where("userId", "==", user.uid),
        );
        const querySnapshot = await getDocs(q);
        
        const designs = await Promise.all(
          querySnapshot.docs.map(async (d) => {
            const data = d.data();
            // Necesitamos la imagen de la plantilla original
            const resSnap = await getDoc(doc(db, "photocards_resources", data.templateId));
            return {
              id: d.id,
              title: data.title || "Sin título",
              imageURL: data.previewImage || (resSnap.exists() ? resSnap.data().imageURL : ""),
              isUserDesign: true,
            };
          })
        );
        setUserTemplates(designs);
      } catch (e) {
        console.error("Error al cargar diseños:", e);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUserTemplates();
  }, [user]);

  // Lógica de Carrusel
  useEffect(() => {
    if (availableCarouselRef.current) {
      setAvailableWidth(
        availableCarouselRef.current.scrollWidth -
          availableCarouselRef.current.offsetWidth,
      );
    }
  }, [templates]);

  useEffect(() => {
    if (userCarouselRef.current) {
      setUserWidth(
        userCarouselRef.current.scrollWidth -
          userCarouselRef.current.offsetWidth,
      );
    }
  }, [userTemplates]);

  // Acción de Confirmar
  const handleConfirm = async () => {
    if (!selectedCard) return;
    try {
      if (!selectedCard.isUserDesign) {
        await updateDoc(doc(db, "photocards_resources", selectedCard.id), {
          views: increment(1),
        });
      }
    } finally {
      router.push(`/photocard-editor/${selectedCard.id}`);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-8 pb-24 px-4 md:px-8">
      <BackgroundDecorations />

      <div className="relative z-10 w-full flex flex-col items-center">
        <PageHeader />

        <div className="w-full max-w-325 bg-v2k-blue border-4 border-black p-3 md:p-5 shadow-[12px_12px_0px_#000] relative rounded-2xl">
          <div className="w-full bg-white border-4 border-black p-6 md:p-10 rounded-xl flex flex-col gap-8">
            {/* TUS DISEÑOS (Solo si hay alguno o está cargando usuario) */}
            {(userTemplates.length > 0 || loadingUser) && (
              <div>
                <Jersey
                  tag="h2"
                  text="MIS_GALERIA.SYS"
                  size="20|24"
                  className="text-black mb-6"
                />
                <div
                  ref={userCarouselRef}
                  className="overflow-hidden cursor-grab active:cursor-grabbing pb-8 pt-2"
                >
                  <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -userWidth }}
                    className="flex gap-6 w-max pl-2 pr-4"
                  >
                    {userTemplates.map((t) => (
                      <PhotocardSwiperCard
                        key={t.id}
                        title={t.title}
                        imageURL={t.imageURL}
                        onClick={() => setSelectedCard(t)}
                      />
                    ))}
                  </motion.div>
                </div>
              </div>
            )}

            {/* DISPONIBLES */}
            <div>
              <Jersey
                tag="h2"
                text="CATALOGO_BASE"
                size="20|24"
                className="text-black mb-6"
              />

              {loading ? (
                <div className="flex justify-center items-center h-32 animate-pulse text-black">
                  CARGANDO_SISTEMA...
                </div>
              ) : (
                <div
                  ref={availableCarouselRef}
                  className="overflow-hidden cursor-grab active:cursor-grabbing pb-8 pt-2"
                >
                  <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -availableWidth }}
                    className="flex gap-6 w-max pl-2 pr-4"
                  >
                    {templates.map((t) => (
                      <PhotocardSwiperCard
                        key={t.id}
                        title={t.title}
                        imageURL={t.imageURL}
                        onClick={() => setSelectedCard(t)}
                      />
                    ))}
                  </motion.div>
                </div>
              )}
            </div>

            <ComingSoonBanner />
          </div>
        </div>
      </div>

      {/* MODAL REUTILIZABLE */}
      <AnimatePresence>
        <ConfirmationModal
          isOpen={!!selectedCard}
          title="SISTEMA_DE_CONFIRMACIÓN.EXE"
          message={`¿Quieres utilizar "${selectedCard?.title}" para tu decoración?`}
          onConfirm={handleConfirm}
          onCancel={() => setSelectedCard(null)}
        />
      </AnimatePresence>
    </div>
  );
}
