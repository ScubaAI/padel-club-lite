// lib/whatsapp.ts
import { formatPrice } from './utils';

// Número oficial de la tienda en formato E.164 sin el símbolo "+"
export const WHATSAPP_NUMBER = '525586765117'; 

/**
 * Genera un enlace universal de Click-to-Chat para WhatsApp.
 */
export function createWhatsappLink(message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Plantillas estandarizadas y persuasivas de mensajes para cerrar conversiones.
 */
export const WA_TEMPLATES = {
  /**
   * Lead capturado desde el modal de interés general o formulario de contacto.
   */
  leadGeneral: (name: string, info?: string) => {
    return `Hola! 👋 Me interesa consultar disponibilidad en Padel Outlet Club.\n\n` +
           `👤 Nombre: ${name}\n` +
           `${info ? `📝 Consulta: ${info}` : 'Quiero ver qué palas o accesorios tienen disponibles.'}`;
  },
  
  /**
   * Disparado cuando el usuario quiere una variante específica o una pala del catálogo.
   */
  productInquiry: (params: { productName: string; price: number; variant?: string; slug: string }) => {
    const formattedPrice = formatPrice(params.price, 'MXN');
    const variantText = params.variant ? ` (Talla/Variante: *${params.variant}*)` : '';
    
    return `Hola Padel Outlet! 🎾 Estoy interesado en este producto de la web:\n\n` +
           `📦 *${params.productName}*${variantText}\n` +
           `💰 Precio: ${formattedPrice}\n` +
           `🔗 Link: ${process.env.NEXT_PUBLIC_APP_URL || 'https://padeloutlet.club'}/catalogo/${params.slug}\n\n` +
           `¿Tienen stock disponible para entrega inmediata?`;
  },
  
  /**
   * El salvavidas cuando el bot de IA de Groq se traba o no conoce la respuesta.
   */
  aiFallback: (lastQuestion: string) => {
    return `Hola! El asistente virtual de la página no pudo resolver mi duda. ¿Me podrían ayudar un asesor humano? 🧑‍💻\n\n` +
           `❓ Mi duda era:\n"${lastQuestion}"`;
  },
  
  /**
   * Verificación manual de pagos Blink POS (Enfoque Ultra-Lite).
   */
  blinkPaymentSupport: (amountInUsd: number, productName: string) => {
    return `Hola! ⚡ Acabo de realizar un pago de *$${amountInUsd.toFixed(2)} USD* a través de Blink POS para apartar el siguiente producto:\n\n` +
           `🎾 Producto: *${productName}*\n\n` +
           `¿Podrían confirmarme si ya se reflejó en su wallet para coordinar el envío? 📦`;
  }
};