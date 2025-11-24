// src/app/components/Header.tsx
export default function Header() {
  return (
    <header className="p-3 sm:p-4 flex justify-between items-center bg-black border-b border-gray-800">
      <h1 className="text-xl sm:text-2xl font-bold text-green-500">HeriTune</h1>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <span className="text-sm hidden sm:inline">Awa</span>
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-600 flex items-center justify-center text-xs font-bold">
          A
        </div>
      </div>
    </header>
  );
}