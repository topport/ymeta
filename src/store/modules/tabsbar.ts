import { AppRouteRecordRaw } from '@/router/types'
import { defineStore } from 'pinia'

const localVisitedPage = localStorage.getItem('toimc-admin-visited-page')

const visitedPages = localVisitedPage !== null ? JSON.parse(localVisitedPage) : []

export const useTabsStore = defineStore('tabsbar', {
  state: () => ({
    visitedRoutes: visitedPages as AppRouteRecordRaw[]
  }),
  actions: {
    saveTabs() {
      localStorage.setItem('toimc-admin-visited-page', JSON.stringify(this.visitedRoutes))
    },
    addVisitedRoute(route) {
      const target = this.visitedRoutes.find((item) => item.path === route.path)
      if (target) {
        if (route.fullPath !== target.fullPath) Object.assign(target, route)
        return
      }
      const saveRoute = Object.assign({}, route)
      saveRoute.matched && delete saveRoute.matched
      this.visitedRoutes.push(saveRoute)
      this.saveTabs()
    },
    delVisitedRoute(route) {
      this.visitedRoutes.forEach((item, index) => {
        if (item.path === route.path) this.visitedRoutes.splice(index, 1)
      })
      this.saveTabs()
    },
    delOthersVisitedRoute(route) {
      this.visitedRoutes = this.visitedRoutes.filter(
        (item) => item.meta.affix || item.path === route.path
      )
      this.saveTabs()
    },
    delLeftVisitedRoute(route) {
      let index = this.visitedRoutes.length
      this.visitedRoutes = this.visitedRoutes.filter((item) => {
        if (item.name === route.name) index = this.visitedRoutes.indexOf(item)
        return item.meta.affix || index <= this.visitedRoutes.indexOf(item)
      })
      this.saveTabs()
    },
    delRightVisitedRoute(route) {
      let index = this.visitedRoutes.length
      this.visitedRoutes = this.visitedRoutes.filter((item) => {
        if (item.name === route.name) index = this.visitedRoutes.indexOf(item)
        return item.meta.affix || index >= this.visitedRoutes.indexOf(item)
      })
      this.saveTabs()
    },
    delAllVisitedRoutes() {
      this.visitedRoutes = this.visitedRoutes.filter((item) => item.meta.affix)
      this.saveTabs()
    },
    updateVisitedRoute(route) {
      this.visitedRoutes.forEach((item) => {
        if (item.path === route.path) item = Object.assign(item, route)
      })
      this.saveTabs()
    }
  }
})
