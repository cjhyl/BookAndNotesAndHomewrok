import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: RouteConfig = {
  path: '/',
  component: Layout,
  meta: {
    requireAuth: true,
    title: '用户管理'
  },
  children: [
    {
      path: '/user',
      name: 'user',
      component: () => import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
      meta: {
        title: '用户管理'
      }
    }
  ]
}

export default routes
