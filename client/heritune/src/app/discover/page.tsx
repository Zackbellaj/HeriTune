// src/app/discover/page.tsx
import AppLayout from "@/app/components/AppLayout";
import DiscoverSection from "@/app/components/DiscoverSection";

export default function DiscoverPage() {
  return (
    <AppLayout>
      <h1 className="text-black text-2xl font-bold mb-6">Chants traditionnels du monde</h1>
      <DiscoverSection />
    </AppLayout>
  );
}