// src/app/components/Player.tsx
export default function Player() {
  return (
    <footer className="h-16 sm:h-20 bg-gray-900 border-t border-gray-800 flex items-center px-3 sm:px-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded flex items-center justify-center text-sm sm:text-base">
        ▶️
      </div>
      <div className="ml-2 sm:ml-4 min-w-0 flex-1">
        <p className="font-semibold text-sm sm:text-base truncate">Chant Mandingue</p>
        <p className="text-xs text-gray-400 truncate">Tradition orale du Mandé</p>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="text-gray-400 hover:text-white text-sm sm:text-base">⏮️</button>
        <button className="text-white text-lg sm:text-xl">⏯️</button>
        <button className="text-gray-400 hover:text-white text-sm sm:text-base">⏭️</button>
      </div>

      {/* Progress bar only on medium+ screens */}
      <div className="hidden sm:flex sm:w-24 md:w-32 lg:w-40 h-1 bg-gray-600 rounded-full ml-4">
        <div className="w-1/3 h-full bg-white rounded-full"></div>
      </div>
    </footer>
  );
}