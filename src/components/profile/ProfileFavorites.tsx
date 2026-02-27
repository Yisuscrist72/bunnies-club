"use client";

import { memo } from "react";
import Jersey from "@/components/atoms/texts/Jersey";
import { AVAILABLE_MEMBERS, SUGGESTED_SONGS } from "./constants";

interface ProfileFavoritesProps {
  favMembers: string[];
  favSongs: string[];
  isEditing: boolean;
  onToggleMember: (member: string) => void;
  onToggleSong: (song: string) => void;
}

function ProfileFavorites({ 
  favMembers, 
  favSongs, 
  isEditing, 
  onToggleMember, 
  onToggleSong 
}: ProfileFavoritesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* FAVORITE MEMBERS */}
      <div className="border-[3px] border-black p-6 rounded-3xl bg-yellow-50 shadow-[4px_4px_0px_#000]">
        <Jersey text="FAV MEMBERS ✨" size="20|24" className="mb-4" />
        <div className="flex flex-wrap gap-2">
          {(isEditing ? AVAILABLE_MEMBERS : favMembers).map(member => (
            <button
              type="button"
              key={member}
              disabled={!isEditing}
              onClick={() => onToggleMember(member)}
              className={`px-3 py-1 rounded-full border-2 border-black font-bold text-sm transition-all ${
                favMembers.includes(member) 
                  ? "bg-v2k-pink-hot text-white shadow-[2px_2px_0px_#000]" 
                  : "bg-white text-black opacity-50"
              } ${isEditing ? "hover:scale-105 active:scale-95" : "cursor-default opacity-100"}`}
            >
              {member}
            </button>
          ))}
          {!isEditing && favMembers.length === 0 && (
            <p className="text-gray-400 text-sm">Ninguna seleccionada</p>
          )}
        </div>
      </div>

      {/* FAVORITE SONGS */}
      <div className="border-[3px] border-black p-6 rounded-3xl bg-blue-50 shadow-[4px_4px_0px_#000]">
        <Jersey text="CANCIONES TOP 🎵" size="20|24" className="mb-4" />
        <div className="flex flex-wrap gap-2">
          {(isEditing ? SUGGESTED_SONGS : favSongs).map(song => (
            <button
              type="button"
              key={song}
              disabled={!isEditing}
              onClick={() => onToggleSong(song)}
              className={`px-3 py-1 rounded-full border-2 border-black font-bold text-sm transition-all ${
                favSongs.includes(song) 
                  ? "bg-v2k-blue-deep text-white shadow-[2px_2px_0px_#000]" 
                  : "bg-white text-black opacity-50"
              } ${isEditing ? "hover:scale-105 active:scale-95" : "cursor-default opacity-100"}`}
            >
              {song}
            </button>
          ))}
          {!isEditing && favSongs.length === 0 && (
            <p className="text-gray-400 text-sm">Ninguna seleccionada</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ProfileFavorites);
