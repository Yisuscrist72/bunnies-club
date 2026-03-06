"use client";
import React, { useReducer, useEffect, useRef, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SpaceText from "../atoms/texts/SpaceText";
import Window from "./Window";
import ResourceSwiperCard from "../atoms/ResourceSwiperCard";
import { db } from "../../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import JSZip from "jszip";
import { useAuth } from "../../context/AuthContext";

interface FreebieItem {
  id: string;
  title: string;
  imageURL: string;
  downloadURL?: string;
  type: string;
}

interface FreebiesState {
  activeFolder: string | null;
  items: FreebieItem[];
  loading: boolean;
  isDownloadingAll: boolean;
  previewItem: FreebieItem | null;
  width: number;
  isDraggingCarousel: boolean;
}

type FreebiesAction =
  | { type: "SET_FOLDER"; payload: string | null }
  | { type: "SET_ITEMS"; payload: FreebieItem[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_DOWNLOADING_ALL"; payload: boolean }
  | { type: "SET_PREVIEW_ITEM"; payload: FreebieItem | null }
  | { type: "SET_WIDTH"; payload: number }
  | { type: "SET_DRAGGING"; payload: boolean };

function freebiesReducer(
  state: FreebiesState,
  action: FreebiesAction,
): FreebiesState {
  switch (action.type) {
    case "SET_FOLDER":
      return { ...state, activeFolder: action.payload, items: [] };
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_DOWNLOADING_ALL":
      return { ...state, isDownloadingAll: action.payload };
    case "SET_PREVIEW_ITEM":
      return { ...state, previewItem: action.payload };
    case "SET_WIDTH":
      return { ...state, width: action.payload };
    case "SET_DRAGGING":
      return { ...state, isDraggingCarousel: action.payload };
    default:
      return state;
  }
}

const initialState: FreebiesState = {
  activeFolder: null,
  items: [],
  loading: false,
  isDownloadingAll: false,
  previewItem: null,
  width: 0,
  isDraggingCarousel: false,
};

export default function FreebiesZone() {
  const { user, addPoints } = useAuth();
  const [state, dispatch] = useReducer(freebiesReducer, initialState);
  const constraintsRef = useRef<HTMLDivElement>(null);

  // 1. BLOQUEO DE SCROLL Y AVISO AL NAVBAR
  useEffect(() => {
    const isModalOpen = !!(state.activeFolder || state.previewItem);
    document.body.style.overflow = isModalOpen ? "hidden" : "unset";

    window.dispatchEvent(
      new CustomEvent("toggleFreebiesModal", { detail: isModalOpen }),
    );

    return () => {
      document.body.style.overflow = "unset";
      window.dispatchEvent(
        new CustomEvent("toggleFreebiesModal", { detail: false }),
      );
    };
  }, [state.activeFolder, state.previewItem]);

  // 2. CALCULAR ANCHO PARA EL DRAG DE FRAMER MOTION
  useEffect(() => {
    if (constraintsRef.current) {
      dispatch({
        type: "SET_WIDTH",
        payload:
          constraintsRef.current.scrollWidth -
          constraintsRef.current.offsetWidth +
          60,
      });
    }
  }, [state.items, state.activeFolder]);

  // 3. FETCH DE FIREBASE SEGÚN LA CARPETA
  useEffect(() => {
    if (!state.activeFolder) return;
    const fetchItems = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const typeMap: Record<string, string> = {
          wallpapers: "wallpaper",
          icons: "icon",
          calendars: "calendar",
        };
        const dbType = typeMap[state.activeFolder] || state.activeFolder;
        const q = query(
          collection(db, "freebies_resources"),
          where("type", "==", dbType),
        );
        const querySnapshot = await getDocs(q);
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as FreebieItem[];
        dispatch({ type: "SET_ITEMS", payload: fetchedData });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error) {
        console.error("Error Firebase:", error);
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchItems();
  }, [state.activeFolder]);

  // 4. LÓGICA DE DESCARGA
  const handleDownloadSingle = useCallback(
    async (item: FreebieItem) => {
      const targetUrl = item.downloadURL || item.imageURL;
      try {
        const response = await fetch(targetUrl);
        if (!response.ok) return;

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        const extension = targetUrl.split(".").pop()?.split("?")[0] || "pdf";
        link.download = `${item.title.replace(/\s+/g, "_")}.${extension}`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        if (user) {
          await addPoints(10, "¡Archivo descargado! 📥✨");
        }
      } catch (error) {
        console.error("Error de descarga:", error);
      }
    },
    [user, addPoints],
  );

  const handleDownloadAllZip = useCallback(async () => {
    if (state.items.length === 0) return;
    dispatch({ type: "SET_DOWNLOADING_ALL", payload: true });
    try {
      const zip = new JSZip();
      const folder = zip.folder(state.activeFolder || "Freebies");
      const downloadPromises = state.items.map(async (item, index) => {
        const targetUrl = item.downloadURL || item.imageURL;
        const response = await fetch(targetUrl);
        if (response.ok) {
          const blob = await response.blob();
          const extension = targetUrl.split(".").pop()?.split("?")[0] || "jpg";
          const filename = `${(item.title || `file-${index}`).replace(/\s+/g, "_")}.${extension}`;
          folder?.file(filename, blob);
        }
      });
      await Promise.all(downloadPromises);
      const zipContent = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(zipContent);
      const link = document.createElement("a");
      link.href = url;
      link.download = `BunniesClub_${state.activeFolder}.zip`;
      link.click();
      window.URL.revokeObjectURL(url);
      if (user) {
        await addPoints(30, "¡Pack completo descargado! 📦✨");
      }
      dispatch({ type: "SET_DOWNLOADING_ALL", payload: false });
    } catch (error) {
      console.error("ZIP error:", error);
      dispatch({ type: "SET_DOWNLOADING_ALL", payload: false });
    }
  }, [state.items, state.activeFolder, user, addPoints]);

  return (
    <div className="flex flex-col gap-2 items-center w-full px-4 relative">
      <SpaceText
        tag="h2"
        text="FREEBIES ZONE"
        size="18|22"
        className="font-bold uppercase tracking-widest text-black text-center"
      />

      {/* VENTANA PRINCIPAL DE CARPETAS */}
      <Window
        title="C:\Freebies"
        className="w-full max-w-4xl shadow-none border-2 border-black"
      >
        <div className="flex flex-wrap justify-center md:justify-between gap-4 md:gap-6 px-4 py-6">
          {["Wallpapers", "Icons", "Calendars"].map((folder) => (
            <button
              key={folder}
              type="button"
              onClick={() =>
                dispatch({ type: "SET_FOLDER", payload: folder.toLowerCase() })
              }
              className="flex flex-col items-center gap-2 group bg-transparent border-none p-0 cursor-pointer"
            >
              <m.span
                whileHover={{ scale: 1.1 }}
                className="text-4xl md:text-5xl"
              >
                📁
              </m.span>
              <SpaceText
                tag="span"
                text={folder}
                size="14|14"
                className="font-bold text-black"
              />
            </button>
          ))}
        </div>
      </Window>

      {/* MODAL DE EXPLORADOR DE ARCHIVOS */}
      <AnimatePresence>
        {state.activeFolder && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-[500] p-2 md:p-4 bg-black/80"
          >
            <div className="w-full max-w-6xl overflow-hidden">
              <Window
                title={`C:\\Freebies\\${state.activeFolder}`}
                className="h-auto max-h-[85vh] md:max-h-[90vh] relative flex flex-col overflow-hidden bg-white border-2 border-black shadow-none"
              >
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: "SET_FOLDER", payload: null })
                  }
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-gray-200 border-2 border-black font-bold z-20 hover:bg-red-400"
                >
                  X
                </button>

                <div className="p-4 md:p-6 bg-white m-1 mt-4 flex flex-col overflow-hidden h-full">
                  <SpaceText
                    tag="h3"
                    text={`${state.activeFolder} ZONE`}
                    size="18|22"
                    className="font-bold text-black mb-4 uppercase text-center shrink-0"
                  />

                  {!state.loading && state.items.length > 0 && (
                    <div className="mb-4 flex justify-center flex-shrink-0">
                      <button
                        type="button"
                        onClick={handleDownloadAllZip}
                        disabled={state.isDownloadingAll}
                        className="px-4 md:px-6 py-2 border-2 border-black bg-green-200 text-xs md:text-sm font-bold active:translate-x-0.5 active:translate-y-0.5 transition-all uppercase"
                      >
                        {state.isDownloadingAll
                          ? "ZIPPING..."
                          : "DOWNLOAD ALL ZIP 📦"}
                      </button>
                    </div>
                  )}

                  <div className="overflow-hidden flex-grow cursor-grab active:cursor-grabbing py-4 touch-pan-y">
                    {state.loading ? (
                      <p className="text-center font-mono text-gray-500 animate-pulse mt-10 w-full text-xs">
                        Cargando...
                      </p>
                    ) : (
                      <m.div
                        ref={constraintsRef}
                        drag="x"
                        dragConstraints={{ right: 0, left: -state.width }}
                        onDragStart={() =>
                          dispatch({ type: "SET_DRAGGING", payload: true })
                        }
                        onDragEnd={() =>
                          dispatch({ type: "SET_DRAGGING", payload: false })
                        }
                        className="flex gap-4 md:gap-12 h-full items-center px-6 md:px-24"
                      >
                        {state.items.map((item) => (
                          <ResourceSwiperCard
                            key={item.id}
                            title={item.title}
                            imageURL={item.imageURL}
                            onClick={() => {
                              if (!state.isDraggingCarousel) {
                                dispatch({
                                  type: "SET_PREVIEW_ITEM",
                                  payload: item,
                                });
                              }
                            }}
                          />
                        ))}

                        {/* ESTADO VACÍO */}
                        {!state.loading && state.items.length === 0 && (
                          <div className="flex-shrink-0 w-[200px] md:w-[250px] h-full flex flex-col items-center justify-center pointer-events-none">
                            <div className="border-2 border-black bg-gray-100 p-4 shadow-[4px_4px_0px_black] flex flex-col items-center justify-center gap-3 text-center h-[80%] w-full">
                              <span className="text-6xl md:text-7xl animate-pulse">
                                🐰🪧
                              </span>
                              <SpaceText
                                tag="h4"
                                text="EMPTY FOLDER"
                                size="16|16"
                                className="font-bold text-red-500 uppercase mt-2"
                              />
                              <p className="font-mono text-[10px] md:text-xs text-gray-600 px-2 leading-tight">
                                Aún no hay archivos aquí... <br />
                                <br />
                                ¡Sé el primero en crear uno y envíalo usando el
                                buzón! ✨
                              </p>
                            </div>
                          </div>
                        )}

                        {/* BOTÓN COLABORACIÓN */}
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            window.open(
                              "https://docs.google.com/forms/d/e/1FAIpQLSeJnV2XDPYFemEwkjNxNu8ANTHmJ_P9XQoi-mN-nyMKqef3pQ/viewform?usp=publish-editor",
                              "_blank",
                            )
                          }
                          className="flex-shrink-0 w-[200px] md:w-[250px] h-full flex items-center justify-center cursor-pointer group"
                        >
                          <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 flex flex-col items-center gap-4 opacity-60 grayscale group-hover:grayscale-0 group-hover:border-v2k-pink-hot transition-all duration-300 bg-white/50 shadow-inner w-full">
                            <span className="text-4xl md:text-5xl group-hover:animate-bounce">
                              📮
                            </span>
                            <div className="text-center">
                              <SpaceText
                                tag="span"
                                text="COMMUNITY HUB"
                                size="14|14"
                                className="font-bold text-gray-600 block uppercase group-hover:text-black"
                              />
                              <SpaceText
                                tag="span"
                                text="REQUEST OR SEND ART"
                                size="12|12"
                                className="font-mono text-gray-500 block group-hover:text-v2k-pink-hot"
                              />
                            </div>
                          </div>
                        </m.button>
                      </m.div>
                    )}
                  </div>
                </div>
              </Window>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* MODAL DE PREVIEW (SOLUCIÓN A IMÁGENES VERTICALES) */}
      <AnimatePresence>
        {state.previewItem && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-[600] p-4 bg-black/90"
          >
            <div className="w-full max-w-4xl">
              <Window
                title={`Preview: ${state.previewItem.title}`}
                className="relative bg-gray-100 border-2 border-black shadow-none max-h-[90vh] flex flex-col overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: "SET_PREVIEW_ITEM", payload: null })
                  }
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-gray-200 border-2 border-black font-bold z-20 hover:bg-red-400"
                >
                  X
                </button>

                {/* CONTENEDOR DE SCROLL OPTIMIZADO */}
                <div className="p-4 mt-10 flex flex-col items-center w-full overflow-y-auto overflow-x-hidden scrollbar-hide pb-16">
                  {/* IMAGEN: Reducida a 45vh para asegurar que el botón entre en pantalla */}
                  <div className="border-2 border-black bg-white p-2 shadow-[6px_6px_0px_black] shrink-0 mb-6 relative w-full h-[45vh] md:h-[55vh] flex justify-center items-center">
                    <Image
                      src={state.previewItem.imageURL}
                      alt={state.previewItem.title}
                      fill
                      unoptimized
                      style={{ objectFit: "contain" }}
                      className="block mx-auto"
                    />
                  </div>

                  {/* INFO Y BOTÓN DE DESCARGA */}
                  <div className="flex flex-col items-center gap-6 w-full text-center">
                    <SpaceText
                      tag="h4"
                      text={state.previewItem.title}
                      size="18|22"
                      className="font-bold text-black px-4"
                    />

                    <button
                      type="button"
                      onClick={() => handleDownloadSingle(state.previewItem!)}
                      className="px-10 py-4 bg-blue-200 border-2 border-black text-xs md:text-sm font-bold shadow-[4px_4px_0px_black] active:translate-x-0.5 active:translate-y-0.5 transition-all uppercase hover:bg-blue-300"
                    >
                      ⬇️ DOWNLOAD FILE
                    </button>
                  </div>
                </div>
              </Window>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
