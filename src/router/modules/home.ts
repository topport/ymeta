import LayoutsDefault from '@/layouts/default.vue'
import type { AppRouteRecordRaw } from '../types'
import { t } from '@/hooks/useI18n'

const homeRoutes: Array<AppRouteRecordRaw> = [
  {
    name: 'Home',
    meta: {
      title: t('menu.home'),
      order: 10,
      icon: 'House'
    },
    path: '/home',
    component: LayoutsDefault,
    redirect: '/home/dashboard',
    children: [
      {
        name: 'DashBoard',
        path: '/home/dashboard',
        component: () => import('@/views/dashboard/welcome/index.vue'),
        meta: {
          title: t('menu.overview'),
          affix: true
        }
      },
      {
        name: 'DashBoard1',
        path: '/home/dashboard1',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: t('menu.dashboard'),
          affix: true
        }
      }
    ]
  }
]

export default homeRoutes
