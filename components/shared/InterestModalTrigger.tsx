// components/shared/InterestModalTrigger.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck, MessageCircle, X, Check } from 'lucide-react';
import type { Product } from '@/lib/products';
import { createWhatsappLink, WA_TEMPLATES } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

interface InterestModalTriggerProps {
  product: Product;
}

export function InterestModalTrigger({ product }: InterestModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // 1. Notificarte a TI (background)
  fetch('/api/notify-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formData.name,
      phone: formData.phone,
      productName: product.name,
      source: 'modal',
    }),
  }).catch(err => console.error('Error notificando lead:', err));

  // 2. Mostrar éxito + Opción de WhatsApp directo
  setSubmitted(true);
  
  // Opcional: Abrir WhatsApp automáticamente después de 2 seg
  setTimeout(() => {
    const waLink = createWhatsappLink(WA_TEMPLATES.leadGeneral(formData.name, formData.phone));
    window.open(waLink, '_blank');
  }, 2000);
};
  return (
    <>
      {/* Botón Trigger Principal */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-lime-400 text-secondary font-oswald font-bold text-sm uppercase px-6 py-4 rounded-md shadow-neon-lime transition-all tap-scale"
      >
        <MessageCircle size={18} />
        Consultar Disponibilidad
      </button>

      {/* Modal / Bottom Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitted && setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />

            {/* Panel Contenido */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={cn(
                "fixed z-[70] bg-white rounded-t-2xl md:rounded-2xl p-6 safe-bottom",
                "bottom-0 left-0 right-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md md:bottom-auto"
              )}
            >
              {/* Header */}
              {!submitted ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-oswald text-xl font-bold text-secondary uppercase">
                      Me Interesa
                    </h3>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>

                  {/* Producto Miniatura */}
                  <div className="bg-surface rounded-lg p-3 mb-6 flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center text-xs font-space-grotesk font-bold text-gray-400">
                      IMG
                    </div>
                    <div>
                      <p className="font-oswald text-sm font-bold text-secondary uppercase truncate max-w-[180px]">
                        {product.name}
                      </p>
                      <p className="font-space-grotesk text-primary font-bold text-sm">
                        ${product.price.toLocaleString()} {product.currency}
                      </p>
                    </div>
                  </div>

                  {/* Formulario Rápido */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block font-space-grotesk text-xs font-bold text-gray-500 uppercase mb-1">
                        Nombre
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-surface border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="Tu nombre"
                      />
                    </div>
                    
                    <div>
                      <label className="block font-space-grotesk text-xs font-bold text-gray-500 uppercase mb-1">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-surface border border-gray-200 rounded-lg px-4 py-3 font-inter text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="+52 55..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-secondary hover:bg-black text-white font-oswald font-bold text-sm uppercase py-3 rounded-lg transition-all tap-scale mt-2"
                    >
                      Enviar Consulta
                    </button>
                  </form>

                  {/* Divider + Cal.com Alternative */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-space-grotesk">O reserva directo</span></div>
                  </div>

                  <a
                    href={`https://cal.com/padel-outlet/asesoria?product=${product.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-oswald font-bold text-sm uppercase py-3 rounded-lg transition-all tap-scale"
                  >
                    <CalendarCheck size={16} />
                    Agendar Asesoría Gratis
                  </a>
                </>
              ) : (
                <div className="py-8 text-center">
  <h3 className="font-oswald text-xl font-bold text-secondary uppercase mb-2">
    ¡Consulta Enviada!
  </h3>
  <p className="font-inter text-gray-600 text-sm mb-4">
    Te contactaremos pronto. ¿Quieres agilizarlo?
  </p>
  <a
    href={createWhatsappLink(WA_TEMPLATES.leadGeneral(formData.name, formData.phone))}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-oswald font-bold text-sm uppercase px-6 py-3 rounded-lg transition-all tap-scale shadow-lg"
  >
    Escribir por WhatsApp Ahora
  </a>
</div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
