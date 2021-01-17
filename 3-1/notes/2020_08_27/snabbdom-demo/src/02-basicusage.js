// 2. div中放置子元素h1,p
import { h } from 'snabbdom/src/package/h'
import { init } from 'snabbdom/src/package/init'

let patch = init([])
let vnode = h('div#container',[
  h('h1','hello snabbdom'),
  h('p','这时一个p标签')
])

let app = document.querySelector('#app')
let oldVnode = patch(app,vnode)

setTimeout(()=>{
  vnode = h('div#container',[
    h('h1','hello world'),
    h('p','this is a p tag')
  ])
  oldVnode = patch(oldVnode,vnode)

  //清理页面元素
  setTimeout(()=>{
    //感叹号为注释节点
    patch(oldVnode, h('!'))
  },1500)
},1500)