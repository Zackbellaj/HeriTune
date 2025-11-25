export default function FriendCard({ name, country }: { name: string; country: string }) {
  return (
    <div className="flex items-center space-x-3 p-2 hover:bg-slate-800 rounded cursor-pointer">
      <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center text-stone-50 font-bold">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-medium text-stone-50">{name}</p>
        <p className="text-sm text-stone-400">{country}</p>
      </div>
    </div>
  );
}