// components/layout/CategoryRail.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, // Icono para Palas (representa potencia y energía)
  Footprints, 
  Shirt, 
  Backpack, 
  Gem 
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mapeo de categorías basado en tu products.json enum
const CATEGORIES = [
  { id: 'Palas', label: 'Palas', icon: Sparkles },
  { id: 'Zapatillas', label: 'Zapas', icon: Footprints },
  { id: 'Ropa', label: 'Ropa', icon: Shirt },
  { id: 'Accesorios', label: 'Extras', icon: Gem },
  { id: 'Paleteros', label: 'Fundas', icon: Backpack },
];

interface CategoryRailProps {
  onSelect?: (categoryId: string) => void;
}

export function CategoryRail({ onSelect }: CategoryRailProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setActiveId(id);
    onSelect?.(id);
    
    // Feedback háptico sutil en móviles compatibles
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  return (
    <div className="relative w-full">
      {/* Contenedor con Scroll Snap Nativo */}
      <div 
        className="flex gap-3 overflow-x-auto pb-4 pt-1 px-1 snap-x snap-mandatory scroll-snap-x -mx-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeId === cat.id;
          
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className={cn(
                "relative flex items-center gap-2 px-5 py-3 rounded-full whitespace-nowrap",
                "font-oswald text-sm font-bold uppercase tracking-wide transition-colors duration-200",
                "snap-start select-none tap-scale",
                isActive 
                  ? "bg-secondary text-white shadow-lg" 
                  : "bg-surface text-gray-500 hover:bg-gray-200 border border-transparent hover:border-gray-300"
              )}
            >
              {/* Fondo animado con Framer Motion */}
              {isActive && (
                <motion.span
                  layoutId="category-pill-bg"
                  className="absolute inset-0 rounded-full bg-secondary"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              
              {/* Icono + Texto (siempre encima del fondo animado) */}
              <span className="relative z-10 flex items-center gap-2">
                <cat.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Fade lateral derecho para indicar scroll (solo visible si hay más items) */}
      <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
    </div>
  );
}
