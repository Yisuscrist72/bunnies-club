"use client";

import { useReducer, useEffect } from "react";
import { useParams } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
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

interface EditorState {
  template: Template | null;
  loading: boolean;
  side: "front" | "back";
  frontElements: EditorElement[];
  backElements: EditorElement[];
  selectedId: string | null;
  backColor: string;
  isSaving: boolean;
  isUserTemplate: boolean;
  customTitle: string;
}

type EditorAction =
  | {
      type: "INIT_LOAD";
      payload: {
        template: Template | null;
        frontElements: EditorElement[];
        backElements: EditorElement[];
        backColor: string;
        customTitle: string;
        isUserTemplate: boolean;
      };
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SIDE"; payload: "front" | "back" }
  | { type: "SET_SELECTED_ID"; payload: string | null }
  | { type: "SET_BACK_COLOR"; payload: string }
  | { type: "SET_SAVING"; payload: boolean }
  | { type: "SET_CUSTOM_TITLE"; payload: string }
  | {
      type: "ADD_ELEMENT";
      payload: {
        type: EditorElement["type"];
        content: string;
        newEl: EditorElement;
      };
    }
  | {
      type: "UPDATE_ELEMENT";
      payload: { id: string; data: Partial<EditorElement> };
    }
  | { type: "DELETE_ELEMENT" }
  | { type: "MOVE_FORWARD"; payload: string }
  | { type: "MOVE_BACKWARD"; payload: string }
  | { type: "BRING_TO_FRONT"; payload: string }
  | { type: "SEND_TO_BACK"; payload: string }
  | { type: "MARK_SAVED" };

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "INIT_LOAD":
      return { ...state, ...action.payload, loading: false };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_SIDE":
      return { ...state, side: action.payload };
    case "SET_SELECTED_ID":
      return { ...state, selectedId: action.payload };
    case "SET_BACK_COLOR":
      return { ...state, backColor: action.payload };
    case "SET_SAVING":
      return { ...state, isSaving: action.payload };
    case "SET_CUSTOM_TITLE":
      return { ...state, customTitle: action.payload };
    case "MARK_SAVED":
      return { ...state, isUserTemplate: true };
    case "ADD_ELEMENT": {
      const { newEl } = action.payload;
      if (state.side === "front") {
        return {
          ...state,
          frontElements: [...state.frontElements, newEl],
          selectedId: newEl.id,
        };
      }
      return {
        ...state,
        backElements: [...state.backElements, newEl],
        selectedId: newEl.id,
      };
    }
    case "UPDATE_ELEMENT": {
      const updateList = (elements: EditorElement[]) =>
        elements.map((el) =>
          el.id === action.payload.id ? { ...el, ...action.payload.data } : el,
        );
      if (state.side === "front") {
        return { ...state, frontElements: updateList(state.frontElements) };
      }
      return { ...state, backElements: updateList(state.backElements) };
    }
    case "DELETE_ELEMENT": {
      if (!state.selectedId) return state;
      if (state.side === "front") {
        return {
          ...state,
          frontElements: state.frontElements.filter(
            (el) => el.id !== state.selectedId,
          ),
          selectedId: null,
        };
      }
      return {
        ...state,
        backElements: state.backElements.filter(
          (el) => el.id !== state.selectedId,
        ),
        selectedId: null,
      };
    }
    case "MOVE_FORWARD": {
      const targetIdForward = action.payload;
      const moveForward = (prev: EditorElement[]) => {
        const index = prev.findIndex((el) => el.id === targetIdForward);
        if (index === -1 || index === prev.length - 1) return prev;
        const newArr = [...prev];
        const nextEl = newArr[index + 1];
        newArr[index + 1] = newArr[index];
        newArr[index] = nextEl;
        return newArr;
      };
      return state.side === "front"
        ? { ...state, frontElements: moveForward(state.frontElements) }
        : { ...state, backElements: moveForward(state.backElements) };
    }
    case "MOVE_BACKWARD": {
      const targetIdBackward = action.payload;
      const moveBackward = (prev: EditorElement[]) => {
        const index = prev.findIndex((el) => el.id === targetIdBackward);
        if (index <= 0) return prev;
        const newArr = [...prev];
        const prevEl = newArr[index - 1];
        newArr[index - 1] = newArr[index];
        newArr[index] = prevEl;
        return newArr;
      };
      return state.side === "front"
        ? { ...state, frontElements: moveBackward(state.frontElements) }
        : { ...state, backElements: moveBackward(state.backElements) };
    }
    case "BRING_TO_FRONT": {
      const targetIdTop = action.payload;
      const moveTop = (prev: EditorElement[]) => {
        const el = prev.find((e) => e.id === targetIdTop);
        if (!el) return prev;
        return [...prev.filter((e) => e.id !== targetIdTop), el];
      };
      return state.side === "front"
        ? { ...state, frontElements: moveTop(state.frontElements) }
        : { ...state, backElements: moveTop(state.backElements) };
    }
    case "SEND_TO_BACK": {
      const targetIdBottom = action.payload;
      const moveBottom = (prev: EditorElement[]) => {
        const el = prev.find((e) => e.id === targetIdBottom);
        if (!el) return prev;
        return [el, ...prev.filter((e) => e.id !== targetIdBottom)];
      };
      return state.side === "front"
        ? { ...state, frontElements: moveBottom(state.frontElements) }
        : { ...state, backElements: moveBottom(state.backElements) };
    }
    default:
      return state;
  }
}

