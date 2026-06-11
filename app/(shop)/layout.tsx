// app/(shop)/layout.tsx
import { StickyBottomNav } from '@/components/layout/StickyBottomNav';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* 
        El main tiene padding-bottom igual a la altura de la nav (64px)
        + safe-area-inset-bottom para iPhones con notch/home bar.
        Esto evita que el contenido quede oculto detrás de la barra.
      */}
      <main className="flex-grow pb-[calc(64px+env(safe-area-inset-bottom))]">
        {children}
      </main>

      {/* Navegación fija siempre visible en móvil */}
      <StickyBottomNav />
    </div>
  );
}
