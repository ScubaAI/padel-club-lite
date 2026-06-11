// components/layout/StickyBottomNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid3X3, Zap, User } from 'lucide-react';
import { cn } from '@/lib/utils'; // Asumimos que tienes esta utilidad o usamos clsx directo

const NAV_ITEMS = [
  { 
    href: '/', 
    label: 'Inicio', 
    icon: Home,
    // En móvil, "Inicio" lleva a la landing marketing
  },
  { 
    href: '/catalogo', 
    label: 'Catálogo', 
    icon: Grid3X3,
    activePattern: '/catalogo' 
  },
  { 
    href: '/asesoria', 
    label: 'Asesoría', 
    icon: Zap,
    // El rayo representa velocidad/Lightning + Booking
  },
  { 
    href: '/perfil', 
    label: 'Perfil', 
    icon: User,
    activePattern: '/perfil' 
  },
];

export function StickyBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      {/* Fondo Glassmorphism con borde superior sutil */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-md border-t border-gray-200/60 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]" />
      
      <div className="relative flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = 
            item.href === '/' 
              ? pathname === '/' 
              : pathname.startsWith(item.activePattern || item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-200 tap-scale",
                isActive 
                  ? "text-primary scale-105" 
                  : "text-gray-400 hover:text-secondary"
              )}
            >
              <item.icon 
                size={22} 
                strokeWidth={isActive ? 2.5 : 2} 
                className={isActive ? "drop-shadow-sm" : ""}
              />
              <span className={cn(
                "text-[10px] font-medium tracking-wide",
                isActive ? "font-semibold text-primary" : "font-normal"
              )}>
                {item.label}
              </span>
              
              {/* Indicador activo sutil (punto debajo del icono) */}
              {isActive && (
                <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary animate-fade-in-up" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
