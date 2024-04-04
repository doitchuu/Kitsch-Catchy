import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    collectCoverageFrom: ["src/**/*.jsx", "src/**/*.js"],
    setupFiles: "src/spec/setupTests.js",
    testMatch: ["./src/spec/*.spec.jsx"],
    environment: "jsdom",
    coverage: {
      all: true,
      exclude: ["*.config.js", "*.cjs", "**/main.jsx", "**/Constant.js"],
    },
  },
  plugins: [react()],
});
