export interface EditorElement {
  id: string;
  type: "sticker" | "icon" | "text" | "image";
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  color?: string;
  zIndex?: number;
  fontFamily?: string;
}
