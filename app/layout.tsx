import type { Metadata } from 'next';
import { fontOswald, fontInter, fontSpaceGrotesk } from '@/lib/fonts';
import './globals.css';
import { VirtualAssistant } from '@/components/shared/VirtualAssistant';

export const metadata: Metadata = {
  title: {
    default: 'Padel Outlet Club Lite | Palas, Zapatillas y Accesorios Premium',
    template: '%s | Padel Outlet Club Lite',
  },
  description: 'Tu destino digital para equipamiento de pádel premium. Consulta disponibilidad, reserva asesorías y paga con Lightning Network.',
  keywords: ['padel', 'palas padel', 'zapatillas padel', 'bitcoin padel', 'lightning network', 'outlet padel'],
  authors: [{ name: 'Padel Outlet Club' }],
  openGraph: {
    title: 'Padel Outlet Club Lite',
    description: 'Equipamiento premium + Pagos en Sats ⚡',
    type: 'website',
    locale: 'es_MX',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Padel Outlet Club Lite',
    description: 'Equipamiento premium + Pagos en Sats ',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="es" 
      className={`${fontOswald.variable} ${fontInter.variable} ${fontSpaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased bg-background text-secondary min-h-screen flex flex-col">
        {/* 
          Nota: StickyBottomNav se inyectará dentro de (shop)/layout.tsx 
          Aquí solo ponemos elementos globales como VirtualAssistant o Footer fijo
        */}
        <main className="flex-grow w-full">
          {children}
        </main>
        
        {/* Espacio reservado para futuros elementos flotantes globales */}
        <div id="global-overlays" />
      </body>
    </html>
  );
}
