// components/ui/ProductCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // URL optimizada para Vercel Blob + Next/Image
  const imageUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_BLOB_STORE_ID}.public.blob.vercel-storage.com/${product.imageBlobId}`;

  return (
    <Link href={`/catalogo/${product.slug}`} className="block group">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative bg-white rounded-md border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      >
        {/* Contenedor de Imagen con Aspect Ratio Fijo */}
        <div className="relative aspect-[4/5] bg-surface overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 ease-out"
            priority={false} // Lazy load por defecto
          />
          
          {/* Badge de Categoría (Solo visible en hover o siempre si es pequeño) */}
          <span className="absolute top-2 left-2 bg-secondary/90 backdrop-blur-sm text-white text-[10px] font-space-grotesk font-bold px-2 py-1 rounded uppercase tracking-wider">
             {product.categoryId}
          </span>
        </div>

        {/* Información del Producto */}
        <div className="p-3 flex flex-col gap-1">
          <h3 className="font-oswald text-base font-bold text-secondary uppercase leading-tight truncate">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mt-1">
            <span className="font-space-grotesk text-primary font-bold text-lg">
              ${product.price.toLocaleString()} {product.currency}
            </span>
            
            {/* Icono de acción sutil */}
            <ArrowUpRight 
              size={16} 
              className="text-gray-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" 
            />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
