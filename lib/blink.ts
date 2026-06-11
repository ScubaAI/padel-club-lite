// lib/blink.ts
export interface BlinkInvoiceParams {
  amount: number;
  currency: 'USD' | 'BTC';
  memo?: string;
}

export interface BlinkInvoiceResponse {
  invoice: string; // lightning:lnbc...
  paymentRequest: string;
  expiresAt: Date;
  id: string;
}

/**
 * Genera URL de Blink POS para redirección directa (MVP Rápido)
 */
export function getBlinkPosUrl(params: BlinkInvoiceParams): string {
  const baseUrl = process.env.NEXT_PUBLIC_BLINK_POS_URL || 'https://pay.blink.sv/padeloutlet';
  const searchParams = new URLSearchParams({
    amount: params.amount.toString(),
    currency: params.currency,
    ...(params.memo && { memo: params.memo }),
  });
  
  return `${baseUrl}?${searchParams.toString()}`;
}

/**
 * Crea Invoice Lightning vía API (Para integración avanzada futura)
 * NOTA: Requiere BLINK_API_KEY en .env.local
 */
export async function createBlinkInvoice(params: BlinkInvoiceParams): Promise<BlinkInvoiceResponse> {
  // TODO: Descomentar cuando tengas API Key
  /*
  const response = await fetch('https://api.blink.sv/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.BLINK_API_KEY!,
    },
    body: JSON.stringify({
      query: `mutation LnUsdInvoiceCreate($input: LnUsdInvoiceCreateInput!) {
        lnUsdInvoiceCreate(input: $input) {
          invoice { paymentRequest }
        }
      }`,
      variables: {
        input: {
          walletId: "TU_WALLET_ID",
          amount: params.amount,
          memo: params.memo,
        }
      }
    })
  });
  const data = await response.json();
  return {
    invoice: data.data.lnUsdInvoiceCreate.invoice.paymentRequest,
    paymentRequest: data.data.lnUsdInvoiceCreate.invoice.paymentRequest,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    id: `blink_${Date.now()}`,
  };
  */

  // Mock seguro para desarrollo MVP
  console.log('⚡ [BLINK MOCK] Invoice generada:', params);
  return {
    invoice: `lightning:lnbc${params.amount}u1mock_invoice_for_${params.memo}`,
    paymentRequest: `lnbc${params.amount}u1mock_pr`,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    id: `mock_${Date.now()}`,
  };
}
