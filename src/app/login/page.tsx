"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Jersey from "@/components/atoms/texts/Jersey";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { user, signInWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-4 border-black p-8 md:p-12 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full text-center"
      >
        <Jersey 
          tag="h1" 
          text="BIENVENIDO A BUNNIES CLUB" 
          size="40|48" 
          className="mb-8 text-v2k-pink-hot drop-shadow-[2px_2px_0px_#000]"
        />
        
        <p className="text-black mb-10 font-medium text-lg">
          Inicia sesión para acceder a tu perfil y contenido exclusivo.
        </p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
          whileTap={{ scale: 0.95, boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
          onClick={signInWithGoogle}
          className="flex items-center justify-center gap-4 w-full bg-[#4285F4] text-white border-[3px] border-black py-4 rounded-xl font-bold text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <title>Google Logo</title>
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google Login
        </motion.button>

        <div className="mt-8 text-sm text-gray-500">
          Al iniciar sesión, aceptas nuestros <a href="/terms" className="underline hover:text-v2k-pink-hot">Términos de Uso</a> y <a href="/privacy" className="underline hover:text-v2k-pink-hot">Política de Privacidad</a>.
        </div>
      </motion.div>
    </div>
  );
}
