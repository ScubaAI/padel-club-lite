// lib/whatsapp.ts

export const WHATSAPP_NUMBER = '525586765117'; // Formato E.164 sin +

export interface WhatsappTemplate {
  text: string;
  encodedUrl: string;
}

/**
 * Genera enlace Click-to-Chat con mensaje predefinido
 */
export function createWhatsappLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Plantillas de mensajes según contexto
 */
export const WA_TEMPLATES = {
  leadGeneral: (name: string, phone: string) => 
    `Hola! 👋 Soy ${name}. Me interesa consultar disponibilidad de productos en Padel Outlet Club. Mi tel: ${phone}`,
  
  productInquiry: (productName: string, price: number) => 
    `Hola! 🎾 Vi la ${productName} ($${price}) en su web y quiero saber si tienen stock/tallas disponibles.`,
  
  aiFallback: (lastQuestion: string) => 
    `Hola! El asistente virtual no pudo responder mi duda: "${lastQuestion}". ¿Podrían ayudarme?`,
    
  blinkPaymentSupport: (amount: number, productId?: string) =>
    `Hola! ⚡ Quiero confirmar un pago de $${amount} USD vía Blink/Lightning${productId ? ` para el producto ${productId}` : ''}. ¿Me apoyan?`
};
