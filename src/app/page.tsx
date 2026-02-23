"use client";

import dynamic from "next/dynamic";
import HeroSection from "../components/organisms/HeroSection";

// El Dashboard se carga de forma dinámica para optimizar peso
const HomeDashboard = dynamic(
  () => import("../components/organisms/HomeDashboard"),
  {
    ssr: false,
  },
);

export default function Home() {

  return (
    <>
      <main className="flex-grow p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-[1200px] flex flex-col gap-10 relative z-10 mt-4 min-h-screen">
          <HeroSection />
            <HomeDashboard />
        </div>
      </main>
    </>
  );
}