import React from 'react';
import Link from 'next/link';
import SpaceText from '../atoms/texts/SpaceText';
import Window from '../atoms/Window';
import MusicPlayer from '../molecules/MusicPlayer';

/**
 * Dashboard principal que organiza las funciones interactivas del sitio.
 * Utiliza un sistema de Grid responsivo (1 col móvil, 3 col desktop).
 */
export default function HomeDashboard() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end mt-4">
      
      {/* MÓDULO: EDITOR DE PHOTOCARDS */}
      <div className="flex flex-col gap-2 items-center w-full">
        <SpaceText tag="h2" text="PHOTOCARD DECORATOR" size="18|22" className="font-bold uppercase tracking-widest text-black" />
        <Link href="/decorator" className="w-full group">
          <div className="w-full bg-gradient-to-br from-v2k-blue to-v2k-pink y2k-card p-3 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-all">
            <div className="bg-white border border-black h-48 flex">
              <div className="w-1/2 border-r border-black flex items-center justify-center bg-gray-100 opacity-20 text-4xl">👤</div>
              <div className="w-1/2 bg-[#f9f9f9] p-2 flex flex-col">
                <SpaceText text="Stickers" size="10|12" className="font-bold border-b border-black mb-1 pb-1 uppercase" />
                <div className="grid grid-cols-3 gap-1 flex-grow items-center justify-items-center text-xl">
                  {['🐰', '💖', '✨', '⭐', '🎀', '🎵'].map(s => <span key={s}>{s}</span>)}
                </div>
                <div className="w-full border-2 border-black bg-v2k-accent py-1 shadow-[2px_2px_0px_var(--v2k-shadow)] text-center mt-auto">
                  <SpaceText tag="span" text="IR AL EDITOR ➡️" size="10|12" className="font-bold" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* MÓDULO: REPRODUCTOR DE MÚSICA */}
      <div className="flex justify-center pb-4">
        <MusicPlayer />
      </div>

      {/* MÓDULO: ZONA DE DESCARGAS (FREEBIES) */}
      <div className="flex flex-col gap-2 items-center w-full">
        <SpaceText tag="h2" text="FREEBIES ZONE" size="18|22" className="font-bold uppercase tracking-widest text-black" />
        <Window title="C:\Freebies" className="w-full y2k-window-shadow">
          <div className="flex justify-between px-4 py-6">
            {['Wallpapers', 'Icons', 'Schedules'].map((item) => (
              <div key={item} className="flex flex-col items-center gap-2 cursor-pointer group">
                <span className="text-5xl drop-shadow-[2px_2px_0px_var(--v2k-shadow)] group-hover:scale-110 transition-transform">📁</span>
                <SpaceText tag="span" text={item} size="14|16" className="font-bold text-black" />
              </div>
            ))}
          </div>
          <div className="px-4 pb-4">
            <button className="w-full border-2 border-black bg-white py-2 shadow-[3px_3px_0px_var(--v2k-shadow)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
              <SpaceText tag="span" text="DOWNLOAD ALL ⬇️" size="12|14" className="font-bold text-black" />
            </button>
          </div>
        </Window>
      </div>

    </section>
  );
}