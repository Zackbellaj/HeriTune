'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { User } from '@/types';
import { MessageCircle, Music4, Zap } from 'lucide-react';

export default function MatchesPage() {
  const [matches, setMatches] = useState<User[]>([]);

  useEffect(() => {
    api.get<User[]>('/users/matches').then(res => setMatches(res.data));
  }, []);

  return (
    <div className="pt-24 pb-12 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-yellow-100 font-bold tracking-wider text-sm uppercase">Communauté</span>
        <h1 className=" text-white text-4xl font-bold text-stone-800 mt-2 mb-4">Vos Âmes Sœurs Musicales</h1>
        <p className="text-stone-500 max-w-2xl mx-auto">
            Ces personnes partagent vos rituels et traditions favorites. L'algorithme se base sur vos tags culturels communs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {matches.map(user => (
          <div key={user._id} className="bg-white rounded-[2rem] p-1 shadow-xl shadow-stone-200/50 hover:-translate-y-2 transition-transform duration-300">
            <div className="bg-gradient-to-b from-stone-50 to-white rounded-[1.8rem] p-6 border border-stone-100 h-full flex flex-col">
              
              {/* Header Profile */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-28 h-28 mb-4">
                    <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-20"></div>
                    <img 
                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.username}`} 
                        alt="avatar" 
                        className="w-full h-full rounded-full border-4 border-white shadow-md bg-white object-cover relative z-10"
                    />
                    <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white z-20"></div>
                </div>
                <h3 className="text-2xl font-bold text-stone-800">{user.username}</h3>
                <p className="text-yellow-600 font-medium text-sm">{user.location || "Citoyen du monde"}</p>
              </div>
              
              {/* Bio & Tags */}
              <div className="mb-8 text-center flex-grow">
                  <p className="text-stone-500 italic mb-6 leading-relaxed text-sm">
                      "{user.bio || 'Passionné de musique et de partage.'}"
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    {user.culturalInterests.map(tag => (
                        <span key={tag} className="bg-stone-800 text-stone-200 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1">
                            <Zap size={10} className="text-yellow-400"/> {tag}
                        </span>
                    ))}
                  </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                <button className="flex items-center justify-center gap-2 bg-stone-900 text-white py-3 rounded-xl hover:bg-stone-800 transition shadow-lg shadow-stone-900/20 font-medium text-sm">
                    <MessageCircle size={18}/> Discuter
                </button>
                <button 
                    onClick={() => {navigator.clipboard.writeText(user._id); alert("ID copié !")}}
                    className="flex items-center justify-center gap-2 bg-stone-100 text-stone-700 py-3 rounded-xl hover:bg-stone-200 transition font-medium text-sm"
                >
                    <Music4 size={18}/> ID Copier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}