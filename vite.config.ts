import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), reactRefresh()],
  server: {
    proxy: {
      "/upyun": {
        target: "http://v0.api.upyun.com",
        changeOrigin: true,
        rewrite: (url_path) => url_path.replace(/^\/upyun/, "/"),
      },
      "/testproviewCavas": {
        target: "https://test.cdn.zzfzyc.com",
        changeOrigin: true,
        rewrite: (url_path) => url_path.replace(/^\/testproviewCavas/, "/"),
      },
      "/productCavas": {
        target: `https://cdn.zzfzyc.com`,
        changeOrigin: true,
        rewrite: (url_path) => url_path.replace(/^\/productCavas/, "/"),
      },
    },
    hmr: true,
  },

  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      "~": path.resolve(__dirname, "./"), // 根路径
      "@": path.resolve(__dirname, "./src"), //配置@别名
    },
  },
  css: {
    preprocessorOptions: {
      //scss文件
      scss: {
        additionalData: `@import "@/assets/common.scss";`,
        javascriptEnabled: true,
      },
    },
  },
  base: "./", //设置项目的根目录
  build: {
    outDir: "lib",
    minify: "esbuild",
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
  },
});
