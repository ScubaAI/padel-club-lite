# 📄 README.md

```
12345678910111213141516171819202122232425262728293031323334353637383940414243444546474849505152535455
```

## ⚡ Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+
- npm / pnpm / yarn
- Cuenta en Vercel (para Blob y Deploy)
- API Keys (Groq, Blink, Twilio/Meta)

### Pasos Rápidos
1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/ScubaAI/padel-club-lite.git
   ```
2. **Instala dependencias:**
   ```bash
   npm install   # or pnpm install / yarn install
   ```
3. **Configura variables de entorno:**
   - Crea un archivo `.env.local` basado en `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
4. **Inicia servidor de desarrollo:**
   ```bash
   npm run dev
   ```
5. Abre `http://localhost:3000` en tu navegador.

## Despliegue en Vercel

La forma recomendada y más rápida de desplegar:
1. Importa este repositorio en Vercel Dashboard.
2. En **Settings > Environment Variables**, añade todas las variables de `.env.local`.
   - Nota: Las variables con prefijo `NEXT_PUBLIC_` son expuestas al cliente. Las demás (API Keys) son seguras en servidor.
3. Vincula almacenamiento Vercel Blob desde la pestaña **Storage**.
4. Haz clic en **Deploy**. ¡Listo!

> **💡 Tip Pro:** Usa `npm run build` localmente antes de hacer push para asegurar que no hay errores de TypeScript o validación Zod.

## Características Clave
- **Mobile-First Navigation:** Barra inferior fija con glassmorphism y safe‑area support.
- **JSON Driven Catalog:** Cambia productos editando solo `data/products.json`. Sin DB migrations.
- **AI Assistant Ready:** Arquitectura de prompts separada lista para escalar a RAG con Pinecone/Supabase.
- **Lead Capture Dual:** Formulario rápido + Link directo a Cal.com.
- **WhatsApp Integration:** Notificaciones automáticas de nuevos leads a tu teléfono.
- **Performance First:** LCP optimizado, imágenes lazy‑loaded, cero JS innecesario.

## 🤝 Contribuciones
Este proyecto sigue la filosofía "Value‑First". Si quieres contribuir:
- Lee `docs/design-system.md` y `docs/map.md`.
- Mantén los componentes modulares y reutilizables.
- Valida siempre los datos con Zod.
- Prioriza la experiencia móvil sobre la desktop.

## Licencia
MIT License – ver `LICENSE` para detalles.

Desarrollado con ⚡ por **ScubaAI** para la comunidad de pádel y Bitcoin.
