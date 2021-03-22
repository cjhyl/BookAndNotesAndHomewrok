<template>
  <div class="login">
    <el-form label-position="top" ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          class="login-btn"
          type="primary"
          @click="onSubmit"
          :loading="isLoginLoading"
        >
                 登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'

export default Vue.extend({
  name: 'LoginIndex',

  data () {
    return {
      form: {
        phone: '18201288771', // 测试账号 18201288771
        password: '111111' // 测试账号密码 111111
      },
      isLoginLoading: false,
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    async onSubmit () {
      try {
        // 1. 表单验证
        // validate支持Promise，使用await使代码扁平化
        await (this.$refs.form as Form).validate()

        // 2. 验证通过 -> 提交表单
        // 登录按钮loading
        this.isLoginLoading = true
        const { data } = await login(this.form)
        // const { data } = await request({
        //   method: 'POST',
        //   url: '/front/user/login',
        //   /*
        //    * axios默认发送的是 application/json 格式的数据
        //    * 修改为application/x-www-form-urlencoded数据格式的话，可以使用headers修改类型，并用qs.stringify修改提交数据,
        //    */
        //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //   data: qs.stringify(this.form)
        // })
        this.isLoginLoading = false
        // 3. 处理请求结果
        //    失败: 给出提示
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 1. 登录成功，记录登录状态，此状态需要能够全局访问 (vuex)
          this.$store.commit('setUser', data.content)
          // 2. 在访问需要登录的页面时判断有没有登录状态 (路由拦截器)
          //    成功: 跳转首页
          // this.$router.push({
          //   name: 'home'
          // })
          // 成功：跳转首页或之前浏览的页面
          this.$router.push(this.$route.query.redirect as string || '/')
          this.$message.success('登录成功')
        }
      } catch (e) {
        console.log('登录失败')
      }
      // 结束登录按钮loading
      this.isLoginLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-form {
    width: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>
