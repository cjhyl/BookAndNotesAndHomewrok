/*
 * 功能：
 * 解析模板，解析指令/差值表达式
 * 负责页面的首次渲染
 * 当数据变化后重新渲染视图
 */

class Compiler {
  constructor (vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }
  // 编译模板，处理文本节点和元素节点
  compile (el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      
      if(this.isTextNode(node)){// 处理文本节点
        this.compileText(node)
      }else if(this.isElementNode(node)){// 处理元素节点
        this.compileElement(node)
      }

      // 判断节点是否有子节点，有子节点则递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  // 编译元素节点，处理指令
  compileElement (node) {
    // console.log(node.attributes)
    // 遍历所有属性节点
    Array.from(node.attributes).forEach(attr => {
      // 判断是否是指令
      let attrName = attr.name
      if (this.isDirective(attrName)) {
        // v-text --> text
        attrName = attrName.substr(2)
        if(attrName.indexOf('on:')!=-1){
          let fnName=attr.value
          let fnType=attrName.split(':')[1]
          this.onUpdater(node,fnType,fnName)
          return;
        }
        let key = attr.value
        this.update(node, key, attrName)
      }
    })
  }
  update (node, key, attrName) {
    let updateFn = this[attrName+'Updater']
    // 改为call可改变updataFn函数中的this指向
    updateFn && updateFn.call(this, node, this.vm[key], key)
  }
  // 处理 v-text 指令
  textUpdater (node, value, key) {
    node.textContent = value

    // 创建watcher对象，当数据改变时候改变视图
    new Watcher(this.vm, key, (newValue)=>{
      node.textContent = newValue
    })
  }
  // 处理 v-html 指令
  htmlUpdater (node, value, key) {
    node.innerHTML = value

    // 创建watcher对象，当数据改变时候改变视图
    new Watcher(this.vm, key, (newValue)=>{
      node.innerHTML = newValue
    })
  }
  // 处理 v-model
  modelUpdater (node, value, key) {
    node.value = value

    // 创建watcher对象，当数据改变时候改变视图
    new Watcher(this.vm, key, (newValue)=>{
      node.value = newValue
    })

    //双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }
  onUpdater (node, fnType, fnName) {
    if(/\(|\)/.test(fnName)){
      fnName=fnName.replace(/\(|\)/g,'')
    }
    if(!this.vm.$methods||!this.vm.$methods[fnName]){
      console.log('v-on没有指定正确的函数')
    }
    node.addEventListener(fnType,this.vm.$methods[fnName])
  }
  // 编译文本节点，处理差值表达式
  compileText (node) {
    // console.dir(node)
    // 差值表达式格式{{}}
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)){
      // RegExp会自动保存最近一次调用正则匹配的结果
      let key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm[key])

      // 创建watcher对象，当数据改变时候改变视图
      new Watcher(this.vm, key, (newValue)=>{
        node.textContent = newValue
      })
    }
  }
  // 判断元素属性是否是指令
  isDirective (attrName) {
    return attrName.startsWith('v-')
  }
  // 判断节点是否是文本节点
  isTextNode (node) {
    return node.nodeType === 3
  }
  // 判断节点是否是元素节点
  isElementNode (node) {
    return node.nodeType === 1
  }
}