<template>
  <div id="app">
    <!-- 根路由出口 -->
    <router-view/>
  </div>
</template>

<!--<script>
function testable (target) {
  target.isTestable = true
}

@testable
class MyTestableClass {
}

// 类的装饰器会对类进行扩展处理
console.log(MyTestableClass.isTestable)
</script>-->

<!--<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

// 类的装饰器
@Component({
  //子组件在这里注册
  components: {

  }
})
export default class App extends Vue {
  a = 1
  b = '2'
  c = []
  d = {
    a: '1',
    b: 2
  }

  test () {
    // 提示更精确
    // this.a.
    // 没有的方法会报错
    // this.a.abc()
  }

  // 计算属性的getter
  get ab () {
    return this.a + this.b
  }

  // 计算属性的setter
  set ab (value) {
    console.log(value)
    console.log(this.a + '&' + this.b)
  }

  // 钩子函数
  mounted () {
    console.log('mounted')
  }
}
</script>-->

<!--<script lang="ts">

import Vue from 'vue'
// ts组件定义应当使用这种方式，编译、提示更精确
export default Vue.extend({
  data () {
    return {
      a: 1,
      b: '2',
      c: [],
      d: {
        a: '1',
        b: 2
      }
    }
  },

  methods: {
    test () {
      // 提示更精确
      // this.a.
      // 没有的方法会报错
      // this.a.abc()
    }
  }
})
</script>-->

<!--<script>
// 1. 编辑器给的类型提示
// 2. TypeScript 编译期间的类型验证
// 下面的代码没有验证功能
export default {
  data () {
    return {
      a: 1,
      b: '2',
      c: [],
      d: {
        a: '1',
        b: 2
      }
    }
  },

  methods: {
    test () {
      // this.a.
      // this.a.abc().
    }
  }
}
</script>-->

<script lang="ts">
import Vue from 'vue'
// import request from '@/utils/request'

// request({
//   method: 'GET',
//   url: '/boss/v2/api-docs?group=edu-boss-boot'
// }).then(res => {
//   console.log('res', res)
// })

export default Vue.extend({
  name: 'App',

  data () {
    return {
    }
  },

  methods: {
  }
})
</script>

<style lang="scss" scoped>
/*@import "~@/styles/variables.scss";*/

/*.text {
  color: $warning-color
}*/
</style>
