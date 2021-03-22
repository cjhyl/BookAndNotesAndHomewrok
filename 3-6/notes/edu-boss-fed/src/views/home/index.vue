<template>
  <div>首页</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'HomeIndex',

  data () {
    return {
    }
  },
  mounted () {
    console.log('userData', this.$store.state.user)
  },
  methods: {
  }
})
</script>

<style lang="scss" scoped>

</style>
