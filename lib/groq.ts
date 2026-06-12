import Groq from 'groq-sdk';
import { buildDynamicPrompt, type KnowledgeBaseContext } from './prompts/padel-expert';

// Inicialización del cliente Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

/**
 * Obtiene una respuesta del asistente virtual Padel Expert.
 * Optimizado para baja latencia y respuestas concisas (Mobile-First).
 */
export async function getGroqCompletion(
  messages: ChatMessage[],
  context?: KnowledgeBaseContext
): Promise<string> {
  
  // Validación de entorno segura para builds
  if (!process.env.GROQ_API_KEY) {
    console.warn('⚠️ GROQ_API_KEY missing. Falling back to static mode or error message.');
    return '⚠️ El asistente inteligente está en mantenimiento. Por favor, contáctanos por WhatsApp.';
  }

  try {
    const systemPrompt = buildDynamicPrompt(context);
    
    // Limpieza de historial para optimizar tokens y latencia
    const cleanHistory = messages
      .filter((msg) => msg.role !== 'system')
      .slice(-6); // 6 mensajes es suficiente para contexto inmediato en móvil

    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || 'llama3-8b-8192', // 8b es más rápido y barato, 70b si necesitas más razonamiento
      messages: [
        { role: 'system', content: systemPrompt },
        ...cleanHistory,
      ],
      temperature: 0.2,  // Baja temperatura para precisión en datos técnicos (peso, balance)
      max_tokens: 150,   // Respuestas cortas y al grano (Design System: Legibilidad)
      top_p: 0.9,
    });

    return completion.choices[0]?.message?.content?.trim() || 'No pude procesar tu pregunta. ¿Podrías reformularla?';
  } catch (error) {
    console.error('Error en integración Groq:', error);
    // Fallback alineado con el flujo de conversión del Mapa
    return '🤖 Mi conexión con la base de datos de palas falló momentáneamente. Si buscas algo específico, te recomiendo usar el botón de "Asesoría Personalizada" abajo.';
  }
}