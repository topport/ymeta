import type { AppRouteRecordRaw } from '@/router/types'
import type { App } from 'vue'

import { sortBy } from 'lodash-es'

// 菜单排序
export function sortMenu(menus: Array<AppRouteRecordRaw> = []) {
  menus.forEach((i) => {
    if (i && i.children) {
      i.children = sortMenu(i.children)
    }
  })
  return sortBy(menus, 'meta.order')
}

// 驼峰转换下划线
export function toLine(name: string) {
  return name.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

// 导入插件
export function setupPlugins(app: App, files) {
  Object.keys(files).forEach((file) => {
    app.use(files[file as keyof typeof files])
  })
}

// 注册组件
export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component as any)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T
}

// 随机长度的数
export function rand(len: number): string {
  len = len || 28
  const chars = '0123456789'
  const maxPos = chars.length
  let str = ''
  for (let i = 0; i < len; i++) {
    const tmp = chars.charAt(Math.floor(Math.random() * maxPos))
    if (i === 0 && tmp === '0') {
      // 首字母不能为0
      i--
    } else {
      str += tmp
    }
  }
  return str
}

// 打开窗口
export function openWindow(
  url: string,
  opt?: { target?: TargetContext | string; noopener?: boolean; noreferrer?: boolean }
) {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  const feature: string[] = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}
