import vinext from "vinext";
import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-dev-runtime", "react/jsx-dev-runtime.js", "react/jsx-runtime", "react/jsx-runtime.js"],
  },
  plugins: [vinext()],
  resolve: {
    alias: {
      "react/jsx-dev-runtime.js": "react/jsx-dev-runtime",
      "react/jsx-runtime.js": "react/jsx-runtime",
    },
  },
});
