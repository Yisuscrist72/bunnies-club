"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  updateProfile as firebaseUpdateProfile,
  type User 
} from "firebase/auth";
import { doc, setDoc, updateDoc, onSnapshot, getDoc } from "firebase/firestore";
import { auth, googleProvider, db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import XpNotification from "@/components/molecules/XpNotification";
import SystemNotification from "@/components/molecules/SystemNotification";

export interface Activity {
  id: string;
  text: string;
  timestamp: string;
  points?: number;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  photoURL: string;
  email: string;
  bio: string;
  favMembers: string[];
  favSongs: string[];
  rank: string;
  points: number;
  lastLogin?: string;
  joinDate?: string;
  streak?: number;
  hasBioBonus?: boolean;
  activities?: Activity[];
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  addPoints: (amount: number, message?: string) => Promise<void>;
  showSystemNotification: (message: string, type?: "success" | "error" | "info" | "warning") => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CREATOR_EMAILS = [
  "jesus.lopeztavio72@gmail.com",
  "contact.bunnies.dev@gmail.com"
];

const getRankByPoints = (points: number, email: string): string => {
  if (CREATOR_EMAILS.includes(email)) return "CREADOR / CEO";
  if (points >= 5000) return "Bunny Legend 👑";
  if (points >= 1500) return "Super Shy Member ✨";
  if (points >= 500) return "Bunnies Fanatic 💖";
  if (points >= 100) return "Tokki Entusiasta 🐰";
  return "Bunny Novato";
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{ amount: number; message?: string } | null>(null);
  const [systemNotification, setSystemNotification] = useState<{ message: string; type: "success" | "error" | "info" | "warning" } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Suscribirse a cambios en el perfil de Firestore
        const userDocRef = doc(db, "users", firebaseUser.uid);
        
        const unsubProfile = onSnapshot(userDocRef, async (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            // Si el documento no existe, lo creamos
            const newProfile: UserProfile = {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName || "Bunny",
              photoURL: firebaseUser.photoURL || "",
              email: firebaseUser.email || "",
              bio: "¡Hola! Soy un nuevo miembro del Bunnies Club.",
              favMembers: [],
              favSongs: [],
              rank: CREATOR_EMAILS.includes(firebaseUser.email || "") ? "CREADOR / CEO" : "Bunny Novato",
              points: 0,
              streak: 1,
              joinDate: new Date().toISOString(),
            };
            await setDoc(userDocRef, newProfile);
            setProfile(newProfile);
          }
        });

        setLoading(false);
        return () => unsubProfile();
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
      
      // Actualizar en Firebase Auth solo el nombre
      if (data.displayName) {
        await firebaseUpdateProfile(user, {
          displayName: data.displayName,
        });
      }

      // En Firestore sí guardamos todo
      await updateDoc(userDocRef, data);
    } catch (error) {
      console.error("Error updating profile", error);
      throw error;
    }
  };

  const addPoints = useCallback(async (amount: number, message?: string) => {
    if (!user) return;
    
    try {
      const userDocRef = doc(db, "users", user.uid);
      
      // Obtenemos los datos más recientes para evitar desfases
      const docSnap = await getDoc(userDocRef);
      if (!docSnap.exists()) return;
      
      const currentProfile = docSnap.data() as UserProfile;
      const newPoints = (currentProfile.points || 0) + amount;
      const newRank = getRankByPoints(newPoints, user.email || "");
      
      const currentActivities = currentProfile.activities || [];
      const newActivity: Activity = {
        id: crypto.randomUUID(),
        text: message || "Puntos obtenidos",
        timestamp: new Date().toISOString(),
        points: amount
      };

      await updateDoc(userDocRef, {
        points: newPoints,
        rank: newRank,
        lastLogin: new Date().toISOString(),
        activities: [newActivity, ...currentActivities].slice(0, 10)
      });

      // Mostrar notificación visual
      setNotification({ amount, message });
    } catch (error) {
      console.error("Error adding points:", error);
    }
  }, [user]); // Quitamos profile de dependencias ya que usamos getDoc

  // Lógica de Login Diario
  useEffect(() => {
    if (user && profile) {
      const today = new Date().toISOString().split("T")[0];
      const lastLogin = profile.lastLogin?.split("T")[0];
      
      if (lastLogin !== today) {
        setTimeout(async () => {
          // Calcular nueva racha
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split("T")[0];
          
          const newStreak = lastLogin === yesterdayStr ? (profile.streak || 0) + 1 : 1;
          const xpBonus = newStreak >= 5 ? 40 : 20;
          const msg = newStreak >= 5 ? `¡Racha de ${newStreak} días! 🔥 +${xpBonus} XP` : "Bonus por login diario 🐰";
          
          await addPoints(xpBonus, msg);
          
          // Actualizamos la racha en el documento
          const userDocRef = doc(db, "users", user.uid);
          await updateDoc(userDocRef, { streak: newStreak });
        }, 1000);
        console.log("Processing daily login and streak...");
      }
    }
  }, [user, profile, addPoints]); // Usamos profile completo para simplicidad y cumplir linting

  const uploadImage = async (file: File) => {
    if (!user) throw new Error("Debes estar autenticado para subir imágenes");
    
    try {
      const storageRef = ref(storage, `avatars/${user.uid}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error al subir imagen:", error);
      throw error;
    }
  };

  const showSystemNotification = useCallback((message: string, type: "success" | "error" | "info" | "warning" = "success") => {
    setSystemNotification({ message, type });
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, logout, updateUserProfile, uploadImage, addPoints, showSystemNotification }}>
      {children}
      {notification && (
        <XpNotification 
          amount={notification.amount} 
          message={notification.message} 
          onComplete={() => setNotification(null)}
        />
      )}
      {systemNotification && (
        <SystemNotification
          message={systemNotification.message}
          type={systemNotification.type}
          onComplete={() => setSystemNotification(null)}
        />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
