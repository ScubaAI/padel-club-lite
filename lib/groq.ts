// lib/groq.ts
import Groq from 'groq-sdk';
import { buildDynamicPrompt, type KnowledgeBaseContext } from './prompts/padel-expert';

if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY no está configurada en .env.local');
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function getGroqCompletion(
  messages: ChatMessage[],
  context?: KnowledgeBaseContext
): Promise<string> {
  try {
    const systemPrompt = buildDynamicPrompt(context);
    
    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || 'llama3-70b-8192',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.slice(-10), // Mantener solo últimos 10 mensajes para contexto + velocidad
      ],
      temperature: 0.3, // Bajo para respuestas técnicas precisas
      max_tokens: 300,  // Limitar longitud
      top_p: 0.9,
    });

    return completion.choices[0]?.message?.content || 'Lo siento, tuve un error técnico. Intenta de nuevo.';
  } catch (error) {
    console.error('Error en Groq:', error);
    return '️ Mi cerebro está sobrecargado ahora. Por favor contacta a un humano vía WhatsApp o agenda asesoría.';
  }
}
