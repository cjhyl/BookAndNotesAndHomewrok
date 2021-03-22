<template>
  <div>
    <ResourceList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourceList from './components/List.vue'

export default Vue.extend({
  name: 'ResourceIndex',
  components: {
    ResourceList
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
