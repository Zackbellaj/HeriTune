// src/app/components/Player.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  return (
    <footer className="h-20 bg-amber-50 border-t border-[#DBA883]/30 flex items-center px-6">
      <div className="min-w-0 max-w-xs mr-4">
        {/* Image Track */}
        <div className=" flex items-center space-x-3">
          <div className="w-12 h-12 bg-[#FFE9CF] rounded">
            <Image
              src="/assets/track-images/chant-mandingue.jpeg"
              alt="Chant Mandingue"
              width={48}
              height={48}
              className="w-full h-full object-cover rounded"
            />
          </div>
          </div>
        <p className="font-semibold text-[#A35912] truncate">Chant Mandingue</p>
        <p className="text-[#DBA883] text-sm truncate">Tradition orale du Mandé</p>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-[#FADBBB]">
            <Image src="/assets/previous.png" alt="Précédent" width={20} height={20} />
          </button>
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-[#BE6815] hover:bg-[#A35912]"
            aria-label={isPlaying ? "Pause" : "Lecture"}
          >
            <Image
              src={isPlaying ? "/assets/pause.png" : "/assets/play-button.png"}
              alt={isPlaying ? "Pause" : "Lecture"}
              width={24}
              height={24}
            />
          </button>
          <button className="p-2 rounded-full hover:bg-[#FADBBB]">
            <Image src="/assets/next-button.png" alt="Suivant" width={20} height={20} />
          </button>
        </div>
      </div>
      <div>
        {/*volume icon */}
        <button className="p-2 rounded-full hover:bg-[#FADBBB]">
          <Image src="/assets/volume.png" alt="Volume" width={20} height={20} />
        </button>
      </div>
      <div className="hidden sm:flex items-center space-x-2 ml-4">
        <div className="w-20 h-1 bg-[#DBA883]/30 rounded-full">
          <div className="w-3/4 h-full bg-[#63BAAB] rounded-full"></div>
        </div>
      </div>

    </footer>
  );
}