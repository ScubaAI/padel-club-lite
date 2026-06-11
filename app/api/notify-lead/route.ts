// app/api/notify-lead/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const LeadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  productName: z.string().optional(),
  source: z.enum(['modal', 'ai-chat', 'cal-com']).default('modal'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = LeadSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 });
    }

    const { name, phone, productName, source } = validation.data;

    // Construir mensaje para TI (el dueño)
    const messageToOwner = `🔥 NUEVO LEAD PADDEL OUTLET\n\n` +
      `👤 Nombre: ${name}\n` +
      `📱 Tel: ${phone}\n` +
      `🎯 Fuente: ${source}\n` +
      `${productName ? `🏷️ Producto: ${productName}\n` : ''}` +
      `⏰ ${new Date().toLocaleString('es-MX')}`;

    // Enviar vía Twilio (Requiere TWILIO_ACCOUNT_SID, AUTH_TOKEN en .env)
    // Si no tienes Twilio configurado aún, esto loguea en consola como fallback seguro
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      const client = require('twilio')(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      
      await client.messages.create({
        body: messageToOwner,
        from: `whatsapp:+${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:+${process.env.OWNER_WHATSAPP_NUMBER}`,
      });
      
      console.log('✅ Notificación WhatsApp enviada via Twilio');
    } else {
      console.log('⚠️ [MOCK TWILIO] Lead recibido:', messageToOwner);
      console.log('💡 Configura TWILIO_* vars en .env para activar notificaciones reales');
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error notificando lead:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
