"use client";

import { useAuth, type UserProfile } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Jersey from "@/components/atoms/texts/Jersey";
import { motion, AnimatePresence } from "framer-motion";
import Image from "@/components/atoms/Image";
import Cropper, { type Point, type Area } from "react-easy-crop";

const AVAILABLE_MEMBERS = ["MINJI", "HANNI", "DANIELLE", "HAERIN", "HYEIN"];
const SUGGESTED_SONGS = ["ATTENTION", "DITTO", "OMG", "SUPER SHY", "ETA", "HOW SWEET"];

export default function ProfilePage() {
  const { user, profile, loading, logout, updateUserProfile, addPoints } = useAuth();
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
            <button 
              type="button"
              onClick={() => isEditing && fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (isEditing && (e.key === 'Enter' || e.key === ' ')) {
                  fileInputRef.current?.click();
                }
              }}
              className={`w-32 h-32 md:w-44 md:h-44 rounded-full border-4 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-v2k-pink-soft relative ${isEditing ? "cursor-pointer hover:scale-105 transition-transform" : ""}`}
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
            
            <div className="bg-v2k-pink-hot/10 border-2 border-black px-4 py-1.5 rounded-full inline-block mt-2">
              <Jersey text={profile.rank} size="16|16" className="text-v2k-pink-hot font-bold" />
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
          <div className="flex flex-wrap gap-6 justify-center md:justify-start">
            {/* LOGRO: PERFIL COMPLETO */}
            <div className={`flex flex-col items-center gap-2 ${profile.hasBioBonus ? "opacity-100" : "opacity-20 grayscale"}`}>
              <div className="w-16 h-16 bg-yellow-100 border-2 border-black rounded-2xl flex items-center justify-center text-3xl shadow-[3px_3px_0px_#000]">
                ✨
              </div>
              <span className="text-[10px] font-black uppercase">Perfil Full</span>
            </div>

            {/* LOGRO: EXPLORADOR (BASED ON POINTS) */}
            <div className={`flex flex-col items-center gap-2 ${profile.points >= 100 ? "opacity-100" : "opacity-20 grayscale"}`}>
              <div className="w-16 h-16 bg-blue-100 border-2 border-black rounded-2xl flex items-center justify-center text-3xl shadow-[3px_3px_0px_#000]">
                🔍
              </div>
              <span className="text-[10px] font-black uppercase">Explorador</span>
            </div>

            {/* LOGRO: FAN TOTAL (BASED ON POINTS) */}
            <div className={`flex flex-col items-center gap-2 ${profile.points >= 500 ? "opacity-100" : "opacity-20 grayscale"}`}>
              <div className="w-16 h-16 bg-v2k-pink-soft border-2 border-black rounded-2xl flex items-center justify-center text-3xl shadow-[3px_3px_0px_#000]">
                💖
              </div>
              <span className="text-[10px] font-black uppercase">Fan Total</span>
            </div>

            {/* LOGRO: LEYENDA (BASED ON POINTS) */}
            <div className={`flex flex-col items-center gap-2 ${profile.points >= 5000 ? "opacity-100" : "opacity-20 grayscale"}`}>
              <div className="w-16 h-16 bg-purple-100 border-2 border-black rounded-2xl flex items-center justify-center text-3xl shadow-[3px_3px_0px_#000]">
                👑
              </div>
              <span className="text-[10px] font-black uppercase">Leyenda</span>
            </div>
          </div>
        </div>


        {/* GUÍA DE XP */}
        <div className="mb-12 border-[3px] border-black p-6 rounded-3xl bg-v2k-cyan-soft shadow-[4px_4px_0px_#000]">
          <Jersey text="CÓMO GANAR XP 🚀" size="20|24" className="mb-4 text-black" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { text: "Completar tu perfil", xp: "+100" },
              { text: "Crear photocards", xp: "+50" },
              { text: "Hacer Quizzes", xp: "+XP var." },
              { text: "Login diario", xp: "+20" },
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
