import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// vite.config.ts
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  css: {
    preprocessorOptions: {
      // 这里配置 mixin.scss 混合文件的全局引入
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
});
