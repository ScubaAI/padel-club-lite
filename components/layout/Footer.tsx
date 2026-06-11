// components/layout/Footer.tsx
'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Mail, Zap, Smartphone } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Detección de OS para Bull Bitcoin Download
  const [downloadUrl, setDownloadUrl] = useState("https://play.google.com/store/search?q=bull%20bitcoin&c=apps&hl=en");

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isApple = /iphone|ipad|ipod|macintosh/.test(userAgent);
    if (isApple) {
      setDownloadUrl("https://apps.apple.com/us/app/bull-bitcoin/id6743380972");
    }
  }, []);

  return (
    <footer className="relative bg-secondary text-white pt-16 pb-8 border-t border-gray-800">
      {/* Textura de fondo sutil (opcional, patrón de red de pádel o malla) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('/textures/padel-mesh.png')] mix-blend-overlay" aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-12">
          {/* Columna 1: Branding & Sponsor Principal (Bull Bitcoin) */}
          <div className="text-center md:text-left flex flex-col justify-between h-full">
            <div>
              <h3 className="font-oswald text-3xl font-bold uppercase tracking-tight mb-2">
                Padel Outlet <span className="text-primary">Club</span>
              </h3>
              <p className="font-inter text-sm text-gray-400 mb-6 leading-relaxed max-w-xs mx-auto md:mx-0">
                Equipamiento premium para jugadores exigentes. 
                Pagos en Lightning Network. Envíos a todo México.
              </p>
            </div>

            {/* Bloque Premium: Patrocinador Oficial - Bull Bitcoin */}
            <div className="flex flex-col gap-4 mt-4 items-center md:items-start">
              <motion.a 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={downloadUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative w-full md:w-auto inline-flex items-center justify-between gap-3 px-4 py-3 rounded-xl 
                  bg-white/5 backdrop-blur-sm
                  border border-accent/30 
                  shadow-[0_0_15px_rgba(204,255,0,0.1)] 
                  hover:border-accent hover:bg-accent/10
                  transition-all duration-300"
              >
                <div className="flex items-center gap-3 text-left">
                  {/* El torito feliz brincando */}
                  <span className="text-2xl group-hover:animate-bounce filter drop-shadow-md">🐂</span>
                  <div>
                    <p className="font-space-grotesk text-[10px] text-accent uppercase tracking-widest font-bold">
                      Wallet Oficial del Sitio
                    </p>
                    <p className="font-inter text-xs font-bold text-white flex items-center gap-1">
                      Bull Bitcoin <Zap size={10} className="text-accent fill-current" />
                    </p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-accent group-hover:translate-x-1 transition-transform" />
              </motion.a>

              {/* Firma de Desarrollador */}
              <div className="inline-block px-4 py-2 rounded-lg bg-white/5 border border-gray-700 text-center md:text-left mt-2">
                <p className="font-space-grotesk text-[11px] text-gray-400 uppercase tracking-wider">
                  Diseñado por <a 
                    href="https://www.aceptabitcoin.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent hover:underline font-bold transition-colors"
                  >AceptaBitcoin.org</a>
                </p>
              </div>
            </div>
          </div>

          {/* Columna 2: Contacto & Ubicación Digital */}
          <div className="text-center flex flex-col justify-center items-center">
            <h4 className="font-oswald text-lg font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-wide">
              <Mail size={18} className="text-primary" />
              Contacto Directo
            </h4>
            
            <div className="flex flex-col gap-4 w-full max-w-xs items-center">
              {/* Email Principal */}
              <Link 
                href="mailto:hola@aceptabitcoin.com"
                className="w-full rounded-xl border border-gray-700 bg-white/5 hover:bg-white/10 hover:border-primary transition-all duration-300 px-5 py-3 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 text-left">
                  <span className="text-xl">✉️</span>
                  <div>
                    <span className="block font-inter text-sm font-bold text-white">Correo Electrónico</span>
                    <span className="block font-space-grotesk text-[11px] text-gray-400">hola@aceptabitcoin.com</span>
                  </div>
                </div>
                <ExternalLink size={14} className="text-gray-500 group-hover:text-primary transition-colors" />
              </Link>

              {/* WhatsApp Business */}
              <Link 
                href="https://wa.me/525586765117?text=Hola,%20vengo%20de%20Padel%20Outlet%20Club"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl border border-gray-700 bg-white/5 hover:bg-[#25D366]/10 hover:border-[#25D366] transition-all duration-300 px-5 py-3 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3 text-left">
                  <span className="text-xl">💬</span>
                  <div>
                    <span className="block font-inter text-sm font-bold text-white">WhatsApp</span>
                    <span className="block font-space-grotesk text-[11px] text-gray-400">+52 55 8676 5117</span>
                  </div>
                </div>
                <ExternalLink size={14} className="text-gray-500 group-hover:text-[#25D366] transition-colors" />
              </Link>
            </div>
          </div>

          {/* Columna 3: Legal & Badges */}
          <div className="text-center md:text-right flex flex-col justify-between items-center md:items-end h-full">
            <div className="mb-6">
              <h4 className="font-oswald text-lg font-bold text-white mb-4 flex items-center gap-2 md:justify-end uppercase tracking-wide">
                <Zap size={18} className="text-accent" />
                Pagos & Tecnología
              </h4>
              
              <div className="flex flex-wrap justify-center md:justify-end gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 text-orange-500 text-xs font-space-grotesk font-bold border border-orange-500/20">
                  <Zap size={12} fill="currentColor" /> Lightning Network
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-space-grotesk font-bold border border-primary/20">
                  <Smartphone size={12} /> Cal.com Integration
                </span>
              </div>
            </div>

            {/* Redes Sociales (Placeholder para futuro) */}
            <div className="flex gap-3 mb-4">
               <a href="#" className="p-2.5 rounded-full bg-white/5 text-gray-400 hover:bg-primary hover:text-secondary transition-all duration-300 border border-gray-700 hover:border-primary">
                 <span className="sr-only">Instagram</span>
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.849.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.849.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
               </a>
               <a href="#" className="p-2.5 rounded-full bg-white/5 text-gray-400 hover:bg-primary hover:text-secondary transition-all duration-300 border border-gray-700 hover:border-primary">
                 <span className="sr-only">Twitter/X</span>
                 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
               </a>
            </div>
            
            <div className="mt-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-space-grotesk font-bold border border-accent/20 uppercase tracking-wider">
                 Powered by Bitcoin
              </span>
            </div>
          </div>
        </div>

        {/* Copyright Final */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="font-inter text-xs text-gray-500">
            © {currentYear} Padel Outlet Club Lite. Todos los derechos reservados.
          </p>
          <p className="font-space-grotesk text-[10px] text-gray-600 mt-1">
            Hecho con 🎾, ⚡ y mucho ☕ en México.
          </p>
        </div>
      </div>
    </footer>
  );
}

  
