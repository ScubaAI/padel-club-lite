# ️ Padel Outlet Club Lite - Bitácora de Mantenimiento

> **Sprint Inaugural:** Junio 11, 2026  
> **Estado:** MVP Funcional ✅ | **Rama:** master

## 📋 Resumen de Avances del Día

Hoy se completó la fase de construcción inicial del proyecto. Se pasó de cero a un MVP funcional con arquitectura modular, integración de pagos Bitcoin y asistente AI.

### ✅ Logros Técnicos Completados

| Componente | Estado | Notas Clave |
| :--- | :--- | :--- |
| **Arquitectura Base** | ✅ Completo | Next.js 14 App Router, Tailwind, Framer Motion |
| **Design System** | ✅ Completo | Variables CSS, fuentes Google, paleta Sporty Tech |
| **Catálogo JSON** | ✅ Completo | Zod validation, Server Components, SEO dinámico |
| **Navegación Móvil** | ✅ Completo | StickyBottomNav, CategoryRail con scroll-snap |
| **Pagos Blink** | ✅ Completo | QR dinámico, POS URL, mock API listo para live |
| **AI Assistant** | ✅ Completo | Groq SDK, prompts separados, RAG-ready |
| **WhatsApp** | ✅ Completo | Click-to-chat, plantillas, notify-lead API route |
| **Footer Oficial** | ✅ Completo | Bull Bitcoin sponsor, AceptaBitcoin.org credits |
| **Documentación** | ✅ Completo | README.md, design-system.md, map.md |

### 🔧 Configuraciones Activas

-   **Repositorio:** `https://github.com/ScubaAI/padel-club-lite`
-   **Remote:** origin/master (sincronizado)
-   **Variables Críticas:** GROQ_API_KEY, BLINK_POS_URL, WHATSAPP_NUMBER (+525586765117)
-   **Contacto Dev:** hola@aceptabitcoin.org

### ⚠️ Deuda Técnica & Próximos Pasos

Estas son tareas identificadas pero NO bloqueantes para el MVP actual:

1.  [ ] Configurar Twilio/Meta WhatsApp API real (actualmente usa wa.me links)
2.  [ ] Reemplazar mock de Blink por API key de producción (`sk_live_...`)
3.  [ ] Implementar RAG real para AI (Pinecone/Supabase Vector)
4.  [ ] Agregar analytics (Plausible/GA4) para medir conversión WhatsApp
5.  [ ] Crear `.env.example` seguro para nuevos colaboradores
6.  [ ] Setup husky + lint-staged para pre-commit hooks

### 🐛 Bugs Conocidos / Observaciones

-   El botón "Pagar con Sats" usa URL de Blink POS; la invoice directa vía GraphQL está comentada hasta tener API key.
-   Las imágenes de Unsplash en Hero son temporales; reemplazar por Vercel Blob cuando tengamos fotos reales de productos.
-   El VirtualAssistant no persiste historial entre sesiones (diseño intencional para privacidad MVP).

### 📅 Próximo Sprint Sugerido

**Objetivo:** Validación en vivo y optimización de conversión.
1.  Deploy a Vercel production
2.  Testeo de flujo completo en móvil real (iPhone + Android)
3.  Medición de CTR en botón WhatsApp y Blink Pay
4.  Ajuste de System Prompt de Groq basado en queries reales

---

*Última actualización: 2026-06-11 | Autor: ScubaAI / AceptaBitcoin.org*
