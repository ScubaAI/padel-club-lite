import { z } from 'zod';

// Esquema flexible para specs técnicos (peso, balance, tallas, etc.)
export const ProductSpecSchema = z.record(
  z.union([z.string(), z.array(z.string()), z.number(), z.boolean()])
);

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  // Usamos string para permitir nuevas marcas sin romper el build
  categoryId: z.enum(['cat_palas', 'cat_ropa', 'cat_accesorios']),
  brandId: z.string(), 
  price: z.number().positive(),
  originalPrice: z.number().positive().nullable(),
  currency: z.string().default('MXN'),
  offer: z.boolean(),
  imageBlobId: z.string(),
  imageUrl: z.string().url().optional(), // Añadido para soporte de URLs temporales/externas
  description: z.string(),
  hasVariants: z.boolean(),
  specs: z.object({
    brand: z.string(),
    type: z.string(),
    material: z.string().optional(),
    color: z.string().optional(),
    colors: z.array(z.string()).optional(),
    availableSizes: z.array(z.string()).optional(),
    year: z.string().optional(),
    model: z.string().optional(),
    edition: z.string().optional(),
    series: z.string().optional(),
    version: z.string().optional(),
    feel: z.string().optional(),
    shape: z.string().optional(),     // Añadido: Crucial para la IA (Diamante/Redonda)
    balance: z.string().optional(),   // Añadido: Crucial para la IA (Alto/Bajo)
    weight: z.string().optional(),    // Añadido: Crucial para la IA (360-370g)
  }).catchall(z.any()), // Permite campos extra sin romper la validación
});

export const CatalogSchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;