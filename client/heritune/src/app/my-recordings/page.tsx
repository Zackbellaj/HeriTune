// src/app/my-recordings/page.tsx
import AppLayout from "@/app/components/AppLayout";
import { TrackCard } from "@/app/components/TrackCard";
import mockTracks from "../../data/mockData";

export default function MyRecordingsPage() {
  const myTracks = mockTracks.slice(0, 1);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">Mes enregistrements</h1>
      {myTracks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {myTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      ) : (
        <p className="text-[#DBA883]">Vous n’avez pas encore publié d’enregistrement.</p>
      )}
    </AppLayout>
  );
}