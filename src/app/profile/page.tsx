"use client";

import { useAuth, type UserProfile } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import { motion, AnimatePresence } from "framer-motion";
import Image from "@/components/atoms/Image";
import Cropper, { type Point, type Area } from "react-easy-crop";
import { domToPng } from "modern-screenshot";
import BunniesClubID from "@/components/molecules/BunniesClubID";

const AVAILABLE_MEMBERS = ["MINJI", "HANNI", "DANIELLE", "HAERIN", "HYEIN"];
const SUGGESTED_SONGS = ["ATTENTION", "DITTO", "OMG", "SUPER SHY", "ETA", "HOW SWEET"];

const RANK_FRAMES: Record<string, string> = {
  "Bunny Novato": "border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
  "Tokki Entusiasta 🐰": "border-blue-400 shadow-[4px_4px_0px_#60A5FA]",
  "Bunnies Fanatic 💖": "border-v2k-pink-hot shadow-[4px_4px_0px_#FF69B4]",
  "Super Shy Member ✨": "border-purple-400 shadow-[4px_4px_0px_#A855F7]",
  "Bunny Legend 👑": "border-yellow-400 shadow-[4px_4px_0px_#FACC15]",
  "CREADOR / CEO": "border-black shadow-[6px_6px_0px_#FF69B4]",
};

const AvatarDecorations = ({ rank }: { rank: string }) => {
  const isHighRank = rank.includes("Legend") || rank.includes("CEO") || rank.includes("Super Shy");
  const isFanatic = rank.includes("Fanatic");

  const earColor = rank.includes("Legend") ? "bg-yellow-400" : 
                   rank.includes("Fanatic") ? "bg-v2k-pink-hot" :
                   rank.includes("Super Shy") ? "bg-purple-400" :
                   rank.includes("CEO") ? "bg-v2k-pink-hot" : "bg-white";

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {(isHighRank || isFanatic) && (
        <>
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`absolute -top-12 left-[10%] w-10 h-20 ${earColor} border-4 border-black rounded-full -rotate-20 shadow-[4px_0_0_#000] z-[-1] flex items-center justify-center`}
          >
            <div className="w-4 h-12 bg-pink-100/50 rounded-full" />
          </motion.div>
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`absolute -top-12 right-[10%] w-10 h-20 ${earColor} border-4 border-black rounded-full rotate-20 shadow-[4px_0_0_#000] z-[-1] flex items-center justify-center`}
          >
            <div className="w-4 h-12 bg-pink-100/50 rounded-full" />
          </motion.div>
        </>
      )}
    </div>
  );
};

