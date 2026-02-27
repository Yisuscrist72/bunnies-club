"use client";

import { useEffect, useState, useRef } from "react";
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
  limit,
  type Timestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Window from "@/components/molecules/Window";
import MusicPlayer from "@/components/molecules/MusicPlayer";
import { motion } from "framer-motion";
import { Send, LogOut, User as UserIcon, CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface ForumMessage {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userPhoto: string;
  timestamp: Timestamp | null;
}

interface PollOption {
  id: string;
  label: string;
  votes: number;
}

export default function ForumPage() {
  const { user, profile, logout, addPoints, showSystemNotification } = useAuth();
  const [messages, setMessages] = useState<ForumMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [pollOptions, setPollOptions] = useState<PollOption[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Cargar Mensajes del Guestbook
  useEffect(() => {
    const q = query(
      collection(db, "forum_messages"),
      orderBy("timestamp", "asc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ForumMessage[];
      setMessages(msgs);
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 100);
    });

    return () => unsubscribe();
  }, []);

  // Cargar Poll de la Semana
  useEffect(() => {
    const pollRef = doc(db, "polls", "weekly_poll");
    
    const unsubscribe = onSnapshot(pollRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        setPollOptions(data.options || []);
        if (user && data.voters?.includes(user.uid)) {
          setHasVoted(true);
        }
      } else {
        // Inicializar poll si no existe
        const initialOptions = [
          { id: "ditto", label: "Ditto", votes: 0 },
          { id: "omg", label: "OMG", votes: 0 },
          { id: "hypeboy", label: "Hype Boy", votes: 0 },
          { id: "eta", label: "ETA", votes: 0 },
          { id: "supershy", label: "Super Shy", votes: 0 },
        ];
        setDoc(pollRef, { 
          question: "¿Cuál es tu canción fav. Newjeans?",
          options: initialOptions,
          voters: []
        });
        setPollOptions(initialOptions);
      }
    });

    return () => unsubscribe();
  }, [user]);

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
      // 1. Enviar el nuevo mensaje
      await addDoc(collection(db, "forum_messages"), {
        text: messageContent,
        userId: user.uid,
        userName: profile?.displayName || user.displayName || "Bunny",
        userPhoto: profile?.photoURL || user.photoURL || "",
        timestamp: serverTimestamp(),
      });
      
      // 2. Bonus por participar
      await addPoints(10, "Mensaje enviado en el foro 💬");

      // 3. Sistema de limpieza (Firestore client side)
      // Buscamos si hay más de 100 mensajes para borrar el excedente
      const { getDocs, deleteDoc, doc: fireDoc } = await import("firebase/firestore");
      const q = query(collection(db, "forum_messages"), orderBy("timestamp", "desc"));
      const snapshot = await getDocs(q);
      
      if (snapshot.size > 100) {
        // Borramos del 101 en adelante (los más antiguos)
        const toDelete = snapshot.docs.slice(100);
        const deletePromises = toDelete.map(d => deleteDoc(fireDoc(db, "forum_messages", d.id)));
        await Promise.all(deletePromises);
        console.log(`🧹 Limpieza: ${toDelete.length} mensajes antiguos eliminados.`);
      }

    } catch (error) {
      console.error("Error sending message:", error);
      showSystemNotification("Error al enviar el mensaje", "error");
    }
  };

  // Manejar envío con Enter (y saltos con Shift+Enter)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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

  return (
    <div className="relative min-h-screen py-12 px-4 md:px-8 overflow-x-hidden">
      {/* Fondo de Cuadrícula Retro */}
      <div 
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #80c8f0 1.5px, transparent 1.5px),
            linear-gradient(to bottom, #80c8f0 1.5px, transparent 1.5px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center pt-8">
        {/* Header Principal */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <Jersey text="BUNNIES CLUB" size="44|80" className="text-black drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]" />
          <SpaceText text="- FAN COMMUNITY -" size="18|22" className="font-bold tracking-[0.2em] text-black/60" />
        </motion.div>

        {/* Layout de 3 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
          
          {/* COLUMNA IZQUIERDA: MUSIC PLAYER */}
          <div className="lg:col-span-3 flex flex-col gap-4">
             <MusicPlayer />
             <div className="bg-white/50 backdrop-blur-sm border-[3px] border-black p-4 shadow-[4px_4px_0px_#000] flex flex-col items-center gap-2">
                <Image src="/images/bunny-logo.avif" alt="Bunny" width={60} height={60} className="animate-bounce" />
                <SpaceText text="¡DISFRUTA DE LA MÚSICA MIENTRAS HABLAS!" size="12|12" className="text-center font-black" />
             </div>
          </div>

          {/* COLUMNA CENTRAL: GUESTBOOK */}
          <div className="lg:col-span-6">
            <Window 
              title="🐰 BUNNY GUESTBOOK" 
              className="w-full border-4"
              contentClassName="p-0 flex flex-col h-[600px]"
            >
              {/* Message Area */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar bg-[rgba(201,233,246,0.1)] pt-6"
              >
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full opacity-30 gap-4">
                    <span className="text-6xl text-black">💭</span>
                    <SpaceText text="SE EL PRIMERO EN ESCRIBIR..." size="12|12" className="font-bold" />
                  </div>
                ) : (
                  messages.map((msg) => (
                    <motion.div 
                      key={msg.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex gap-3 ${msg.userId === user?.uid ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className="w-10 h-10 border-2 border-black overflow-hidden bg-white shrink-0 shadow-[2px_2px_0px_#000] relative">
                        {msg.userPhoto ? (
                          <Image src={msg.userPhoto} alt={msg.userName} fill className="object-cover" sizes="40px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <UserIcon size={20} />
                          </div>
                        )}
                      </div>
                      <div className={`flex flex-col max-w-[80%] ${msg.userId === user?.uid ? "items-end" : "items-start"}`}>
                        <span className="text-[10px] font-black opacity-50 uppercase mb-1">{msg.userName}</span>
                        <div className={`
                          p-3 border-2 border-black shadow-[3px_3px_0px_#000]
                          ${msg.userId === user?.uid ? "bg-v2k-pink" : "bg-white"}
                        `}>
                          <p className="text-sm font-bold text-black leading-tight break-all whitespace-pre-wrap">
                              {msg.text}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t-[3px] border-black bg-white">
                <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
                  <textarea 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu mensaje aquí..."
                    rows={1}
                    className="flex-1 bg-gray-50 border-2 border-black px-4 py-2 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-v2k-accent resize-none min-h-[42px] max-h-[120px] no-scrollbar"
                  />
                  <button 
                    type="submit"
                    className="bg-v2k-yellow border-2 border-black p-2 shadow-[2px_2px_0px_#000] active:shadow-none active:translate-y-0.5 transition-all h-[42px] w-[42px] shrink-0 flex items-center justify-center"
                  >
                    <Send size={20} />
                  </button>
                  {user && (
                    <button 
                      type="button"
                      onClick={logout}
                      className="bg-v2k-red-soft border-2 border-black p-2 shadow-[2px_2px_0px_#000] active:shadow-none active:translate-y-0.5 transition-all text-black h-[42px] w-[42px] shrink-0 flex items-center justify-center"
                    >
                      <LogOut size={20} />
                    </button>
                  )}
                </form>
              </div>
            </Window>
          </div>

          {/* COLUMNA DERECHA: WEEKLY POLL */}
          <div className="lg:col-span-3">
            <Window title="✨ WEEKLY POLL" className="w-full border-[3px]">
              <div className="flex flex-col gap-4 p-2 text-center">
                <SpaceText text="¿Cuál es tu canción fav. Newjeans?" size="16|16" className="font-black mb-2" />
                
                <div className="flex flex-col gap-2">
                  {pollOptions.map((opt) => {
                    const totalVotes = pollOptions.reduce((acc, curr) => acc + (curr.votes || 0), 0);
                    const percentage = totalVotes > 0 ? Math.round(((opt.votes || 0) / totalVotes) * 100) : 0;
                    
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleVote(opt.id)}
                        disabled={hasVoted}
                        className={`
                          relative overflow-hidden w-full p-3 border-2 border-black text-left transition-all
                          ${hasVoted ? "bg-white" : "hover:bg-v2k-accent bg-white shadow-[3px_3px_0px_#000] active:translate-y-0.5 active:shadow-none"}
                          disabled:cursor-default
                        `}
                      >
                        {/* Progress Bar Background */}
                        {hasVoted && (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            className="absolute inset-0 bg-v2k-accent/30 pointer-events-none"
                          />
                        )}
                        
                        <div className="relative z-10 flex justify-between items-center group">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-full border-2 border-black flex items-center justify-center bg-white ${hasVoted && "border-v2k-accent"}`}>
                               {hasVoted && <div className="w-2 h-2 rounded-full bg-black animate-scale" />}
                            </div>
                            <span className="font-bold text-sm uppercase">{opt.label}</span>
                          </div>
                          {hasVoted && (
                            <span className="text-[10px] font-black opacity-60">{percentage}% ({opt.votes})</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {!user && (
                    <p className="text-[9px] font-bold opacity-50 uppercase mt-2">
                        * Inicia sesión para votar
                    </p>
                )}
                {hasVoted && (
                    <div className="mt-4 flex flex-col items-center gap-1">
                        <CheckCircle2 className="text-v2k-green-hover" size={24} />
                        <SpaceText text="¡GRACIAS POR TU VOTO!" size="12|12" className="font-black text-v2k-green-hover" />
                    </div>
                )}
              </div>
            </Window>

            {/* Créditos / Pie de página pequeño */}
            <div className="mt-8 text-center opacity-40">
                <p className="text-[10px] font-black uppercase tracking-tighter">
                   © 2026 Newjeans FANS CLUB. Made BY Jesús. All Rights Reserved.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
