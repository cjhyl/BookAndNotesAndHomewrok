/*
 * 功能：
 * 负责把 data 选项中的属性转换成响应式数据
 * data 中的某个属性也是对象，把该属性转换成响应式数据
 * 数据变化发送通知
 */

class Observer {
  constructor (data) {
    this.walk(data)
  }
  //遍历对象所有属性
  walk (data) {
    // 1. 判断data是否是对象
    if(!data || typeof data !== 'object'){
      return
    }
    // 2. 遍历data对象的所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  //调用Object.defineProperty把数据转换成getter和setter
  defineReactive (obj, key, val) {
    let that = this
    // Dep负责收集依赖，并发送通知
    let dep = new Dep()
    // 如果val是对象，把val也转换为getter和setter
    this.walk(val)
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      // 这里使用val，不适用obj[key]，是因为会导致无限递归重复
      get () {
        // 收集依赖
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set (newValue) {
        if(newValue === val) {
          return
        }
        val = newValue
        that.walk(newValue)//新修改的值也改为getter和setter
        //发送通知
        dep.notify()
      }
    })
  }
}