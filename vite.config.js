import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: true,
    proxy: {
      // '/': {
      //   target: 'http://172.20.10.13:16991',
      //   changeOrigin: true,
      //   secure: false,
      //   // rewrite: (path) => path.replace(/^\/api/, '')
      // }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import '@/assets/styles/global.scss';`
        additionalData: `@use "@/assets/styles/global.scss" as *;`
      }
    }
  },
  define: {
    'process.env': {
      VUE_APP_BASE_API: '/'
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.json', 'ts']
  },
  plugins: [
    vue(),
    AutoImport({
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver(),
        // 自动导入图标组件
        IconsResolver()
      ]
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver(),
        // 自动注册图标组件
        IconsResolver({
          prefix: 'Icon',
          enabledCollections: ['ep']
        })
      ]
    }),
    Icons({
      autoInstall: true
    })
  ],
})
