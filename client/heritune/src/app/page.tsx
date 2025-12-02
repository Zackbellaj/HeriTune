'use client';
import { useEffect, useState } from 'react';
import api, { getAssetUrl } from '@/lib/api';
import { usePlayer } from '@/context/PlayerContext';
import { Play, Heart, Globe, Sparkles } from 'lucide-react';
import { Track } from '@/types';

export default function Home() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const { playTrack } = usePlayer();

  useEffect(() => {
    api.get<Track[]>('/tracks').then(res => setTracks(res.data));
  }, []);

  return (
    <div className="pt-24 pb-32">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-stone-900 h-[500px] mb-16 shadow-2xl mx-4 md:mx-0 group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-[2s]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 max-w-4xl">
          <span className="inline-block bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 w-fit backdrop-blur-sm">
            ✨ Patrimoine Immatériel
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Écoutez l'âme <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">des traditions.</span>
          </h1>
          <p className="text-lg text-stone-300 max-w-xl mb-8 leading-relaxed">
            HeriTune est une archive vivante. Découvrez des chants rituels, comprenez leur fonction thérapeutique et connectez-vous aux gardiens de ces savoirs.
          </p>
        </div>
      </section>

      {/* Grid Header */}
      <div className="flex justify-between items-end mb-8 px-4 md:px-0">
        <div>
          <h2 className="text-white text-3xl font-bold text-stone-800">Dernières Découvertes</h2>
          <p className="text-stone-500 mt-2">Explorations récentes de la communauté</p>
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
        {tracks.map(track => (
          <div key={track._id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100 group">
            
            {/* Image Container */}
            <div className="relative h-64 rounded-xl overflow-hidden mb-5">
              <img 
                src={track.coverImage ? getAssetUrl(track.coverImage) : "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80"} 
                alt={track.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              
              {/* Play Button Overlay */}
              <button 
                onClick={() => playTrack(track)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div className="bg-white/90 backdrop-blur text-stone-900 p-5 rounded-full transform scale-50 group-hover:scale-100 transition-all shadow-xl hover:bg-yellow-400">
                  <Play fill="currentColor" size={24} className="ml-1"/>
                </div>
              </button>

              {/* Badges sur l'image */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-stone-900/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                  <Globe size={12}/> {track.origin}
                </span>
              </div>
            </div>
            
            {/* Content */}
            <div className="px-2">
              <div className="flex justify-between items-start mb-3">
                 <div>
                    <h3 className="font-bold text-xl text-stone-800 leading-tight group-hover:text-yellow-600 transition-colors">{track.title}</h3>
                    <p className="text-sm text-stone-500 font-medium mt-1">{track.tradition}</p>
                 </div>
              </div>
              
              {/* Context Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-xs px-2.5 py-1 rounded-md font-semibold border border-amber-100">
                  <Sparkles size={10}/> {track.therapeuticFunction}
                </span>
                <span className="bg-stone-100 text-stone-600 text-xs px-2.5 py-1 rounded-md border border-stone-200">
                  {track.ritualContext}
                </span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center text-xs font-bold text-stone-600">
                     {track.artist?.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-stone-500">Par {track.artist?.username}</span>
                </div>
                <button className="text-stone-300 hover:text-red-500 transition-colors transform active:scale-90">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}