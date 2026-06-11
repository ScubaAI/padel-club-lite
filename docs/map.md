# 🗺️ Padel Outlet Club Lite - Master Map & Event Flow

> **Versión:** 1.0 | **Estado:** En Construcción 🚧
> **Objetivo:** Servir como plano arquitectónico único. Define rutas, flujo de datos JSON y mapeo de eventos de usuario.

## 1. Arquitectura de Rutas (App Router)
Usamos **Route Groups** para separar contextos lógicos sin afectar la URL.

| Ruta | Grupo | Layout | Descripción | Componente Clave |
|---|---|---|---|---|
| `/` | `(marketing)` | `layout-marketing.tsx` | Landing Page. Hero + Categorías Horizontales. | `CategoryRail`, `HeroSection` |
| `/asesoria` | `(marketing)` | `layout-marketing.tsx` | Booking Cal.com. Sin distracciones de tienda. | `CalEmbed` |
| `/catalogo` | `(shop)` | `layout-shop.tsx` | Grid de productos con filtros móviles. | `ProductGrid`, `MobileFilterSheet` |
| `/catalogo/[slug]` | `(shop)` | `layout-shop.tsx` | Detalle de producto. Lead capture focus. | `ProductDetail`, `InterestModal` |
| `/api/blink` | `api` | N/A | Generación de invoices/wallets de papel. | `blink-api.ts` |
| `/api/products` | `api` | N/A | Endpoint para fetch dinámico del JSON. | `products.json` |

### ⚠️ Regla de Oro de Rutas:

- **Nunca** mezcles componentes de `(marketing)` dentro de `(shop)` directamente. Usa componentes compartidos (`components/shared`) si necesitas reutilizar lógica.
- La navegación móvil (`StickyBottomNav`) **SOLO** existe dentro del grupo `(shop)`.

## 2. Flujo de Datos (JSON Driven) 🔌
No hay base de datos SQL/NoSQL todavía. Todo nace de `/data/products.json`.

```
mermaidCodePreview
```

### Estructura de Datos Esperada:

```
json123456789
```

## 3. Mapa de Eventos e Interacciones 🎯
Aquí definimos qué pasa cuando el usuario toca algo. Crucial para el desarrollo móvil.

### A. Navegación Móvil (Sticky Bottom Nav)

- **Evento:** `onClick` en icono de nav.
- **Acción:** `router.push('/ruta')`.
- **Feedback:** Icono cambia a color `primary` (#00D4FF). Animación suave de transición de página.

### B. Exploración de Categorías (Home)

- **Componente:** `CategoryRail`
- **Evento:** Horizontal Scroll / Tap en categoría.
- **Acción:** Filtra el grid principal O navega a `/catalogo?cat=valor`.
- **UX:** Scroll Snap activado. El item seleccionado se centra automáticamente.

### C. Interés en Producto (Lead Gen)

- **Componente:** `ProductCard` o `ProductDetail`
- **Botón:** "Consultar Disponibilidad" / "Me Interesa"
- **Evento:** Click.
- **Acción:** Abre `InterestModal` (Framer Motion overlay).
- **Modal Contenido:** Formulario simple (Nombre, Tel) + Botón directo a Cal.com.
- **NO HAY:** Add to cart, checkout tradicional.

### D. Pago / Wallet de Papel (Blink Integration)

- **Componente:** `PadelPayModal`
- **Evento:** Selección de monto + Click "Generar QR".
- **Acción:** Fetch a `/api/blink`.
- **Respuesta:** Invoice Lightning o URL de canje.
- **UI Update:** Muestra QR Code + Botón "Copiar Address".
- **Feedback:** Vibración háptica (si disponible) al copiar.

### E. Asistente Virtual

- **Componente:** `VirtualAssistant` (Floating Button)
- **Evento:** Click en botón flotante (esquina inferior derecha).
- **Acción:** Despliega chat bubble desde abajo.
- **Lógica:** Match de keywords estáticas contra FAQs predefinidas.

## 4. Dependencias Críticas 📦

| Librería | Uso Específico |
|---|---|
| `next/image` | Optimización automática de imágenes desde Vercel Blob. |
| `framer-motion` | Transiciones de página, hover cards, modales, micro-interacciones. |
| `lucide-react` | Iconografía consistente y ligera. |
| `qrcode.react` | Generación de QRs para Blink Wallet on-the-fly. |
| `cal.com/embed` | Integración nativa de booking en `/asesoria`. |
| `tailwind-merge` | Gestión segura de clases condicionales en componentes UI. |

## 5. Checklist de Desarrollo por Fase ✅

### Fase 1: Cimientos (Actual)

- Crear estructura de carpetas según `map.md`.
- Configurar `design-system.md` en Tailwind config.
- Poblar `products.json` con 5-10 productos reales.
- Implementar `StickyBottomNav` y `CategoryRail`.

### Fase 2: Catálogo & Leads

- Desarrollar `ProductCard` modular.
- Crear `InterestModal` con integración Cal.com.
- Página `/catalogo` con filtros básicos.

### Fase 3: Pagos & Valor Añadido

- Endpoint `/api/blink` funcional.
- `PadelPayModal` integrado en detalle de producto.
- `VirtualAssistant` con FAQs básicas.

---

> ** Nota para el Equipo:** Antes de crear cualquier componente nuevo, consulta este mapa. ¿Encaja en la arquitectura? ¿Reutiliza algo existente? Si la respuesta es no, **refactoriza primero**. Mantengamos la modularidad sagrada. 🙏
