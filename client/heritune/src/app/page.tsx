// src/app/page.tsx
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import DiscoverSection from "@/app/components/DiscoverSection";
import Player from "@/app/components/Player";

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-gray-900 to-black">
          <h1 className="text-2xl font-bold mb-4">Bienvenue sur HeriTune</h1>
          <DiscoverSection />
        </main>
      </div>
      <Player />
    </div>
  );
}