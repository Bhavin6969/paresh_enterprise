import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
  },
  server: {
    port: 5173,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://paresh-enterprise.onrender.com", // FastAPI backend in local dev
        changeOrigin: true,
      },
    },
  },
  base: "/static/", // serve built assets from /static/ in production
});