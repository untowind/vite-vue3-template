import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router"],
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        secure: true,
        ws: true,
        // rewrite: (path: any) => path.replace(/^\/api/, '/api'),
      },
    },
    cors: true,
  },
  build: {
    outDir: 'dist',
    reportCompressedSize: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      }
    }
  },
})
