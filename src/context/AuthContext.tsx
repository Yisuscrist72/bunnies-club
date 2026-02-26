"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  updateProfile as firebaseUpdateProfile,
  type User 
} from "firebase/auth";
import { doc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { auth, googleProvider, db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CREATOR_EMAILS = [
  "jesus.lopeztavio72@gmail.com",
  "contact.bunnies.dev@gmail.com"
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

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
      // No actualizamos photoURL en Auth porque Base64 es demasiado largo
      if (data.displayName) {
        await firebaseUpdateProfile(user, {
          displayName: data.displayName,
        });
      }

      // En Firestore sí guardamos todo, incluyendo la foto en Base64
      await updateDoc(userDocRef, data);
    } catch (error) {
      console.error("Error updating profile", error);
      throw error;
    }
  };

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

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, logout, updateUserProfile, uploadImage }}>
      {children}
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