const initialState: EditorState = {
  template: null,
  loading: true,
  side: "front",
  frontElements: [],
  backElements: [],
  selectedId: null,
  backColor: "#FFFFFF",
  isSaving: false,
  isUserTemplate: false,
  customTitle: "",
};

export default function PhotocardEditorPage() {
  const { id } = useParams();
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const { user, addPoints, showSystemNotification } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      try {
        const userDocSnap = await getDoc(
          doc(db, "user_photocards", id as string),
        );
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          const resourceSnap = await getDoc(
            doc(db, "photocards_resources", data.templateId),
          );
          if (resourceSnap.exists()) {
            const resData = resourceSnap.data();
            dispatch({
              type: "INIT_LOAD",
              payload: {
                template: {
                  id: data.templateId,
                  title: resData.title,
                  imageURL: resData.imageURL,
                },
                frontElements: data.frontElements || [],
                backElements: data.backElements || [],
                backColor: data.backColor || "#FFFFFF",
                customTitle: data.title || resData.title,
                isUserTemplate: true,
              },
            });
            return;
          }
        }

        const docSnap = await getDoc(
          doc(db, "photocards_resources", id as string),
        );
        if (docSnap.exists()) {
          const resData = docSnap.data();
          dispatch({
            type: "INIT_LOAD",
            payload: {
              template: {
                id: docSnap.id,
                title: resData.title,
                imageURL: resData.imageURL,
              },
              frontElements: [],
              backElements: [],
              backColor: "#FFFFFF",
              customTitle: "",
              isUserTemplate: false,
            },
          });
        } else {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } catch (error) {
        console.error("Error:", error);
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    loadData();
  }, [id]);

  const handleSave = async () => {
    if (!user || !state.template) return;
    dispatch({ type: "SET_SAVING", payload: true });
    try {
      dispatch({ type: "SET_SIDE", payload: "front" });

      await new Promise((resolve) => setTimeout(resolve, 300));

      const canvasElement = document.getElementById("photocard-canvas");
      let previewURL = "";

      if (canvasElement) {
        previewURL = await domToPng(canvasElement, { scale: 1, quality: 0.8 });
      }

      const pcData = {
        userId: user.uid,
        templateId: state.template.id,
        frontElements: state.frontElements,
        backElements: state.backElements,
        backColor: state.backColor,
        updatedAt: serverTimestamp(),
        title: state.customTitle || state.template.title,
        previewImage: previewURL,
      };

      if (state.isUserTemplate) {
        await updateDoc(doc(db, "user_photocards", id as string), pcData);
        showSystemNotification("¡Cambios guardados correctamente!", "success");
      } else {
        await addDoc(collection(db, "user_photocards"), {
          ...pcData,
          createdAt: serverTimestamp(),
        });
        dispatch({ type: "MARK_SAVED" });
        showSystemNotification(
          "¡Plantilla guardada en tu colección!",
          "success",
        );
        await addPoints(100, "¡Guardaste tu primera decoración! 🐰💖");
      }
      dispatch({ type: "SET_SAVING", payload: false });
    } catch (error) {
      console.error("Error saving:", error);
      showSystemNotification("Error al guardar la plantilla.", "error");
      dispatch({ type: "SET_SAVING", payload: false });
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
      color: "#000000",
    };
    dispatch({ type: "ADD_ELEMENT", payload: { type, content, newEl } });
  };

  const updateElement = (elId: string, data: Partial<EditorElement>) => {
    dispatch({ type: "UPDATE_ELEMENT", payload: { id: elId, data } });
  };

  const deleteElement = () => dispatch({ type: "DELETE_ELEMENT" });
  const moveElementForward = (elId: string) =>
    dispatch({ type: "MOVE_FORWARD", payload: elId });
  const moveElementBackward = (elId: string) =>
    dispatch({ type: "MOVE_BACKWARD", payload: elId });
  const bringElementToFront = (elId: string) =>
    dispatch({ type: "BRING_TO_FRONT", payload: elId });
  const sendElementToBack = (elId: string) =>
    dispatch({ type: "SEND_TO_BACK", payload: elId });

  if (state.loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#BEE5FD]">
        <Jersey text="CARGANDO_ESTUDIO.SYS" className="animate-pulse" />
      </div>
    );

  const activeElements =
    state.side === "front" ? state.frontElements : state.backElements;
  const selectedElement =
    activeElements.find((el) => el.id === state.selectedId) || null;

  return (
    <div className="fixed inset-0 z-50 w-full h-full flex flex-col items-center bg-[#BEE5FD] overflow-hidden font-space">
      <BackgroundDecorations />
      <EditorHeader
        side={state.side}
        setSide={(s) => dispatch({ type: "SET_SIDE", payload: s })}
        title={state.template?.title || "EDITOR_V2K"}
        setSelectedId={(s) => dispatch({ type: "SET_SELECTED_ID", payload: s })}
        onSave={user ? handleSave : undefined}
        isSaving={state.isSaving}
        customTitle={state.customTitle}
        setCustomTitle={(t) =>
          dispatch({ type: "SET_CUSTOM_TITLE", payload: t })
        }
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
          backColor={state.backColor}
          setBackColor={(c) => dispatch({ type: "SET_BACK_COLOR", payload: c })}
        />
        <EditorCanvas
          side={state.side}
          imageURL={state.template?.imageURL}
          elements={activeElements}
          updateElement={updateElement}
          selectedId={state.selectedId}
          setSelectedId={(s) =>
            dispatch({ type: "SET_SELECTED_ID", payload: s })
          }
          backColor={state.backColor}
        />
      </main>
    </div>
  );
}
