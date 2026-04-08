"use client";

import ProfileSection from "./ProfileSection";
import { useLanguage } from "@/context/LanguageContext";

interface ProfileBioProps {
  bio: string;
  isEditing: boolean;
  onBioChange: (newBio: string) => void;
}

export default function ProfileBio({
  bio,
  isEditing,
  onBioChange,
}: ProfileBioProps) {
  const { t } = useLanguage();
  return (
    <ProfileSection title={t.profile.biography}>
      {isEditing ? (
        <textarea
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          className="w-full h-32 border-3 border-black p-4 rounded-2xl resize-none font-medium text-lg focus:outline-none focus:ring-2 focus:ring-v2k-pink-hot/30"
          placeholder={t.profile.bio_placeholder}
        />
      ) : (
        <p className="text-gray-700 font-medium text-lg leading-relaxed italic">
          &quot;{bio || t.profile.no_bio}&quot;
        </p>
      )}
    </ProfileSection>
  );
}
