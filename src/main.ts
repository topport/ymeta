import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'

// 全局样式
//import '@/assets/style/index.scss'

// // windicss setup
// import 'virtual:windi.css'
// // svg sprite setup
// import 'virtual:svg-icons-register'

// 全局Element样式引入
import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/display.css'
// import 'element-plus/dist/index.css'

// 导入所有的插件 -> 一般是全局注册的组件，比如icons
import * as plugins from './plugins/index'

import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { setupPlugins } from './utils/index'
import { setupDirectives } from './directive'
import { setupI18n } from './locales/setupI18n'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import * as elicons from '@element-plus/icons'
// import * as myicons from './assets/icons'
//
import scui from './scui'
// import SvgIcon from '@/components/SvgIcon/index.vue'
// import ComWrapper from '@/components/Wrapper/index.vue'
//

// // @ts-ignore
// import SvgIcon from '@/components/SvgIcon'
// // @ts-ignore
// import ComWrapper from '@/components/Wrapper'
//
// import * as elicons from '@element-plus/icons'
// import * as myicons from './assets/icons'
async function bootstrap() {
  const app = createApp(App)
  app.use(VXETable)

  // Configure store
  setupStore(app)

  // Multilingual configuration
  // Asynchronous case: language files may be obtained from the server side
  await setupI18n(app)
  // app.use(i18n)

  // Configure routing
  setupRouter(app)

  // todo
  // router-guard
  // Register global directive
  setupDirectives(app)
  // Configure global error handling

  // 全局插件注册
  // Register global components
  setupPlugins(app, plugins)

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  // app.component('SvgIcon', SvgIcon)

  // app.component('SvgIcon', SvgIcon)
  //
  // app.component('ComWrapper', ComWrapper)
  //
  // //统一注册el-icon图标
  // for (const icon in elicons) {
  //   app.component(`ElIcon${icon}`, elicons[icon])
  // }
  // console.log("app start")
  // //统一注册sc-icon图标
  // for (const icon in myicons) {
  //   app.component(`ScIcon${icon}`, myicons[icon])
  // }
  //app.use(ElementPlus);
  app.use(ElementPlus, {size: 'default'})

  app.use(scui)
  app.mount('#app')
}

bootstrap()
