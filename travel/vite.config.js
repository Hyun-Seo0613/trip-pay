/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',

    pool: 'threads',
    maxThreads: 1,
    minThreads: 1,
    testTimeout: 10000,
  },
});

