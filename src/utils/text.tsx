import React from "react";

/**
 * Parsea un texto buscando enlaces y los convierte en elementos <a> de React.
 * También ayuda un poco a la seguridad sanitizando lo básico (React ya previene XSS en strings).
 */
export function renderRichText(text: string) {
  if (!text) return null;

  // Regex para detectar URLs (soporta http, https, ftp)
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  // Dividimos el texto por las URLs encontradas
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={`link-${index}`}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-v2k-blue-light hover:text-v2k-blue-hover underline break-all inline-block font-black transition-colors"
          title={part}
        >
          {part.length > 30 ? part.substring(0, 27) + "..." : part}
        </a>
      );
    }
    return <React.Fragment key={`text-${index}`}>{part}</React.Fragment>;
  });
}
