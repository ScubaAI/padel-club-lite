// lib/products.ts
import fs from 'fs';
import path from 'path';
import { z } from 'zod';

// Esquema estricto basado en design-system.md y map.md
const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['Palas', 'Zapatillas', 'Ropa', 'Accesorios', 'Paleteros']),
  price: z.number().positive(),
  currency: z.string().default('USD'),
  imageBlobId: z.string(), // ID de Vercel Blob
  description: z.string().optional(),
  specs: z.record(z.string()).optional(), // Peso, balance, etc.
  slug: z.string(),
});

const ProductsArraySchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;

/**
 * Lee y valida products.json en tiempo de ejecución (Server Side)
 * En Next.js App Router, esto solo corre en servidor
 */
export function getProducts(): Product[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'products.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const jsonData = JSON.parse(fileContents);
    
    // Validación estricta
    const result = ProductsArraySchema.safeParse(jsonData);
    
    if (!result.success) {
      console.error('❌ Error de validación en products.json:', result.error.format());
      return []; // Fallback seguro
    }
    
    return result.data;
  } catch (error) {
    console.error(' No se pudo leer products.json:', error);
    return [];
  }
}

/**
 * Helper para buscar producto por slug (para páginas dinámicas)
 */
export function getProductBySlug(slug: string): Product | undefined {
  const products = getProducts();
  return products.find(p => p.slug === slug);
}
