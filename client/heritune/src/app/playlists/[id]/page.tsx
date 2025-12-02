'use client';
import { useState } from 'react';
import api from '@/lib/api';
import { useParams } from 'next/navigation';
import { UserPlus, Save } from 'lucide-react';

export default function PlaylistDetail() {
  const params = useParams(); // Récupère l'ID de la playlist dans l'URL
  const [collaboratorId, setCollaboratorId] = useState('');
  const [message, setMessage] = useState('');

  // Fonction pour ajouter un collaborateur (Route: POST /api/playlists/:id/collaborators)
  // Backend attend: { userIdToAdd: "..." }
  const addCollaborator = async () => {
    try {
      await api.post(`/playlists/${params.id}/collaborators`, {
        userIdToAdd: collaboratorId
      });
      setMessage('Collaborateur ajouté avec succès !');
      setCollaboratorId('');
    } catch (err: any) {
      setMessage("Erreur : Impossible d'ajouter cet utilisateur (Vérifiez l'ID).");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100">
        <h1 className="text-2xl font-bold mb-2 text-stone-800">Gérer la Playlist</h1>
        <p className="text-black text-sm mb-6">ID Playlist: {params.id}</p>

        <hr className="my-6 border-stone-100" />

        <h3 className="text-black font-bold text-lg mb-4 flex items-center gap-2">
            <UserPlus size={20} className="text-yellow-600"/>
            Ajouter un Collaborateur
        </h3>
        

        <div className="flex gap-2">
            <input 
                type="text" 
                placeholder="ID de l'utilisateur (ex: 654a...)" 
                className="text-black flex-1 p-3 border border-stone-300 rounded-lg"
                value={collaboratorId}
                onChange={(e) => setCollaboratorId(e.target.value)}
            />
            <button 
                onClick={addCollaborator}
                className="bg-yellow-500 text-stone-900 px-4 rounded-lg font-bold hover:bg-yellow-400 transition flex items-center gap-2"
            >
                <Save size={18}/> Ajouter
            </button>
        </div>

        {message && (
            <p className={`mt-4 text-sm font-semibold ${message.includes('succès') ? 'text-green-600' : 'text-red-500'}`}>
                {message}
            </p>
        )}
      </div>
    </div>
  );
}