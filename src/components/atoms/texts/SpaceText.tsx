"use client";
import DOMPurify from "isomorphic-dompurify";
import { type ElementType, useRef } from "react";

// Definimos los mismos tipos de tamaño que en Jersey para mantener la consistencia
export type SpaceTextSize =
  | "12|12"
  | "14|14"
  | "16|16"
  | "18|22"
  | "20|24"
  | "32|40"
  | "44|80"
  | "68|94";

export interface SpaceTextProps {
  text: string;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  size?: SpaceTextSize;
  className?: string;
  style?: React.CSSProperties;
}

// Mapeo de tamaños idéntico al de Jersey para que escalen igual
const SIZE_MAP: Record<SpaceTextSize, string> = {
  "12|12": "text-[0.75rem] leading-[120%]",
  "14|14": "text-[0.875rem] leading-[120%]",
  "16|16": "text-[1rem] leading-[120%]",
  "18|22": "text-[1.125rem] lg:text-[1.375rem] leading-[120%]",
  "20|24": "text-[1.25rem] lg:text-[1.5rem] leading-[120%]",
  "32|40": "text-[2rem] lg:text-[2.5rem] leading-[120%]",
  "44|80": "text-[2.75rem] lg:text-[5rem] leading-[120%]",
  "68|94": "text-[4.25rem] lg:text-[5.875rem] leading-[120%]",
};

/**
 * Componente para textos que usan la fuente Space Grotesk.
 */
export default function SpaceText({
  text,
  tag = "p",
  size = "14|14",
  className = "",
  style = {},
}: SpaceTextProps) {
  const textRef = useRef<HTMLElement>(null);

  // Usamos la variable font-space definida en el layout/config
  const fontStyle = "font-space";
  const sizeStyle = SIZE_MAP[size] || SIZE_MAP["14|14"];

  const Component = tag as ElementType;
  const sanitizedHTML = DOMPurify.sanitize(text);

  return (
    <Component
      ref={textRef}
      className={`${fontStyle} ${sizeStyle} antialiased ${className}`}
      style={style}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: El contenido ya está sanitizado con DOMPurify
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
}
