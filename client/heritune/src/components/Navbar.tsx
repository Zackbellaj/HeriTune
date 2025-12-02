'use client';
import { useState, useRef, useEffect } from 'react'; // Ajout des hooks
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Music2, Users, Upload, LogOut, Compass, ChevronDown, User as UserIcon, Settings } from 'lucide-react';
import { getAssetUrl } from '@/lib/api';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-900/80 backdrop-blur-md border-b border-white/10 text-white transition-all duration-300">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-yellow-600 to-yellow-400 p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <Music2 size={24} className="text-stone-900" />
          </div>
          <span className="text-xl font-bold tracking-tight">HeriTune</span>
        </Link>
        
        {/* Navigation */}
        <div className="flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:text-yellow-400 transition-colors">
            <Compass size={18}/> <span className="hidden md:inline">Découvrir</span>
          </Link>
          
          {user ? (
            <>
              <Link href="/matches" className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:text-yellow-400 transition-colors">
                <Users size={18}/> <span className="hidden md:inline">Rencontres</span>
              </Link>
              <Link href="/playlists" className="flex items-center gap-2 opacity-80 hover:opacity-100 hover:text-yellow-400 transition-colors">
                <Music2 size={18}/> <span className="hidden md:inline">Bibliothèque</span>
              </Link>
              
              <div className="h-6 w-px bg-white/20 mx-2 hidden md:block"></div>

              <div className="flex items-center gap-4">
                <Link href="/upload" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full flex items-center gap-2 transition-all">
                  <Upload size={16}/> <span className="hidden md:inline">Partager</span>
                </Link>
                
                {/* DROPDOWN MENU */}
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 pl-2 hover:opacity-80 transition"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-sm font-bold shadow-lg overflow-hidden border-2 border-transparent hover:border-white transition-all">
                      {user.avatar ? (
                        <img src={getAssetUrl(user.avatar)} alt="avatar" className="w-full h-full object-cover" />
                      ) : (
                        user.username.charAt(0).toUpperCase()
                      )}
                    </div>
                    <ChevronDown size={16} className={`text-stone-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}/>
                  </button>

                  {/* Le Menu Déroulant */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-stone-900 border border-white/10 rounded-xl shadow-2xl py-2 animate-in fade-in slide-in-from-top-2">
                        <div className="px-4 py-3 border-b border-white/10 mb-2">
                            <p className="text-sm font-bold text-white">{user.username}</p>
                            <p className="text-xs text-stone-400 truncate">{user.email}</p>
                        </div>
                        
                        <Link 
                            href="/profile" 
                            className="flex items-center gap-2 px-4 py-2 text-sm text-stone-300 hover:bg-white/10 hover:text-yellow-400 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            <UserIcon size={16}/> Mon Profil
                        </Link>
                        
                        <Link 
                            href="/profile" // On peut faire une page settings plus tard
                            className="flex items-center gap-2 px-4 py-2 text-sm text-stone-300 hover:bg-white/10 hover:text-yellow-400 transition-colors"
                            onClick={() => setIsDropdownOpen(false)}
                        >
                            <Settings size={16}/> Paramètres
                        </Link>
                        
                        <div className="border-t border-white/10 my-2"></div>
                        
                        <button 
                            onClick={logout}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
                        >
                            <LogOut size={16}/> Déconnexion
                        </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <Link href="/login" className="bg-yellow-500 text-stone-900 px-6 py-2.5 rounded-full font-bold hover:bg-yellow-400 shadow-lg shadow-yellow-500/20 transition-all">
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}