"use client";

import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  type Timestamp,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { WEEKLY_POLLS } from "@/data/polls-data";

export interface ForumMessage {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userPhoto: string;
  imageUrl?: string;
  timestamp: Timestamp | null;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export function useForum() {
  const { t, language } = useLanguage();
  const { user, profile, logout, addPoints, showSystemNotification } =
    useAuth();
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [pollOptions, setPollOptions] = useState<PollOption[]>([]);
  const [pollQuestion, setPollQuestion] = useState("");
  const [hasVoted, setHasVoted] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [onlineUsers, setOnlineUsers] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef("");

  // --- ESCRIBIR MENSAJES ---
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!user) {
      showSystemNotification(
        t.forum.notifications.login_required_chat,
        "warning",
      );
      return;
    }

    if (!newMessage.trim()) return;

    const messageContent = newMessage.trim();
    setNewMessage("");

    try {
      await addDoc(collection(db, "forum_messages"), {
        text: messageContent,
        userId: user.uid,
        userName: profile?.displayName || user.displayName || "Bunny",
        userPhoto: profile?.photoURL || user.photoURL || "",
        timestamp: serverTimestamp(),
      });

      await addPoints(10, t.forum.notifications.message_sent);

      // Limpieza de mensajes antiguos
      const {
        getDocs,
        deleteDoc,
        doc: fireDoc,
      } = await import("firebase/firestore");
      const q = query(
        collection(db, "forum_messages"),
        orderBy("timestamp", "desc"),
      );
      const snapshot = await getDocs(q);

      if (snapshot.size > 100) {
        const toDelete = snapshot.docs.slice(100);
        const deletePromises = toDelete.map((d) =>
          deleteDoc(fireDoc(db, "forum_messages", d.id)),
        );
        await Promise.all(deletePromises);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      showSystemNotification(t.forum.notifications.error_send, "error");
    }
  };

