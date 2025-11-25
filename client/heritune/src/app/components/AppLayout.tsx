// src/app/components/AppLayout.tsx
"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Player from "./Player";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-amber-50 text-[#A35912] overflow-hidden">
      <Header onToggleSidebar={() => setSidebarOpen(true)} />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="w-60 h-full bg-[#A35912] text-[#FFE9CF] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>

      <Player />
    </div>
  );
}