"use client";

import { useEffect } from "react";
import Image from "next/image";
import SpaceText from "@/components/atoms/texts/SpaceText";
import MusicPlayer from "@/components/molecules/MusicPlayer";
import { useForum } from "./hooks/useForum";
import ForumDecorations from "./components/ForumDecorations";
import ForumHeader from "./components/ForumHeader";
import ForumGuestbook from "./components/ForumGuestbook";
import ForumPoll from "./components/ForumPoll";

export default function ForumPage() {
  const forum = useForum();

  // Efecto para cambiar el fondo al estilo "Cyber-Room"
  useEffect(() => {
    const originalBg = document.body.style.background;
    const originalImage = document.body.style.backgroundImage;
    
    document.body.style.backgroundColor = "#fdfbf7"; 
    document.body.style.backgroundImage = `
      radial-gradient(#d1d5db 1px, transparent 1px),
      linear-gradient(to bottom, #f0f7ff, #fff5f8)
    `;
    document.body.style.backgroundSize = "24px 24px, 100% 100%";
    document.body.style.backgroundAttachment = "fixed";

    return () => {
      document.body.style.background = originalBg;
      document.body.style.backgroundImage = originalImage;
    };
  }, []);

  return (
    <div className="relative min-h-screen py-12 px-4 md:px-8 overflow-x-hidden pt-24 pb-20">
      <ForumDecorations />

      <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col items-center">
        <ForumHeader onlineUsers={forum.onlineUsers} />

        {/* Layout de 3 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-start">
          
          {/* COLUMNA IZQUIERDA: MUSIC PLAYER */}
          <div className="lg:col-span-3 flex flex-col gap-4">
             <MusicPlayer />
             <div className="bg-white/50 backdrop-blur-sm border-[3px] border-black p-4 shadow-[4px_4px_0px_#000] flex-col items-center gap-2 hidden lg:flex">
                <Image src="/images/bunny-logo.avif" alt="Bunny" width={60} height={60} className="animate-bounce" />
                <SpaceText text="¡DISFRUTA DE LA MÚSICA MIENTRAS HABLAS!" size="12|12" className="text-center font-black" />
             </div>
          </div>

          {/* COLUMNA CENTRAL: GUESTBOOK */}
          <div className="lg:col-span-6">
            <ForumGuestbook 
              messages={forum.messages}
              newMessage={forum.newMessage}
              setNewMessage={forum.setNewMessage}
              handleSendMessage={forum.handleSendMessage}
              handleKeyDown={forum.handleKeyDown}
              scrollRef={forum.scrollRef}
              user={forum.user}
              logout={forum.logout}
            />
          </div>

          {/* COLUMNA DERECHA: POLL */}
          <ForumPoll 
            pollOptions={forum.pollOptions}
            hasVoted={forum.hasVoted}
            handleVote={forum.handleVote}
            user={forum.user}
          />
        </div>
      </div>
    </div>
  );
}
