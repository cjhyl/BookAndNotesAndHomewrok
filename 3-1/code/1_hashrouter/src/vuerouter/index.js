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
    this.ensureSlash()
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
    const that = this
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
          // history.pushState({}, '', this.to)// 历史地址改变
          that.replaceHash(this.to)
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
    window.addEventListener('hashchange', () => {
      this.data.current = this.getHash()
    })
  }

  ensureSlash () {
    const path = this.getHash()
    if (path.charAt(0) === '/') {
      return true
    }
    this.replaceHash('/' + path)
    return false
  }

  getHash () {
    let href = window.location.href
    const index = href.indexOf('#')
    if (index < 0) return ''
    href = href.slice(index + 1)
    const searchIndex = href.indexOf('?')
    if (searchIndex < 0) {
      const hashIndex = href.indexOf('#')
      if (hashIndex > -1) {
        href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex)
      } else href = decodeURI(href)
    } else {
      href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex)
    }
    return href
  }

  getUrl (path) {
    const href = window.location.href
    const i = href.indexOf('#')
    const base = i >= 0 ? href.slice(0, i) : href
    return `${base}#${path}`
  }

  replaceHash (path) {
    window.location.replace(this.getUrl(path))
  }
}
