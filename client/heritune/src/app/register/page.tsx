'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Lock, MapPin, Sparkles, FileText, ArrowRight, Loader2, Music2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    location: '',
    bio: '',
    interestsInput: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Transformation des tags
    const culturalInterests = formData.interestsInput
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    try {
      // 1. Inscription
      await api.post('/auth/register', {
        ...formData,
        culturalInterests
      });

      // 2. Connexion automatique
      await login(formData.email, formData.password);
      // La redirection est gérée dans le contexte ou ici si besoin
    } catch (err: any) {
      setError(err.response?.data?.msg || "Une erreur est survenue lors de l'inscription.");
      setLoading(false);
    }
  };

  // Styles communs pour les inputs
  const inputWrapperStyle = "relative";
  const iconStyle = "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400 group-focus-within:text-yellow-600 transition-colors";
  const inputStyle = "w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all font-medium text-stone-800 placeholder-stone-400";
  const labelStyle = "block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5 ml-1";

  return (
    // PT-28 AJOUTÉ ICI pour éviter que la navbar cache le haut
    <div className="min-h-screen relative flex items-center justify-center p-4 pt-28 overflow-hidden">
      
      {/* 1. Fond d'ambiance */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center filter blur-sm scale-110"></div>
        <div className="absolute inset-0 bg-stone-900/50 mix-blend-multiply"></div>
      </div>

      {/* 2. Carte d'Inscription */}
      <div className="relative z-10 w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 animate-in slide-in-from-bottom-5 duration-500">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500 text-stone-900 rounded-xl mb-4 shadow-lg">
             <Music2 size={24} />
          </div>
          <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Rejoindre HeriTune</h1>
          <p className="text-stone-500 mt-2 text-sm">Partagez et préservez votre héritage musical.</p>
        </div>

        {/* Gestion des erreurs */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-lg mb-6 flex items-center gap-2 animate-pulse">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Nom d'utilisateur */}
          <div className="group">
            <label className={labelStyle}>Nom d'utilisateur</label>
            <div className={inputWrapperStyle}>
              <div className={iconStyle}><User size={18} /></div>
              <input type="text" required className={inputStyle} placeholder="Awa Diallo"
                onChange={e => setFormData({...formData, username: e.target.value})} />
            </div>
          </div>
          
          {/* Email */}
          <div className="group">
            <label className={labelStyle}>Email</label>
            <div className={inputWrapperStyle}>
              <div className={iconStyle}><Mail size={18} /></div>
              <input type="email" required className={inputStyle} placeholder="awa@exemple.com"
                onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>

          {/* Mot de passe */}
          <div className="group">
            <label className={labelStyle}>Mot de passe</label>
            <div className={inputWrapperStyle}>
              <div className={iconStyle}><Lock size={18} /></div>
              <input type="password" required className={inputStyle} placeholder="••••••••"
                onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>
          </div>

          {/* Grille : Lieu & Intérêts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
                <label className={labelStyle}>Lieu</label>
                <div className={inputWrapperStyle}>
                    <div className={iconStyle}><MapPin size={18} /></div>
                    <input type="text" className={inputStyle} placeholder="Paris, France"
                    onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
            </div>
            <div className="group">
                <label className={labelStyle}>Intérêts (séparés par virgule)</label>
                <div className={inputWrapperStyle}>
                    <div className={iconStyle}><Sparkles size={18} /></div>
                    <input type="text" className={inputStyle} placeholder="Mandingue, Soufi..."
                    onChange={e => setFormData({...formData, interestsInput: e.target.value})} />
                </div>
            </div>
          </div>

          {/* Bio */}
          <div className="group">
            <label className={labelStyle}>Courte Bio</label>
            <div className={inputWrapperStyle}>
                <div className={`${iconStyle} items-start pt-3`}><FileText size={18} /></div>
                <textarea className={`${inputStyle} pl-10 resize-none`} rows={2} placeholder="Parlez-nous de votre passion..."
                  onChange={e => setFormData({...formData, bio: e.target.value})} />
            </div>
          </div>

          {/* Bouton Submit */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-stone-900/20 disabled:opacity-70 flex items-center justify-center gap-2 mt-4 group"
          >
            {loading ? (
                <Loader2 className="animate-spin" size={20}/>
            ) : (
                <>
                Créer mon compte <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                </>
            )}
          </button>
        </form>
        
        <div className="mt-6 pt-6 border-t border-stone-200 text-center">
            <p className="text-stone-600 text-sm">
                Déjà membre ?{' '}
                <Link href="/login" className="text-yellow-600 font-bold hover:text-yellow-700 hover:underline transition">
                Connexion
                </Link>
            </p>
        </div>
      </div>
    </div>
  );
}