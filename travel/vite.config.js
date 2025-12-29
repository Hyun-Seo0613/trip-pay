import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js",

    poolOptions: {
      forks: {
        execArgv: ["--max-old-space-size=4096"], // 메모리 부족 방지
      },
    },
    testTimeout: 10000,
  },
});
