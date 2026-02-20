import React from 'react';

interface SpaceTextProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  text: string;
  size?: string; // Formato "mobile|desktop" (ej. "14|18")
  className?: string;
  children?: React.ReactNode;
}

export default function SpaceText({ 
  tag: Tag = 'p', 
  text, 
  size, 
  className = '', 
  children 
}: SpaceTextProps) {
  
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