import SpaceText from "@/components/atoms/texts/SpaceText";
import Jersey from "@/components/atoms/texts/Jersey";

export type FilterType = "all" | "album" | "merch";

interface ShopFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: Record<FilterType, number>;
}

const FILTERS: { id: FilterType; label: string; color: string }[] = [
  { id: "all", label: "TODOS", color: "bg-v2k-accent" },
  { id: "album", label: "ÁLBUMES", color: "bg-v2k-blue-deep" },
  { id: "merch", label: "MERCH", color: "bg-v2k-pink-light" }
];

export default function ShopFilters({ currentFilter, onFilterChange, counts }: ShopFiltersProps) {
  return (
    <div className="mb-8 flex flex-wrap justify-center gap-4 sm:gap-8 bg-black/5 p-4 rounded-xl border-2 border-dashed border-black/20 backdrop-blur-sm">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          type="button"
          onClick={() => onFilterChange(filter.id)}
          className="relative group/pill transition-all active:scale-95 flex items-center gap-2"
        >
          <div className={`absolute inset-0 bg-black translate-x-1 translate-y-1 rounded-full transition-opacity ${currentFilter === filter.id ? "opacity-100" : "opacity-0 group-hover/pill:opacity-50"}`} />
          <div className={`relative px-6 py-2 rounded-full border-2 border-black flex items-center gap-2 transition-all 
            ${currentFilter === filter.id 
              ? `${filter.color} -translate-x-0.5 -translate-y-0.5` 
              : "bg-transparent hover:bg-white"}`}>
            <div className={`w-3 h-3 rounded-full border border-black ${currentFilter === filter.id ? "bg-white animate-pulse" : "bg-black/20"}`} />
            <SpaceText 
              text={filter.label} 
              className={`font-black text-xs sm:text-sm tracking-widest ${currentFilter === filter.id ? "text-black" : "text-black/60"}`} 
            />
            <Jersey
              text={`${counts[filter.id]}`}
              size="18|22"
              className={`font-black px-1 rounded-sm ${currentFilter === filter.id ? "text-black/70 bg-black/10" : "text-black/40"}`}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
