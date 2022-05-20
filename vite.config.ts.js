// vite.config.ts
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import WindiCSS from "vite-plugin-windicss";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { visualizer } from "rollup-plugin-visualizer";
import { loadEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";

// build/utils.ts
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (/_PORT/.test(envName)) {
      realName = Number(realName);
    }
    if (envName === "VITE_PROXY" && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = "";
      }
    }
    ret[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}

// package.json
var name = "vue-toimc-admin";
var private2 = true;
var version = "1.0.0-alpha.1";
var author = {
  name: "toimc",
  email: "brian@toimc.com",
  url: "https://github.com/toimc"
};
var scripts = {
  dev: "vite",
  serve: "npm run dev",
  "build:emit": "vue-tsc --noEmit && vite build",
  build: "vite build",
  report: "rimraf dist && vite build",
  preview: "npm run build && vite preview",
  "preview:dist": "vite preview",
  log: "conventional-changelog -p angular -i CHANGELOG.md -s",
  "lint:eslint": 'eslint "{src,mock}/**/*.{vue,ts,tsx}" --fix',
  "lint:prettier": 'prettier --write --loglevel warn "src/**/*.{js,json,tsx,css,less,scss,vue,html,md}"',
  "lint:lint-staged": "lint-staged -c ./.husky/lintstagedrc.js",
  "lint:stylelint": 'stylelint --cache --fix "**/*.{vue,less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/',
  prepare: "husky install"
};
var dependencies = {
  "@element-plus/icons-vue": "^1.1.4",
  "@milkdown/core": "^6.0.0-next.1",
  "@milkdown/exception": "6.0.0-next.1",
  "@milkdown/plugin-clipboard": "6.0.0-next.1",
  "@milkdown/plugin-cursor": "6.0.0-next.1",
  "@milkdown/plugin-diagram": "6.0.0-next.1",
  "@milkdown/plugin-emoji": "6.0.0-next.1",
  "@milkdown/plugin-history": "6.0.0-next.1",
  "@milkdown/plugin-indent": "6.0.0-next.1",
  "@milkdown/plugin-listener": "6.0.0-next.1",
  "@milkdown/plugin-math": "6.0.0-next.1",
  "@milkdown/plugin-menu": "6.0.0-next.1",
  "@milkdown/plugin-prism": "6.0.0-next.1",
  "@milkdown/plugin-slash": "6.0.0",
  "@milkdown/plugin-tooltip": "6.0.0-next.1",
  "@milkdown/plugin-upload": "6.0.0-next.1",
  "@milkdown/preset-commonmark": "6.0.0-next.1",
  "@milkdown/preset-gfm": "6.0.0-next.1",
  "@milkdown/prose": "6.0.0-next.1",
  "@milkdown/theme-nord": "6.0.0-next.1",
  "@milkdown/vue": "6.0.0-next.1",
  "@toast-ui/editor": "^3.1.5",
  "@toast-ui/editor-plugin-code-syntax-highlight": "^3.0.0",
  "@vue/runtime-core": "^3.2.33",
  "@vueuse/core": "^8.3.1",
  "@zxcvbn-ts/core": "^2.0.1",
  "@zxcvbn-ts/language-common": "^2.0.1",
  axios: "^0.27.1",
  "big-integer": "^1.6.51",
  cropperjs: "^1.5.12",
  "crypto-js": "^4.1.1",
  dayjs: "^1.11.1",
  "driver.js": "^0.9.8",
  echarts: "^5.3.2",
  "element-plus": "^2.1.11",
  gsap: "^3.10.4",
  katex: "^0.15.3",
  "lodash-es": "^4.17.21",
  papaparse: "^5.3.2",
  "path-browserify": "^1.0.1",
  pinia: "^2.0.13",
  pinyin: "^2.11.2",
  "print-js": "^1.6.0",
  prismjs: "^1.28.0",
  qrcode: "^1.5.0",
  "resize-observer-polyfill": "^1.5.1",
  vditor: "^3.8.13",
  vue: "^3.2.33",
  "vue-echarts": "^6.0.2",
  "vue-i18n": "9.2.0-beta.35",
  "vue-router": "^4.0.14"
};
var devDependencies = {
  "@babel/core": "^7.17.9",
  "@commitlint/cli": "^16.2.3",
  "@commitlint/config-conventional": "^16.2.1",
  "@iconify/json": "^2.1.32",
  "@iconify/vue": "^3.2.1",
  "@intlify/vite-plugin-vue-i18n": "^3.4.0",
  "@milkdown/design-system": "^6.0.0-next.1",
  "@types/lodash-es": "^4.17.6",
  "@typescript-eslint/eslint-plugin": "^5.21.0",
  "@typescript-eslint/parser": "^5.21.0",
  "@vitejs/plugin-vue": "^2.3.1",
  "@vitejs/plugin-vue-jsx": "^1.3.10",
  autoprefixer: "^10.4.5",
  commitizen: "^4.2.4",
  "conventional-changelog-cli": "^2.2.2",
  eslint: "^8.14.0",
  "eslint-config-prettier": "^8.5.0",
  "eslint-plugin-prettier": "^4.0.0",
  "eslint-plugin-vue": "^8.7.1",
  husky: "^7.0.4",
  "lint-staged": "^12.4.0",
  mockjs: "^1.1.0",
  postcss: "^8.4.12",
  "postcss-html": "^1.4.1",
  "postcss-scss": "^4.0.4",
  prettier: "^2.6.2",
  rimraf: "^3.0.2",
  rollup: "^2.70.2",
  "rollup-plugin-visualizer": "^5.6.0",
  sass: "^1.51.0",
  stylelint: "^14.7.1",
  "stylelint-config-prettier": "^9.0.3",
  "stylelint-config-recess-order": "^3.0.0",
  "stylelint-config-recommended-vue": "^1.4.0",
  "stylelint-config-standard": "^25.0.0",
  "stylelint-config-standard-scss": "^3.0.0",
  "stylelint-order": "^5.0.0",
  "stylelint-scss": "^4.2.0",
  typescript: "^4.6.3",
  "unplugin-auto-import": "^0.7.1",
  "unplugin-icons": "^0.14.1",
  "unplugin-vue-components": "^0.19.3",
  vite: "^2.9.5",
  "vite-plugin-mock": "^2.9.6",
  "vite-plugin-svg-icons": "^2.0.1",
  "vite-plugin-windicss": "^1.8.4",
  "vue-eslint-parser": "^8.3.0",
  "vue-tsc": "^0.34.10",
  windicss: "^3.5.1"
};
var engines = {
  node: "^12 || >=14"
};
var homepage = "https://github.com/toimc-team/vue-toimc-admin";
var license = "MIT";
var bugs = {
  url: "https://github.com/toimc-team/vue-toimc-admin/issues"
};
var repository = {
  type: "git",
  url: "git+https://github.com/toimc-team/vue-toimc-admin.git"
};
var type = "module";
var package_default = {
  name,
  private: private2,
  version,
  author,
  scripts,
  dependencies,
  devDependencies,
  engines,
  homepage,
  license,
  bugs,
  repository,
  type
};

