<template>
  <div id="app">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>

    <!-- 路由出口 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name:'App',
  data(){
    return {
      message: 'hello world 同构渲染'
    }
  },
  methods: {
    onClick () {
      console.log('hello 同构')
    }
  }
}
</script>

<style>

</style>