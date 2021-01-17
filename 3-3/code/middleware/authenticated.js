/**
 * 验证是否登录的中间件
 */

 export default function ({ store, redirect }) {
   // 检测是否登录，没有登录则返回登录页面
   if (!store.state.user) {
     return redirect('/login')
   }
 }