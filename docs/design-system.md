# 🎾 Padel Outlet Club - Design System v1.0

> **Filosofía:** "Sporty Tech Minimalist". Profesional, Enérgico, Limpio y High-Tech.
> **Objetivo:** Crear una experiencia móvil fluida ("App-like") que priorice la velocidad y la conversión de leads.

## 1. Color Palette
Nuestros colores están diseñados para alto contraste en móviles bajo luz solar (pistas de pádel exteriores).

| Rol | Nombre | Hex Code | Tailwind Class | Uso Principal |
|---|---:|---:|---:|---|
| **Primary** | Electric Blue | `#00D4FF` | `text-primary` / `bg-primary` | Branding, Iconos, Links activos. |
| **Secondary** | Deep Charcoal | `#1A1A1A` | `text-secondary` / `bg-secondary` | Textos principales, Fondos oscuros, Headers. |
| **Accent** | Neon Lime | `#CCFF00` | `text-accent` / `bg-accent` | **CTAs Principales**, Hover states, Precios destacados. |
| **Background** | Clean White | `#FFFFFF` | `bg-white` | Fondo base de la app. |
| **Surface** | Light Gray | `#F5F5F7` | `bg-gray-50` | Fondos de tarjetas, Inputs, Secciones alternas. |
| **Success** | Bitcoin Orange | `#F7931A` | `text-orange-500` | Exclusivo para pagos Lightning/Blink. |

### Reglas de Contraste:

- Texto sobre `bg-primary`: Usar `text-secondary` o `text-white` con sombra.
- Texto sobre `bg-accent`: Siempre `text-secondary` (negro) para máxima legibilidad.

## 2. 🔤 Typography
Usamos fuentes de Google Fonts optimizadas via `next/font`.

- **Headings (Impacto):** `Oswald` *Estilo:* Bold, Uppercase para títulos grandes. Condensada y deportiva.
- *Uso:* H1, H2, Nombres de productos, Botones principales.

- **Body (Legibilidad):** `Inter` *Estilo:* Regular/Medium. Neutral y limpia.
- *Uso:* Descripciones, Párrafos, Menús.

- **Data/Tech (Precisión):** `Space Grotesk` *Estilo:* Monospaced vibe pero proporcional.
- *Uso:* Precios, Especificaciones técnicas (peso, balance), Códigos QR, IDs.

```
tsx1234
```

## 3. 📐 Layout & Spacing

- **Mobile First:** Todo se diseña primero para pantallas de 375px (iPhone SE/Mini).
- **Grid:** Móvil: 1 columna (List view) o 2 columnas (Grid compacto). Desktop: 3 o 4 columnas.

- **Border Radius:** `rounded-md` (6px): Tarjetas, Botones, Inputs. (Ligeramente redondeado, no circular).
- `rounded-xl` (12px): Modales, Contenedores grandes.

- **Shadows:** `shadow-sm`: Por defecto.
- `shadow-lg`: En hover de tarjetas (`hover:shadow-xl`).
- `shadow-[color]`: Sombras de color neón para elementos interactivos (ej. `shadow-lime-200/50`).

## 4. 🧩 Componentes UI Clave

### A. Buttons

- **Primary (CTA):** Fondo `bg-accent` (Neon Lime), Texto `text-secondary`, Fuente `font-oswald`.
- **Secondary:** Borde `border-secondary`, Fondo transparente, Hover: Fondo `bg-secondary`, Texto `text-white`.
- **Ghost:** Solo texto, usado para filtros o acciones secundarias.

### B. Product Card

- Debe tener una relación de aspecto consistente (ej. 4:5).
- Imagen: `object-contain` para palas, `object-cover` para ropa.
- Precio: Siempre visible en `font-space-grotesk` y color `primary` o `secondary`.
- Acción: No dice "Comprar", dice **"Consultar"** o **"Me Interesa"**.

### C. Navigation (Mobile)

- **Sticky Bottom Bar:** Altura fija de 60px.
- Iconos: Lucide React, tamaño 24px.
- Estado Activo: Icono y texto en `text-primary` o `text-accent`.

## 5. ⚡ Animations (Framer Motion)
No usamos animaciones por decorar, sino para dar feedback.

- **Hover Cards:** `whileHover={{ scale: 1.02, y: -5 }}`
- **Page Transitions:** Fade in suave (`opacity: 0 -> 1`) al cambiar de ruta.
- **Micro-interactions:** Al copiar un address: El icono cambia de `Copy` a `Check` con un pequeño rebote.
- Al añadir interés: El botón hace un pequeño "pulse".

## 6. 📱 Mobile UX Guidelines

1. **Thumb Zone:** Los botones de acción principal (Pagar, Filtrar, Añadir) deben estar en la mitad inferior de la pantalla.
2. **Scroll Snap:** Las categorías horizontales deben usar `scroll-snap-type: x mandatory` para sentirse nativas.
3. **Inputs:** Altura mínima de 44px (estándar Apple) para facilitar el toque.
4. **Loading States:** Usar skeletons grises (`bg-gray-200 animate-pulse`) mientras cargan las imágenes de Vercel Blob.

## 7. ️ Tech Stack References

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Fonts:** next/font/google (Oswald, Inter, Space Grotesk)
- **Images:** next/image + Vercel Blob

---

> **Nota para Desarrolladores:** Si estás dudando entre dos diseños, elige el que sea **más rápido de cargar** y **más fácil de leer en un móvil bajo el sol**. 🌞🎾
