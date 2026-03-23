"use client";

import { useState } from "react";
import BackgroundDecorations from "@/components/atoms/BackgroundDecorations";
import SpaceText from "@/components/atoms/texts/SpaceText";
import ShopHeader from "@/components/organisms/ShopHeader";
import ShopFilters, { type FilterType } from "@/components/organisms/ShopFilters";
import ShopCard, { type Product } from "@/components/molecules/ShopCard";
import ShopBackground from "@/components/organisms/ShopBackground";
import { motion, AnimatePresence } from "framer-motion";

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "ALBUM GET UP",
    price: "30€",
    image: "/images/shop/Get_Up_Album_Venta.avif",
    fileExtension: "BINK",
    color: "bg-[#f9f1c3]", // Yellowish
    headerColor: "bg-v2k-pink-light",
    category: "album",
    shops: [
      { name: "Weverse Shop (Global)", url: "https://shop.weverse.io/en/shop/GL_USD/artists/82/categories/1217" },
      { name: "Ktown4u", url: "https://www.ktown4u.com/eventsub?eve_no=5690462&biz_no=220" },
      { name: "Yes24", url: "http://www.yes24.com/" }
    ]
  },
  {
    id: 2,
    name: "ALBUM HOW SWEET",
    price: "26€",
    image: "/images/shop/How_Sweet_Album_Venta.avif",
    fileExtension: "BMP",
    color: "bg-[#e2e8f0]", // Grayish/neutral
    headerColor: "bg-v2k-accent",
    category: "album",
    shops: [
      { name: "Weverse Shop (Global)", url: "https://shop.weverse.io/en/shop/GL_USD/artists/82/categories/1217" }
    ]
  },
  {
    id: 3,
    name: "NEW JEANS 1ST EP",
    price: "28€",
    image: "/images/shop/NewJeans1EP_Album_Venta.avif",
    fileExtension: "JPG",
    color: "bg-[#c9e9f6]", // Bluish
    headerColor: "bg-v2k-yellow-soft",
    category: "album",
    shops: [
      { name: "Weverse Shop (Global)", url: "https://shop.weverse.io/en/shop/GL_USD/artists/82/categories/1217" },
      { name: "Aladin", url: "https://www.aladin.co.kr/" }
    ]
  },
  {
    id: 4,
    name: "OFFICIAL LIGHT STICK",
    price: "45€",
    image: "/images/shop/NewJeans - Official Light Stick.avif",
    fileExtension: "EXE",
    color: "bg-[#ffffff]", // White/clean
    headerColor: "bg-v2k-pink-hot/40",
    category: "merch",
    shops: [
      { name: "Weverse Shop", url: "https://shop.weverse.io/en/shop/GL_USD/artists/82/categories/1218" }
    ]
  },
  {
    id: 5,
    name: "ALBUM OMG & DITTO",
    price: "25€",
    image: "/images/shop/OMG_DITTO_Album_Venta.avif",
    fileExtension: "ICO",
    color: "bg-[#f4d8ed]", // Pinkish
    headerColor: "bg-v2k-green-soft",
    category: "album",
    shops: [
      { name: "Weverse Shop", url: "https://shop.weverse.io/en/shop/GL_USD/artists/82/categories/1218" },
      { name: "Ktown4u", url: "https://www.ktown4u.com/eventsub?eve_no=5690462&biz_no=220" }
    ]
  },
  {
    id: 6,
    name: "SUPERNATURAL EP",
    price: "24€",
    image: "/images/shop/Supernatural_Album_Venta.avif",
    fileExtension: "TIFF",
    color: "bg-[#fffce0]",
    headerColor: "bg-v2k-blue-deep/30",
    category: "album",
    shops: [
      { name: "Weverse Shop (Global)", url: "https://shop.weverse.io/en/shop/GL_USD/artists/82/categories/1217" }
    ]
  }
];

export default function ShopPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredProducts = PRODUCTS.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <div className="relative min-h-screen pt-12 pb-24 px-4 md:px-8 overflow-x-hidden">
      {/* Dynamic Backgrounds */}
      <BackgroundDecorations />
      <ShopBackground />
      
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* Modular Header */}
        <ShopHeader />

        {/* Modular Filters */}
        <ShopFilters currentFilter={filter} onFilterChange={setFilter} />

        {/* Filtered Products Grid with Staggered Animation */}
        <div className="relative w-full min-h-[600px] mb-20 px-4">
          {/* Product Grid with AnimatePresence */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 w-full"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                  transition={{ 
                    duration: 0.3,
                    type: "spring", 
                    stiffness: 300, 
                    damping: 25,
                  }}
                >
                  <ShopCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredProducts.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <SpaceText text="NO SE ENCONTRARON PRODUCTOS..." className="text-black/40 font-black tracking-widest text-xl" />
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="flex flex-col items-center gap-6 py-8 border-t-2 border-black border-dashed opacity-50 w-full">
           <div className="flex gap-4">
             <div className="h-4 w-4 bg-v2k-pink-hot animate-bounce" />
             <div className="h-4 w-4 bg-v2k-blue-deep animate-bounce delay-100" />
             <div className="h-4 w-4 bg-v2k-yellow-soft animate-bounce delay-200" />
           </div>
           <SpaceText 
            text="© 2025 NEWJEANS FANS CLUB. MADE BY JESÚS. ALL RIGHTS RESERVED." 
            className="text-[10px] sm:text-xs font-black tracking-widest text-black text-center" 
           />
        </div>
      </div>
    </div>
  );
}
