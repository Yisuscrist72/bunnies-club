import React from 'react';
import SpaceText from '../atoms/texts/SpaceText';
import Window from '../atoms/Window';

export default function FreebiesZone() {
  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <SpaceText tag="h2" text="FREEBIES ZONE" size="18|22" className="font-bold uppercase tracking-widest text-black" />
      <Window title="C:\Freebies" className="w-full y2k-window-shadow">
        <div className="flex justify-between px-4 py-6">
          {['Wallpapers', 'Icons', 'Schedules'].map((item) => (
            <div key={item} className="flex flex-col items-center gap-2 cursor-pointer group">
              <span className="text-5xl drop-shadow-[2px_2px_0px_var(--v2k-shadow)] group-hover:scale-110 transition-transform">📁</span>
              <SpaceText tag="span" text={item} size="16|16" className="font-bold text-black" />
            </div>
          ))}
        </div>
        <div className="px-4 pb-4">
          <button className="w-full border-2 border-black bg-white py-2 shadow-[3px_3px_0px_var(--v2k-shadow)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all">
            <SpaceText tag="span" text="DOWNLOAD ALL ⬇️" size="16|16" className="font-bold text-black" />
          </button>
        </div>
      </Window>
    </div>
  );
}