import React from "react";

export default function SkeletonBox() {
  return (
    <div className="flex-shrink-0 w-40 md:w-52 flex flex-col gap-3">
      {/* Marco de la imagen pulsando */}
      <div className="w-full aspect-[2/3] bg-gray-200 border-[3px] border-black/10 rounded-xl animate-pulse shadow-[6px_6px_0px_rgba(0,0,0,0.05)]" />
      {/* Marco del texto pulsando */}
      <div className="w-full h-10 bg-gray-100 border-[3px] border-black/10 rounded-xl animate-pulse" />
    </div>
  );
}