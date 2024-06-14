import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.js", // 入口文件路径
      name: "mock-tool", // 包名
      fileName: (format) => `mock-tool.${format}.js`, // 输出文件命名规则
    },
  },
});