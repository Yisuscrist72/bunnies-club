"use client";

import BackgroundDecorations from "@/components/atoms/BackgroundDecorations";
import Jersey from "@/components/atoms/texts/Jersey";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Image from "@/components/atoms/Image";
import { motion } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  fileExtension: string;
  color: string;
  headerColor: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "ALBUM GET UP",
    price: "30€",
    image: "/images/music/get-up.avif",
    fileExtension: "GIF",
    color: "bg-[#f9f1c3]",
    headerColor: "bg-v2k-pink-light"
  },
  {
    id: 2,
    name: "ALBUM OMG & DITTO",
    price: "25€",
    image: "/images/music/omg-ditto.avif",
    fileExtension: "BMP",
    color: "bg-[#f4d8ed]",
    headerColor: "bg-v2k-accent"
  },
  {
    id: 3,
    name: "NEW JEANS 1ST EP",
    price: "28€",
    image: "/images/music/newjeans.avif",
    fileExtension: "JPG",
    color: "bg-[#c9e9f6]",
    headerColor: "bg-v2k-yellow-soft"
  },
  {
    id: 4,
    name: "HOW SWEET SINGLE",
    price: "22€",
    image: "/images/music/howsweet.avif",
    fileExtension: "PNG",
    color: "bg-[#e0f7fa]",
    headerColor: "bg-v2k-pink-hot/40"
  },
  {
    id: 5,
    name: "SUPERNATURAL",
    price: "24€",
    image: "/images/music/supernatural.avif",
    fileExtension: "ICO",
    color: "bg-[#f3f4f6]",
    headerColor: "bg-v2k-green-soft"
  },
  {
    id: 6,
    name: "GODS SENCILLO",
    price: "18€",
    image: "/images/music/gods.avif",
    fileExtension: "TIFF",
    color: "bg-[#fffce0]",
    headerColor: "bg-v2k-blue-deep/30"
  }
];

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`relative flex flex-col ${product.color} border-4 border-black shadow-v2k-md rounded-sm overflow-hidden group scanlines`}
    >
      {/* Window Header */}
      <div className={`${product.headerColor} border-b-4 border-black px-3 h-10 flex justify-between items-center shrink-0`}>
        <SpaceText 
          text={`(ALBUM_0${product.id}_NEW_JEANS.${product.fileExtension})`} 
          className="text-black font-black truncate text-[11px] sm:text-[13px] uppercase tracking-tighter" 
        />
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 bg-white/40 border-2 border-black flex items-center justify-center text-[10px] font-black cursor-pointer hover:bg-white select-none">-</div>
          <div className="w-5 h-5 bg-v2k-pink-light border-2 border-black flex items-center justify-center text-[10px] font-black select-none text-black cursor-pointer hover:bg-v2k-pink-hot">✕</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col items-center gap-6">
        {/* Product Image Container */}
        <div className="relative w-full aspect-square bg-transparent border-2 border-black shadow-v2k-xs overflow-hidden group-hover:scale-105 transition-transform duration-500">
           <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover" 
           />
        </div>

        {/* Info */}
        <div className="text-center space-y-2">
           <SpaceText 
            text={`${product.name} - ${product.price}`} 
            className="text-black uppercase font-black text-xl tracking-tighter" 
           />
        </div>

        {/* Buy Button Improvement */}
        <button type="button" className="group/btn relative w-full cursor-pointer mt-2">
          <div className="absolute inset-0 bg-black translate-x-1.5 translate-y-1.5 rounded-sm transition-transform group-hover/btn:translate-x-2 group-hover/btn:translate-y-2" />
          <div className="relative bg-[#cde8ff] border-4 border-black px-6 py-4 flex items-center justify-center gap-2 transition-all group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5 active:translate-x-1 active:translate-y-1">
            <SpaceText text="COMPRAR AHORA" className="text-black font-black tracking-widest text-sm" />
            <span className="text-xl font-black group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform">↗</span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

export default function ShopPage() {
  return (
    <div className="relative min-h-screen pt-12 pb-24 px-4 md:px-8 overflow-x-hidden bg-v2k-blue-light/20" 
         style={{ backgroundImage: 'radial-gradient(#000000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}>
      <BackgroundDecorations />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* Page Title */}
        <div className="mb-20 text-center relative group">
          <Jersey
            tag="h1"
            text="TIENDA (MERCH & ALBUMS)"
            size="48|56"
            className="text-black uppercase drop-shadow-[6px_6px_0px_rgba(255,105,180,0.4)] relative z-10"
          />
          <div className="absolute -top-6 -right-12 text-6xl rotate-12 opacity-40 select-none animate-bounce">🐰</div>
          <div className="h-2 w-32 bg-v2k-pink-hot mx-auto mt-2 border-2 border-black shadow-v2k-xs -rotate-1" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full px-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Footer Text */}
        <div className="mt-20 flex items-center gap-4 py-4 border-y-2 border-black border-dashed opacity-50 w-full justify-center">
           <SpaceText 
            text="© 2025 NEWJEANS FANS CLUB. MADE BY JESÚS. ALL RIGHTS RESERVED." 
            className="text-[10px] sm:text-xs font-black tracking-widest text-black" 
           />
        </div>
      </div>

      {/* Floating Background Stickers (Better Placement) */}
      <div className="absolute inset-0 pointer-events-none opacity-20 hidden xl:block">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-1/4 left-10 text-8xl">💿</motion.div>
        <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/2 right-10 text-7xl">💖</motion.div>
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute bottom-1/4 left-1/4 text-6xl">⭐</motion.div>
        <motion.div animate={{ y: [0, 40, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-1/3 -right-10 text-9xl -rotate-12 translate-y-1/2">🐰</motion.div>
        <motion.div className="absolute top-10 right-1/4 text-4xl opacity-50">✨</motion.div>
      </div>
    </div>
  );
}
