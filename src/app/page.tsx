"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import HeroSection from "../components/organisms/HeroSection";
import LoadingScreen from "../components/molecules/LoadingScreen";

// El Dashboard se carga de forma dinámica para optimizar peso
const HomeDashboard = dynamic(() => import("../components/organisms/HomeDashboard"), {
  ssr: false,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos un tiempo de carga para que las animaciones de entrada respiren
    // O puedes vincularlo a que las imágenes críticas estén cargadas
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 segundos de Splash Screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <main className="flex-grow p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-[1200px] flex flex-col gap-10 relative z-10 mt-4 min-h-screen">
          <HeroSection />
          {!isLoading && <HomeDashboard />}
        </div>
      </main>
    </>
  );
}