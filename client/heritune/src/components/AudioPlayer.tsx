'use client';
import { usePlayer } from '@/context/PlayerContext';
import { useEffect, useRef } from 'react';
import { getAssetUrl } from '@/lib/api';
import { X } from 'lucide-react';

export default function AudioPlayer() {
  const { currentTrack, setIsPlaying, playTrack } = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.src = getAssetUrl(currentTrack.audioUrl);
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
  }, [currentTrack, setIsPlaying]);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[700px] bg-stone-900/95 backdrop-blur-xl text-white p-3 rounded-2xl border border-white/10 shadow-2xl z-50 flex items-center gap-4 animate-in slide-in-from-bottom-5 duration-500">
      
      {/* Cover Art Rotation */}
      <div className="relative w-14 h-14 flex-shrink-0">
         <img 
           src={currentTrack.coverImage ? getAssetUrl(currentTrack.coverImage) : "https://via.placeholder.com/150"} 
           alt="cover" 
           className="w-full h-full object-cover rounded-full border-2 border-stone-700 animate-[spin_10s_linear_infinite]" 
         />
         <div className="absolute inset-0 rounded-full border border-white/10"></div>
      </div>

      {/* Info */}
      <div className="flex-1 overflow-hidden">
        <h4 className="font-bold text-yellow-500 truncate text-sm md:text-base">{currentTrack.title}</h4>
        <div className="flex items-center gap-2 text-xs text-stone-400">
            <span className="truncate">{currentTrack.origin}</span>
            <span className="w-1 h-1 bg-stone-500 rounded-full"></span>
            <span className="truncate text-stone-500">{currentTrack.therapeuticFunction}</span>
        </div>
      </div>

      {/* Controls */}
      <audio 
        ref={audioRef} 
        controls 
        className="h-8 w-32 md:w-64 opacity-90 invert grayscale brightness-200"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        controlsList="nodownload noplaybackrate"
      />
      
      {/* Close Button (Optional) */}
      <button onClick={() => playTrack(null as any)} className="p-2 hover:bg-white/10 rounded-full transition">
        <X size={16} className="text-stone-500"/>
      </button>
    </div>
  );
}