const cookieparser = process.server ? require ('cookieparser') : undefined

// 服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突，务必把 state 定义成一个函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

export const mutations = {
  setUser (state, data) {
    state.user = data
  }
}

export const actions = {
  // nuxtServerInit是一个特殊的action方法
  // 会在服务端渲染期间自动调用
  // 作用：初始化容器数据，传递数据给客户端使用
  nuxtServerInit ({ commit }, { req }) {
    let user =null
    //如果请求头中有 Cookie
    if (req.headers.cookie) {
      //把cookie字符串转为js对象
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (error) {
        
      }
    }

    //提交
    commit('setUser', user)
  }
}