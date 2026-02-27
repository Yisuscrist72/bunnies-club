"use client";

import ProfileSection from "./ProfileSection";

interface ProfileBioProps {
  bio: string;
  isEditing: boolean;
  onBioChange: (newBio: string) => void;
}

export default function ProfileBio({ bio, isEditing, onBioChange }: ProfileBioProps) {
  return (
    <ProfileSection title="BIOGRAFÍA">
      {isEditing ? (
        <textarea 
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          className="w-full h-32 border-3 border-black p-4 rounded-2xl resize-none font-medium text-lg focus:outline-none focus:ring-2 focus:ring-v2k-pink-hot/30"
          placeholder="Cuéntanos algo sobre ti..."
        />
      ) : (
        <p className="text-gray-700 font-medium text-lg leading-relaxed italic">
          &quot;{bio || "Este conejo aún no ha escrito su biografía..."}&quot;
        </p>
      )}
    </ProfileSection>
  );
}
