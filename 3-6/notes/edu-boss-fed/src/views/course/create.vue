<template>
  <div>
    <create-or-update />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'CourseCreate',
  components: {
    CreateOrUpdate
  },
  data () {
    return {
    }
  },

  methods: {
  }
})
</script>

<style lang="scss"  scoped>
</style>