// vite.config.ts
import dayjs from "dayjs";

// build/proxy.ts
var httpsRE = /^https:\/\//;
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// vite.config.ts
function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}
var { dependencies: dependencies2, devDependencies: devDependencies2, name: name2, version: version2 } = package_default;
var __APP_INFO__ = {
  pkg: { dependencies: dependencies2, devDependencies: devDependencies2, name: name2, version: version2 },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};
var vite_config_default = ({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_HTTPS, VITE_USE_MOCK } = viteEnv;
  const lifecycle = process.env.npm_lifecycle_event;
  return {
    base: VITE_PUBLIC_PATH,
    root,
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    server: {
      https: VITE_HTTPS,
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    plugins: [
      vue(),
      WindiCSS(),
      AutoImport({
        imports: ["vue", "vue-router", "@vueuse/core", "@vueuse/head"],
        resolvers: [ElementPlusResolver()],
        include: [
          /\.[tj]sx?$/,
          /\.vue$/,
          /\.vue\?vue/
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
        mockPath: "mock",
        supportTs: true,
        prodEnabled: VITE_USE_MOCK,
        injectCode: `
          import { setupProdMockServer } from '../mock/_createProductionServer';
          setupProdMockServer();
        `
      }),
      createSvgIconsPlugin({
        iconDirs: [pathResolve("src/assets/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      vueI18n({
        include: pathResolve("src/locales/**")
      }),
      lifecycle === "report" ? visualizer({
        filename: "./node_modules/.cache/visualizer/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true
      }) : null
    ],
    json: {
      stringify: true
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    resolve: {
      alias: {
        "@": pathResolve("src"),
        types: pathResolve("types"),
        path: "path-browserify"
      }
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvdXRpbHMudHMiLCAiYnVpbGQvcHJveHkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHsgVXNlckNvbmZpZywgQ29uZmlnRW52IH0gZnJvbSAndml0ZSdcblxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXG4vLyBwbHVnaW5zXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcblxuaW1wb3J0IFdpbmRpQ1NTIGZyb20gJ3ZpdGUtcGx1Z2luLXdpbmRpY3NzJ1xuXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnXG5cbmltcG9ydCBJY29ucyBmcm9tICd1bnBsdWdpbi1pY29ucy92aXRlJ1xuaW1wb3J0IEljb25zUmVzb2x2ZXIgZnJvbSAndW5wbHVnaW4taWNvbnMvcmVzb2x2ZXInXG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLXN2Zy1pY29ucydcblxuaW1wb3J0IHZ1ZUkxOG4gZnJvbSAnQGludGxpZnkvdml0ZS1wbHVnaW4tdnVlLWkxOG4nXG5cbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInXG5cbi8vIHZpdGVqc1xuaW1wb3J0IHsgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyB2aXRlTW9ja1NlcnZlIH0gZnJvbSAndml0ZS1wbHVnaW4tbW9jaydcbmltcG9ydCB7IHdyYXBwZXJFbnYgfSBmcm9tICcuL2J1aWxkL3V0aWxzJ1xuXG5pbXBvcnQgcGtnIGZyb20gJy4vcGFja2FnZS5qc29uJ1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJ1xuaW1wb3J0IHsgY3JlYXRlUHJveHkgfSBmcm9tICcuL2J1aWxkL3Byb3h5J1xuXG5mdW5jdGlvbiBwYXRoUmVzb2x2ZShkaXI6IHN0cmluZykge1xuICByZXR1cm4gcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnLicsIGRpcilcbn1cblxuLy8gXHU4QkJFXHU3RjZFXHU1RTk0XHU3NTI4XHU0RkUxXHU2MDZGXG5jb25zdCB7IGRlcGVuZGVuY2llcywgZGV2RGVwZW5kZW5jaWVzLCBuYW1lLCB2ZXJzaW9uIH0gPSBwa2dcbmNvbnN0IF9fQVBQX0lORk9fXyA9IHtcbiAgcGtnOiB7IGRlcGVuZGVuY2llcywgZGV2RGVwZW5kZW5jaWVzLCBuYW1lLCB2ZXJzaW9uIH0sXG4gIGxhc3RCdWlsZFRpbWU6IGRheWpzKCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIOm1tOnNzJylcbn1cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XG4gIGNvbnN0IHJvb3QgPSBwcm9jZXNzLmN3ZCgpXG5cbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCByb290KVxuXG4gIC8vIGxvYWRFbnZcdThCRkJcdTUzRDZcdTc2ODRcdTVFMDNcdTVDMTRcdTdDN0JcdTU3OEJcdTY2MkZcdTRFMDBcdTRFMkFcdTVCNTdcdTdCMjZcdTRFMzJcdTMwMDJcdThGRDlcdTRFMkFcdTUxRkRcdTY1NzBcdTUzRUZcdTRFRTVcdThGNkNcdTYzNjJcdTRFM0FcdTVFMDNcdTVDMTRcdTdDN0JcdTU3OEJcbiAgY29uc3Qgdml0ZUVudiA9IHdyYXBwZXJFbnYoZW52KVxuXG4gIGNvbnN0IHsgVklURV9QT1JULCBWSVRFX1BVQkxJQ19QQVRILCBWSVRFX1BST1hZLCBWSVRFX0RST1BfQ09OU09MRSwgVklURV9IVFRQUywgVklURV9VU0VfTU9DSyB9ID1cbiAgICB2aXRlRW52XG5cbiAgLy8gY29uc3QgaXNCdWlsZCA9IGNvbW1hbmQgPT09ICdidWlsZCdcbiAgY29uc3QgbGlmZWN5Y2xlID0gcHJvY2Vzcy5lbnYubnBtX2xpZmVjeWNsZV9ldmVudFxuICByZXR1cm4ge1xuICAgIGJhc2U6IFZJVEVfUFVCTElDX1BBVEgsXG4gICAgcm9vdCxcbiAgICBlc2J1aWxkOiB7XG4gICAgICBwdXJlOiBWSVRFX0RST1BfQ09OU09MRSA/IFsnY29uc29sZS5sb2cnLCAnZGVidWdnZXInXSA6IFtdXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGh0dHBzOiBWSVRFX0hUVFBTLFxuICAgICAgLy8gTGlzdGVuaW5nIG9uIGFsbCBsb2NhbCBJUHNcbiAgICAgIGhvc3Q6IHRydWUsXG4gICAgICBwb3J0OiBWSVRFX1BPUlQsXG4gICAgICAvLyBMb2FkIHByb3h5IGNvbmZpZ3VyYXRpb24gZnJvbSAuZW52XG4gICAgICBwcm94eTogY3JlYXRlUHJveHkoVklURV9QUk9YWSlcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSgpLFxuICAgICAgV2luZGlDU1MoKSxcbiAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICBpbXBvcnRzOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ0B2dWV1c2UvY29yZScsICdAdnVldXNlL2hlYWQnXSxcbiAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICAgICAgaW5jbHVkZTogW1xuICAgICAgICAgIC9cXC5bdGpdc3g/JC8sIC8vIC50cywgLnRzeCwgLmpzLCAuanN4XG4gICAgICAgICAgL1xcLnZ1ZSQvLFxuICAgICAgICAgIC9cXC52dWVcXD92dWUvIC8vIC52dWVcbiAgICAgICAgXSxcbiAgICAgICAgZHRzOiB0cnVlXG4gICAgICB9KSxcbiAgICAgIENvbXBvbmVudHMoe1xuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCksIEljb25zUmVzb2x2ZXIoKV0sXG4gICAgICAgIGR0czogdHJ1ZVxuICAgICAgfSksXG4gICAgICB2dWVKc3goKSxcbiAgICAgIEljb25zKHtcbiAgICAgICAgYXV0b0luc3RhbGw6IHRydWVcbiAgICAgIH0pLFxuICAgICAgdml0ZU1vY2tTZXJ2ZSh7XG4gICAgICAgIGlnbm9yZTogL15cXF8vLFxuICAgICAgICBtb2NrUGF0aDogJ21vY2snLFxuICAgICAgICBzdXBwb3J0VHM6IHRydWUsXG4gICAgICAgIHByb2RFbmFibGVkOiBWSVRFX1VTRV9NT0NLLFxuICAgICAgICAvLyBcdTc2RjhcdTVGNTNcdTRFOEVcdTU3MjhzcmMvbWFpbi50c1x1NEUyRGluamVjdFx1NEUwQlx1OTc2Mlx1NzY4NFx1NEVFM1x1NzgwMVx1RkYwQ1x1NjI0MFx1NEVFNVx1NkNFOFx1NjEwRlx1NjU4N1x1NEVGNlx1NzY4NFx1OERFRlx1NUY4NFx1OTVFRVx1OTg5OFxuICAgICAgICBpbmplY3RDb2RlOiBgXG4gICAgICAgICAgaW1wb3J0IHsgc2V0dXBQcm9kTW9ja1NlcnZlciB9IGZyb20gJy4uL21vY2svX2NyZWF0ZVByb2R1Y3Rpb25TZXJ2ZXInO1xuICAgICAgICAgIHNldHVwUHJvZE1vY2tTZXJ2ZXIoKTtcbiAgICAgICAgYFxuICAgICAgfSksXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAgIC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxuICAgICAgICBpY29uRGlyczogW3BhdGhSZXNvbHZlKCdzcmMvYXNzZXRzL3N2ZycpXSxcbiAgICAgICAgLy8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXSdcbiAgICAgIH0pLFxuICAgICAgLy8gXHU1NkZEXHU5NjQ1XHU1MzE2XG4gICAgICB2dWVJMThuKHtcbiAgICAgICAgLy8gaWYgeW91IHdhbnQgdG8gdXNlIFZ1ZSBJMThuIExlZ2FjeSBBUEksIHlvdSBuZWVkIHRvIHNldCBgY29tcG9zaXRpb25Pbmx5OiBmYWxzZWBcbiAgICAgICAgLy8gY29tcG9zaXRpb25Pbmx5OiBmYWxzZSxcblxuICAgICAgICAvLyB5b3UgbmVlZCB0byBzZXQgaTE4biByZXNvdXJjZSBpbmNsdWRpbmcgcGF0aHMgIVxuICAgICAgICBpbmNsdWRlOiBwYXRoUmVzb2x2ZSgnc3JjL2xvY2FsZXMvKionKVxuICAgICAgfSksXG4gICAgICAvLyBcdTYyNTNcdTUzMDVcdTUyMDZcdTY3OTBcbiAgICAgIGxpZmVjeWNsZSA9PT0gJ3JlcG9ydCdcbiAgICAgICAgPyB2aXN1YWxpemVyKHtcbiAgICAgICAgICAgIGZpbGVuYW1lOiAnLi9ub2RlX21vZHVsZXMvLmNhY2hlL3Zpc3VhbGl6ZXIvc3RhdHMuaHRtbCcsXG4gICAgICAgICAgICBvcGVuOiB0cnVlLFxuICAgICAgICAgICAgZ3ppcFNpemU6IHRydWUsXG4gICAgICAgICAgICBicm90bGlTaXplOiB0cnVlXG4gICAgICAgICAgfSlcbiAgICAgICAgOiBudWxsXG4gICAgXSxcbiAgICBqc29uOiB7XG4gICAgICBzdHJpbmdpZnk6IHRydWVcbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgX19BUFBfSU5GT19fOiBKU09OLnN0cmluZ2lmeShfX0FQUF9JTkZPX18pXG4gICAgfSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGhSZXNvbHZlKCdzcmMnKSxcbiAgICAgICAgdHlwZXM6IHBhdGhSZXNvbHZlKCd0eXBlcycpLFxuICAgICAgICBwYXRoOiAncGF0aC1icm93c2VyaWZ5J1xuICAgICAgICAvLyBkYXlqczogJ2RheWpzL2VzbSdcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsICJleHBvcnQgZnVuY3Rpb24gaXNEZXZGbihtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIG1vZGUgPT09ICdkZXZlbG9wbWVudCdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvZEZuKG1vZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nXG59XG5cbi8vIFJlYWQgYWxsIGVudmlyb25tZW50IHZhcmlhYmxlIGNvbmZpZ3VyYXRpb24gZmlsZXMgdG8gcHJvY2Vzcy5lbnZcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBWaXRlRW52IHtcbiAgY29uc3QgcmV0OiBhbnkgPSB7fVxuXG4gIGZvciAoY29uc3QgZW52TmFtZSBvZiBPYmplY3Qua2V5cyhlbnZDb25mKSkge1xuICAgIGxldCByZWFsTmFtZSA9IGVudkNvbmZbZW52TmFtZV0ucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpXG4gICAgcmVhbE5hbWUgPSByZWFsTmFtZSA9PT0gJ3RydWUnID8gdHJ1ZSA6IHJlYWxOYW1lID09PSAnZmFsc2UnID8gZmFsc2UgOiByZWFsTmFtZVxuXG4gICAgaWYgKC9fUE9SVC8udGVzdChlbnZOYW1lKSkge1xuICAgICAgcmVhbE5hbWUgPSBOdW1iZXIocmVhbE5hbWUpXG4gICAgfVxuICAgIGlmIChlbnZOYW1lID09PSAnVklURV9QUk9YWScgJiYgcmVhbE5hbWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlYWxOYW1lID0gSlNPTi5wYXJzZShyZWFsTmFtZS5yZXBsYWNlKC8nL2csICdcIicpKVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVhbE5hbWUgPSAnJ1xuICAgICAgfVxuICAgIH1cbiAgICByZXRbZW52TmFtZV0gPSByZWFsTmFtZVxuICAgIGlmICh0eXBlb2YgcmVhbE5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBwcm9jZXNzLmVudltlbnZOYW1lXSA9IHJlYWxOYW1lXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVhbE5hbWUgPT09ICdvYmplY3QnKSB7XG4gICAgICBwcm9jZXNzLmVudltlbnZOYW1lXSA9IEpTT04uc3RyaW5naWZ5KHJlYWxOYW1lKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0XG59XG4iLCAiLyoqXG4gKiBVc2VkIHRvIHBhcnNlIHRoZSAuZW52LmRldmVsb3BtZW50IHByb3h5IGNvbmZpZ3VyYXRpb25cbiAqL1xuaW1wb3J0IHR5cGUgeyBQcm94eU9wdGlvbnMgfSBmcm9tICd2aXRlJ1xuXG50eXBlIFByb3h5SXRlbSA9IFtzdHJpbmcsIHN0cmluZ11cblxudHlwZSBQcm94eUxpc3QgPSBQcm94eUl0ZW1bXVxuXG50eXBlIFByb3h5VGFyZ2V0TGlzdCA9IFJlY29yZDxzdHJpbmcsIFByb3h5T3B0aW9ucz5cblxuY29uc3QgaHR0cHNSRSA9IC9eaHR0cHM6XFwvXFwvL1xuXG4vKipcbiAqIEdlbmVyYXRlIHByb3h5XG4gKiBAcGFyYW0gbGlzdFxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUHJveHkobGlzdDogUHJveHlMaXN0ID0gW10pIHtcbiAgY29uc3QgcmV0OiBQcm94eVRhcmdldExpc3QgPSB7fVxuICBmb3IgKGNvbnN0IFtwcmVmaXgsIHRhcmdldF0gb2YgbGlzdCkge1xuICAgIGNvbnN0IGlzSHR0cHMgPSBodHRwc1JFLnRlc3QodGFyZ2V0KVxuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2h0dHAtcGFydHkvbm9kZS1odHRwLXByb3h5I29wdGlvbnNcbiAgICByZXRbcHJlZml4XSA9IHtcbiAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgd3M6IHRydWUsXG4gICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKSwgJycpLFxuICAgICAgLy8gaHR0cHMgaXMgcmVxdWlyZSBzZWN1cmU9ZmFsc2VcbiAgICAgIC4uLihpc0h0dHBzID8geyBzZWN1cmU6IGZhbHNlIH0gOiB7fSlcbiAgICB9XG4gIH1cbiAgcmV0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
