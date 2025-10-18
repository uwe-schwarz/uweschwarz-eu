import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  optimizeDeps: {
    include: [ 'buffer' ]
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      buffer: path.resolve(__dirname, 'node_modules', 'buffer', 'index.js'),
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
