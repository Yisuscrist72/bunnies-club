"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Send, LogOut, User as UserIcon } from "lucide-react";
import Window from "@/components/molecules/Window";
import SpaceText from "@/components/atoms/texts/SpaceText";
import type { ForumMessage } from "../hooks/useForum";

interface ForumGuestbookProps {
  messages: ForumMessage[];
  newMessage: string;
  setNewMessage: (val: string) => void;
  handleSendMessage: (e?: React.FormEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  user: any;
  logout: () => void;
}

export default function ForumGuestbook({
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleKeyDown,
  scrollRef,
  user,
  logout
}: ForumGuestbookProps) {
  return (
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
  );
}
