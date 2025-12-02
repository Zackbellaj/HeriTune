'use client';
import { useState, FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, Loader2, Music2 } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
    }
  };

  return (
    // AJOUT DE 'pt-28' ICI pour compenser la Navbar fixe
    <div className="min-h-screen relative flex items-center justify-center p-4 pt-28 overflow-hidden">
      
      {/* 1. Fond d'ambiance */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center filter blur-sm scale-110"></div>
        <div className="absolute inset-0 bg-stone-900/60 mix-blend-multiply"></div>
      </div>

      {/* 2. Carte de Connexion */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20 animate-in fade-in zoom-in duration-500">
        
        {/* En-tête */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center w-12 h-12 bg-stone-900 rounded-xl text-yellow-500 mb-4 hover:scale-110 transition-transform shadow-lg">
            <Music2 size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Bon retour</h1>
          <p className="text-stone-500 mt-2 text-sm">Reprenez votre exploration musicale là où vous l'avez laissée.</p>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-3 rounded-lg mb-6 flex items-center gap-2 animate-pulse">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            {error}
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="group">
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1.5 ml-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400 group-focus-within:text-yellow-600 transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                required 
                className="w-full pl-10 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all font-medium text-stone-800 placeholder-stone-400"
                placeholder="nom@exemple.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="group">
            <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider">Mot de passe</label>
                <a href="#" className="text-xs text-yellow-600 hover:text-yellow-700 font-medium hover:underline">Oublié ?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400 group-focus-within:text-yellow-600 transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                required 
                className="w-full pl-10 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all font-medium text-stone-800 placeholder-stone-400"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-stone-900/20 disabled:opacity-70 flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20}/>
            ) : (
              <>
                Se connecter <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-100 text-center">
          <p className="text-stone-600 text-sm">
            Vous découvrez HeriTune ?{' '}
            <Link href="/register" className="text-yellow-600 font-bold hover:text-yellow-700 hover:underline transition">
              Créer un compte
            </Link>
          </p>
        </div>

      </div>
      
      <div className="absolute bottom-4 text-white/40 text-xs text-center w-full">
        © 2024 HeriTune - Préserver l'héritage.
      </div>
    </div>
  );
}