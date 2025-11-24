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

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-black p-4 flex flex-col h-full">
      <nav className="space-y-3 mb-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block text-sm sm:text-base font-medium transition ${
              pathname === item.href
                ? "text-green-500"
                : "text-white hover:text-green-500"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div>
        <h3 className="text-gray-400 text-xs sm:text-sm mb-2">Contacts culturels</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs sm:text-sm">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-600 flex items-center justify-center text-[0.6rem] font-bold">
              R
            </div>
            <span>Ravi (Inde)</span>
          </div>
        </div>
      </div>
    </aside>
  );
}