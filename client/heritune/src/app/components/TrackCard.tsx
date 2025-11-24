// src/app/components/TrackCard.tsx
import { Track } from  "../../data/mockData";

export default function TrackCard({ track }: { track: Track }) {
  return (
    <div className="bg-gray-800 p-3 sm:p-4 rounded-lg hover:bg-gray-700 transition cursor-pointer flex flex-col h-full">
      <div className="aspect-square w-full bg-gray-700 rounded mb-2 sm:mb-3 flex items-center justify-center">
        <span className="text-3xl sm:text-4xl">🎵</span>
      </div>
      <h3 className="font-bold text-base sm:text-lg line-clamp-1">{track.title}</h3>
      <p className="text-gray-400 text-xs sm:text-sm mt-1">{track.origin}</p>
      <p className="mt-2 text-xs sm:text-sm flex-grow line-clamp-2">{track.description}</p>
      <div className="mt-2 flex flex-wrap gap-1">
        <span className="px-2 py-1 text-[0.65rem] sm:text-xs bg-green-900 text-green-300 rounded whitespace-nowrap">
          {track.ritualContext}
        </span>
        <span className="px-2 py-1 text-[0.65rem] sm:text-xs bg-purple-900 text-purple-300 rounded whitespace-nowrap">
          {track.therapeuticFunction}
        </span>
      </div>
    </div>
  );
}

// Export nommé pour import dans d'autres pages
export { TrackCard };