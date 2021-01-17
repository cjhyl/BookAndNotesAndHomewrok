/**
 * 通用启动入口
 * app.js 是我们应用程序的「通用 entry」。
 * 在纯客户端应用程序中，我们将在此文件中创建根 Vue 实例，并直接挂载到 DOM。
 * 但是，对于服务器端渲染(SSR)，责任转移到纯客户端 entry 文件。app.js 简单地使用 export 导出一个 createApp 函数：
 */

import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import VueMeta from 'vue-meta'
import { createStore } from './store'

Vue.use(VueMeta)

Vue.mixin({
  metaInfo: {
    titleTemplate: '%s - 通用标题'
  }
})

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp () {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,// 把路由挂载到Vue根实例中
    store,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app, router, store }
}