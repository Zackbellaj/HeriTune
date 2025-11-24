// src/app/messages/page.tsx
import Header from "@/app/components/Header";
import Sidebar from "@/app/components/Sidebar";
import Player from "@/app/components/Player";
import Link from "next/link";
import { contacts } from "../../data/mockData";

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-gray-900 to-black">
          <h1 className="text-2xl font-bold mb-6">Messages</h1>
          <div className="space-y-3">
            {contacts.map((contact) => (
              <Link
                key={contact.id}
                href={`/messages/${contact.id}`}
                className="block bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                      {contact.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{contact.name} ({contact.country})</p>
                      <p className="text-sm text-gray-400 truncate max-w-xs">{contact.lastMessage}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">{contact.time}</span>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
      <Player />
    </div>
  );
}