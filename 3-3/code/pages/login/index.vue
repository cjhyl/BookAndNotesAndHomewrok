<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">
            {{ isLogin ? 'Sign in' : 'Sign up' }}
          </h1>
          <p class="text-xs-center">
            <!--<a href="">Have an account?</a>-->
            <nuxt-link v-if="isLogin" :to="{name:'register'}">Need an account?</nuxt-link>
            <nuxt-link v-else :to="{name:'login'}">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(val,key) in err">
              <li v-for="(r,i) in val" :key="i">
                {{key}} {{r}}
              </li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input v-model="user.username" required class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" required class="form-control form-control-lg" type="email" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" required  minlength="8" class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
// import request from '@/utils/request'
import {login, regist} from '@/api/user'
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  // 在路由匹配组件渲染之前先执行中间件
  middleware: 'notAuthenticated',
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      err: {}//错误信息
    }
  },
  computed: {
    isLogin () {
      return this.$route.name === 'login'
    }
  },
  watch: {},
  created () {},
  mounted () {
    
  },
  methods: {
    async onSubmit () {

      try {
        //提交表单请求登录
        const {data} =  this.isLogin 
        ? await login({
          user: this.user
        })
        : await regist({
          user: this.user
        })
        console.log('rl',data)
        // 保存用户登录状态
        this.$store.commit('setUser', data.user)
        
        // 防止页面刷新数据丢失，数据保存在cookie中
        Cookie.set('user', data.user)

        //跳转到首页
        this.$router.push({name:'home'});
      } catch (error) {
        console.dir(error);
        this.err = error.response.data.errors
        console.log(this)
      }
      
    }
  }
}
</script>

<style scoped>

</style>>