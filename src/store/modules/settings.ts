import { defineStore } from 'pinia'
import defaultSettings from '@/config'
import _ from 'lodash-es'
import {
  generateMainColors,
  generateTextColors,
  generateBorderColors,
  generateFillColors,
  generateBgColors,
  generateMaskColors,
  generateBoxShadowColors
} from '@/utils/theme'

const localThemeSettings = localStorage.getItem('toimc-admin-theme')
const mergeThemeSettings = _.merge(
  {},
  defaultSettings,
  localThemeSettings !== null ? JSON.parse(localThemeSettings) : {}
)

const { 
  layout, 
  fixHeader, 
  menuWidth, 
  darkMode,
  primaryColor,
  tabPage 
} = mergeThemeSettings


const saveThemeSetting = (theme) => {
  localStorage.setItem('toimc-admin-theme', theme)
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    layout: layout || 'siderbar',
    fixHeader: fixHeader || true,
    darkMode: darkMode || false,
    menuWidth: menuWidth || '266px',
    primaryColor: primaryColor || '#409eff',
    tabPage: tabPage || true
  }),
  getters: {
    getLayout: (state) => state.layout
  },
  actions: {
    setLayout(layout) {
      this.layout = layout
      saveThemeSetting(JSON.stringify(this.$state))
    },
    setFixHeader(fixHeader) {
      this.fixHeader = fixHeader
      saveThemeSetting(JSON.stringify(this.$state))
    },
    getThemeColors(){
      const defineColor = {
        primary: { light: this.primaryColor, dark: this.primaryColor }
      }
      return _.merge(
        {},
        generateMainColors(defineColor),
        generateTextColors(),
        generateBorderColors(),
        generateFillColors(),
        generateBgColors(),
        generateMaskColors(),
        generateBoxShadowColors()
      )
    },
    setDarkMode(mode){
      this.darkMode = mode
      saveThemeSetting(JSON.stringify(this.$state))      
    },
    setPrimaryColor(color){
      this.primaryColor = color
      saveThemeSetting(JSON.stringify(this.$state)) 
    },
    setMenuWidth(menuWidth){
      this.menuWidth = menuWidth
      saveThemeSetting(JSON.stringify(this.$state)) 
    },
    setTabPage(tabPage){
      this.tabPage = tabPage
      saveThemeSetting(JSON.stringify(this.$state)) 
    },
    resetSetting(){
      this.$reset()
    }
  }
})
