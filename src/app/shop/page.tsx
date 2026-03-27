"use client";

import { useState, useMemo } from "react";
import BackgroundDecorations from "@/components/atoms/BackgroundDecorations";
import SpaceText from "@/components/atoms/texts/SpaceText";
import Jersey from "@/components/atoms/texts/Jersey";
import ShopHeader from "@/components/molecules/ShopHeader";
import ShopFilters, { type FilterType } from "@/components/molecules/ShopFilters";
import ShopCard from "@/components/molecules/ShopCard";
import ShopBackground from "@/components/molecules/ShopBackground";
import { PRODUCTS } from "@/data/shop-products";
import { motion, AnimatePresence } from "framer-motion";

type SortType = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc" | "new-first";

export default function ShopPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortType>("default");

  const counts = useMemo(() => ({
    all: PRODUCTS.length,
    album: PRODUCTS.filter((p) => p.category === "album").length,
    merch: PRODUCTS.filter((p) => p.category === "merch").length,
  }), []);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(
      (p) => (filter === "all" || p.category === filter) &&
        p.name.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "price-asc")  result = [...result].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    if (sort === "price-desc") result = [...result].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    if (sort === "name-asc")   result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc")  result = [...result].sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "new-first")  result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    return result;
  }, [filter, search, sort]);

  return (
    <div className="relative min-h-screen pt-12 pb-24 px-4 md:px-8 overflow-x-hidden">
      {/* Dynamic Backgrounds */}
      <BackgroundDecorations />
      <ShopBackground />
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center">
        {/* Modular Header */}
        <ShopHeader />

        {/* Modular Filters with counts */}
        <ShopFilters currentFilter={filter} onFilterChange={setFilter} counts={counts} />

        {/* ── TOOLBAR: Search + Sort + View ── */}
        <div className="w-full flex flex-col sm:flex-row gap-3 mb-10 items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-sm" />
            <div className="relative flex items-center border-2 border-black bg-white rounded-sm overflow-hidden">
              <span className="px-3 text-black/40 text-lg select-none">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="BUSCAR PRODUCTO..."
                className="flex-1 py-2 pr-3 bg-transparent font-space font-black text-sm text-black tracking-widest uppercase outline-none placeholder:text-black/30"
              />
              {search && (
                <button type="button" onClick={() => setSearch("")} className="px-3 text-black/40 hover:text-black text-lg">✕</button>
              )}
            </div>
          </div>

          {/* Sort */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-sm" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortType)}
              className="relative border-2 border-black bg-white font-space font-black text-xs tracking-widest uppercase px-4 py-2.5 rounded-sm outline-none cursor-pointer appearance-none pr-8"
            >
              <option value="default">ORDENAR: DEFAULT</option>
              <option value="new-first">✨ NOVEDADES PRIMERO</option>
              <option value="price-asc">PRECIO: MENOR → MAYOR</option>
              <option value="price-desc">PRECIO: MAYOR → MENOR</option>
              <option value="name-asc">NOMBRE: A → Z</option>
              <option value="name-desc">NOMBRE: Z → A</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs">▼</span>
          </div>
        </div>

        {/* Results count */}
        <div className="w-full mb-6 flex items-center gap-2">
          <div className="flex-1 h-px bg-black/20" />
          <Jersey text={`${filteredProducts.length} RESULTADOS`} size="20|24" className="text-black/40 font-black tracking-widest" />
          <div className="flex-1 h-px bg-black/20" />
        </div>

        {/* Product Grid / List */}
        <div className="relative w-full min-h-[400px] mb-20">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14 w-full"
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                >
                  <ShopCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          <AnimatePresence>
            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 py-20"
              >
                <motion.div
                  animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-6xl"
                >
                  📭
                </motion.div>
                <SpaceText text="NO SE ENCONTRARON PRODUCTOS" size="16|16" className="text-black/40 font-black tracking-widest text-center" />
                <Jersey text={`QUERY: "${search || filter}" → 0 RESULTS`} size="12|12" className="text-black/30" />
                <button
                  type="button"
                  onClick={() => { setSearch(""); setFilter("all"); }}
                  className="relative group/btn mt-2"
                >
                  <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-sm" />
                  <div className="relative border-2 border-black bg-v2k-accent px-6 py-2 font-space font-black text-sm tracking-widest hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all">
                    LIMPIAR FILTROS
                  </div>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
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