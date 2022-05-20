<template>
  <div class="transition-all duration-300" :style="{ width: menuWidth }">
<!--    <div class="logo-wrap flex items-center justify-center py-3 px-3 h-60px">-->
<!--&lt;!&ndash;      <img class="max-h-full" src="@/assets/images/logo.png" />&ndash;&gt;-->
<!--    </div>-->
    <div class="flex flex-row h-[calc(100%)]">
      <el-scrollbar class="side-top-menu-wrap">
        <Menu
          v-if="layout === 'mixbar'"
          width="64px"
          :menus="topMenu"
          :collapse="false"
          :default-active="defaultActive"
          :is-top="true"
        ></Menu>
      </el-scrollbar>
      <el-scrollbar :class="menuClassName" :style="{ width: mainMenuWidth }">
        <Menu :menus="mainMenu" :default-active="defaultSubActive" :collapse="collapse"></Menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useSettingsStore } from '@/store/modules/settings'
  import { useStore } from '@/store/modules/menu'
  import { useRoute } from 'vue-router'
  import _ from 'lodash-es'

  export default defineComponent({
    name: 'SiderBar',
    props: {
      collapse: {
        type: Boolean,
        default: false
      }
    },
    setup(props) {
      const menuStore = useStore()
      const store = useSettingsStore()
      const layout = computed(() => store.layout)
      const route = useRoute()
      const routeName = computed(() => route.name)
      const curRoutePath = computed(() => route.path)

      const menuWidth = computed(() => {
        if (store.layout !== 'top') {
          if (props.collapse) {
            return '64px'
          } else {
            return store.menuWidth
          }
        } else {
          return ''
        }
      })

      const menuClassName = computed(() => {
        const classList: string[] = []
        if (layout.value === 'siderbar' || layout.value === 'mix') {
          classList.push('side-main-menu-wrap')
        } else if (layout.value === 'mixbar') {
          classList.push('side-sub-menu-wrap')
          classList.push(props.collapse ? 'px-0' : 'px-2')
        }
        return classList
      })

      const mainMenuWidth = computed(() => {
        if (layout.value === 'siderbar' || layout.value === 'mix') {
          return '100%'
        } else if (layout.value === 'mixbar') {
          return parseInt(menuWidth.value) - 64 + 'px'
        }
      })

      const allMenu = computed(() => menuStore.menus)

      const mainMenu = computed(() => {
        if (layout.value === 'siderbar') {
          return allMenu.value
        } else if (layout.value === 'mixbar' || layout.value === 'mix') {
          return (
            menuStore.menus?.find((item) =>
              [item.path, item.redirect].includes('/' + curRoutePath.value.split('/')[1])
            )?.children || []
          )
        }
      })

      const topMenu = computed(() => {
        return _.cloneDeep(allMenu.value)?.map((item) => {
          delete item.children
          return item
        })
      })

      const defaultSubActive = computed(() => {
        if (routeName) {
          let currentKey = ''
          const findActive = function (arr) {
            arr.forEach((item) => {
              if (item.name === routeName.value) {
                currentKey = item.meta.key
                return
              } else if (item.children && item.children.length > 0) {
                findActive(item.children)
              }
            })
          }
          findActive(mainMenu.value)
          return currentKey
        }
      })

      const defaultActive = computed(() => defaultSubActive.value?.split('-')[0])

      return {
        menuWidth,
        mainMenuWidth,
        defaultActive,
        defaultSubActive,
        layout,
        allMenu,
        topMenu,
        mainMenu,
        menuClassName
      }
    }
  })
</script>

<style lang="scss" scoped>
  .logo-wrap {
    background-color: var(--logo-bg-color);
  }
  .side-top-menu-wrap {
    background-color: var(--topside-menu-bg-color);
    :deep(.el-menu) {
      background-color: var(--topside-menu-bg-color);
      color: var(--topside-menu-text-color);
      padding: 0 3px;
      .el-menu-item {
        color: white;
        padding: 0 6px !important;
        font-size: 14px;
        line-height: unset;
        flex-direction: column;
        justify-content: center;
        border-radius: 4px;

        .menu-icon {
          margin-right: 0;
          margin-bottom: 1px;
        }
        &:hover {
          background-color: var(--side-main-menu-bg-hover-color);
          color: var(--side-main-menu-text-hover-color);
        }
        &.is-active {
          background-color: var(--side-main-menu-active-bg-color);
          color: var(--side-main-menu-active-text-color);
        }
      }
    }
  }

  .side-main-menu-wrap {
    background-color: var(--side-main-menu-bg-color);
    :deep(.el-menu) {
      background-color: #ffffff;
      color: black;
      .el-menu-item,
      .el-sub-menu__title {
        background-color: #ffffff;
        color: var(--side-main-menu-text-color);
        &:hover {
          color: var(--side-main-menu-text-hover-color);
        }
        &.is-active {
          background-color: #ffffff;
          color: var(--side-main-menu-active-text-color);
        }
      }
    }
  }

  .side-sub-menu-wrap {
    background-color: #ffffff;

    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
    border-right: 1px solid #e6e6e6;

    :deep(.el-menu) {
      background-color: var(--side-sub-menu-bg-color);
      color: var(--side-sub-menu-text-color);
      .el-menu-item,
      .el-sub-menu__title {
        background-color: #ffffff;
        color: black;
        &:hover {
          color: black;
        }
        &.is-active {
          background-color: #409eff;
          color: var(--side-sub-menu-active-text-color);
          border-radius: 5px;
          padding: 0;
          min-width: unset;
        }
      }
    }
  }
</style>
