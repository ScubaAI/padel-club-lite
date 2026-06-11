// components/layout/MobileFilterSheet.tsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Mapeo idéntico al CategoryRail para consistencia
const CATEGORIES = [
  { id: 'Palas', label: 'Palas' },
  { id: 'Zapatillas', label: 'Zapatillas' },
  { id: 'Ropa', label: 'Ropa' },
  { id: 'Accesorios', label: 'Accesorios' },
  { id: 'Paleteros', label: 'Paleteros' },
];

interface MobileFilterSheetProps {
  currentCategory?: string;
}

export function MobileFilterSheet({ currentCategory }: MobileFilterSheetProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (categoryId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (categoryId) {
      params.set('category', categoryId);
    } else {
      params.delete('category');
    }
    
    // Navegación suave manteniendo otros filtros (ej. búsqueda)
    router.push(`/catalogo?${params.toString()}`);
    setIsOpen(false);
  };

  return (
    <>
      {/* Botón Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full transition-all tap-scale",
          currentCategory 
            ? "bg-primary text-white shadow-neon-blue" 
            : "bg-surface text-secondary hover:bg-gray-200"
        )}
        aria-label="Abrir filtros"
      >
        {currentCategory ? <Check size={18} /> : <Filter size={18} />}
      </button>

      {/* Overlay + Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Oscuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Panel Deslizante desde Abajo */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl p-6 safe-bottom max-h-[70vh] overflow-y-auto"
            >
              {/* Header del Sheet */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-oswald text-xl font-bold text-secondary uppercase">
                  Filtrar por Categoría
                </h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Chips de Categorías */}
              <div className="grid grid-cols-2 gap-3">
                {/* Opción "Todas" */}
                <button
                  onClick={() => handleSelect(null)}
                  className={cn(
                    "px-4 py-3 rounded-lg border font-space-grotesk text-sm font-bold transition-all tap-scale",
                    !currentCategory
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  )}
                >
                  Todas
                </button>

                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelect(cat.id)}
                    className={cn(
                      "px-4 py-3 rounded-lg border font-space-grotesk text-sm font-bold transition-all tap-scale flex items-center justify-between",
                      currentCategory === cat.id
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    )}
                  >
                    {cat.label}
                    {currentCategory === cat.id && <Check size={14} />}
                  </button>
                ))}
              </div>

              {/* Espacio extra para safe-area en iPhone */}
              <div className="h-4" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}