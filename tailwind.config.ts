import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/contexts/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/content/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  plugins: [tailwindcssAnimate],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        "gradient-shift": "gradient-shift 6s ease infinite",
        "slide-in-right": "slide-in-right 0.3s ease-out",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(111.4deg, rgba(238,113,113,1) 1%, rgba(246,215,148,1) 58%)",
        "hero-pattern":
          "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0xOGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00em0xOCAwaC0xMmMtMS4xIDAtMiAuOS0yIDIgMCAxLjEuOSAyIDIgMmgxMmMxLjEgMCAyLS45IDItMiAwLTEuMS0uOS0yLTItMnptMCAxOGgtMTJjLTEuMSAwLTIgLjktMiAyIDAgMS4xLjkgMiAyIDJoMTJjMS4xIDAgMi0uOSAyLTIgMC0xLjEtLjktMi0yLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        background: "hsl(var(--background))",
        border: "hsl(var(--border))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        foreground: "hsl(var(--foreground))",
        input: "hsl(var(--input))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        ring: "hsl(var(--ring))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // Custom color palette
        theme: {
          gray: {
            dark: "#1A1F2C",
            DEFAULT: "#8E9196",
            light: "#F7FAFC",
          },
          purple: {
            dark: "#6E59A5",
            DEFAULT: "#7E69AB",
            light: "#9b87f5",
          },
          teal: {
            dark: "#2C7A7B",
            DEFAULT: "#38B2AC",
            light: "#4FD1C5",
          },
        },
      },
      fontFamily: {
        display: ["var(--font-geist-pixel-circle)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.8" },
          "50%": { opacity: "1" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
} satisfies Config;
