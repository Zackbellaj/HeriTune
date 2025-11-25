// src/app/components/TrackCard.tsx
import { Track } from "../../data/mockData";

export default function TrackCard({ track }: { track: Track }) {
  return (
    <div className="bg-stone-100 p-3 sm:p-4 rounded-lg hover:bg-stone-200 transition cursor-pointer flex flex-col h-full border border-stone-200 shadow-sm">
      <div className="aspect-square w-full bg-stone-300 rounded mb-2 sm:mb-3 flex items-center justify-center">
        <span className="text-3xl sm:text-4xl">🎵</span>
      </div>
      <h3 className="font-bold text-base sm:text-lg text-stone-900 line-clamp-1">
        {track.title}
      </h3>
      <p className="text-stone-600 text-xs sm:text-sm mt-1">{track.origin}</p>
      <p className="mt-2 text-xs sm:text-sm flex-grow text-stone-700 line-clamp-2">
        {track.description}
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        <span className="px-2 py-1 text-[0.65rem] sm:text-xs bg-emerald-900 text-emerald-100 rounded whitespace-nowrap">
          {track.ritualContext}
        </span>
        <span className="px-2 py-1 text-[0.65rem] sm:text-xs bg-amber-900 text-amber-100 rounded whitespace-nowrap">
          {track.therapeuticFunction}
        </span>
      </div>
    </div>
  );
}

export { TrackCard };