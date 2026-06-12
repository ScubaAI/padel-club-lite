// app/(shop)/catalogo/page.tsx
import { Suspense } from 'react';
import { getProducts } from '@/lib/products';
import { ProductCard } from '@/components/ui/ProductCard';
import { MobileFilterSheet } from '@/components/layout/MobileFilterSheet'; // Lo crearemos después
import { Search, SlidersHorizontal } from 'lucide-react';

export default async function CatalogPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const products = getProducts();
  
  // Lógica de filtrado simple en servidor
  const category = searchParams?.category as string;
  const query = searchParams?.q as string;

  const filteredProducts = products.filter((p) => {
    const matchesCategory = category ? p.categoryId === category : true;
    const matchesSearch = query 
      ? p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description?.toLowerCase().includes(query.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Header Sticky con Búsqueda y Filtros */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 safe-top">
        <div className="flex items-center justify-between gap-3 max-w-4xl mx-auto">
          
          {/* Barra de Búsqueda */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <form action="/catalogo" method="GET">
              <input
                type="text"
                name="q"
                placeholder="Buscar palas, zapas..."
                defaultValue={query}
                className="w-full bg-surface border-none rounded-full pl-10 pr-4 py-2 text-sm font-inter focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </form>
          </div>

          {/* Botón de Filtros (Abre Sheet en Móvil) */}
          <MobileFilterSheet currentCategory={category} />
        </div>
      </header>

      {/* Grid de Productos */}
      <main className="px-4 py-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-oswald text-2xl font-bold text-secondary uppercase">
            {category ? `${category}` : 'Catálogo Completo'}
          </h1>
          <span className="font-space-grotesk text-xs text-gray-500 font-bold">
            {filteredProducts.length} RESULTADOS
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="font-oswald text-xl text-gray-400 uppercase">No se encontraron productos</p>
            <a href="/catalogo" className="mt-4 text-primary font-bold text-sm hover:underline">
              Ver todos los productos
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
