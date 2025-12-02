'use client';
import { useState, FormEvent, useEffect } from 'react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import { Playlist } from '@/types';
import { Plus, Music, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Récupérer les playlists au chargement
  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const res = await api.get<Playlist[]>('/playlists');
      setPlaylists(res.data);
    } catch (err) {
      console.error("Erreur chargement playlists", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Créer une playlist
  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName) return;

    try {
      const res = await api.post<Playlist>('/playlists', { name: newPlaylistName });
      // On redirige vers la page de détail
      router.push(`/playlists/${res.data._id}`);
    } catch (err) {
      alert('Erreur création playlist');
    }
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-stone-800">Mes Playlists Collaboratives</h1>

      {/* Formulaire de création */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 mb-8">
        <h2 className="text-black text-lg font-bold mb-4 flex items-center gap-2">
            <Plus className="bg-yellow-500 text-white rounded-full p-1" size={24} /> 
            Nouvelle Playlist
        </h2>
        <form onSubmit={handleCreate} className="flex gap-4">
            <input 
                type="text" 
                placeholder="Nom de la playlist (ex: Fusion Indo-Africaine)" 
                className="text-black flex-1 p-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none transition"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
            />
            <button type="submit" className="bg-stone-800 text-white px-6 py-3 rounded-lg font-bold hover:bg-stone-900 transition">
                Créer
            </button>
        </form>
      </div>

      {/* Liste des Playlists */}
      {loading ? (
        <p className="text-center text-stone-400 animate-pulse">Chargement de vos collections...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {playlists.map((playlist) => (
            <Link key={playlist._id} href={`/playlists/${playlist._id}`}>
              <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm hover:shadow-md hover:border-yellow-200 transition cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-yellow-50 rounded-lg text-yellow-600">
                    <Music size={24} />
                  </div>
                  {playlist.collaborators.length > 1 && (
                    <span className="bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Users size={12} /> Collab
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-stone-800 mb-1 group-hover:text-yellow-600 transition">
                  {playlist.name}
                </h3>
                
                <p className="text-sm text-stone-500 mb-4">
                  {playlist.tracks.length} morceau{playlist.tracks.length > 1 ? 'x' : ''}
                </p>

                <div className="flex justify-between items-center text-sm font-medium text-yellow-600">
                  <span>Ouvrir</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>
          ))}

          {/* État vide */}
          {playlists.length === 0 && (
             <div className="col-span-full p-10 bg-stone-50 border border-dashed border-stone-300 rounded-xl text-center text-stone-500">
                <Music className="mx-auto mb-3 opacity-30" size={40}/>
                <p>Aucune playlist pour le moment.</p>
                <p className="text-sm">Créez-en une ci-dessus pour commencer à collaborer !</p>
             </div>
          )}
        </div>
      )}
    </div>
  );
}