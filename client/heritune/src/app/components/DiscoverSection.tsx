// src/app/components/DiscoverSection.tsx
import mockTracks from  "../../data/mockData";
import TrackCard from "./TrackCard";

export default function DiscoverSection() {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Découvertes</h2>
      {/* Responsive grid: 1 col on mobile, 2 on sm, 3 on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {mockTracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}