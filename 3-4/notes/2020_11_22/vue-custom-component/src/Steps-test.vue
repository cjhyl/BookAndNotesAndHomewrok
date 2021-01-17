<template>
  <div>
    <steps
      :count="count"
      :active="active"
    >
    </steps>
    <button @click="next">下一步</button>
  </div>
</template>

<script>
import Steps from './Steps.vue'
export default {
  name:'StepsTest',
  components: {
    Steps
  },
  data () {
    return {
      count:4,
      active:0
    }
  },
  methods: {
    next () {
      if(this.active>=this.count){
        this.active=0;
      }else{
        this.active++;
      }
    }
  }
}
</script>

<style>

</style>