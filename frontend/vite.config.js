import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // default, but being explicit
  },
  base: "/static/", // important for Render deployment
});
