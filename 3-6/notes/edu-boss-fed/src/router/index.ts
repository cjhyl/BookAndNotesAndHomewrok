import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'
import routes from './modules/index'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

// 全局前置守卫，任何页面的访问都要经过这里
// to: 目标页面路由信息
// from: 从哪里来的路由信息
// next: 通行的标志
router.beforeEach((to, from, next) => {
  // 路由守卫一定要调用next，否则页面无法显示

  // 普通方式
  // if (to.path !== '/login') {
  //   // 检测用户数据，没有则弹回登录页
  // }

  // 更灵活的方式为使用路由元信息，给路由添加meta，里面添加自定义数据
  // to.matched 是一个数组 (匹配到的是路由记录，从父到子)
  // 检测筛选to.matched路由数据中的配置信息
  if (to.matched.some(record => record.meta.requireAuth)) {
    // 判断是否有用户数据
    if (!store.state.user) {
      // 没有数据跳回登录页面
      next({
        name: 'login',
        query: { // 如果跳回登录前有页面，则通过 url 传递查询参数字符串，用于登录后跳回
          redirect: to.fullPath
        }
      })
    } else {
      // 有用户数据 允许通过
      next()
    }
  } else {
    // 不需要验证 允许通过
    next()
  }
})

export default router
