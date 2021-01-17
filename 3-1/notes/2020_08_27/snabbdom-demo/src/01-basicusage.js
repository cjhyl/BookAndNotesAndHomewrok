// var snabbdom = require('snabbdom')
// 导入snabbdom
// import init from 'snabbdom/init'
import { h } from 'snabbdom/src/package/h'
import { init } from 'snabbdom/src/package/init'
// console.log(init,h)
// 1. hello world
// ini函数为高阶函数，参数为数组、模块
// 返回值：patch函数，作用是对比两个vnode的差异更新到真实dom
let patch = init([])
// h函数，生成虚拟dom
// 第一个参数：标签+选择器
// 第二个参数：如果是字符串的话就是标签中的内容
let vnode = h('div#container.cls','hello world')
let app = document.querySelector('#app')
// patch函数第一个参数：可以使dom元素，内部会把dom元素转换成vnode
// 第二个参数：vnode
// 返回值：vnode
let oldVnode=patch(app,vnode)
//假设更新新的vnode
vnode = h('div', 'hello snabbdom')
patch(oldVnode,vnode)