import HeroSection from "../components/organisms/HeroSection";
import HomeDashboard from "../components/organisms/HomeDashboard";

export default function Home() {
  return (
    <main className="flex-grow p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-10 relative z-10 mt-4">
        <HeroSection />
        <HomeDashboard />
      </div>
    </main>
  );
}
