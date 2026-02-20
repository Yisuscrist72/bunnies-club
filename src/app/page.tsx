import React from 'react';
import HeroSection from '../components/organisms/HeroSection';
import HomeDashboard from '../components/organisms/HomeDashboard';

export default function Home() {
  return (
    <main className="flex-grow bg-gradient-to-b from-[#C9E9F6] via-[#F4D8ED] to-[#F9F1C3] p-4 md:p-8 overflow-x-hidden relative min-h-screen flex flex-col items-center">
      <div className="w-full max-w-300 flex flex-col gap-10 relative z-10 mt-4">
        <HeroSection />
        <HomeDashboard />
      </div>
    </main>
  );
}