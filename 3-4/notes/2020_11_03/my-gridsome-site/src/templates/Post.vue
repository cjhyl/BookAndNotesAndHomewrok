<template>
  <div>
    <h1>{{ $page.post.title }}</h1>
    <p>{{ $page.post.content }}</p>
  </div>
</template>

<page-query>
query ($id: ID!) {
  post (id: $id) {
    id
    title
    content
  }
}
</page-query>

<script>
export default {
  name: 'PostPage',
  metaInfo() {//metaInfo中要使用预加载数据需要使用函数格式
    return {
      title: this.$page.post.title
    }
  } 
}
</script>

<style>

</style>