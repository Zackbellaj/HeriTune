// src/app/messages/page.tsx
import AppLayout from "@/app/components/AppLayout";
import Link from "next/link";
import { contacts } from "../../data/mockData";

export default function MessagesPage() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">Messages</h1>
      <div className="space-y-3">
        {contacts.map((contact) => (
          <Link
            key={contact.id}
            href={`/messages/${contact.id}`}
            className="block bg-white p-4 rounded-lg border border-[#DBA883] hover:bg-[#FADBBB] transition shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#63BAAB] flex items-center justify-center text-white font-bold">
                  {contact.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[#A35912]">
                    {contact.name} ({contact.country})
                  </p>
                  <p className="text-sm text-[#DBA883] truncate max-w-xs">
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
              <span className="text-xs text-[#DBA883] whitespace-nowrap">{contact.time}</span>
            </div>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}