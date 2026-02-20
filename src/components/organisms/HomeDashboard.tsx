import React from 'react';
import Link from 'next/link';
import Jersey from '../atoms/texts/Jersey';
import Window from '../atoms/Window';
import MusicPlayer from '../molecules/MusicPlayer';

export default function HomeDashboard() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end mt-4">
      {/* COLUMNA 1: PHOTOCARD DECORATOR */}
      <div className="flex flex-col gap-2 items-center w-full">
        <Jersey tag="h2" text="PHOTOCARD DECORATOR" size="20|24" className="text-black font-bold drop-shadow-[1px_1px_0px_#FFF]" />
        <Link href="/decorator" className="w-full group">
          <div className="w-full bg-gradient-to-br from-[#C9E9F6] to-[#F4D8ED] border-[3px] border-black p-3 shadow-[6px_6px_0px_#000] group-hover:shadow-[4px_4px_0px_#000] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all cursor-pointer">
            <div className="bg-white border-[2px] border-black h-48 flex">
              <div className="w-1/2 border-r-[2px] border-black flex items-center justify-center bg-gray-100 relative">
                  <span className="text-4xl opacity-20">👤</span>
              </div>
              <div className="w-1/2 bg-[#f9f9f9] p-2 flex flex-col">
                <div className="text-[10px] font-bold border-b border-black mb-1 pb-1">Stickers</div>
                <div className="grid grid-cols-3 gap-1 flex-grow items-center justify-items-center text-xl">
                  {['🐰', '💖', '✨', '⭐', '🎀', '🎵'].map(s => <span key={s} className="cursor-default">{s}</span>)}
                </div>
                <div className="w-full text-xs font-bold border-[2px] border-black bg-[#CDE8FF] py-1 shadow-[2px_2px_0px_#000] text-center mt-auto">
                  IR AL EDITOR ➡️
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* COLUMNA 2: MUSIC PLAYER */}
      <div className="flex justify-center pb-4">
        <MusicPlayer />
      </div>

      {/* COLUMNA 3: FREEBIES ZONE */}
      <div className="flex flex-col gap-2 items-center w-full">
        <Jersey tag="h2" text="FREEBIES ZONE" size="20|24" className="text-black font-bold drop-shadow-[1px_1px_0px_#FFF]" />
        <Window title="C:\Freebies" className="w-full">
          <div className="flex justify-between px-4 py-6">
            {['Wallpapers', 'Icons', 'Schedules'].map((item) => (
              <div key={item} className="flex flex-col items-center gap-2 cursor-pointer group">
                <span className="text-5xl drop-shadow-[2px_2px_0px_#000] group-hover:scale-110 transition-transform">📁</span>
                <Jersey tag="span" text={item} size="18|22" className="text-black font-bold" />
              </div>
            ))}
          </div>
          <div className="px-4 pb-4">
            <button className="w-full border-[2px] border-black bg-white py-2 shadow-[3px_3px_0px_#000] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100">
              DOWNLOAD ALL ⬇️
            </button>
          </div>
        </Window>
      </div>
    </section>
  );
}