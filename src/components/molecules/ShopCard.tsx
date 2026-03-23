import SpaceText from "@/components/atoms/texts/SpaceText";
import Image from "@/components/atoms/Image";
import Jersey from "@/components/atoms/texts/Jersey";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState } from "react";

export interface StoreLink {
  name: string;
  url: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  fileExtension: string;
  color: string;
  headerColor: string;
  category: "album" | "merch";
  shops: StoreLink[];
  isNew?: boolean;
}

export default function ShopCard({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX);
  const mouseYSpring = useSpring(mouseY);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    mouseX.set((e.clientX - rect.left) / width - 0.5);
    mouseY.set((e.clientY - rect.top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const shineOpacity = useTransform(
    [mouseXSpring, mouseYSpring],
    ([mx, my]) => {
      const dist = Math.sqrt((mx as number) ** 2 + (my as number) ** 2);
      return 0.2 + dist * 0.6;
    },
  );

  const shineX = useTransform(mouseXSpring, [-0.5, 0.5], ["-20%", "120%"]);
  const shineY = useTransform(mouseYSpring, [-0.5, 0.5], ["-20%", "120%"]);

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full aspect-2/3 group cursor-pointer"
    >
      {/* Sticker Die-cut Border (The "Peel" feel) */}
      <div className="absolute inset-[-8px] bg-v2k-cyan border-2 border-black rounded-4xl shadow-[20px_20px_0px_rgba(0,0,0,0.15)] group-hover:shadow-[30px_30px_0px_rgba(0,0,0,0.1)] transition-all duration-300 transform-gpu" />

      {/* Main Card Body */}
      <div
        className={`relative h-full w-full rounded-[1.8rem] border-4 border-black overflow-hidden flex flex-col ${product.color} scanlines z-10`}
      >
        {/* Full-Bleed Image Section */}
        <div className="flex-1 relative overflow-hidden bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover scale-[1.15] object-center"
          />

          {/* Holographic Overlays (Intensified) */}
          <motion.div
            style={{ opacity: shineOpacity, left: shineX, top: shineY }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none z-20 
                       bg-[radial-gradient(circle_at_center,rgba(255,255,255,1)_0%,rgba(165,243,252,0.5)_20%,rgba(253,192,236,0.5)_50%,transparent_80%)] mix-blend-overlay"
          />

          {/* NEW Badge */}
          {product.isNew && (
            <div className="absolute top-4 left-4 z-40">
              <div className="absolute inset-0 bg-black translate-x-0.5 translate-y-0.5 rounded-sm" />
              <div className="relative bg-v2k-pink-hot border-2 border-black px-2 py-0.5 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <Jersey text="NEW" size="12|12" className="text-white font-black tracking-widest" />
              </div>
            </div>
          )}

          {/* Floating Price Tag Sticker */}
          <div className="absolute top-4 right-4 z-40 rotate-12 group-hover:rotate-0 transition-transform">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-sm" />
            <div className="relative bg-v2k-yellow border-2 border-black px-3 py-1 flex items-center shadow-inner">
              <Jersey
                text={product.price}
                size="24|28"
                className="text-black font-black"
              />
            </div>
          </div>
        </div>

        {/* Bottom Info Bar */}
        <div className="p-5 flex flex-col gap-3 relative z-30 bg-black/5 border-t-2 border-black/20">
          <div className="flex flex-col">
            <SpaceText
              text={product.name}
              size="20|24"
              className="text-white font-black drop-shadow-[2px_2px_0px_#000] tracking-tighter"
            />
            <SpaceText
              text={`TYPE: ${product.category.toUpperCase()}`}
              size="16|16"
              className="text-v2k-black uppercase font-bold tracking-widest"
            />
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-v2k-blue-deep animate-ping" />
              <Jersey
                text={`PORTAL: OFFICIAL_STORE // NODE_${product.id}`}
                size="16|16"
                className="text-v2k-black"
              />
            </div>
            {/* Shop Pills */}
            <div className="flex flex-wrap gap-1 mt-1">
              {product.shops.map((shop) => (
                <span
                  key={shop.name}
                  className="font-space text-[9px] font-black uppercase tracking-widest bg-black/10 border border-black/20 px-1.5 py-0.5 rounded-sm text-black/70"
                >
                  {shop.name.split(" ")[0]}
                </span>
              ))}
            </div>
          </div>

          {/* Smart Button: Direct Link or Modal Trigger */}
          {product.shops.length === 1 ? (
            <a
              href={product.shops[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group/btn w-full mt-2 block"
            >
              <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-sm" />
              <div className="relative bg-v2k-pink-light hover:bg-white border-2 border-black py-2.5 rounded-sm flex items-center justify-center gap-2 transition-all group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5 active:translate-x-0 active:translate-y-0">
                <SpaceText
                  text="COMPRAR"
                  size="12|12"
                  className="text-black font-black tracking-[0.2em]"
                />
                <span className="text-black font-black text-xl">↗</span>
              </div>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="relative group/btn w-full mt-2 block"
            >
              <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-sm" />
              <div className="relative bg-v2k-cyan hover:bg-white border-2 border-black py-2.5 rounded-sm flex items-center justify-center gap-2 transition-all group-hover/btn:-translate-x-0.5 group-hover/btn:-translate-y-0.5 active:translate-x-0 active:translate-y-0">
                <SpaceText
                  text="VER TIENDAS"
                  size="12|12"
                  className="text-black font-black tracking-[0.2em]"
                />
                <span className="text-black font-black text-xl">◿</span>
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Decorative Small Stickers around the card */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -bottom-4 -right-4 z-40 text-4xl hidden sm:block pointer-events-none"
      >
        ✨
      </motion.div>

      {/* RETAILER SELECTION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {/* Modal Window */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-v2k-accent border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] flex flex-col scanlines z-10"
            >
              <div className="bg-v2k-accent border-b-4 border-black px-3 h-10 flex justify-between items-center">
                <SpaceText 
                  text="RETAILER_NODES.EXE" 
                  size="12|12" 
                  className="text-black font-black uppercase tracking-widest" 
                />
                <button type="button" onClick={() => setIsModalOpen(false)} className="w-6 h-6 bg-v2k-pink-light border-2 border-black flex items-center justify-center text-[10px] font-black hover:bg-v2k-pink-hot active:translate-y-0.5 active:translate-x-0.5 cursor-pointer">
                  ✕
                </button>
              </div>

              <div className="p-6 flex flex-col gap-4">
                <div className="text-center mb-2">
                  <Jersey text={`SELECT STORE FOR:`} size="16|16" className="text-black/60 font-black! leading-none mb-1" />
                  <SpaceText text={product.name} size="16|16" className="text-black font-black tracking-tighter" />
                </div>

                <div className="flex flex-col gap-3">
                  {product.shops.map((shop, idx) => (
                    <a 
                      key={idx}
                      href={shop.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link block relative w-full"
                    >
                      <div className="absolute inset-0 bg-black translate-x-1 translate-y-1" />
                      <div className="relative bg-white border-2 border-black p-3 flex justify-between items-center hover:-translate-y-1 hover:-translate-x-1 active:translate-x-0 active:translate-y-0 transition-all cursor-pointer">
                         <span className="font-space font-black text-xs text-black uppercase tracking-widest">{shop.name}</span>
                         <span className="font-black text-black text-lg group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform">↗</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
