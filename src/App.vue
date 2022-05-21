<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup>
  import zhCn from 'element-plus/lib/locale/lang/zh-cn'

  import useGlobalProperties from '@/hooks/useGlobalProperties'
  import useTheme from '@/hooks/useTheme'
  import {lighten, darken} from '@/utils/color'
  import {getItem} from '@/utils/local'
  import {APP_COLOR} from '@/utils/constant'

  const {$CONFIG} = useGlobalProperties()
  const appColor = $CONFIG.COLOR || getItem(APP_COLOR)
  const style = document.documentElement.style
  const locale="zhCn"
  if (appColor) {
    style.setProperty('--el-color-primary', appColor)
    for (let i = 1; i <= 9; i++) {
      style.setProperty(`--el-color-primary-light-${i}`, lighten(appColor, i / 10))
    }
    style.setProperty('--el-color-primary-darken-1', darken(appColor, 0.1))
  }

  useTheme()
</script>

<style lang="scss">
  @import '@/assets/styles/index.scss';
  @import '@/assets/styles/theme/dark.scss';
</style>
