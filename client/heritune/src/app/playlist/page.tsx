// src/app/playlist/page.tsx
import AppLayout from "@/app/components/AppLayout";
import { TrackCard } from "@/app/components/TrackCard";
import mockTracks from "../../data/mockData";

export default function PlaylistPage() {
  const sharedPlaylist = mockTracks;

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Playlist collaborative</h1>
        <p className="text-[#A35912]">Avec Ravi • 3 chants</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sharedPlaylist.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </AppLayout>
  );
}