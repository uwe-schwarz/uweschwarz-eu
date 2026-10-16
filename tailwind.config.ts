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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      colors: {
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        background: "var(--background)",
        border: "var(--border)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        foreground: "var(--foreground)",
        input: "var(--input)",
        "logo-plate": "var(--logo-plate)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        print: {
          DEFAULT: "var(--print)",
          ink: "var(--print-ink)",
        },
        rail: "var(--rail)",
        redline: {
          DEFAULT: "var(--redline)",
          foreground: "var(--redline-foreground)",
        },
        ring: "var(--ring)",
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
      },
      fontFamily: {
        display: ["var(--font-mona-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        hand: ["var(--font-caveat)", "cursive"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-mona-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config;
