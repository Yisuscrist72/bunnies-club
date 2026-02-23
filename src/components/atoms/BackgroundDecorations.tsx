import React from "react";

export default function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-v2k-blue/40 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-v2k-pink/30 blur-[100px] rounded-full" />
    </div>
  );
}
