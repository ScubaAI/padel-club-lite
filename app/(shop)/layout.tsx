// app/(shop)/layout.tsx
import { StickyBottomNav } from '@/components/layout/StickyBottomNav';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-grow w-full pb-[calc(64px+env(safe-area-inset-bottom))]">
        {children}
      </main>

      <StickyBottomNav />
    </div>
  );
}
