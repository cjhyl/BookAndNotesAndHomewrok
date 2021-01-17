import Vue from 'vue'
import Vuex from 'vuex'
import products from './modules/products'
import cart from './modules/cart'

Vue.use(Vuex)

const myStorePlugin = store => {
  // subscribe钩子会在mutation执行完毕后执行
  store.subscribe((mutation, state) => {
    // 本地存储购物车数据
    if (mutation.type.startsWith('cart/')) {
      window.localStorage.setItem('cart-products', JSON.stringify(state.cart.cartProducts))
    }
  })
}

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    products,
    cart
  },
  plugins: [myStorePlugin]
})
