// components/payment/BlinkPayButton.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, Copy, Check, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { getBlinkPosUrl, type BlinkInvoiceParams } from '@/lib/blink';
import type { Product } from '@/lib/products';
import { cn } from '@/lib/utils';

interface BlinkPayButtonProps {
  product: Product;
}

export function BlinkPayButton({ product }: BlinkPayButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const blinkParams: BlinkInvoiceParams = {
    amount: product.price,
    currency: product.currency as 'USD' | 'BTC',
    memo: `PADEL_${product.slug.toUpperCase()}`,
  };

  const payUrl = getBlinkPosUrl(blinkParams);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(payUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Botón Principal Activo */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 flex items-center justify-center gap-2 bg-bitcoin hover:bg-orange-500 text-white font-oswald font-bold text-sm uppercase px-6 py-4 rounded-md shadow-[0_0_15px_rgba(247,147,26,0.3)] transition-all tap-scale"
      >
        <Zap size={18} fill="currentColor" />
        Pagar con Sats
      </button>

      {/* Modal de Pago Blink */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed z-[90] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-oswald text-xl font-bold text-secondary uppercase">Pago Lightning</h3>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} /></button>
              </div>

              <div className="bg-white border-2 border-dashed border-bitcoin/30 rounded-xl p-4 flex justify-center mb-4">
                <QRCodeSVG value={payUrl} size={200} level="H" fgColor="#F7931A" bgColor="#FFFFFF" />
              </div>

              <div className="space-y-3">
                <a 
                  href={payUrl} target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-bitcoin hover:bg-orange-500 text-white font-oswald font-bold text-sm uppercase py-3 rounded-lg transition-all tap-scale"
                >
                  Abrir Blink Wallet <ExternalLink size={14} />
                </a>
                
                <button
                  onClick={handleCopy}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 font-space-grotesk text-xs font-bold uppercase py-2.5 rounded-lg transition-all",
                    copied ? "border-green-500 text-green-600 bg-green-50" : "hover:bg-gray-50"
                  )}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Enlace Copiado' : 'Copiar Enlace de Pago'}
                </button>
              </div>

              <p className="text-center text-[10px] text-gray-400 font-inter mt-4">
                Expira en 15 min • Red Lightning Network
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
