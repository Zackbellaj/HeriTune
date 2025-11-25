// src/app/my-recordings/page.tsx
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import Player from "@/app/components/Player";
import { TrackCard } from "@/app/components/TrackCard";
import mockTracks from "../../data/mockData";

export default function MyRecordingsPage() {
  // Simule les enregistrements d’Awa
  const myTracks = mockTracks.slice(0, 1); // Par exemple, son chant mandingue

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50">
          <h1 className="text-2xl font-bold mb-6">Mes enregistrements</h1>
          {myTracks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {myTracks.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Vous n’avez pas encore publié d’enregistrement.</p>
          )}
        </main>
      </div>
      <Player />
    </div>
  );
}