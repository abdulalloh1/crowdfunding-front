import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "node:url";
const url = new URL('./src', import.meta.url)

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext',
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(url),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 8181
  },
  define: { 'process.env': {} },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                @import "@/assets/scss/partials/_vars.scss";
                @import "@/assets/scss/partials/_media.scss";
                @import "@/assets/scss/partials/_mixins.scss";
              `
      },
    },
  },
})
