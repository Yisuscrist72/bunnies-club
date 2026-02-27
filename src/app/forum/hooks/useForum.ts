"use client";

import { useState, useEffect, useRef } from "react";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  deleteDoc,
  limit,
  type Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export interface ForumMessage {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userPhoto: string;
  timestamp: Timestamp | null;
}

export interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export function useForum() {
  const { user, profile, logout, addPoints, showSystemNotification } = useAuth();
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [pollOptions, setPollOptions] = useState<PollOption[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef("");

  // --- ESCRIBIR MENSAJES ---
  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!user) {
      showSystemNotification("Debes iniciar sesión con Google para escribir en el foro", "warning");
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
      
      await addPoints(10, "Mensaje enviado en el foro 💬");

      // Limpieza de mensajes antiguos
      const { getDocs, deleteDoc, doc: fireDoc } = await import("firebase/firestore");
      const q = query(collection(db, "forum_messages"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      
      if (snapshot.size > 100) {
        const toDelete = snapshot.docs.slice(100);
        const deletePromises = toDelete.map(d => deleteDoc(fireDoc(db, "forum_messages", d.id)));
        await Promise.all(deletePromises);
      }

    } catch (error) {
      console.error("Error sending message:", error);
      showSystemNotification("Error al enviar el mensaje", "error");
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
        showSystemNotification("Debes iniciar sesión para votar en la encuesta", "warning");
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
        voters: [...voters, user.uid]
      });

      setHasVoted(true);
      await addPoints(20, "Voto realizado en la encuesta 🗳️");
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  // --- EFECTOS ---
  useEffect(() => {
    const q = query(collection(db, "forum_messages"), orderBy("timestamp", "asc"), limit(50));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ForumMessage[];
      setMessages(msgs);
      setTimeout(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, 100);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const pollRef = doc(db, "polls", "weekly_poll");
    const unsubscribe = onSnapshot(pollRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setPollOptions(data.options || []);
        if (user && data.voters?.includes(user.uid)) setHasVoted(true);
      }
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!sessionRef.current) sessionRef.current = Math.random().toString(36).substring(7);
    const presenceRef = doc(db, "forum_presence", sessionRef.current);
    
    const updatePresence = async () => {
      try {
        await setDoc(presenceRef, { timestamp: serverTimestamp(), userId: user?.uid || "guest", lastActive: Date.now() }, { merge: true });
      } catch (e) { console.error("Presence error:", e); }
    };

    updatePresence();
    const interval = setInterval(updatePresence, 30000);

    const qPresence = query(collection(db, "forum_presence"));
    const unsubscribe = onSnapshot(qPresence, (snapshot) => {
      const now = Date.now();
      const active = snapshot.docs.filter(d => {
        const data = d.data();
        const lastActive = data.lastActive || 0;
        return (now - lastActive) < 90000;
      });
      setOnlineUsers(active.length || 1);
    });

    const handleUnload = () => { deleteDoc(presenceRef).catch(() => {}); };
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
    hasVoted,
    onlineUsers,
    scrollRef,
    handleSendMessage,
    handleKeyDown,
    handleVote,
    logout
  };
}
