import type { UserConfig, ConfigEnv } from 'vite'

import { resolve } from 'path'
// plugins
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import WindiCSS from 'vite-plugin-windicss'

import vueJsx from '@vitejs/plugin-vue-jsx'

import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

import vueI18n from '@intlify/vite-plugin-vue-i18n'

import { visualizer } from 'rollup-plugin-visualizer'

// vitejs
import { loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { wrapperEnv } from './build/utils'

import pkg from './package.json'
import dayjs from 'dayjs'
import { createProxy } from './build/proxy'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// 设置应用信息
const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()

  const env = loadEnv(mode, root)

  // loadEnv读取的布尔类型是一个字符串。这个函数可以转换为布尔类型
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_HTTPS, VITE_USE_MOCK } =
    viteEnv

  // const isBuild = command === 'build'
  const lifecycle = process.env.npm_lifecycle_event
  return {
    base: VITE_PUBLIC_PATH,
    root,
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    server: {
      https: VITE_HTTPS,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY)
    },
    plugins: [
      vue(),
      WindiCSS(),
      AutoImport({
        imports: ['vue', 'vue-router', '@vueuse/core', '@vueuse/head'],
        resolvers: [ElementPlusResolver()],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/ // .vue
        ],
        dts: true
      }),
      Components({
        resolvers: [ElementPlusResolver(), IconsResolver()],
        dts: true
      }),
      vueJsx(),
      Icons({
        autoInstall: true
      }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: 'mock',
        supportTs: true,
        prodEnabled: VITE_USE_MOCK,
        // 相当于在src/main.ts中inject下面的代码，所以注意文件的路径问题
        injectCode: `
    import { setupProdMockServer } from '../mock/_createProductionServer';
    setupProdMockServer();
  `
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [pathResolve('src/assets/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      // 国际化
      vueI18n({
        // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
        // compositionOnly: false,

        // you need to set i18n resource including paths !
        include: pathResolve('src/locales/**')
      }),
      // 打包分析
      lifecycle === 'report'
        ? visualizer({
            filename: './node_modules/.cache/visualizer/stats.html',
            open: true,
            gzipSize: true,
            brotliSize: true
          })
        : null
    ],
    json: {
      stringify: true
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    resolve: {
      alias: {
        '@': pathResolve('src'),
        types: pathResolve('types'),
        path: 'path-browserify'
        // dayjs: 'dayjs/esm'
      }
    }
  }
}
