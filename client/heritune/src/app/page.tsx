// src/app/page.tsx
import AppLayout from "@/app/components/AppLayout";
import DiscoverSection from "@/app/components/DiscoverSection";

export default function HomePage() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4 text-[#529D8E]">Bienvenue sur HeriTune</h1>
      <DiscoverSection />
    </AppLayout>
  );
}