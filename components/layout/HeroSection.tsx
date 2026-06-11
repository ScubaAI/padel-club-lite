// HeroSection.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Imagen de Fondo (Unsplash MVP) */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1622163642998-1ea14b09602d?q=80&w=2070&auto=format&fit=crop"
          alt="Padel Court Action"
          fill
          priority // Critical LCP image
          className="object-cover"
        />
        {/* Overlay Gradiente para Legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
      </div>

      {/* Contenido Hero */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-12 px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in-up space-y-4">
          <span className="inline-block bg-accent text-secondary text-xs font-space-grotesk font-bold px-3 py-1 rounded uppercase tracking-widest">
            Outlet Premium  Lightning Ready
          </span>
          
          <h1 className="font-oswald text-4xl sm:text-5xl md:text-6xl font-bold text-white uppercase leading-[0.9] drop-shadow-lg">
            Tu Juego.<br />
            <span className="text-primary">Tu Estilo.</span>
          </h1>
          
          <p className="font-inter text-gray-200 text-base sm:text-lg max-w-md leading-relaxed">
            Equipamiento profesional seleccionado para jugadores exigentes. 
            Paga en Sats, recibe en pista.
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link 
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-accent hover:bg-lime-400 text-secondary font-oswald font-bold text-sm uppercase px-6 py-3 rounded-md shadow-neon-lime transition-all tap-scale"
            >
              Ver Catálogo
              <ArrowRight size={16} />
            </Link>
            
            <Link 
              href="/asesoria"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-oswald font-bold text-sm uppercase px-6 py-3 rounded-md transition-all tap-scale"
            >
              Asesoría Gratis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
