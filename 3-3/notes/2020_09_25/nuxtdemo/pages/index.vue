<template>
  <div>
    <h1>Hello Nuxt {{title}}</h1>
    <ul>
      <li v-for="(r,i) in posts" :key="i">
        {{r.id+' | '+r.title+' | '+r.body}}
      </li>
    </ul>
    <nuxt-link to="/about">about</nuxt-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  layout: 'foo',
  mounted () {
    console.log('this.posts',this.posts)
  },
  //只能在页面组件中使用，非页面组件不能使用
  async asyncData (context) {
    console.log('do asyncData',context)
    let rl = await axios.get('http://localhost:3000/data.json')
    return rl.data
  }
}
</script>

<style>

</style>
