import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

import unocss from 'unocss/vite'
import { presetAttributify, presetUno, presetIcons } from 'unocss'
import transformerDirective from '@unocss/transformer-directives'




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),
  unocss({
    rules: [],
    presets: [presetAttributify(), presetUno(), presetIcons()],
    transformers: [
      transformerDirective(),
    ],
  })],
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://10.60.60.150:8081/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }

})






