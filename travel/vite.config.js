/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,          // describe, test, expect 전역 사용 허용
    environment: "jsdom",   // React DOM 테스트 환경
    setupFiles: "./src/test/setup.js",
  },
});
