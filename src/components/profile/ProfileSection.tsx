"use client";

import Jersey from "@/components/atoms/texts/Jersey";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  titleUnderlineColor?: string;
}

export default function ProfileSection({ 
  title, 
  children, 
  className = "bg-white", 
  titleClassName = "mb-4",
  titleUnderlineColor = "decoration-v2k-pink-hot"
}: ProfileSectionProps) {
  return (
    <div className={`border-[3px] border-black p-6 rounded-3xl shadow-[6px_6px_0px_#000] mb-12 ${className}`}>
      <Jersey 
        text={title} 
        size="20|24" 
        className={`${titleClassName} text-black underline ${titleUnderlineColor}`} 
      />
      {children}
    </div>
  );
}
