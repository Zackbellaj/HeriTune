'use client';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import api, { getAssetUrl } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types';
import { MapPin, Mail, Edit3, Save, X, Camera, Music2, Sparkles, Loader2, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    username: '',
    location: '',
    bio: '',
    interestsInput: ''
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get<User>('/users/me');
      const data = res.data;
      setProfile(data);
      setFormData({
        username: data.username,
        location: data.location || '',
        bio: data.bio || '',
        interestsInput: data.culturalInterests.join(', ')
      });
      setPreviewAvatar(data.avatar ? getAssetUrl(data.avatar) : null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('username', formData.username);
    data.append('location', formData.location);
    data.append('bio', formData.bio);
    data.append('culturalInterests', formData.interestsInput);
    if (avatarFile) {
        data.append('avatar', avatarFile);
    }

    try {
        const res = await api.put('/users/me', data, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        setProfile(res.data);
        setIsEditing(false);
    } catch (err) {
        alert("Erreur lors de la mise à jour");
    } finally {
        setLoading(false);
    }
  };

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-stone-400" size={32} />
    </div>
  );

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-4 md:px-6">
      
      {/* 1. Header Banner Immersif */}
      <div className="relative h-64 rounded-t-[2.5rem] overflow-hidden bg-stone-900 shadow-2xl">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
         
         <div className="absolute bottom-6 right-8 hidden md:block">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase">
                Membre HeriTune
            </span>
         </div>
      </div>

      <div className="relative -mt-20 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        
        {/* 2. Sidebar Gauche : Identité */}
        <div className="lg:col-span-4 pl-4 md:pl-8">
            {/* Ajout de 'items-center' et suppression de 'lg:text-left' pour tout centrer */}
            <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-stone-100 relative text-center flex flex-col items-center">
                
                {/* Avatar */}
                {/* Suppression de 'lg:mx-0' pour garantir le centrage */}
                <div className="relative inline-block mx-auto mb-4">
                    <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl bg-stone-100 flex items-center justify-center overflow-hidden">
                        {previewAvatar ? (
                            <img src={previewAvatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-5xl font-bold text-stone-300">{profile.username.charAt(0).toUpperCase()}</span>
                        )}
                    </div>
                    
                    {isEditing && (
                        <label className="absolute bottom-2 right-2 bg-yellow-500 hover:bg-yellow-400 text-stone-900 p-3 rounded-full cursor-pointer shadow-lg transition-transform hover:scale-110 border-2 border-white">
                            <Camera size={20} />
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>
                    )}
                </div>

                {/* Nom & Actions */}
                <div className="mb-6 w-full">
                    {isEditing ? (
                        <div className="mb-4">
                            <label className="text-xs font-bold text-stone-400 uppercase">Nom d'utilisateur</label>
                            <input 
                                type="text" 
                                value={formData.username}
                                onChange={e => setFormData({...formData, username: e.target.value})}
                                className="w-full text-2xl font-bold text-stone-900 bg-stone-50 border-b-2 border-yellow-500 focus:outline-none py-1 mt-1 text-center"
                            />
                        </div>
                    ) : (
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-stone-900 mb-1">{profile.username}</h1>
                    )}
                    {/* Suppression de lg:justify-start pour centrer l'email */}
                    <p className="text-stone-500 font-medium flex items-center justify-center gap-2">
                        <Mail size={16}/> {profile.email}
                    </p>
                </div>

                {/* Bouton Toggle */}
                {!isEditing && (
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="w-full bg-stone-900 text-white py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2 group"
                    >
                        <Edit3 size={18} className="group-hover:-translate-y-0.5 transition-transform"/> Modifier le profil
                    </button>
                )}
            </div>
            
            {/* Meta Info Dynamique (Correction précédente incluse) */}
            <div className="mt-6 bg-yellow-50 rounded-2xl p-6 border border-yellow-100 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                    <Calendar size={20} className="text-yellow-600"/>
                    <span className="text-sm font-bold text-yellow-900">
                        Actif depuis {new Date(profile.createdAt).getFullYear()}
                    </span>
                </div>
                <p className="text-xs text-yellow-700 leading-relaxed">
                    Contribue à la préservation du patrimoine musical mondial.
                </p>
            </div>
        </div>

        {/* 3. Colonne Droite : Formulaire & Détails */}
        <div className="lg:col-span-8 pr-4 md:pr-8">
            <div className="bg-white rounded-[2rem] shadow-xl border border-stone-100 p-8 md:p-10 min-h-[500px]">
                
                <form onSubmit={handleSubmit} className="space-y-10">
                    
                    {/* Section Bio */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-stone-900 flex items-center gap-3">
                            <div className="bg-stone-100 p-2 rounded-lg"><Sparkles size={20} className="text-stone-600"/></div>
                            Mon Histoire
                        </h2>
                        {isEditing ? (
                            <textarea 
                                value={formData.bio}
                                onChange={e => setFormData({...formData, bio: e.target.value})}
                                rows={5}
                                className="w-full p-5 bg-stone-50 rounded-2xl border-2 border-transparent focus:border-yellow-500 focus:bg-white focus:outline-none transition-all text-lg text-stone-800 leading-relaxed"
                                placeholder="Racontez votre parcours, vos traditions préférées..."
                            />
                        ) : (
                            <div className="prose prose-stone max-w-none">
                                <p className="text-lg text-stone-700 leading-relaxed">
                                    {profile.bio || <span className="text-stone-400 italic">Aucune biographie renseignée. Ajoutez quelques mots sur vous !</span>}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="h-px bg-stone-100 w-full"></div>

                    {/* Grid: Location & Interests */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        
                        {/* Location */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                                <MapPin size={20} className="text-yellow-600"/> Localisation
                            </h2>
                            {isEditing ? (
                                <input 
                                    type="text" 
                                    value={formData.location}
                                    onChange={e => setFormData({...formData, location: e.target.value})}
                                    className="w-full p-4 bg-stone-50 rounded-xl border-2 border-transparent focus:border-yellow-500 focus:bg-white transition-all font-semibold"
                                    placeholder="ex: Paris, France"
                                />
                            ) : (
                                <p className="text-xl font-bold text-stone-800">
                                    {profile.location || <span className="text-stone-400 text-base font-normal">Non renseigné</span>}
                                </p>
                            )}
                        </div>

                        {/* Interests */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                                <Music2 size={20} className="text-yellow-600"/> Intérêts Culturels
                            </h2>
                            {isEditing ? (
                                <div>
                                    <input 
                                        type="text" 
                                        value={formData.interestsInput}
                                        onChange={e => setFormData({...formData, interestsInput: e.target.value})}
                                        className="w-full p-4 bg-stone-50 rounded-xl border-2 border-transparent focus:border-yellow-500 focus:bg-white transition-all font-semibold"
                                        placeholder="Mandingue, Soufi, Jazz..."
                                    />
                                    <p className="text-xs text-stone-400 mt-2 font-medium">Séparez par des virgules.</p>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {profile.culturalInterests.length > 0 ? profile.culturalInterests.map(tag => (
                                        <span key={tag} className="bg-stone-900 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md transform hover:scale-105 transition-transform cursor-default">
                                            #{tag}
                                        </span>
                                    )) : (
                                        <span className="text-stone-400 italic">Aucun intérêt listé.</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions de Sauvegarde */}
                    {isEditing && (
                        <div className="flex items-center gap-4 pt-6 border-t border-stone-100 animate-in slide-in-from-bottom-5">
                            <button 
                                type="button" 
                                onClick={() => { setIsEditing(false); fetchProfile(); }}
                                className="px-8 py-4 rounded-xl font-bold text-stone-600 hover:bg-stone-100 transition flex items-center gap-2"
                            >
                                <X size={20}/> Annuler
                            </button>
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="flex-1 bg-yellow-500 text-stone-900 py-4 rounded-xl font-bold hover:bg-yellow-400 transition shadow-xl hover:shadow-yellow-500/20 flex justify-center items-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin"/> : <><Save size={20}/> Sauvegarder les changements</>}
                            </button>
                        </div>
                    )}

                </form>
            </div>
        </div>

      </div>
    </div>
  );
}