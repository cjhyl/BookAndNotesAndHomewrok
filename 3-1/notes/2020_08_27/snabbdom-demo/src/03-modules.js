import { h } from 'snabbdom/build/package/h'
import { init } from 'snabbdom/build/package/init'
// 1. 导入模块
import {styleModule} from 'snabbdom/build/package/modules/style.js'
import {eventListenersModule} from 'snabbdom/build/package/modules/eventlisteners.js'

// console.log('style',styleModule)
// console.log('eventlisteners',eventListenersModule)
// console.log('h',h)
// console.log('init',init)
// 2. 注册模块
let patch = init([
  styleModule,
  eventListenersModule
])
// 3. 使用h函数时候在第二个参数传入模块需要的数据(对象格式)
let vnode = h('div', {
  style: {
    backgroundColor: 'red'
  },
  on: {
    click:eventHandler
  }
},[
  h('h1','hello world'),
  h('p','this is a p tag')
])

function eventHandler(){
  console.log('点击事件')
}

let app = document.querySelector('#app')
let oldVnode = patch(app,vnode)