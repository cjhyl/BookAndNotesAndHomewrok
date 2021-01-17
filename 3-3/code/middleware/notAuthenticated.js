/**
 * 验证是否登录的中间件
 */

export default function ({ store, redirect }) {
  // 检测是否登录，有登录则返回首页
  if (store.state.user) {
    return redirect('/')
  }
}