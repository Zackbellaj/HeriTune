// src/app/components/Header.tsx
export default function Header() {
  return (
    <header className="p-3 sm:p-4 flex justify-between items-center bg-emerald-950 border-b border-emerald-800">
      <h1 className="text-xl sm:text-2xl font-bold text-emerald-300">HeriTune</h1>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <span className="text-sm text-stone-300 hidden sm:inline">Awa</span>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-600 flex items-center justify-center text-xs font-bold text-stone-50">
          A
        </div>
      </div>
    </header>
  );
}