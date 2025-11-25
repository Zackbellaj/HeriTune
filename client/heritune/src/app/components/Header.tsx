// src/app/components/Header.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Header({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // À implémenter selon votre auth
    console.log("Déconnexion");
    setDropdownOpen(false);
  };

  return (
    <header className="p-3 sm:p-4 flex justify-between items-center bg-[#c78d57] border-b border-[#A35912]">
      {/* Burger (mobile only) */}
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-[#FFE9CF] focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Logo */}
      <div className="h-8 w-auto">
        <Image
          src="/assets/icon.png"
          alt="HeriTune"
          width={120}
          height={32}
          priority
          className="h-full w-auto cursor-pointer"
          onClick={() => router.push("/")}
        />
      </div>

      {/* Menu utilisateur */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleProfileClick}
          className="flex items-center space-x-2 focus:outline-none"
          aria-label="Menu utilisateur"
        >
          <span className="text-sm text-[#FFE9CF] hidden sm:inline">Awa</span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#63BAAB] flex items-center justify-center text-xs font-bold text-white">
            A
          </div>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-[#DBA883] rounded-lg shadow-lg z-50 py-1">
            <div className="px-4 py-2 border-b border-[#DBA883]/30">
              <p className="font-medium text-[#A35912]">Awa</p>
              <p className="text-xs text-[#DBA883]">awa@example.com</p>
            </div>
            <button
              onClick={() => {
                router.push("/profile");
                setDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-[#A35912] hover:bg-[#FADBBB] transition"
            >
              Profil
            </button>
            <button
              onClick={() => {
                router.push("/settings");
                setDropdownOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-[#A35912] hover:bg-[#FADBBB] transition"
            >
              Paramètres
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-[#BE6815] hover:bg-[#FADBBB] transition"
            >
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </header>
  );
}