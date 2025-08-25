import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import WindiCSS from "vite-plugin-windicss";

// https://vite.dev/config/
export default defineConfig({
  base: '/International-Cargo-Shipping-Platform/',
  plugins: [react(), WindiCSS()],
});
