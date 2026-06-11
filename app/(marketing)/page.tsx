// app/(marketing)/page.tsx
import { HeroSection } from '@/components/layout/HeroSection';
import { CategoryRail } from '@/components/layout/CategoryRail';
import { getProducts } from '@/lib/products';
import { ProductCard } from '@/components/ui/ProductCard';

export default function MarketingPage() {
  // Obtenemos productos destacados (ej. los primeros 4) para mostrar en landing
  const allProducts = getProducts();
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* 1. Hero Inmersivo */}
      <HeroSection />

      {/* 2. Navegación Horizontal por Categorías (Estilo App) */}
      <section className="py-8 px-6 max-w-7xl mx-auto">
        <h2 className="font-oswald text-2xl font-bold text-secondary uppercase mb-4">
          Explora por Categoría
        </h2>
        <CategoryRail />
      </section>

      {/* 3. Sección "Destacados" (Muestra real del catálogo) */}
      {featuredProducts.length > 0 && (
        <section className="py-12 px-6 max-w-7xl mx-auto border-t border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-oswald text-2xl font-bold text-secondary uppercase">
              Novedades Outlet
            </h2>
            <a 
              href="/catalogo" 
              className="text-xs font-space-grotesk font-bold text-primary hover:text-accent transition-colors uppercase tracking-wider"
            >
              Ver Todo →
            </a>
          </div>
          
          {/* Grid Responsive: 2 cols móvil, 4 cols desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 4. CTA Final hacia Asesoría (Lead Gen) */}
      <section className="py-16 px-6 bg-surface text-center">
        <h2 className="font-oswald text-3xl font-bold text-secondary uppercase mb-3">
          ¿No sabes qué elegir?
        </h2>
        <p className="font-inter text-gray-600 max-w-md mx-auto mb-6">
          Reserva una asesoría gratuita de 15 min con nuestros expertos. 
          Te ayudamos a encontrar tu equipo ideal.
        </p>
        <a 
          href="/asesoria"
          className="inline-flex items-center gap-2 bg-secondary hover:bg-black text-white font-oswald font-bold text-sm uppercase px-8 py-3 rounded-md shadow-lg transition-all tap-scale"
        >
          Reservar Asesoría Gratis
        </a>
      </section>
    </div>
  );
}
