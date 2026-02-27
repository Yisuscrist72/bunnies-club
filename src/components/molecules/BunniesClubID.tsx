"use client";
import React from 'react';
import Jersey from '../atoms/texts/Jersey';
import SpaceText from '../atoms/texts/SpaceText';
import Image from '../atoms/Image';
import type { UserProfile } from '@/context/AuthContext';

interface BunniesClubIDProps {
  profile: UserProfile;
}

const BunniesClubID = React.forwardRef<HTMLDivElement, BunniesClubIDProps>(({ profile }, ref) => {
  const joinDate = profile.joinDate 
    ? new Date(profile.joinDate).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) 
    : '26/02/2026';
  const level = Math.floor((profile.points || 0) / 100) + 1;
  const isVerified = (profile.points || 0) >= 100 && profile.hasBioBonus;

  return (
    <div 
      ref={ref}
      className={`w-[450px] h-[280px] bg-white border-[5px] border-black rounded-4xl overflow-hidden relative shadow-[12px_12px_0px_#000] font-jersey shrink-0`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FF69B4 2.5px, transparent 2.5px)', backgroundSize: '24px 24px' }} />
      
      {/* Header */}
      <div className="bg-v2k-pink-hot border-b-[5px] border-black p-4 flex justify-between items-center relative z-10">
        <SpaceText text="BUNNIES CLUB OFFICIAL ID" size="20|24" className="text-white font-black tracking-tight" />
        <div className="bg-white border-2 border-black rounded-full px-3 py-1">
          <SpaceText text={`NO. ${profile.uid.slice(0, 8).toUpperCase()}`} size="12|12" className="font-black italic text-black" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex gap-6 relative z-10 h-[calc(100%-75px)]">
        {/* Photo Container */}
        <div className="w-32 h-32 border-[5px] border-black rounded-3xl overflow-hidden bg-v2k-gray-soft shadow-[6px_6px_0px_#000] shrink-0 mt-1 relative">
          {profile.photoURL ? (
            <Image src={profile.photoURL} alt={profile.displayName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">🐰</div>
          )}
        </div>

        {/* Info Container */}
        <div className="flex flex-col justify-between flex-1 py-1">
          <div>
            <Jersey text={profile.displayName} size="32|40" className="text-black mb-2 truncate drop-shadow-[2px_2px_0px_rgba(255,105,180,0.3)]" />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <SpaceText text="RANGO" size="12|12" className="bg-black text-white px-2 py-0.5 rounded-md font-black tracking-tighter" />
                <SpaceText text={profile.rank} size="16|16" className="text-v2k-pink-hot font-black uppercase leading-none" />
              </div>
              <div className="flex items-center gap-3">
                <SpaceText text="LEVEL" size="12|12" className="bg-black text-white px-2 py-0.5 rounded-md font-black tracking-tighter" />
                <SpaceText text={`${level} (${profile.points} XP)`} size="16|16" className="text-black font-black leading-none" />
              </div>
            </div>
          </div>

          <div className="mt-auto pt-3 border-t-[3px] border-black border-dashed">
            <div className="flex justify-between items-end">
              <div>
                <SpaceText text="MIEMBRO DESDE" size="12|12" className="font-black text-gray-400 uppercase tracking-tighter mb-0.5" />
                <SpaceText text={joinDate} size="14|14" className="font-black text-black" />
              </div>
              <div className="text-right">
                <SpaceText text="ESTADO" size="12|12" className="font-black text-gray-400 uppercase tracking-tighter mb-0.5" />
                {isVerified ? (
                  <SpaceText text="VERIFICADO ✅" size="12|12" className="font-black text-v2k-green-soft uppercase" />
                ) : (
                  <SpaceText text="PENDIENTE" size="12|12" className="font-black text-gray-400 uppercase italic" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Stickers */}
      <div className="absolute bottom-2 right-2 text-3xl opacity-20 rotate-12 pointer-events-none">✨</div>
      <div className="absolute top-16 right-4 text-2xl opacity-10 -rotate-12 pointer-events-none">🎀</div>
    </div>
  );
});

BunniesClubID.displayName = 'BunniesClubID';

export default BunniesClubID;
