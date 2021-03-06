/*
 * 功能：
 * 手机依赖，添加观察者（watcher）
 * 通知所有观察者
 */

class Dep {
  constructor () {
    // 存储观察者
    this.subs = []
  }
  // 添加观察者
  addSub (sub) {
    if (sub && sub.update){
      this.subs.push(sub)
    }
  }
   //发布通知
  notify () {
    this.subs.forEach(sub=>{
      sub.update()
    })
  }
}