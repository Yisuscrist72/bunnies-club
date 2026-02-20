import React from 'react';

interface SpaceTextProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  text: string;
  size?: string; // Formato esperado: "mobileSize|desktopSize" (ej: "16|20")
  className?: string;
  children?: React.ReactNode;
}

/**
 * Componente para textos que usan la fuente Space Grotesk.
 * Permite tamaños responsivos rápidos mediante el prop 'size'.
 */
export default function SpaceText({ 
  tag: Tag = 'p', 
  text, 
  size, 
  className = '', 
  children 
}: SpaceTextProps) {
  
  // Genera clases de Tailwind para tamaño de texto personalizado
  const getResponsiveSize = () => {
    if (!size) return '';
    const [mobile, desktop] = size.split('|');
    return `text-[${mobile}px] md:text-[${desktop}px]`;
  };

  return (
    <Tag className={`font-space tracking-tight ${getResponsiveSize()} ${className}`}>
      {text}
      {children}
    </Tag>
  );
}