// src/app/components/TrackCard.tsx
import { Track } from "../../data/mockData";
import Image from "next/image";

export default function TrackCard({ track }: { track: Track }) {
  return (
    <div className="bg-white p-4 rounded-lg hover:bg-[#FADBBB] border border-[#DBA883]/30 shadow-sm transition flex flex-col h-full">
      <div className="aspect-square w-full bg-[#FFE9CF] rounded mb-3 overflow-hidden flex items-center justify-center">
        {track.img ? (
          <Image
            src={`/assets/track-images/${track.img}`}
            alt={track.title}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl">🎵</span>
        )}
      </div>
      <h3 className="font-bold text-[#A35912] line-clamp-1">{track.title}</h3>
      <p className="text-[#DBA883] text-sm mt-1">{track.origin}</p>
      <p className="mt-2 text-sm flex-grow text-[#A35912] line-clamp-2">{track.description}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        <span className="px-2 py-1 text-xs bg-[#BE6815] text-white rounded whitespace-nowrap">
          {track.ritualContext}
        </span>
        <span className="px-2 py-1 text-xs bg-[#63BAAB] text-white rounded whitespace-nowrap">
          {track.therapeuticFunction}
        </span>
      </div>
    </div>
  );
}

export { TrackCard };