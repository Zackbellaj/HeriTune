// src/app/components/FriendCard.tsx
export default function FriendCard({ name, country }: { name: string; country: string }) {
  return (
    <div className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-400">{country}</p>
      </div>
    </div>
  );
}