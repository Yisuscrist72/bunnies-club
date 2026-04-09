"use client";

import { useAuth, type UserProfile } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import Jersey from "@/components/atoms/texts/Jersey";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import type { Area } from "react-easy-crop";
import Image from "next/image";
import { MEMBERS, type MemberKey } from "@/data/quiz-data";

// Componentes
import CropModal from "@/components/profile/CropModal";
import ProfileAvatar from "@/components/profile/ProfileAvatar";
import XpProgressBar from "@/components/profile/XpProgressBar";
import ProfileBio from "@/components/profile/ProfileBio";
import ProfileFavorites from "@/components/profile/ProfileFavorites";
import ProfileAchievements from "@/components/profile/ProfileAchievements";
import RecentActivity from "@/components/profile/RecentActivity";
import BunniesIDSection from "@/components/profile/BunniesIDSection";
import XPGuide from "@/components/profile/XPGuide";
import ProfileActions from "@/components/profile/ProfileActions";

export default function ProfilePage() {
  const { t } = useLanguage();
  const { user, profile, loading, logout, updateUserProfile, addPoints } =
    useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    favMembers: [] as string[],
    favSongs: [] as string[],
    photoURL: "",
  });

  const [imageToCrop, setImageToCrop] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    if (profile) {
      setFormData({
        displayName: profile.displayName || "",
        bio: profile.bio || "",
        favMembers: profile.favMembers || [],
        favSongs: profile.favSongs || [],
        photoURL: profile.photoURL || "",
      });
    }
  }, [user, loading, router, profile]);

  // FUNCIONES ESTABILIZADAS CON USECALLBACK
  const handleToggleMember = useCallback((member: string) => {
    setFormData((prev) => ({
      ...prev,
      favMembers: prev.favMembers.includes(member)
        ? prev.favMembers.filter((m) => m !== member)
        : [...prev.favMembers, member],
    }));
  }, []);

  const handleToggleSong = useCallback((song: string) => {
    setFormData((prev) => ({
      ...prev,
      favSongs: prev.favSongs.includes(song)
        ? prev.favSongs.filter((s) => s !== song)
        : [...prev.favSongs, song],
    }));
  }, []);

  const handleBioChange = useCallback((newBio: string) => {
    setFormData((prev) => ({ ...prev, bio: newBio }));
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImageToCrop(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [],
  );

  const handleCreateCroppedImage = useCallback(
    async (croppedAreaPixels: Area) => {
      if (!imageToCrop) return;
      try {
        const image = new window.Image();
        image.src = imageToCrop;
        await new Promise((resolve) => (image.onload = resolve));
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const size = 300;
        canvas.width = size;
        canvas.height = size;
        if (ctx) {
          ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            size,
            size,
          );
        }
        const base64Image = canvas.toDataURL("image/jpeg", 0.7);
        setFormData((prev) => ({ ...prev, photoURL: base64Image }));
        setImageToCrop(null);
      } catch (e) {
        console.error(e);
        alert(t.profile.crop_error);
      }
    },
    [imageToCrop, t.profile.crop_error],
  );

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const isComplete =
        formData.bio.trim().length > 10 && formData.favMembers.length > 0;
      const shouldAwardBonus = !profile?.hasBioBonus && isComplete;
      const dataToSave: Partial<UserProfile> = { ...formData };
      if (shouldAwardBonus) dataToSave.hasBioBonus = true;

      await updateUserProfile(dataToSave);
      if (shouldAwardBonus) await addPoints(100, t.profile.bonus_unlocked);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
      alert(t.profile.save_error);
    } finally {
      setIsSaving(false);
    }
  }, [formData, profile, updateUserProfile, addPoints, t.profile.bonus_unlocked, t.profile.save_error]);

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Jersey text={t.profile.loading} size="40|48" className="animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 md:py-24">
      <CropModal
        imageToCrop={imageToCrop}
        onClose={() => setImageToCrop(null)}
        onConfirm={handleCreateCroppedImage}
      />

      <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-4 border-black p-6 md:p-12 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-3xl w-full"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />

          <ProfileAvatar
            photoURL={formData.photoURL}
            displayName={profile.displayName}
            rank={profile.rank}
            isEditing={isEditing}
            hasBioBonus={profile.hasBioBonus}
            onEditClick={() => fileInputRef.current?.click()}
          />

          <div className="text-center md:text-left flex-1">
            {isEditing ? (
              <input
                type="text"
                value={formData.displayName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    displayName: e.target.value,
                  }))
                }
                className="w-full border-4 border-black p-3 rounded-xl font-jersey text-3xl mb-4 focus:outline-none focus:ring-2 focus:ring-v2k-pink-hot/30"
              />
            ) : (
              <Jersey
                tag="h1"
                text={profile.displayName}
                size="48|56"
                className="text-black drop-shadow-[2px_2px_0px_#FF69B4]"
              />
            )}

            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
              <div className="bg-v2k-pink-hot/10 border-2 border-black px-4 py-1.5 rounded-full inline-block">
                <Jersey
                  text={profile.rank}
                  size="16|16"
                  className="text-v2k-pink-hot font-bold"
                />
              </div>
              <div className="bg-orange-100 border-2 border-black px-4 py-1.5 rounded-full flex items-center gap-2 shadow-[2px_2px_0px_#000]">
                <span className="text-sm">🔥</span>
                <Jersey
                  text={`${profile.streak || 1} ${t.profile.days}`}
                  size="14|14"
                  className="text-orange-600 font-black"
                />
              </div>
            </div>
            <XpProgressBar points={profile.points || 0} />
          </div>
        </div>

        <div className="space-y-8 mb-12">
          <ProfileBio
            bio={isEditing ? formData.bio : profile.bio}
            isEditing={isEditing}
            onBioChange={handleBioChange}
          />

          {profile.quizPersona && (
            <div className="border-[3px] border-black p-6 md:p-8 rounded-4xl bg-pink-50 shadow-[4px_4px_0px_#000] mb-8 relative overflow-hidden group">
              {/* Background accent */}
              <div 
                className="absolute right-0 top-0 w-64 h-64 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity rounded-full pointer-events-none"
                style={{ backgroundColor: MEMBERS[profile.quizPersona as MemberKey]?.accent || '#FF69B4' }}
              />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
                <Jersey text={t.common.lang === "es" ? "🎭 RESULTADO DEL QUIZ" : "🎭 QUIZ MATCH"} size="20|24" />
                {profile.personaLastChanged && (
                  <div className="text-xs font-bold text-black flex items-center gap-1.5 bg-white border-2 border-black px-3 py-1 rounded-full shadow-[2px_2px_0px_#000]">
                    <span>⏳</span>
                    {Math.ceil(30 - (Date.now() - new Date(profile.personaLastChanged).getTime()) / (1000 * 60 * 60 * 24)) > 0 ? (
                      t.common.lang === "es" ? `Cambio en ${Math.ceil(30 - (Date.now() - new Date(profile.personaLastChanged).getTime()) / (1000 * 60 * 60 * 24))} días` : `Change in ${Math.ceil(30 - (Date.now() - new Date(profile.personaLastChanged).getTime()) / (1000 * 60 * 60 * 24))} days`
                    ) : (
                      <span className="text-v2k-green-deep">{t.common.lang === "es" ? "Cambio disponible" : "Change available"}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start relative z-10">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl border-4 border-black overflow-hidden shadow-[4px_4px_0px_#000] shrink-0 relative bg-white">
                  {MEMBERS[profile.quizPersona as MemberKey]?.image && (
                    <Image 
                      src={MEMBERS[profile.quizPersona as MemberKey].image}
                      alt={profile.quizPersona}
                      fill
                      sizes="(max-width: 768px) 128px, 160px"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2 w-8 h-8 bg-white border-2 border-black rounded-full flex items-center justify-center text-sm shadow-[2px_2px_0px_#000]">
                    {MEMBERS[profile.quizPersona as MemberKey]?.emoji || "🐰"}
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="inline-block px-3 py-1 bg-black text-white text-[10px] font-black tracking-widest uppercase mb-2">
                    {t.common.lang === "es" ? "TIPO DE PERSONA" : "PERSONA TYPE"}
                  </div>
                  <Jersey text={profile.quizPersona} size="32|40" className="text-black mb-1 leading-none" />
                  <p className="font-black text-sm text-black/60 uppercase tracking-widest mb-3">
                    {t.members[profile.quizPersona as MemberKey]?.tagline || ""}
                  </p>
                  <blockquote className="border-l-4 pl-4 py-1 text-left" style={{ borderColor: MEMBERS[profile.quizPersona as MemberKey]?.accent || '#000' }}>
                    <p className="font-bold text-sm leading-relaxed text-black/80 italic">
                      &ldquo;{t.members[profile.quizPersona as MemberKey]?.description || ""}&rdquo;
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          )}

          <ProfileFavorites
            favMembers={isEditing ? formData.favMembers : profile.favMembers}
            favSongs={isEditing ? formData.favSongs : profile.favSongs}
            isEditing={isEditing}
            onToggleMember={handleToggleMember}
            onToggleSong={handleToggleSong}
          />
        </div>

        <ProfileAchievements
          points={profile.points}
          hasBioBonus={profile.hasBioBonus}
        />
        <RecentActivity activities={profile.activities} />
        {!isEditing && <BunniesIDSection profile={profile} />}
        <XPGuide streak={profile.streak} />

        <ProfileActions
          isEditing={isEditing}
          isSaving={isSaving}
          onEditToggle={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
          onLogout={logout}
        />
      </motion.div>
    </div>
  );
}
