import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null') // 当前登录用户状态
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)

      // 用户数据持久化 本地存储
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
