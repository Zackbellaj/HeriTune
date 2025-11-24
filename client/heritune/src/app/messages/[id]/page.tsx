// src/app/messages/[id]/page.tsx
import { contacts } from "../../../data/mockData";
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import Player from "@/app/components/Player";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ChatPage({ params }: { params: { id: string } }) {
  const contact = contacts.find(c => c.id === params.id);
  if (!contact) return notFound();

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 flex flex-col bg-gradient-to-b from-gray-900 to-black">
          {/* En-tête du chat */}
          <div className="p-4 border-b border-gray-800 flex items-center space-x-3">
            <Link href="/messages" className="md:hidden text-green-500">←</Link>
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
              {contact.avatar}
            </div>
            <div>
              <p className="font-semibold">{contact.name}</p>
              <p className="text-xs text-gray-400">{contact.country} • en ligne</p>
            </div>
          </div>

          {/* Zone de messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {contact.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs sm:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender === 'me'
                      ? 'bg-green-700 rounded-tr-none'
                      : 'bg-gray-800 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-green-200' : 'text-gray-400'} text-right`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Zone d’entrée (statique, non fonctionnelle) */}
          <div className="p-3 border-t border-gray-800">
            <div className="flex items-center bg-gray-800 rounded-full px-4 py-2">
              <input
                type="text"
                placeholder="Écrire un message…"
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
                disabled
              />
              <button className="text-gray-500 ml-2" disabled>
                ↵
              </button>
            </div>
          </div>
        </main>
      </div>
      <Player />
    </div>
  );
}