<template>
  <div>
    <h1>Post List</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post.description }}</li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PostList',
  metaInfo: {
    title: 'Posts'
  },
  data () {
    return {
      // posts: []
    }
  },
  computed: {
    ...mapState(['posts'])
  },
  // Vue SSR 特殊为服务端渲染提供的一个生命周期函数
  serverPrefetch () {
    //发起 action，返回 Promise
    return this.getPosts()
  },
  methods: {
    ...mapActions(['getPosts'])
  },
  /**
   * 服务端渲染
   * 只支持 beforeCreate 和 created
   * 不会等待其中的异步操作
   * 不支持响应式数据
   * 所有这些做法在服务端渲染中不会工作
   */
  // async created () {
  //   console.log('Posts Created Start')
  //   const { data } = await axios({
  //     method: 'GET',
  //     url: 'https://cnodejs.org/api/v1/topics'
  //   })
  //   this.posts = data.data
  //   console.log('Posts Created End')
  // }
}
</script>

<style>

</style>