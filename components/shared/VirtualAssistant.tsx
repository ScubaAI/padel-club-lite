// components/shared/VirtualAssistant.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { createWhatsappLink, WA_TEMPLATES } from '@/lib/whatsapp';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 'welcome', 
      role: 'assistant', 
      content: '¡Hola crack! 🎾 Soy el asistente técnico de Padel Outlet. ¿Buscas pala, zapas o necesitas ayuda con pagos en Sats?', 
      timestamp: Date.now() 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await res.json();
      
      if (res.ok && data.reply) {
        setMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: data.reply,
          timestamp: Date.now(),
        }]);
      } else {
        throw new Error(data.error || 'Error desconocido');
      }
    } catch (error) {
      setMessages(prev => [...prev, {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: '️ Tuvimos un problema de conexión. Intenta de nuevo o escríbenos por WhatsApp.',
          timestamp: Date.now(),
        }]);
        // Añadir botón de WhatsApp como mensaje especial
        setMessages(prev => [...prev, {
          id: crypto.randomUUID() + '-wa',
          role: 'assistant',
          content: `[BUTTON:${createWhatsappLink(WA_TEMPLATES.aiFallback(userMsg.content))}:Hablar con Humano por WhatsApp]`,
          timestamp: Date.now(),
        }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Botón Flotante */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full shadow-neon-blue flex items-center justify-center transition-all safe-bottom",
          isOpen ? "bg-secondary text-white" : "bg-primary text-secondary hover:bg-cyan-400"
        )}
        aria-label="Abrir asistente virtual"
      >
        <AnimatePresence mode=\"wait\">
          {isOpen ? (
            <motion.div key=\"close\" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key=\"open\" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Ventana de Chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col safe-bottom"
            style={{ height: 'min(60vh, 500px)' }}
          >
            {/* Header */}
            <div className="bg-secondary p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <Bot size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-oswald text-sm font-bold text-white uppercase tracking-wide">Asistente Padel</h3>
                  <p className="text-[10px] text-gray-400 font-inter">Online • Respuesta inmediata</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                <X size={16} className="text-gray-400" />
              </button>
            </div>

            {/* Área de Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface/30">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' 
                      ? "ml-auto bg-primary text-secondary rounded-br-none font-medium" 
                      : "mr-auto bg-white border border-gray-100 text-secondary rounded-bl-none shadow-sm"
                  )}
                >
                  {(() => {
                // Detect button markup
                const buttonMatch = msg.content.match(/^\[BUTTON:(.+?):(.+?)\]$/);
                if (buttonMatch) {
                  const [, link, label] = buttonMatch;
                  return (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-oswald font-bold text-sm uppercase px-4 py-2 rounded-lg transition-all tap-scale shadow-lg"
                    >
                      {label}
                    </a>
                  );
                }
                return msg.content;
              })()}
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="mr-auto bg-white border border-gray-100 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1"
                >
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100 shrink-0">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 bg-surface rounded-full px-4 py-2 border border-transparent focus-within:border-primary focus-within:bg-white transition-all"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Pregunta sobre palas, sats..."
                  className="flex-1 bg-transparent border-none outline-none text-sm font-inter text-secondary placeholder:text-gray-400"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className={cn(
                    "p-2 rounded-full transition-all tap-scale",
                    inputValue.trim() && !isTyping 
                      ? "bg-accent text-secondary hover:bg-lime-400" 
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  )}
                >
                  <Send size={16} />
                </button>
              </form>
              <p className="text-[9px] text-center text-gray-400 mt-2 font-space-grotesk">
                Powered by Groq  • Pagos Lightning disponibles
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

