<template>
  <div>
    <user-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserList from './components/UserList.vue'

export default Vue.extend({
  name: 'UserIndex',
  components: {
    UserList
  },
  data () {
    return {
    }
  },

  methods: {
  }
})
</script>

<style lang="scss" scoped>

</style>
