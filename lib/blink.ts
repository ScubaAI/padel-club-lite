// lib/blink.ts

export interface BlinkPosParams {
  amount: number;      // Precio del producto (ej: 4699.00)
  currency: 'MXN' | 'USD'; 
  memo: string;        // Nombre del producto + variante para identificar la venta en tu app de Blink
}

// Alias para compatibilidad con imports existentes
export type BlinkInvoiceParams = BlinkPosParams;

/**
 * Convierte de manera aproximada MXN a USD para la POS de Blink.
 * Nota: Modifica la constante FX_RATE según el mercado actual.
 */
function convertMxnToUsd(mxnAmount: number): number {
  const FX_RATE = 17.5; 
  return Math.round((mxnAmount / FX_RATE) * 100) / 100;
}

/**
 * Genera la URL directa a tu punto de venta en Blink.
 * El usuario dará clic y completará el pago nativamente en la web de Blink.
 */
export function getBlinkPosUrl(params: BlinkPosParams): string {
  const baseUrl = process.env.NEXT_PUBLIC_BLINK_POS_URL || 'https://pay.blink.sv/padeloutlet';
  
  // Forzamos conversión si la data viene en MXN ya que la POS de Blink suele configurarse en USD o Sats
  const finalAmount = params.currency === 'MXN' ? convertMxnToUsd(params.amount) : params.amount;

  const searchParams = new URLSearchParams({
    amount: finalAmount.toString(),
    currency: 'USD', // Asegura que la POS reciba el valor interpretado en USD
    memo: params.memo,
  });
  
  return `${baseUrl}?${searchParams.toString()}`;
}