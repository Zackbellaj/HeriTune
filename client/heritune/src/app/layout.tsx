import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { PlayerProvider } from '@/context/PlayerContext';
import Navbar from '@/components/Navbar';
import AudioPlayer from '@/components/AudioPlayer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HeriTune - Trésors Musicaux',
  description: 'Découverte et rencontres autour des traditions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-[#fdfaf5] text-stone-800 min-h-screen pb-24`}>
        <AuthProvider>
          <PlayerProvider>
            <Navbar />
            <main className="container mx-auto p-4 md:p-6">
              {children}
            </main>
            <AudioPlayer />
          </PlayerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}