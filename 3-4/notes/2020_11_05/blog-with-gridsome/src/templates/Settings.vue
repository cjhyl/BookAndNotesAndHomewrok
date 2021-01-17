<template>
  <Layout>
    <h1>User {{ $route.params.id }} Settings</h1>
  </Layout>
</template>

<script>
export default {
  name: 'SettingsPage',
  mounted(){
    console.log('route',this.$route)
  },
  metaInfo: {
    title: '用户设置',
    meta: [
      { name: 'author', content: 'Cjh'}
    ]
  }
}
</script>

<style>

</style>