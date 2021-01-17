<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
                <fieldset class="form-group">
                  <input v-model="userData.image" class="form-control" type="text" placeholder="URL of profile picture">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="userData.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                </fieldset>
                <fieldset class="form-group">
                  <textarea v-model="userData.bio" class="form-control form-control-lg" rows="8" placeholder="Short bio about you"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="userData.email" class="form-control form-control-lg" type="text" placeholder="Email">
                </fieldset>
                <fieldset class="form-group">
                  <input v-model="password" class="form-control form-control-lg" type="password" placeholder="Password">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" :disabled="disabled" @click="doUpdate">
                  Update Settings
                </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout()">
            Or click here to logout.
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

const Cookie = process.client ? require('js-cookie') : undefined
import { mapState } from 'vuex'
import { updateUser } from '@/api/user'

export default {
  // 在路由匹配组件渲染之前先执行中间件
  middleware: 'authenticated',
  name: 'SettingsPage',
  components: {},
  props: {},
  data () {
    return {
      password: '',
      userData: {
        image: '',
        username: '',
        bio: '',
        email: ''
      },
      disabled:false
    }
  },
  computed: {
    ...mapState(['user']),
  },
  watch: {},
  created () {},
  mounted () {
    this.userData.image = this.user.image
    this.userData.username = this.user.username
    this.userData.bio = this.user.bio
    this.userData.email = this.user.email
  },
  methods: {
    //登出
    logout () {
      //清理cookie
      Cookie.remove('user')
      this.$store.commit('setUser', null)
      //跳转到首页
      this.$router.push({name:'home'});
    },
    //更新资料
    async doUpdate () {
      if(this.password) {
        this.userData.password = this.password
      }
      this.disabled = true
      const {data} = await updateUser({user:this.userData})
      this.$router.push({
        name: 'profile',
        params: {
          username: data.user.username
        }
      });
    }
  }
}
</script>

<style scoped>

</style>>