// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getGroqCompletion, type ChatMessage } from '@/lib/groq';
import { z } from 'zod';

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(1000),
});

const RequestSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(20),
  productId: z.string().optional(), // Para futuro RAG contextual
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = RequestSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Formato de mensaje inválido' },
        { status: 400 }
      );
    }

    const { messages, productId } = validation.data;

    // TODO: Aquí inyectarías contexto RAG si productId existe
    // const productContext = productId ? await getProductContext(productId) : undefined;

    const response = await getGroqCompletion(messages);

    return NextResponse.json({ 
      reply: response,
      timestamp: new Date().toISOString() 
    });

  } catch (error) {
    console.error('API Chat Error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

// Rate limiting básico (mejorar con Redis en producción)
export const dynamic = 'force-dynamic';