  // --- SUBIR IMÁGENES (BASE64) ---
  const handleImageUpload = async (file: File) => {
    if (!user) return;
    
    setIsUploading(true);
    try {
      // Función para comprimir y convertir a Base64
      const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const MAX_WIDTH = 800; // Reducimos tamaño para Firestore (límite 1MB)
              const scaleSize = MAX_WIDTH / img.width;
              canvas.width = MAX_WIDTH;
              canvas.height = img.height * scaleSize;

              const ctx = canvas.getContext("2d");
              ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
              
              // Comprimimos a JPEG con calidad 0.6 para ahorrar espacio
              const base64 = canvas.toDataURL("image/jpeg", 0.6);
              resolve(base64);
            };
          };
          reader.onerror = (error) => reject(error);
        });
      };

      const base64Image = await compressImage(file);

      // Verificamos tamaño final (Firestore tiene límite de 1MB por documento)
      if (base64Image.length > 800000) {
        showSystemNotification("La imagen es demasiado pesada incluso comprimida.", "error");
        setIsUploading(false);
        return;
      }

      await addDoc(collection(db, "forum_messages"), {
        text: "",
        imageUrl: base64Image,
        userId: user.uid,
        userName: profile?.displayName || user.displayName || "Bunny",
        userPhoto: profile?.photoURL || user.photoURL || "",
        timestamp: serverTimestamp(),
      });

      await addPoints(15, "¡Imagen compartida!");
    } catch (error) {
      console.error("Upload error:", error);
      showSystemNotification("Error al procesar la imagen", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // --- VOTAR ---
  const handleVote = async (optionId: string) => {
    if (!user) {
      showSystemNotification(
        t.forum.notifications.login_required_vote,
        "warning",
      );
      return;
    }

    if (hasVoted) return;

    try {
      const pollRef = doc(db, "polls", "weekly_poll");
      const pollSnap = await getDoc(pollRef);

      if (!pollSnap.exists()) return;

      const data = pollSnap.data();
      const voters = data.voters || [];

      if (voters.includes(user.uid)) {
        setHasVoted(true);
        return;
      }

      const updatedOptions = (data.options || []).map((opt: PollOption) => {
        if (opt.id === optionId) {
          return { ...opt, votes: (opt.votes || 0) + 1 };
        }
        return opt;
      });

      await updateDoc(pollRef, {
        options: updatedOptions,
        voters: [...voters, user.uid],
      });

      setHasVoted(true);
      await addPoints(20, t.forum.notifications.vote_points);
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  // --- EFECTOS ---
  useEffect(() => {
    const q = query(
      collection(db, "forum_messages"),
      orderBy("timestamp", "asc"),
      limit(50),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ForumMessage[];
      setMessages(msgs);
      setTimeout(() => {
        if (scrollRef.current)
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 100);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const pollRef = doc(db, "polls", "weekly_poll");
    const unsubscribe = onSnapshot(pollRef, async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const now = Date.now();
        const resetAt = data.resetAt || 0;

        // Si ha pasado una semana, rotamos la encuesta
        if (now > resetAt) {
          const weekNumber = Math.floor(now / (7 * 24 * 60 * 60 * 1000));
          const nextPoll = WEEKLY_POLLS[weekNumber % WEEKLY_POLLS.length];
          
          const newResetAt = (Math.floor(now / (7 * 24 * 60 * 60 * 1000)) + 1) * (7 * 24 * 60 * 60 * 1000);

          await setDoc(pollRef, {
            pollId: nextPoll.id,
            questionEs: nextPoll.questionEs,
            questionEn: nextPoll.questionEn,
            options: nextPoll.optionsEs.map(opt => ({
              id: opt.toLowerCase().replace(/\s+/g, '_'),
              label: opt,
              votes: 0
            })),
            voters: [],
            resetAt: newResetAt
          });
          return;
        }

        setPollOptions(data.options || []);
        setPollQuestion(language === "es" ? data.questionEs : data.questionEn);
        if (user && data.voters?.includes(user.uid)) setHasVoted(true);

        // Timer Update
        const updateTimer = () => {
          const diff = resetAt - Date.now();
          if (diff <= 0) {
            setTimeLeft("00:00:00");
            return;
          }
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const mins = Math.floor((diff / (1000 * 60)) % 60);
          setTimeLeft(`${days}d ${hours}h ${mins}m`);
        };
        updateTimer();
        const interval = setInterval(updateTimer, 60000);
        return () => clearInterval(interval);
      } else {
        // Inicializar por primera vez si no existe
        const now = Date.now();
        const nextPoll = WEEKLY_POLLS[0];
        const newResetAt = (Math.floor(now / (7 * 24 * 60 * 60 * 1000)) + 1) * (7 * 24 * 60 * 60 * 1000);
        await setDoc(pollRef, {
          pollId: nextPoll.id,
          questionEs: nextPoll.questionEs,
          questionEn: nextPoll.questionEn,
          options: nextPoll.optionsEs.map(opt => ({
            id: opt.toLowerCase().replace(/\s+/g, '_'),
            label: opt,
            votes: 0
          })),
          voters: [],
          resetAt: newResetAt
        });
      }
    });
    return () => unsubscribe();
  }, [user, language]);

  useEffect(() => {
    if (!sessionRef.current)
      sessionRef.current = Math.random().toString(36).substring(7);
    const presenceRef = doc(db, "forum_presence", sessionRef.current);

    const updatePresence = async () => {
      try {
        await setDoc(
          presenceRef,
          {
            timestamp: serverTimestamp(),
            userId: user?.uid || "guest",
            lastActive: Date.now(),
          },
          { merge: true },
        );
      } catch (e) {
        console.error("Presence error:", e);
      }
    };

    updatePresence();
    const interval = setInterval(updatePresence, 30000);

    const qPresence = query(collection(db, "forum_presence"));
    const unsubscribe = onSnapshot(qPresence, (snapshot) => {
      const now = Date.now();
      const active = snapshot.docs.filter((d) => {
        const data = d.data();
        const lastActive = data.lastActive || 0;
        return now - lastActive < 90000;
      });
      setOnlineUsers(active.length || 1);
    });

    const handleUnload = () => {
      deleteDoc(presenceRef).catch(() => {});
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      clearInterval(interval);
      unsubscribe();
      window.removeEventListener("beforeunload", handleUnload);
      deleteDoc(presenceRef).catch(() => {});
    };
  }, [user]);

  return {
    user,
    messages,
    newMessage,
    setNewMessage,
    pollOptions,
    pollQuestion,
    hasVoted,
    timeLeft,
    isUploading,
    onlineUsers,
    scrollRef,
    handleSendMessage,
    handleKeyDown,
    handleVote,
    handleImageUpload,
    logout,
  };
}
