"use client";
import DOMPurify from "isomorphic-dompurify";
import { type ElementType, useRef } from "react";

export type TextSize =
	| "12|12"
	| "14|14"
	| "16|16"
	| "18|22"
	| "20|24"
	| "32|40"
	| "44|80"
	| "68|94";

export interface TextProps {
	text: string;
	tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
	size?: TextSize;
	className?: string;
}

const SIZE_MAP: Record<TextSize, string> = {
	"12|12": "text-[0.75rem] leading-[120%]",
	"14|14": "text-[0.875rem] leading-[120%]",
	"16|16": "text-[1rem] leading-[120%]",
	"18|22": "text-[1.125rem] lg:text-[1.375rem] leading-[120%]",
	"20|24": "text-[1.25rem] lg:text-[1.5rem] leading-[120%]",
	"32|40": "text-[2rem] lg:text-[2.5rem] leading-[120%]",
	"44|80": "text-[2.75rem] lg:text-[5rem] leading-[120%]",
	"68|94": "text-[4.25rem] lg:text-[5.875rem] leading-[120%]",
};

export default function Text({
	text,
	tag = "p",
	size = "14|14",
	className = "",
}: TextProps) {
	const textRef = useRef<HTMLElement>(null);

	// Clase de la fuente que definas en globals.css o tailwind config
	const fontStyle = "font-jersey";
	const sizeStyle = SIZE_MAP[size] || SIZE_MAP["14|14"];

	const Component = tag as ElementType;
	const sanitizedHTML = DOMPurify.sanitize(text);

	return (
		<Component
			ref={textRef}
			className={`${fontStyle} ${sizeStyle} antialiased ${className}`}
			dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
		/>
	);
}
