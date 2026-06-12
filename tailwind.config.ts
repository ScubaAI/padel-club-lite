import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,json}", 
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",     // Electric Blue (#00D4FF)
        secondary: "var(--color-secondary)", // Deep Charcoal (#1A1A1A)
        accent: "var(--color-accent)",       // Neon Lime (#CCFF00)
        bitcoin: "var(--color-bitcoin)",     // Bitcoin Orange (#F7931A)
        surface: "var(--color-surface)",     // Light Gray (#F5F5F7)
      },
      fontFamily: {
        oswald: ["var(--font-oswald)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        space: ["var(--font-space)", "monospace"],
      },
      borderRadius: {
        md: "6px",   
        xl: "12px",  
      },
      // Añadimos sombras personalizadas del Design System (Sección 3)
      boxShadow: {
        'neon-lime': '0 4px 14px 0 rgba(204, 255, 0, 0.3)',
        'neon-blue': '0 4px 14px 0 rgba(0, 212, 255, 0.3)',
      }
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    },
  ],
};

export default config;