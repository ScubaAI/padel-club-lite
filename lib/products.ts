import { z } from 'zod';
// Importamos el JSON directamente. Next.js lo manejará como un módulo estático.
import productsData from '@/data/products.json'; 

// 1. Esquema validado (ajustado para flexibilidad de marcas)
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  categoryId: z.enum(['cat_palas', 'cat_ropa', 'cat_accesorios']),
  brandId: z.string(), // Flexibilidad para nuevas marcas sin romper el build
  price: z.number().positive(),
  originalPrice: z.number().positive().nullable(),
  currency: z.string().default('MXN'),
  offer: z.boolean(),
  imageBlobId: z.string(),
  imageUrl: z.string().url().optional(), // Añadido para soporte de URLs externas/temporales
  description: z.string(),
  hasVariants: z.boolean(),
  specs: z.record(z.union([z.string(), z.array(z.string()), z.number(), z.boolean()])).optional(),
});

const ProductsArraySchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;

/**
 * Valida y retorna los productos. 
 * Al ser un import estático, Next.js ya lo tiene en memoria.
 */
function validateProducts(): Product[] {
  const result = ProductsArraySchema.safeParse(productsData);
  
  if (!result.success) {
    console.error('❌ Error de validación en products.json:', result.error.format());
    return [];
  }
  
  return result.data;
}

// Cacheamos el resultado para no validar en cada llamada (aunque el import ya es estático)
let cachedProducts: Product[] | null = null;

export function getProducts(): Product[] {
  if (!cachedProducts) {
    cachedProducts = validateProducts();
  }
  return cachedProducts;
}

/**
 * Helper optimizado para buscar un producto por su slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find(p => p.slug === slug);
}

/**
 * Helper adicional: Filtrar productos por categoría
 */
export function getProductsByCategory(categoryId: string): Product[] {
  return getProducts().filter(p => p.categoryId === categoryId);
}