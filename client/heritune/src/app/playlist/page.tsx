// src/app/playlist/page.tsx
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import Player from "@/app/components/Player";
import { TrackCard } from "@/app/components/TrackCard";
import mockTracks from "../../data/mockData";

export default function PlaylistPage() {
  // Simule la playlist collaborative avec Ravi
  const sharedPlaylist = mockTracks; // Tous les chants

  return (
    <div className="flex flex-col h-screen bg-black text-black overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-50">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Playlist collaborative</h1>
            <p className="text-black">Avec Ravi • 3 chants</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sharedPlaylist.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        </main>
      </div>
      <Player />
    </div>
  );
}