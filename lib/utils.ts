import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Une clases de CSS condicionales y resuelve conflictos de Tailwind de manera inteligente.
 * Esencial para componentes dinámicos en la experiencia "App-like" móvil.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea un número al estándar de moneda local (MXN de forma predeterminada).
 * Ideal para las etiquetas de precio y descuentos del Design System.
 * Ejemplo: 4699 -> $4,699.00
 */
export function formatPrice(amount: number, currency: string = 'MXN'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Trunca textos largos de manera elegante con elipsis (...).
 * Súper útil para mantener limpias las ProductCards en vistas móviles.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}