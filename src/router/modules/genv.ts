// import { t } from '@/hooks/useI18n'
import LayoutsDefault from '@/layouts/default.vue'
import type { AppRouteRecordRaw } from '../types'

const aboutRoutes: Array<AppRouteRecordRaw> = [
  {
    name: 'Genv',
    meta: {
      title: 'genvgrid',
      order: 100000,
      icon: 'InfoFilled',
      hideChildrenInMenu: true,
      alone: true
    },
    path: '/grid',
    component: LayoutsDefault,
    redirect: '/grid/index',
    children: [
      {
        name: 'GenvGrid',
        path: '/grid/index',
        meta: {
          title: 'grid'
        },
        component: () => import('@/views/genv/index.vue')
      }
    ]
  }
]

export default aboutRoutes
