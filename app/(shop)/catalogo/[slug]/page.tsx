// app/(shop)/catalogo/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Zap, CalendarCheck, Share2 } from 'lucide-react';
import { getProductBySlug, getProducts } from '@/lib/products';
import { InterestModalTrigger } from '@/components/shared/InterestModalTrigger';
import { BlinkPayButton } from '@/components/payment/BlinkPayButton';
import type { Metadata } from 'next';

// Generación estática para SSR/SSG (opcional pero recomendado)
export async function generateStaticParams() {
  const products = getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

// Metadatos dinámicos para SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    return { title: 'Producto no encontrado | Padel Outlet Club' };
  }

  return {
    title: `${product.name} | Padel Outlet Club Lite`,
    description: `${product.description || 'Equipamiento premium de pádel'}. Precio: $${product.price} ${product.currency}. Consulta disponibilidad y paga con Lightning.`,
    openGraph: {
      title: product.name,
      description: `$${product.price} ${product.currency} - Equipamiento Premium`,
      images: [`https://${process.env.NEXT_PUBLIC_VERCEL_BLOB_STORE_ID}.public.blob.vercel-storage.com/${product.imageBlobId}`],
    },
  };
}

export default function ProductDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  const imageUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_BLOB_STORE_ID}.public.blob.vercel-storage.com/${product.imageBlobId}`;

  return (
    <div className="min-h-screen bg-background pb-24">
      
      {/* Header Simple con Volver */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 safe-top flex items-center justify-between">
        <Link 
          href="/catalogo" 
          className="flex items-center gap-2 text-secondary hover:text-primary transition-colors tap-scale"
        >
          <ArrowLeft size={20} />
          <span className="font-oswald text-sm font-bold uppercase">Volver</span>
        </Link>
        
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Share2 size={20} className="text-gray-500" />
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        
        {/* Imagen Principal */}
        <div className="relative aspect-square bg-surface rounded-xl overflow-hidden mb-8 shadow-sm">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            priority // LCP crítico en página de detalle
            className="object-contain p-8"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Información del Producto */}
        <div className="space-y-6">
          
          {/* Categoría + Nombre */}
          <div>
            <span className="inline-block bg-accent/20 text-secondary text-xs font-space-grotesk font-bold px-3 py-1 rounded uppercase tracking-wider mb-3">
              {product.categoryId}
            </span>
            <h1 className="font-oswald text-3xl sm:text-4xl font-bold text-secondary uppercase leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Precio Destacado */}
          <div className="flex items-baseline gap-2">
            <span className="font-space-grotesk text-4xl font-bold text-primary">
              ${product.price.toLocaleString()}
            </span>
            <span className="font-inter text-gray-500 text-lg">{product.currency}</span>
          </div>

          {/* Descripción */}
          {product.description && (
            <p className="font-inter text-gray-600 leading-relaxed text-base">
              {product.description}
            </p>
          )}

          {/* Especificaciones Técnicas (Grid) */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="bg-surface rounded-xl p-5 border border-gray-100">
              <h3 className="font-oswald text-sm font-bold text-secondary uppercase tracking-wider mb-4">
                Especificaciones
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-200 pb-3 last:border-0">
                    <span className="block font-space-grotesk text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
                      {key}
                    </span>
                    <span className="font-inter text-sm font-semibold text-secondary">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTAs Principales (Sticky en móvil abajo) */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 safe-bottom md:relative md:bg-transparent md:border-0 md:p-0 md:block">
            <div className="flex flex-col sm:flex-row gap-3 max-w-4xl mx-auto">
              
              {/* CTA Principal: Consultar / Cal.com */}
              <InterestModalTrigger product={product} />
              
              {/* CTA Secundario: Pagar con Blink (Futuro) */}
              <BlinkPayButton product={product} />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}