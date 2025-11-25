// src/app/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Accueil", href: "/" },
  { name: "Découvertes", href: "/discover" },
  { name: "Mes enregistrements", href: "/my-recordings" },
  { name: "Messages", href: "/messages" },
  { name: "Playlists", href: "/playlist" },
];

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full p-4 bg-[#c78d57]">
      <nav className="space-y-3 mb-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`block text-sm font-medium ${
              pathname === item.href
                ? "text-[#63BAAB]"
                : "text-[#FFE9CF] hover:text-[#DBA883]"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div>
        <h3 className="text-[#DBA883] text-xs mb-2">Contacts culturels</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-6 h-6 rounded-full bg-[#63BAAB] flex items-center justify-center text-[0.6rem] font-bold text-white">
              R
            </div>
            <span className="text-amber-50">Ravi (Inde)</span>
          </div>
        </div>
      </div>
    </div>
  );
}