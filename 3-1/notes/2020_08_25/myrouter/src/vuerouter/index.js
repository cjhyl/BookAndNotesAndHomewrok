let _Vue = null

export default class VueRouter {
  static install (Vue) {
    // 1.判断当前插件是否已安装
    if (VueRouter.install.installed) {
      return
    }
    VueRouter.install.installed = true
    // 2.把Vue构造函数记录到全局变量
    _Vue = Vue
    // 3.把创建Vue实例时传入的router对象注入到Vue实例
    // 混入
    _Vue.mixin({
      beforeCreate () {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }

  constructor (options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({ // observable创建响应式对象的方法
      current: '/'
    })
  }

  init () {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  createRouteMap () {
    // 遍历路由规则，把路由规则解析成键值对，存储到routeMap中
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponents (Vue) {
    // 运行时版：不支持template模板，需要打包的时候提前编译
    // 完整版：包含运行时和编译器，体积比运行时版大10K左右，程序运行的时候把模板转换成render函数
    // 完整版设置：vue.config.js中，设置属性runtimeCompiler:true
    // Vue.component('router-link',{
    //     props:{
    //         to: String
    //     },
    //     template:'<a :href="to"><slot></slot></a>'
    // })
    // 运行时版解决方案
    Vue.component('router-link', {
      props: {
        to: String
      },
      render (h) {
        // h函数 标签名 属性 内容
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler (e) {
          history.pushState({}, '', this.to)// 历史地址改变
          this.$router.data.current = this.to// data数据修改，data为响应式，修改后页面内容也会修改
          e.preventDefault()
        }
      }
      // template:'<a :href="to"><slot></slot></a>'
    })

    const self = this
    Vue.component('router-view', {
      render (h) {
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }

  initEvent () {
    // 路由地址改变事件 使页面响应浏览器地址历史操作
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
