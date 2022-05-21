<template>


  <!-- 默认布局 -->
  <template  >
    <section class="aminui-wrapper">
      <div v-if="!isMobile" class="aminui-side-split">
        <div class="aminui-side-split-top">
          <router-link :to="$CONFIG.DASHBOARD_URL">
            <img class="logo" :title="$CONFIG.APP_NAME" src="../assets/img/logo-r.png"/>
          </router-link>
        </div>
        <div class="adminui-side-split-scroll">
          <el-scrollbar>
            <ul>
              <li v-for="item in menu" :key="item" :class="pmenu.path === item.path ? 'active' : ''"
                  @click="showMenu(item)">
                <el-icon>
                  <component :is="item.meta.icon || el-icon-menu"/>
                </el-icon>
                <p>{{ item.meta.title }}</p>
              </li>
            </ul>
          </el-scrollbar>
        </div>
      </div>
      <div v-if="!isMobile && nextMenu.length > 0 || !pmenu.component"
           :class="collapse ? 'aminui-side isCollapse' : 'aminui-side'">
        <suspense>
          <template #default>
            <div v-if="!collapse" class="adminui-side-top">
              <h2>{{ menutitle }}</h2>
            </div>
          </template>
        </suspense>
        <div class="adminui-side-scroll">
          <el-scrollbar>
            <el-menu :default-active="active" router :collapse="collapse" :unique-opened="$CONFIG.MENU_UNIQUE_OPENED">
              <NavMenu :navMenus="nextMenu"/>
            </el-menu>
          </el-scrollbar>
        </div>
        <div class="adminui-side-bottom" @click="configStore.TOGGLE_collapse()">
<!--          <el-icon>-->
<!--            <el-icon-expand v-if="collapse"/>-->
<!--            <el-icon-fold v-else/>-->
<!--          </el-icon>-->
        </div>
      </div>
      <SideMenu v-if="isMobile"/>
      <div class="aminui-body el-container">
        <Headerbar>
          <Userbar/>
        </Headerbar>
        <Tags v-if="!isMobile && layoutTags"></Tags>
        <div class="adminui-main" id="adminui-main">
          <router-view v-slot="{Component}">
            <transition name="fade-transform" mode="out-in">
              <keep-alive :include="keepAliveStore.keepLiveRoute">
                <component :is="Component" :key="$route.fullPath" v-if="keepAliveStore.routeShow"/>
              </keep-alive>
            </transition>
          </router-view>
<!--          <IframeView/>-->
        </div>
      </div>
    </section>
  </template>

  <!-- setting -->
  <div class="main-maximize-exit" @click="exitMaximize">
    <icon collection="ri" type="brush-2-line" size="20px" />

  </div>
  <div class="layout-setting" @click="settingDialog = true">
<!--    <el-icon>-->
<!--      <el-icon-brush-filled/>-->
<!--    </el-icon>-->
    adf
  </div>
  <el-drawer title="布局实时演示" v-model="settingDialog" :size="400" append-to-body destroy-on-close>
    <Setting/>
  </el-drawer>
</template>

<script setup>
import {ref, computed, onMounted, nextTick, defineAsyncComponent} from 'vue'
import {useRoute} from 'vue-router'
import { useStore } from '@/store/modules/menu'

import useConfigStore from '@/store/config'
import useKeepAliveStore from '@/store/keepalive'
import {filterUrl} from '@/utils/utils'
// import { suspense } from "vue";
/** hooks */
const route = useRoute()
const configStore = useConfigStore()
const keepAliveStore = useKeepAliveStore()

/* components */
const Tags = defineAsyncComponent(() => import('./components/Tags.vue'))
const Userbar = defineAsyncComponent(() => import('./components/Userbar.vue'))
const NavMenu = defineAsyncComponent(() => import('./components/NavMenu.vue'))
const Setting = defineAsyncComponent(() => import('./components/Setting.vue'))
const SideMenu = defineAsyncComponent(() => import('./components/SideMenu.vue'))
const Headerbar = defineAsyncComponent(() => import('./components/Headerbar.vue'))
//const IframeView = defineAsyncComponent(() => import('./components/IframeView.vue'))

/** data */
const settingDialog = ref(false)
const menu = ref([])
const nextMenu = ref([])
const pmenu = ref({})
const active = ref('')
const menutitle = ref('')


const menuStore = useStore()

/* 生命周期 */
onMounted(() => {
  onLayoutResize()
  window.addEventListener('resize', onLayoutResize)

  console.log(menuStore.value)
  //menu.value = filterUrl(menus)
  // console.log('filterUrl(menus)---',filterUrl(menus))
  routeHightlight()
})

/* function */
function onLayoutResize() {
  configStore.SET_isMobile(document.body.clientWidth < 992)
}

// 路由监听高亮
async function routeHightlight() {
  pmenu.value = route.meta.breadcrumb ? route.meta.breadcrumb[0] : {}
  console.log("==", pmenu.value)
  menutitle.value = pmenu.value.meta.title
  nextMenu.value = filterUrl(pmenu.value.children)
  await nextTick()
  active.value = route.meta.active || route.fullPath
}

// 点击显示
function showMenu(route) {
  console.log("==", route)
  pmenu.value = route
  console.log(pmenu.value.meta)
  menutitle.value = pmenu.value.meta.title

  nextMenu.value = filterUrl(route.children)
  if ((!route.children || route.children.length === 0) && route.component) {
    router.push({path: route.path})
  }
}

// 退出最大化
function exitMaximize() {
  document.getElementById('app').classList.remove('main-maximize')
}

/** computed */
const isMobile = computed(() => configStore.isMobile)
const layout = computed(() => {
  return configStore.layout
})
const layoutTags = computed(() => configStore.layoutTags)
const collapse = computed(() => configStore.collapse)
</script>

<style lang="scss" scoped>
@import '../assets/styles/app.scss';
@import '../assets/styles/fix.scss';
@import '../assets/styles/theme/dark.scss';
</style>
