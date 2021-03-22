import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import advertRoutes from './advert'
import courseRoutes from './course'
import rightsRoutes from './rights'
import userRoutes from './user'

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requireAuth: true // 自定义数据
    },
    children: [
      {
        path: '', // 路径留空 代表 默认子路由
        name: 'home',
        // webpack魔法注释，控制打包文件的名称（默认名是1,2,3,4之类的）
        component: () => import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      }
    ]
  },
  advertRoutes,
  courseRoutes,
  rightsRoutes,
  userRoutes,
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */ '@/views/error-page/404.vue')
  },
  {
    path: '/not-permission',
    name: 'not-permission',
    component: () => import('@/views/error-page/403.vue')
  }
]

export default routes
