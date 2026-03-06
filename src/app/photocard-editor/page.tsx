"use client";

import { useReducer, useRef, useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
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
import ConfirmationModal from "@/components/molecules/ConfirmationModal";
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

interface EditorSelectionState {
  templates: PhotocardTemplate[];
  loading: boolean;
  selectedCard: PhotocardTemplate | null;
  userTemplates: PhotocardTemplate[];
  loadingUser: boolean;
  availableWidth: number;
  userWidth: number;
}

type EditorSelectionAction =
  | { type: "SET_TEMPLATES"; payload: PhotocardTemplate[] }
  | { type: "SET_USER_TEMPLATES"; payload: PhotocardTemplate[] }
  | { type: "SET_SELECTED_CARD"; payload: PhotocardTemplate | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_LOADING_USER"; payload: boolean }
  | { type: "SET_AVAILABLE_WIDTH"; payload: number }
  | { type: "SET_USER_WIDTH"; payload: number };

function selectionReducer(
  state: EditorSelectionState,
  action: EditorSelectionAction,
): EditorSelectionState {
  switch (action.type) {
    case "SET_TEMPLATES":
      return { ...state, templates: action.payload };
    case "SET_USER_TEMPLATES":
      return { ...state, userTemplates: action.payload };
    case "SET_SELECTED_CARD":
      return { ...state, selectedCard: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_LOADING_USER":
      return { ...state, loadingUser: action.payload };
    case "SET_AVAILABLE_WIDTH":
      return { ...state, availableWidth: action.payload };
    case "SET_USER_WIDTH":
      return { ...state, userWidth: action.payload };
    default:
      return state;
  }
}

const initialState: EditorSelectionState = {
  templates: [],
  loading: true,
  selectedCard: null,
  userTemplates: [],
  loadingUser: false,
  availableWidth: 0,
  userWidth: 0,
};

export default function PhotocardSelectionPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [state, dispatch] = useReducer(selectionReducer, initialState);

  const availableCarouselRef = useRef<HTMLDivElement>(null);
  const userCarouselRef = useRef<HTMLDivElement>(null);

  // Carga de Plantillas Base
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const q = query(
          collection(db, "photocards_resources"),
          where("active", "==", true),
        );
        const querySnapshot = await getDocs(q);
        dispatch({
          type: "SET_TEMPLATES",
          payload: querySnapshot.docs.map((d) => ({
            ...d.data(),
            id: d.id,
          })) as PhotocardTemplate[],
        });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (e) {
        console.error(e);
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchTemplates();
  }, []);

  // Carga de Diseños de Usuario
  useEffect(() => {
    const fetchUserTemplates = async () => {
      if (!user) {
        dispatch({ type: "SET_USER_TEMPLATES", payload: [] });
        return;
      }
      dispatch({ type: "SET_LOADING_USER", payload: true });
      try {
        const q = query(
          collection(db, "user_photocards"),
          where("userId", "==", user.uid),
        );
        const querySnapshot = await getDocs(q);

        const designs = await Promise.all(
          querySnapshot.docs.map(async (d) => {
            const data = d.data();
            const resSnap = await getDoc(
              doc(db, "photocards_resources", data.templateId),
            );
            return {
              id: d.id,
              title: data.title || "Sin título",
              imageURL:
                data.previewImage ||
                (resSnap.exists() ? resSnap.data().imageURL : ""),
              isUserDesign: true,
            };
          }),
        );
        dispatch({ type: "SET_USER_TEMPLATES", payload: designs });
        dispatch({ type: "SET_LOADING_USER", payload: false });
      } catch (e) {
        console.error("Error al cargar diseños:", e);
        dispatch({ type: "SET_LOADING_USER", payload: false });
      }
    };
    fetchUserTemplates();
  }, [user]);

  // Lógica de Carrusel
  useEffect(() => {
    if (availableCarouselRef.current) {
      dispatch({
        type: "SET_AVAILABLE_WIDTH",
        payload:
          availableCarouselRef.current.scrollWidth -
          availableCarouselRef.current.offsetWidth,
      });
    }
  }, [state.templates]);

  useEffect(() => {
    if (userCarouselRef.current) {
      dispatch({
        type: "SET_USER_WIDTH",
        payload:
          userCarouselRef.current.scrollWidth -
          userCarouselRef.current.offsetWidth,
      });
    }
  }, [state.userTemplates]);

  // Acción de Confirmar
  const handleConfirm = async () => {
    if (!state.selectedCard) return;
    try {
      if (!state.selectedCard.isUserDesign) {
        await updateDoc(
          doc(db, "photocards_resources", state.selectedCard.id),
          {
            views: increment(1),
          },
        );
      }
      router.push(`/photocard-editor/${state.selectedCard.id}`);
    } catch (e) {
      console.error(e);
      router.push(`/photocard-editor/${state.selectedCard.id}`);
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
            {(state.userTemplates.length > 0 || state.loadingUser) && (
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
                  <m.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -state.userWidth }}
                    className="flex gap-6 w-max pl-2 pr-4"
                  >
                    {state.userTemplates.map((t) => (
                      <PhotocardSwiperCard
                        key={t.id}
                        title={t.title}
                        imageURL={t.imageURL}
                        onClick={() =>
                          dispatch({ type: "SET_SELECTED_CARD", payload: t })
                        }
                      />
                    ))}
                  </m.div>
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

              {state.loading ? (
                <div className="flex justify-center items-center h-32 animate-pulse text-black">
                  CARGANDO_SISTEMA...
                </div>
              ) : (
                <div
                  ref={availableCarouselRef}
                  className="overflow-hidden cursor-grab active:cursor-grabbing pb-8 pt-2"
                >
                  <m.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -state.availableWidth }}
                    className="flex gap-6 w-max pl-2 pr-4"
                  >
                    {state.templates.map((t) => (
                      <PhotocardSwiperCard
                        key={t.id}
                        title={t.title}
                        imageURL={t.imageURL}
                        onClick={() =>
                          dispatch({ type: "SET_SELECTED_CARD", payload: t })
                        }
                      />
                    ))}
                  </m.div>
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
          isOpen={!!state.selectedCard}
          title="SISTEMA_DE_CONFIRMACIÓN.EXE"
          message={`¿Quieres utilizar "${state.selectedCard?.title}" para tu decoración?`}
          onConfirm={handleConfirm}
          onCancel={() =>
            dispatch({ type: "SET_SELECTED_CARD", payload: null })
          }
        />
      </AnimatePresence>
    </div>
  );
}
