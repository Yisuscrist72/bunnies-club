import React from 'react';
// Renombramos el Image original de Next a "NextImage" para evitar conflictos
import NextImage, { ImageProps } from 'next/image'; 
import clsx from 'clsx';

interface CustomImageProps extends Omit<ImageProps, 'alt'> {
  alt: string; // Hacemos que el 'alt' sea obligatorio por accesibilidad y SEO
  pixelated?: boolean; // Interruptor para darle el estilo retro Y2K
  wrapperClassName?: string; // Para controlar el tamaño desde el componente padre
}

export default function Image({
  src,
  alt,
  pixelated = false,
  className,
  wrapperClassName,
  fill = true, // Por defecto, la imagen rellenará su contenedor
  ...props
}: CustomImageProps) {
  return (
    // El contenedor es la clave del responsive. 
    <div className={clsx("relative w-full h-full overflow-hidden", wrapperClassName)}>
      <NextImage
        src={src}
        alt={alt}
        fill={fill}
        // Magia Y2K: Si pasas pixelated={true}, la imagen mantiene los bordes duros
        style={{ imageRendering: pixelated ? 'pixelated' : 'auto' }}
        className={clsx(
          "object-cover transition-all duration-300", 
          className
        )}
        // Sizes es vital para el responsive en Next.js
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...props}
      />
    </div>
  );
}