export default function ProfilePage() {
  const { user, profile, loading, logout, updateUserProfile, addPoints } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const idCardRef = useRef<HTMLDivElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    favMembers: [] as string[],
    favSongs: [] as string[],
    photoURL: "",
  });

  // ESTADOS PARA EL CROPPER
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

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
        photoURL: profile.photoURL || ""
      });
    }
  }, [user, loading, router, profile]);

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Jersey text="CARGANDO..." size="40|48" className="animate-pulse" />
      </div>
    );
  }

  const ALL_ACHIEVEMENTS = [
    {
      id: 'perfil',
      icon: '✨',
      name: 'Perfil Full',
      description: 'Completa tu biografía y selecciona tus miembros favoritos para desbloquear este logro.',
      requirement: profile.hasBioBonus,
      color: 'bg-yellow-100'
    },
    {
      id: 'explorador',
      icon: '🔍',
      name: 'Explorador',
      description: 'Consigue 100 puntos de XP explorando y participando en el club.',
      requirement: profile.points >= 100,
      color: 'bg-blue-100'
    },
    {
      id: 'fan',
      icon: '💖',
      name: 'Fan Total',
      description: 'Demuestra tu amor por NewJeans llegando a los 500 XP.',
      requirement: profile.points >= 500,
      color: 'bg-v2k-pink-soft'
    },
    {
      id: 'leyenda',
      icon: '👑',
      name: 'Leyenda',
      description: 'Conviértete en una leyenda viviente del club con 5000 XP.',
      requirement: profile.points >= 5000,
      color: 'bg-purple-100'
    }
  ];

  const handleToggleMember = (member: string) => {
    setFormData(prev => ({
      ...prev,
      favMembers: prev.favMembers.includes(member)
        ? prev.favMembers.filter(m => m !== member)
        : [...prev.favMembers, member]
    }));
  };

  const onCropComplete = (_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const createCroppedImage = async () => {
    if (!imageToCrop || !croppedAreaPixels) return;

    try {
      const image = new window.Image();
      image.src = imageToCrop;
      await new Promise((resolve) => (image.onload = resolve));

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const size = 300; // Tamaño final del avatar
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
          size
        );
      }

      const base64Image = canvas.toDataURL("image/jpeg", 0.7);
      setFormData(prev => ({ ...prev, photoURL: base64Image }));
      setImageToCrop(null);
    } catch (e) {
      console.error(e);
      alert("Error al recortar la imagen");
    }
  };

  const handleDownloadID = async () => {
    if (!idCardRef.current) return;
    try {
      const dataUrl = await domToPng(idCardRef.current, { scale: 3 });
      const link = document.createElement('a');
      link.download = `BunniesClub_ID_${profile.displayName.replace(/\s+/g, '_')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Error generating ID card:", err);
      alert("Error al generar el carnet de socio");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Bonus por completar perfil: se da si el usuario no lo ha recibido aún
      // y tiene bio y al menos un favorito
      const isComplete = formData.bio.trim().length > 10 && 
                        formData.favMembers.length > 0;
      
      const shouldAwardBonus = !profile?.hasBioBonus && isComplete;

      // Si corresponde el bonus, lo incluimos en la actualización del perfil
      const dataToSave: Partial<UserProfile> = { ...formData };
      if (shouldAwardBonus) {
        dataToSave.hasBioBonus = true;
      }

      await updateUserProfile(dataToSave);

      if (shouldAwardBonus) {
        console.log("Awarding profile completion bonus: +100 XP");
        await addPoints(100, "¡Perfil completado! 🐰✨");
      }

      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Error al guardar el perfil");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-16 md:py-24">
      {/* MODAL DE RECORTE */}
      <AnimatePresence>
        {imageToCrop && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <div className="bg-white border-4 border-black p-6 rounded-[2.5rem] max-w-lg w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Jersey text="AJUSTA TU FOTO" size="24|28" className="text-center mb-6" />
              
              <div className="relative h-64 md:h-80 bg-gray-200 border-2 border-dashed border-gray-400 rounded-2xl overflow-hidden mb-6">
                <Cropper
                  image={imageToCrop as string}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  cropShape="round"
                  showGrid={false}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>

              <div className="flex flex-col gap-4">
                <div className="px-4">
                    <p className="text-xs font-bold mb-2">ZOOM</p>
                    <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full"
                    />
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setImageToCrop(null)}
                    className="flex-1 bg-gray-100 border-[3px] border-black py-3 rounded-xl font-bold hover:bg-gray-200"
                  >
                    CANCELAR
                  </button>
                  <button
                    type="button"
                    onClick={createCroppedImage}
                    className="flex-1 bg-v2k-pink-hot text-white border-[3px] border-black py-3 rounded-xl font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    ACEPTAR
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-4 border-black p-6 md:p-12 rounded-[2.5rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-3xl w-full"
      >
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          {/* FOTO DE PERFIL */}
          <div className="relative group">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
            <div className="relative z-10">
              <AvatarDecorations rank={profile.rank} />
              <button 
                type="button"
                onClick={() => isEditing && fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if (isEditing && (e.key === 'Enter' || e.key === ' ')) {
                    fileInputRef.current?.click();
                  }
                }}
                className={`w-32 h-32 md:w-44 md:h-44 rounded-full border-4 overflow-hidden relative transition-all bg-v2k-pink-soft ${RANK_FRAMES[profile.rank] || RANK_FRAMES["Bunny Novato"]} ${isEditing ? "cursor-pointer hover:scale-105" : ""}`}
              >
                {formData.photoURL ? (
                  <Image 
                    src={formData.photoURL} 
                    alt={profile.displayName} 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Jersey text={profile.displayName[0]} size="68|94" />
                  </div>
                )}
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-bold text-xs md:text-sm text-center px-1">CAMBIAR FOTO</span>
                  </div>
                )}
              </button>
            </div>
            {profile.hasBioBonus && (
              <motion.div 
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: -15 }}
                className="absolute -top-1 -right-1 bg-yellow-400 border-[3px] border-black px-2 py-0.5 rounded-lg shadow-[3px_3px_0px_#000] z-20 pointer-events-none"
              >
                <span className="text-[10px] font-black text-black italic whitespace-nowrap">VERIFIED BUNNY</span>
              </motion.div>
            )}
          </div>
          
          <div className="text-center md:text-left flex-1">
            {isEditing ? (
              <input 
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({...formData, displayName: e.target.value})}
                className="w-full border-4 border-black p-3 rounded-xl font-jersey text-3xl mb-4"
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
                <Jersey text={profile.rank} size="16|16" className="text-v2k-pink-hot font-bold" />
              </div>
              
              {/* STREAK WIDGET */}
              <div className="bg-orange-100 border-2 border-black px-4 py-1.5 rounded-full flex items-center gap-2 shadow-[2px_2px_0px_#000]">
                <span className="text-sm">🔥</span>
                <Jersey text={`${profile.streak || 1} DÍAS`} size="14|14" className="text-orange-600 font-black" />
              </div>
            </div>

            {/* BARRA DE PROGRESO XP */}
            <div className="mt-6 max-w-xs mx-auto md:mx-0">
              <div className="flex justify-between items-end mb-2">
                <Jersey text={`XP: ${profile.points || 0}`} size="16|16" className="text-black" />
                <Jersey 
                  text={
                    (profile.points || 0) < 100 ? "PRÓXIMO: TOKKI" :
                    (profile.points || 0) < 500 ? "PRÓXIMO: FANATIC" :
                    (profile.points || 0) < 1500 ? "PRÓXIMO: SUPER SHY" :
                    (profile.points || 0) < 5000 ? "PRÓXIMO: LEGEND" : "NIVEL MÁXIMO"
                  } 
                  size="12|12" 
                  className="text-gray-500" 
                />
              </div>
              <div className="w-full h-4 bg-gray-200 border-2 border-black rounded-full overflow-hidden shadow-[2px_2px_0px_#000]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${Math.min(100, (
                      (profile.points || 0) < 100 ? (profile.points || 0) :
                      (profile.points || 0) < 500 ? ((profile.points - 100) / 4) :
                      (profile.points || 0) < 1500 ? ((profile.points - 500) / 10) :
                      (profile.points || 0) < 5000 ? ((profile.points - 1500) / 35) : 100
                    ))}%` 
                  }}
                  className="h-full bg-v2k-pink-hot"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BIO Y DETALLES */}
        <div className="space-y-8 mb-12">
          <div className="bg-gray-50 border-[3px] border-black p-6 rounded-3xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Jersey text="BIOGRAFÍA" size="20|24" className="mb-4 text-black underline decoration-v2k-pink-hot" />
            {isEditing ? (
              <textarea 
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full h-32 border-3 border-black p-4 rounded-2xl resize-none font-medium text-lg"
                placeholder="Cuéntanos algo sobre ti..."
              />
            ) : (
              <p className="text-gray-700 font-medium text-lg leading-relaxed italic">
                &quot;{profile.bio || "Este conejo aún no ha escrito su biografía..."}&quot;
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* FAVORITE MEMBERS */}
            <div className="border-[3px] border-black p-6 rounded-3xl bg-yellow-50">
              <Jersey text="FAV MEMBERS ✨" size="20|24" className="mb-4" />
              <div className="flex flex-wrap gap-2">
                {(isEditing ? AVAILABLE_MEMBERS : profile.favMembers).map(member => (
                  <button
                    type="button"
                    key={member}
                    disabled={!isEditing}
                    onClick={() => handleToggleMember(member)}
                    className={`px-3 py-1 rounded-full border-2 border-black font-bold text-sm transition-all ${
                      formData.favMembers.includes(member) 
                        ? "bg-v2k-pink-hot text-white shadow-[2px_2px_0px_#000]" 
                        : "bg-white text-black opacity-50"
                    } ${isEditing ? "hover:scale-105 active:scale-95" : "cursor-default opacity-100"}`}
                  >
                    {member}
                  </button>
                ))}
                {!isEditing && profile.favMembers.length === 0 && (
                  <p className="text-gray-400 text-sm">Ninguna seleccionada</p>
                )}
              </div>
            </div>

            {/* FAVORITE SONGS */}
            <div className="border-[3px] border-black p-6 rounded-3xl bg-blue-50">
              <Jersey text="CANCIONES TOP 🎵" size="20|24" className="mb-4" />
              <div className="flex flex-wrap gap-2">
                {(isEditing ? SUGGESTED_SONGS : profile.favSongs).map(song => (
                  <button
                    type="button"
                    key={song}
                    disabled={!isEditing}
                    onClick={() => {
                        setFormData(prev => ({
                            ...prev,
                            favSongs: prev.favSongs.includes(song)
                              ? prev.favSongs.filter(s => s !== song)
                              : [...prev.favSongs, song]
                          }));
                    }}
                    className={`px-3 py-1 rounded-full border-2 border-black font-bold text-sm transition-all ${
                      formData.favSongs.includes(song) 
                        ? "bg-v2k-blue-deep text-white shadow-[2px_2px_0px_#000]" 
                        : "bg-white text-black opacity-50"
                    } ${isEditing ? "hover:scale-105 active:scale-95" : "cursor-default opacity-100"}`}
                  >
                    {song}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* SECCIÓN DE LOGROS */}
        <div className="mb-12 border-[3px] border-black p-6 rounded-3xl bg-white shadow-[6px_6px_0px_#000]">
          <Jersey text="MIS LOGROS 🏆" size="20|24" className="mb-6 text-black underline decoration-v2k-pink-hot" />
          
          <div className="flex flex-wrap gap-6 justify-center md:justify-start mb-8">
            {ALL_ACHIEVEMENTS.map((ach) => (
              <motion.button
                key={ach.id}
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedAchievement(selectedAchievement === ach.id ? null : ach.id)}
                className={`flex flex-col items-center gap-2 transition-all ${ach.requirement ? "opacity-100" : "opacity-30 grayscale filter"}`}
              >
                <div className={`w-16 h-16 ${ach.color} border-2 border-black rounded-2xl flex items-center justify-center text-3xl shadow-[3px_3px_0px_#000] ${selectedAchievement === ach.id ? "ring-4 ring-v2k-pink-hot ring-offset-2" : ""}`}>
                  {ach.icon}
                </div>
                <span className="text-[10px] font-black uppercase">{ach.name}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {selectedAchievement && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 border-[3px] border-black rounded-2xl bg-v2k-gray-soft/10 relative">
                  <button 
                    type="button"
                    onClick={() => setSelectedAchievement(null)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-black"
                  >
                    ✕
                  </button>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">
                      {ALL_ACHIEVEMENTS.find(a => a.id === selectedAchievement)?.icon}
                    </div>
                    <div>
                      <SpaceText 
                        text={ALL_ACHIEVEMENTS.find(a => a.id === selectedAchievement)?.name || ""} 
                        size="16|16" 
                        className="font-black text-black uppercase" 
                      />
                      <SpaceText 
                        text={ALL_ACHIEVEMENTS.find(a => a.id === selectedAchievement)?.description || ""} 
                        size="14|14" 
                        className="text-gray-600 font-bold" 
                      />
                      <div className="mt-2 text-[10px] font-black uppercase text-v2k-pink-hot">
                        {ALL_ACHIEVEMENTS.find(a => a.id === selectedAchievement)?.requirement 
                          ? "✅ ¡DESBLOQUEADO!" 
                          : "� POR DESBLOQUEAR"}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* HISTORIAL DE ACTIVIDAD RECIENTE */}
        <div className="mb-12 border-[3px] border-black p-6 rounded-3xl bg-white shadow-[6px_6px_0px_#000]">
          <Jersey text="ACTIVIDAD RECIENTE 🕒" size="20|24" className="mb-6 text-black underline decoration-v2k-cyan-soft" />
          <div className="space-y-3">
            {profile.activities && profile.activities.length > 0 ? (
              profile.activities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex items-center justify-between p-3 border-2 border-black rounded-xl bg-v2k-gray-soft/10 hover:bg-v2k-cyan-soft/5 transition-colors"
                >
                  <div className="flex flex-col">
                    <SpaceText text={activity.text} size="14|14" className="font-bold text-black" />
                    <span className="text-[10px] text-gray-400 font-bold uppercase">
                      {new Date(activity.timestamp).toLocaleDateString('es-ES', { 
                        day: '2-digit', 
                        month: 'short', 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  {activity.points && (
                    <div className="bg-v2k-pink-hot text-white px-3 py-1 border-2 border-black rounded-full text-[10px] font-black shadow-[2px_2px_0px_#000]">
                      +{activity.points} XP
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-8 text-center border-2 border-dashed border-black/20 rounded-2xl bg-v2k-gray-soft/5">
                <SpaceText text="Aún no tienes actividad registrada. ¡Empieza a explorar el club!" size="14|14" className="text-gray-400 italic" />
              </div>
            )}
          </div>
        </div>
        
        {/* CARNET DE SOCIO (BUNNIES CLUB ID) */}
        {!isEditing && (
          <div className="mb-12 border-[3px] border-black p-4 md:p-6 rounded-3xl bg-v2k-pink-soft/30 shadow-[6px_6px_0px_#000] flex flex-col items-center gap-6 overflow-hidden">
            <Jersey text="TU CARNET DE BUNNY ID 🆔" size="20|24" className="text-black text-center" />
            
            <div className="w-full flex justify-center -my-8 sm:my-0">
              <div className="scale-[0.6] min-[400px]:scale-[0.75] sm:scale-95 md:scale-100 origin-center">
                <BunniesClubID profile={profile} ref={idCardRef} />
              </div>
            </div>

            <div className="w-full max-w-sm flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadID}
                className="w-full bg-v2k-accent border-[3px] border-black px-8 py-3 font-bold shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                <span>DESCARGAR PARA COMPARTIR</span>
                <span>📸</span>
              </button>
              
              {!profile.hasBioBonus || profile.points < 100 ? (
                <p className="text-[10px] font-bold text-gray-500 text-center uppercase">
                  ⚠️ Necesitas +100 XP y Perfil Completo para estar verificado
                </p>
              ) : null}
            </div>
          </div>
        )}

        {/* GUÍA DE XP */}
        <div className="mb-12 border-[3px] border-black p-6 rounded-3xl bg-v2k-cyan-soft shadow-[4px_4px_0px_#000]">
          <Jersey text="CÓMO GANAR XP 🚀" size="20|24" className="mb-4 text-black" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { text: "Completar tu perfil", xp: "+100" },
              { text: "Crear photocards", xp: "+50" },
              { text: "Hacer Quizzes", xp: "+XP var." },
              { text: "Login diario", xp: profile.streak && profile.streak >= 5 ? "+40 (x2 🔥)" : "+20" },
            ].map((item) => (
              <div key={item.text} className="flex justify-between items-center bg-white/50 border-2 border-black/10 px-4 py-2 rounded-xl">
                <span className="font-bold text-sm">{item.text}</span>
                <span className="bg-v2k-pink-hot text-white text-[10px] font-black px-2 py-1 rounded-lg">{item.xp} XP</span>
              </div>
            ))}
          </div>
        </div>

        {/* BOTONES DE ACCIÓN */}
        <div className="flex flex-col md:flex-row gap-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            disabled={isSaving}
            className={`flex-1 border-4 border-black py-4 rounded-2xl font-bold text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all ${
              isEditing 
                ? "bg-green-400 text-white" 
                : "bg-v2k-pink-hot text-white"
            }`}
          >
            {isSaving ? "GUARDANDO..." : isEditing ? "GUARDAR CAMBIOS" : "EDITAR PERFIL"}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#ef4444", color: "white" }}
            whileTap={{ scale: 0.98 }}
            onClick={isEditing ? () => setIsEditing(false) : logout}
            className="flex-1 bg-white text-red-500 border-4 border-black py-4 rounded-2xl font-bold text-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            {isEditing ? "CANCELAR" : "CERRAR SESIÓN"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
